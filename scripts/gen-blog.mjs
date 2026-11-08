#!/usr/bin/env node
/**
 * content/blog/*.md（1記事1ファイルの原稿）を読み込み、
 * app/lib/blog-data.generated.ts を書き出す。
 *
 * 原稿フォーマット:
 *   ---
 *   date: 2026.06.01
 *   cover: /blog/xxx.png
 *   coverPosition: object-top   (省略可)
 *   category_ja: ...
 *   category_en: ...
 *   title_ja: ...
 *   title_en: ...
 *   excerpt_ja: ...
 *   excerpt_en: ...
 *   ---
 *
 *   ## ja
 *   本文（空行区切りで段落）
 *
 *   ![キャプション](/blog/image.png)
 *
 *   ## en
 *   本文（同上）
 *
 * ファイル名がそのまま記事の slug になる（例: hajimemashite.md → /blog/hajimemashite）。
 * 記事の並び順は date の昇順。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(projectRoot, "content", "blog");
// 予約公開を待っている原稿（サイトには載せず、「近日公開予定」の予告にだけ使う）
const stockDir = path.join(projectRoot, "content", "blog-stock");
const outFile = path.join(projectRoot, "app", "lib", "blog-data.generated.ts");

function log(message) {
  console.log(`[blog:gen] ${message}`);
}

function splitSections(markdown) {
  const lines = markdown.split(/\r?\n/);
  const sections = {};
  let current = null;
  for (const line of lines) {
    const heading = line.match(/^##\s+(ja|en)\s*$/i);
    if (heading) {
      current = heading[1].toLowerCase();
      sections[current] = [];
      continue;
    }
    if (current) sections[current].push(line);
  }
  return {
    ja: (sections.ja || []).join("\n").trim(),
    en: (sections.en || []).join("\n").trim(),
  };
}

function parseBlocks(sectionText, slug, lang) {
  if (!sectionText) return [];
  const paragraphs = sectionText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return paragraphs.map((p) => {
    const imageMatch = p.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, caption, src] = imageMatch;
      return caption
        ? { kind: "image", src, caption }
        : { kind: "image", src };
    }
    return { kind: "text", text: p };
  });
}

function fail(message) {
  console.error(`[blog:gen] ERROR: ${message}`);
  process.exit(1);
}

// frontmatter の sources（参考にした資料）を [{ label, url? }] に整える。
function parseSources(raw, file) {
  if (raw === undefined || raw === null) return undefined;
  if (!Array.isArray(raw)) fail(`${file}: "sources" must be a list`);
  return raw.map((item, i) => {
    if (!item || typeof item.label !== "string" || !item.label.trim()) {
      fail(`${file}: sources[${i}] needs a "label"`);
    }
    if (item.url !== undefined && !/^https?:\/\//.test(String(item.url))) {
      fail(`${file}: sources[${i}].url must start with http(s)://`);
    }
    return item.url ? { label: item.label.trim(), url: String(item.url) } : { label: item.label.trim() };
  });
}

// 記事どうしのつながり：frontmatter の related と、本文中の /blog/〇〇 へのリンク。
function collectLinks(data, content) {
  const explicit = Array.isArray(data.related) ? data.related.map(String) : [];
  const inBody = [...content.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)].map((m) => m[1]);
  return [...new Set([...explicit, ...inBody])];
}

// 予約公開待ちの原稿（タイトルと予定日だけ読む）
function readStock() {
  if (!fs.existsSync(stockDir)) return [];
  return fs
    .readdirSync(stockDir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(stockDir, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        date: String(data.date ?? ""),
        titleJa: data.title_ja,
        titleEn: data.title_en,
        links: collectLinks(data, content),
      };
    })
    .filter((p) => /^\d{4}\.\d{2}\.\d{2}$/.test(p.date) && p.titleJa && p.titleEn);
}

// 記事の末尾に出す「関連する院長ブログ」と「近日公開予定」を決める。
// 双方向（A→B なら B→A も）でつなぎ、つながりのない記事は同じ分類の新しい記事で補う。
function attachRelated(posts, rawLinks) {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const stock = readStock();
  const stockBySlug = new Map(stock.map((p) => [p.slug, p]));
  const links = new Map();
  const add = (a, b) => {
    if (a === b) return;
    if (!links.has(a)) links.set(a, []);
    if (!links.get(a).includes(b)) links.get(a).push(b);
  };
  for (const [slug, targets] of rawLinks) for (const t of targets) { add(slug, t); add(t, slug); }
  for (const sp of stock) for (const t of sp.links) { add(t, sp.slug); }

  for (const post of posts) {
    const linked = links.get(post.slug) ?? [];
    const related = linked.filter((s) => bySlug.has(s)).slice(0, 5);
    // つながりが少ない記事は、同じサブ分類 → 同じカテゴリの新しい記事で補う
    for (const keyOf of [(p) => p.ja.subcategory ?? p.ja.category, (p) => p.ja.category]) {
      if (related.length >= 2) break;
      const key = keyOf(post);
      const same = [...posts]
        .reverse()
        .filter((p) => p.slug !== post.slug && !related.includes(p.slug) && keyOf(p) === key)
        .slice(0, 3 - related.length)
        .map((p) => p.slug);
      related.push(...same);
    }
    if (related.length > 0) {
      post.related = related.map((s) => {
        const p = bySlug.get(s);
        return { slug: s, ja: p.ja.title, en: p.en.title };
      });
    }
    const upcoming = linked
      .filter((s) => !bySlug.has(s) && stockBySlug.has(s))
      .map((s) => stockBySlug.get(s))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 2)
      .map((p) => ({ ja: p.titleJa, en: p.titleEn }));
    if (upcoming.length > 0) post.upcoming = upcoming;
  }
}

function generate() {
  if (!fs.existsSync(contentDir)) {
    fail(`content directory not found: ${contentDir}`);
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .sort();

  if (files.length === 0) {
    fail(`no .md files found in ${contentDir}`);
  }

  const rawLinks = new Map();
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
    const { data, content } = matter(raw);

    const required = [
      "date",
      "cover",
      "category_ja",
      "category_en",
      "title_ja",
      "title_en",
      "excerpt_ja",
      "excerpt_en",
    ];
    for (const key of required) {
      if (!data[key]) fail(`${file}: frontmatter is missing "${key}"`);
    }

    const { ja, en } = splitSections(content);
    if (!ja) fail(`${file}: missing "## ja" section`);
    if (!en) fail(`${file}: missing "## en" section`);

    rawLinks.set(slug, collectLinks(data, content));
    return {
      slug,
      date: String(data.date),
      cover: data.cover,
      coverPosition: data.coverPosition || undefined,
      sources: parseSources(data.sources, file),
      ja: {
        category: data.category_ja,
        subcategory: data.subcategory_ja || undefined,
        title: data.title_ja,
        excerpt: data.excerpt_ja,
        body: parseBlocks(ja, slug, "ja"),
      },
      en: {
        category: data.category_en,
        subcategory: data.subcategory_en || undefined,
        title: data.title_en,
        excerpt: data.excerpt_en,
        body: parseBlocks(en, slug, "en"),
      },
    };
  });

  posts.sort((a, b) => a.date.localeCompare(b.date));
  attachRelated(posts, rawLinks);

  const banner = `// このファイルは自動生成です。手で編集しないでください。
// 元データ: content/blog/*.md （npm run blog:gen で再生成）
`;
  const body = `${banner}\nimport type { BlogPost } from "./blog";\n\nexport const generatedPosts: BlogPost[] = ${JSON.stringify(
    posts,
    null,
    2
  )};\n`;

  fs.writeFileSync(outFile, body, "utf8");
  log(`generated ${posts.length} post(s) → ${path.relative(projectRoot, outFile)}`);
}

generate();
