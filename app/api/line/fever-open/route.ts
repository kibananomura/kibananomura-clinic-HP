/**
 * 公式LINEで送る「発熱外来 到着受付」のリンク先。
 * LINEは院内のアドレス（http://192.168.…）をリンクとして扱えないため、いったんこのHTTPSのURLを開いてもらい、
 * 院内サイネージの fever.html（FEVER_SIGNAGE_URL）へ転送する。目印（lt）と区画番号（slot）はそのまま引き継ぐ。
 */
export function GET(request: Request) {
  // 設定の打ち間違い（先頭の h が抜けた「ttp://」、http:// なし）も受け付ける
  const raw = (process.env.FEVER_SIGNAGE_URL ?? "").trim();
  const base = !raw ? "" : /^https?:\/\//.test(raw) ? raw : /^ttps?:\/\//.test(raw) ? `h${raw}` : `http://${raw}`;
  if (!base) return new Response("発熱外来のLINE受付は準備中です。受付にお電話ください。", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });

  const params = new URL(request.url).searchParams;
  const target = new URL("/fever.html", base);
  const lt = params.get("lt") ?? "";
  const slot = params.get("slot") ?? "";
  if (/^[A-Za-z0-9_-]{30,400}$/.test(lt)) target.searchParams.set("lt", lt);
  if (/^[1-9]$/.test(slot)) target.searchParams.set("slot", slot);

  return new Response(null, {
    status: 302,
    headers: { Location: target.toString(), "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
