"use client";

import { useMemo, useState } from "react";

type DocFile = { name: string; url: string; htmlUrl?: string | null; sizeKB: number; modified: string };
type Category = { label: string; order: number; files: DocFile[] };

export default function AdminDocsClient({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        files: cat.files.filter(
          (f) => f.name.toLowerCase().includes(q) || cat.label.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.files.length > 0);
  }, [categories, query]);

  const hitCount = filtered.reduce((n, c) => n + c.files.length, 0);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="資料名・カテゴリ名で検索（例：就業規則、CT、賃金）"
          style={{
            width: "100%",
            padding: "10px 14px",
            fontSize: 14,
            border: "1px solid #ccc",
            borderRadius: 8,
            boxSizing: "border-box",
          }}
        />
        {query && (
          <p style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
            「{query}」に一致する資料：{hitCount}件
          </p>
        )}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: 13, color: "#888" }}>一致する資料が見つかりませんでした。</p>
      )}

      {filtered.map((cat) => (
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
                <span>
                  <a
                    href={`/admin-docs/view?url=${encodeURIComponent(f.htmlUrl || f.url)}&name=${encodeURIComponent(f.name)}`}
                    style={{ color: "#2a5a46", fontWeight: 600, textDecoration: "underline" }}
                  >
                    {f.name}
                  </a>
                  {f.htmlUrl && (
                    <a
                      href={`/admin-docs/view?url=${encodeURIComponent(f.url)}&name=${encodeURIComponent(f.name + "（PDF版）")}`}
                      style={{
                        marginLeft: 8,
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: "#999",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        padding: "1px 5px",
                      }}
                    >
                      PDF版
                    </a>
                  )}
                </span>
                <span style={{ color: "#999", fontSize: 11.5, whiteSpace: "nowrap" }}>
                  {f.modified} ・ {f.sizeKB}KB
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
