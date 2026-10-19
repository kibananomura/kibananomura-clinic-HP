// Wraps a PDF/HTML doc in a minimal viewer with a persistent back bar, so a
// mobile browser's native PDF viewer (which often hides page chrome / the
// back button) doesn't strand the user with no way back to /admin.
export default async function AdminDocViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string; name?: string }>;
}) {
  const { url, name } = await searchParams;

  if (!url) {
    return (
      <div style={{ padding: 24, fontFamily: "sans-serif" }}>
        資料が見つかりません。
        <a href="/admin" style={{ marginLeft: 8, color: "#2a5a46" }}>
          資料一覧に戻る
        </a>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        margin: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          background: "#3f6652",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        <a
          href="/admin"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 13.5,
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          ← 資料一覧に戻る
        </a>
        {name && (
          <span
            style={{
              fontSize: 12.5,
              opacity: 0.85,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        )}
      </div>
      <iframe
        src={url}
        title={name || "document"}
        style={{ flex: 1, border: "none", width: "100%" }}
      />
    </div>
  );
}
