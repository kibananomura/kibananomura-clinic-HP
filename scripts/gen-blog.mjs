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

    return {
      slug,
      date: String(data.date),
      cover: data.cover,
      coverPosition: data.coverPosition || undefined,
      ja: {
        category: data.category_ja,
        title: data.title_ja,
        excerpt: data.excerpt_ja,
        body: parseBlocks(ja, slug, "ja"),
      },
      en: {
        category: data.category_en,
        title: data.title_en,
        excerpt: data.excerpt_en,
        body: parseBlocks(en, slug, "en"),
      },
    };
  });

  posts.sort((a, b) => a.date.localeCompare(b.date));

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
