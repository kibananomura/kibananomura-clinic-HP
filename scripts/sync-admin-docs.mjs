#!/usr/bin/env node
// Syncs internal business PDFs from the local 資料 folder into public/admin-docs/
// and regenerates app/admin/manifest.json. Run this any time a new PDF is created
// in the 資料 folder, so the /admin page stays up to date.
//
// Scope: business documents only. Personal/sensitive documents (income tax filings,
// personal qualification certificates, sole-proprietorship filing forms) are
// intentionally excluded — see EXCLUDE_FILES / EXCLUDE_DIRS below.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SOURCE_ROOT = path.resolve(PROJECT_ROOT, "../../../木花のむら診療所_資料");
const DEST_ROOT = path.join(PROJECT_ROOT, "public", "admin-docs");
const MANIFEST_PATH = path.join(PROJECT_ROOT, "app", "admin", "manifest.json");

// Folders under 資料 that must never be published (personal/identity documents).
const EXCLUDE_DIRS = new Set(["院長資格証明書"]);

// Individual files that must never be published even if their parent folder is included.
const EXCLUDE_FILES = new Set([
  "r4syotoku.pdf", // 院長個人の所得税資料
  "個人事業の開業届出書.pdf",
  "青色申告取りやめ書.pdf",
]);

// Folder name -> { slug, label, order } for display grouping on /admin.
const CATEGORY_MAP = {
  "労務規程一式_20261015": { slug: "labor-regulations", label: "労務規程一式（就業規則・賃金規程・各種規程）", order: 1 },
  "雇用契約書": { slug: "employment-contracts", label: "雇用契約書", order: 2 },
  "就業規則案": { slug: "work-rules-draft", label: "就業規則（旧案・給与等級表）", order: 3 },
  "採用案内": { slug: "recruiting", label: "採用案内", order: 4 },
  "採用面接質問チェックシート": { slug: "interview-checklist", label: "採用面接チェックシート", order: 5 },
  "事前研修資料_労務編": { slug: "pre-opening-training-labor", label: "事前研修資料（労務編）", order: 5.5 },
  "医療機器見積価格_総まとめ": { slug: "equipment-summary", label: "医療機器見積価格（総まとめ）", order: 6 },
  "医療機器見積書": { slug: "equipment-quotes", label: "医療機器見積書（個別）", order: 7 },
  "CT導入検討資料": { slug: "ct-review", label: "CT導入検討資料", order: 8 },
  "電カル検討": { slug: "emr-review", label: "電子カルテ検討資料", order: 9 },
  "薬局面談資料": { slug: "pharmacy-meetings", label: "薬局面談資料", order: 10 },
  "社労士面談資料": { slug: "labor-consultant-meetings", label: "社労士面談資料", order: 11 },
  "税理士面談資料": { slug: "tax-accountant-meetings", label: "税理士面談資料", order: 12 },
  "事業計画書": { slug: "business-plan", label: "事業計画書", order: 13 },
  "20260916AAO予算書関連": { slug: "aao-budget", label: "建築AAO予算書関連", order: 14 },
  "20260903宮崎銀行面談②": { slug: "miyazaki-bank-meeting", label: "銀行面談資料（宮崎銀行）", order: 15 },
  "銀行提出資料": { slug: "bank-submission", label: "銀行提出資料", order: 16 },
  "土地関連": { slug: "land", label: "土地関連", order: 17 },
  "診療圏調査": { slug: "catchment-survey", label: "診療圏調査", order: 18 },
  "競合調査": { slug: "competitor-survey", label: "競合調査", order: 19 },
  // 「ガイドライン」フォルダは学会等が発行する第三者の著作物（診療ガイドライン）であり、
  // 院長自身の業務資料ではないため、著作権上の配慮から /admin には掲載しない。
  "収支計画": { slug: "revenue-plan", label: "収支計画", order: 21 },
  "BCP_事業継続計画": { slug: "bcp", label: "事業継続計画（BCP）", order: 22 },
};

