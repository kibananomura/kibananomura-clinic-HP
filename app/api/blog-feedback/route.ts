import { createHash } from "node:crypto";
import { isAllowedOrigin } from "../../lib/chatbot-server";
import { getPost } from "../../lib/blog";

/**
 * 院長ブログの「この記事は役に立ちましたか？」の回答を受け取り、開業支援チームの Supabase（blog_feedback）に記録する。
 * 数はHPには表示しない（院長がダッシュボードで見る）。名前・連絡先は受け取らず、同じ人の二重投票を防ぐための記号だけを作る。
 */
export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });
  const url = process.env.CHATBOT_LOG_SUPABASE_URL;
  const key = process.env.CHATBOT_LOG_SUPABASE_KEY;
  if (!url || !key) return Response.json({ error: "not configured" }, { status: 503 });

  let body: { slug?: unknown; helpful?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  const slug = typeof body.slug === "string" ? body.slug : "";
  const post = /^[a-z0-9-]{1,80}$/.test(slug) ? getPost(slug) : undefined;
  if (!post || typeof body.helpful !== "boolean") return Response.json({ error: "invalid body" }, { status: 400 });

  // 同じ人（IP＋ブラウザ）・同じ記事を見分けるための記号。元の値には戻せないようにする
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = request.headers.get("user-agent") ?? "";
  const client = createHash("sha256").update(`${key}|${ip}|${ua}|${slug}`).digest("hex");

  const res = await fetch(`${url}/rest/v1/rpc/log_blog_feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify({ p_slug: slug, p_title: post.ja.title, p_helpful: body.helpful, p_client: client }),
  }).catch(() => null);
  if (!res?.ok) console.error("blog feedback log failed", res?.status);
  return Response.json({ ok: true });
}
