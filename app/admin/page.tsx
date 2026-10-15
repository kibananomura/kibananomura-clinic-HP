import type { Metadata } from "next";
import manifest from "./manifest.json";

export const metadata: Metadata = {
  title: "資料一覧（管理用）",
  robots: { index: false, follow: false },
};

type DocFile = { name: string; url: string; sizeKB: number; modified: string };
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

      {categories.map((cat) => (
        <section key={cat.label} style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              background: "#3f6652",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            {cat.label}
            <span style={{ fontWeight: 400, fontSize: 12, marginLeft: 8, opacity: 0.85 }}>
              （{cat.files.length}件）
            </span>
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {cat.files.map((f) => (
              <li
                key={f.url}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 12,
                  padding: "8px 10px",
                  borderBottom: "1px solid #e5e5e5",
                  fontSize: 13.5,
                }}
              >
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2a5a46", fontWeight: 600, textDecoration: "underline" }}
                >
                  {f.name}
                </a>
                <span style={{ color: "#999", fontSize: 11.5, whiteSpace: "nowrap" }}>
                  {f.modified} ・ {f.sizeKB}KB
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
