import type { Metadata } from "next";
import manifest from "./manifest.json";
import AdminDocsClient from "./AdminDocsClient";

export const metadata: Metadata = {
  title: "資料一覧（管理用）",
  robots: { index: false, follow: false },
};

type DocFile = { name: string; url: string; htmlUrl?: string | null; sizeKB: number; modified: string };
type Category = { label: string; order: number; files: DocFile[] };

const categories = manifest.categories as Category[];

export default function AdminPage() {
  const totalFiles = categories.reduce((n, c) => n + c.files.length, 0);

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "40px 20px 80px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>資料一覧（管理用）</h1>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>
        これまで作成した業務資料のPDFをカテゴリ別に一覧表示しています（全{totalFiles}件）。
        このページは検索エンジンには表示されません。リンクは第三者に共有しないでください。
      </p>

      <AdminDocsClient categories={categories} />
    </main>
  );
}
