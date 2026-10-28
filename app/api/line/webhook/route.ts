import { after } from "next/server";
import { handleLineEvents, verifySignature } from "../../../lib/kibanavi-line";

/**
 * 公式LINE（Messaging API）の Webhook。LINE Developers の Webhook URL に
 * https://kibananomura.jp/api/line/webhook を設定する。
 * LINEには先に200を返し、キバナビの回答づくりと返信は after で続ける（返信は reply token で行う）。
 */
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!process.env.LINE_OA_CHANNEL_SECRET || !process.env.LINE_OA_CHANNEL_ACCESS_TOKEN) {
    return Response.json({ error: "公式LINEの設定（LINE_OA_CHANNEL_SECRET・LINE_OA_CHANNEL_ACCESS_TOKEN）がありません。" }, { status: 503 });
  }

  const rawBody = await request.text();
  if (!verifySignature(rawBody, request.headers.get("x-line-signature"))) {
    return Response.json({ error: "invalid signature" }, { status: 401 });
  }

  let events = [];
  try {
    events = JSON.parse(rawBody).events ?? [];
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  // LINE Developers の「検証」ボタンは events が空で届く。そのまま200を返せばよい
  if (events.length > 0) after(() => handleLineEvents(events));
  return Response.json({ ok: true });
}
