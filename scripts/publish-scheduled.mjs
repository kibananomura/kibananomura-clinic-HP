#!/usr/bin/env node
/**
 * 予約公開：content/blog-stock/ の原稿のうち、date（YYYY.MM.DD）が今日（日本時間）以前のものを
 * content/blog/ へ移す。移したファイル名を1行ずつ出力する（何もなければ何も出さない）。
 *
 * 依存パッケージなし（GitHub Actions で npm install せずに動かすため）。
 * 公開の順番を変えたいときは、ストック原稿の date を書き換えるだけでよい。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stockDir = path.join(root, "content", "blog-stock");
const blogDir = path.join(root, "content", "blog");

// 日本時間の今日を YYYY.MM.DD で
const today = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})
  .format(new Date())
  .replace(/\//g, ".");

for (const file of fs.readdirSync(stockDir).sort()) {
  if (!file.endsWith(".md") || file === "README.md") continue;
  const text = fs.readFileSync(path.join(stockDir, file), "utf8");
  const m = text.match(/^date:\s*"?(\d{4}\.\d{2}\.\d{2})"?\s*$/m);
  if (!m || m[1] > today) continue;
  if (fs.existsSync(path.join(blogDir, file))) {
    console.error(`skip ${file}: content/blog に同じ名前があります`);
    continue;
  }
  fs.renameSync(path.join(stockDir, file), path.join(blogDir, file));
  console.log(file);
}