// Collects PDFs, and — when a same-named .html sibling exists (self-authored
// documents built from Markdown/HTML, as opposed to scanned/vendor PDFs) —
// pairs them up. The HTML version is much lighter (no embedded CJK font) and
// is offered as the primary link; the PDF stays available for printing/sharing.
// サブフォルダ名がこれに一致する場合、改定前の古い版として扱う（一覧には表示するが、
// 表示名に接頭辞を付けて最新版と区別し、並び順も最後にする）
const ARCHIVE_DIR_NAME = "過去版";

function listDocs(dir, isArchived = false) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const childIsArchived = isArchived || entry.name.normalize("NFC") === ARCHIVE_DIR_NAME;
      out.push(...listDocs(path.join(dir, entry.name), childIsArchived));
      continue;
    }
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".pdf")) continue;
    const name = entry.name.normalize("NFC");
    if (EXCLUDE_FILES.has(name)) continue;
    const pdfPath = path.join(dir, entry.name);
    const htmlPath = pdfPath.slice(0, -4) + ".html";
    out.push({
      pdfPath,
      htmlPath: fs.existsSync(htmlPath) ? htmlPath : null,
      isArchived,
    });
  }
  return out;
}

function main() {
  if (!fs.existsSync(SOURCE_ROOT)) {
    console.error(`Source folder not found: ${SOURCE_ROOT}`);
    process.exit(1);
  }

  fs.rmSync(DEST_ROOT, { recursive: true, force: true });
  fs.mkdirSync(DEST_ROOT, { recursive: true });

  const categories = {};

  for (const topEntry of fs.readdirSync(SOURCE_ROOT, { withFileTypes: true })) {
    if (!topEntry.isDirectory()) continue;
    // macOS stores filenames in NFD; normalize to NFC so lookups against
    // CATEGORY_MAP (written in this source file as NFC) match correctly.
    const dirName = topEntry.name.normalize("NFC");
    if (EXCLUDE_DIRS.has(dirName)) continue;
    const meta = CATEGORY_MAP[dirName];
    if (!meta) {
      console.warn(`[skip] Unmapped folder (add to CATEGORY_MAP to publish): ${dirName}`);
      continue;
    }

    const srcDir = path.join(SOURCE_ROOT, topEntry.name);
    const docs = listDocs(srcDir).sort((a, b) => {
      if (a.isArchived !== b.isArchived) return a.isArchived ? 1 : -1;
      return a.pdfPath.localeCompare(b.pdfPath);
    });
    if (docs.length === 0) continue;

    const destDir = path.join(DEST_ROOT, meta.slug);
    fs.mkdirSync(destDir, { recursive: true });

    const files = [];
    for (const doc of docs) {
      const pdfBaseName = path.basename(doc.pdfPath).normalize("NFC");
      fs.copyFileSync(doc.pdfPath, path.join(destDir, pdfBaseName));
      const stat = fs.statSync(doc.pdfPath);

      let htmlUrl = null;
      if (doc.htmlPath) {
        const htmlBaseName = path.basename(doc.htmlPath).normalize("NFC");
        fs.copyFileSync(doc.htmlPath, path.join(destDir, htmlBaseName));
        htmlUrl = `/admin-docs/${meta.slug}/${encodeURIComponent(htmlBaseName)}`;
      }

      files.push({
        name: (doc.isArchived ? "【過去版】" : "") + pdfBaseName.replace(/\.pdf$/i, ""),
        url: `/admin-docs/${meta.slug}/${encodeURIComponent(pdfBaseName)}`,
        htmlUrl,
        sizeKB: Math.round(stat.size / 1024),
        modified: stat.mtime.toISOString().slice(0, 10),
      });
    }

    categories[meta.slug] = {
      label: meta.label,
      order: meta.order,
      files,
    };
  }

  const sortedCategories = Object.values(categories).sort((a, b) => a.order - b.order);

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(
    MANIFEST_PATH,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), categories: sortedCategories },
      null,
      2
    ) + "\n",
    "utf-8"
  );

  const totalFiles = sortedCategories.reduce((n, c) => n + c.files.length, 0);
  console.log(`Synced ${totalFiles} PDF(s) across ${sortedCategories.length} categories.`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

main();
