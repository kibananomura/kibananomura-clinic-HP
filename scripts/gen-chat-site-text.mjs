/**
 * HP案内チャットボット用に、app/lib/site.tsx の日本語辞書（const ja）から
 * 診療案内・料金・初診案内などの本文テキストを抜き出し、
 * app/lib/chat-site-text.generated.ts に書き出す。
 *
 * site.tsx は "use client" のため、サーバー側のチャットAPIから直接 import できない。
 * そのため、ここでは文字列リテラルを素朴に抜き出すだけにしている（表示とは無関係）。
 * `npm run build` の前に自動実行される（package.json の prebuild）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteFile = path.join(root, "app/lib/site.tsx");
const outFile = path.join(root, "app/lib/chat-site-text.generated.ts");

// site.tsx の日本語辞書のセクション名 → チャットボットの参照元として表示する名前とURL
const SECTIONS = {
  features: { title: "当院の特長", url: "/" },
  director: { title: "院長紹介", url: "/#director" },
  services: { title: "診療案内", url: "/services" },
  servicesPage: { title: "診療案内（詳細）", url: "/services" },
  access: { title: "アクセス", url: "/#access" },
  pricing: { title: "料金のご案内", url: "/pricing" },
  firstVisit: { title: "初診の方へ", url: "/first-visit" },
  feverVisit: { title: "発熱・感染症の症状がある方へ", url: "/first-visit#fever" },
  news: { title: "お知らせ", url: "/news" },
};

const MAX_CHUNK_CHARS = 900;

const source = fs.readFileSync(siteFile, "utf8");
const jaStart = source.indexOf("const ja: SiteDict = {");
const jaEnd = source.indexOf("const en: SiteDict = {");
if (jaStart < 0 || jaEnd < 0) {
  console.error("[chat:gen] ERROR: site.tsx の日本語辞書が見つかりません");
  process.exit(1);
}
const jaSource = source.slice(jaStart, jaEnd);

/** 辞書直下（インデント2）のセクションごとに本文を切り出す */
function sectionBody(name) {
  const start = jaSource.search(new RegExp(`\\n  ${name}: \\{`));
  if (start < 0) return "";
  const next = jaSource.slice(start + 1).search(/\n {2}[a-zA-Z]+: [{[]/);
  return next < 0 ? jaSource.slice(start) : jaSource.slice(start, start + 1 + next);
}

/** 文字列リテラルを抜き出し、簡易Markdown（**・__）を取り除く */
function strings(code) {
  const out = [];
  const re = /"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
  let m;
  while ((m = re.exec(code))) {
    const raw = (m[1] ?? m[2] ?? "").replace(/\\"/g, '"').replace(/\\n/g, "\n");
    const text = raw.replace(/\*\*|__/g, "").trim();
    // URL・クラス名・短いラベル（3文字以下）は除外する
    if (text.length < 4 || /^(https?:|\/|#|mailto:)/.test(text) || /^[a-z0-9-\s:/.]+$/i.test(text)) continue;
    out.push(text);
  }
  return out;
}

const chunks = [];
for (const [name, { title, url }] of Object.entries(SECTIONS)) {
  const lines = strings(sectionBody(name));
  let current = "";
  for (const line of lines) {
    if (current && current.length + line.length > MAX_CHUNK_CHARS) {
      chunks.push({ title, url, text: current });
      current = "";
    }
    current += (current ? "\n" : "") + line;
  }
  if (current) chunks.push({ title, url, text: current });
}

const output = `// このファイルは scripts/gen-chat-site-text.mjs が自動生成しています。直接編集しないでください。
import type { KnowledgeChunk } from "./chat-knowledge";

export const SITE_TEXT_CHUNKS: KnowledgeChunk[] = ${JSON.stringify(chunks, null, 2)};
`;
fs.writeFileSync(outFile, output);
console.log(`[chat:gen] generated ${chunks.length} chunk(s) → app/lib/chat-site-text.generated.ts`);
