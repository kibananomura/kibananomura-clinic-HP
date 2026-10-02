#!/usr/bin/env node
/**
 * content/blog/*.md の日本語側（title_ja/excerpt_ja/category_ja + "## ja" 本文）が
 * 前回の翻訳同期以降に変更されていないかを検出する。
 *
 * 想定フロー：
 *   1. 院長がiPhoneのGitHub Web UIから .md ファイルの日本語部分だけを編集してコミット
 *   2. 次にこのローカル環境（Claude Code）を開いたときに `npm run check-translations` を実行
 *   3. 差分が出たファイルについて、英語側（title_en/excerpt_en/category_en + "## en"）を
 *      日本語側の内容に合わせて翻訳・更新する
 *   4. 更新後、`npm run sync-translations` で基準スナップショットを更新してコミットする
 *
 * 基準スナップショットは .translation-sync.json に保存する（リポジトリにコミットする）。
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(projectRoot, "content", "blog");
const snapshotFile = path.join(projectRoot, ".translation-sync.json");

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

function hashJaContent(data, jaBody) {
  const payload = JSON.stringify({
    category_ja: data.category_ja,
    title_ja: data.title_ja,
    excerpt_ja: data.excerpt_ja,
    body_ja: jaBody,
  });
  return crypto.createHash("sha256").update(payload).digest("hex");
}

function loadSnapshot() {
  if (!fs.existsSync(snapshotFile)) return {};
  try {
    return JSON.parse(fs.readFileSync(snapshotFile, "utf8"));
  } catch {
    return {};
  }
}

function main() {
  const mode = process.argv[2] === "--write" ? "write" : "check";
  const snapshot = loadSnapshot();
  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .sort();

  const stale = [];
  const nextSnapshot = { ...snapshot };

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
    const { data, content } = matter(raw);
    const { ja } = splitSections(content);
    const currentHash = hashJaContent(data, ja);
    const previousHash = snapshot[file];

    nextSnapshot[file] = currentHash;

    if (previousHash && previousHash !== currentHash) {
      stale.push(file);
    } else if (!previousHash) {
      // 初回実行時は「既存ファイルは同期済み」とみなし、基準値として記録するだけにする
    }
  }

  if (mode === "write") {
    fs.writeFileSync(snapshotFile, JSON.stringify(nextSnapshot, null, 2) + "\n", "utf8");
    console.log(`[check-translations] .translation-sync.json を更新しました（${files.length}件）`);
    return;
  }

  if (stale.length === 0) {
    console.log("[check-translations] 日本語側に未翻訳の変更はありません。");
    return;
  }

  console.log("[check-translations] 以下のファイルで日本語側が更新されています。英語側の同期が必要です：");
  for (const f of stale) {
    console.log(`  - content/blog/${f}`);
  }
  console.log("\n英語側を翻訳・更新した後、`npm run sync-translations` で基準値を更新してください。");
  process.exitCode = 1;
}

main();
