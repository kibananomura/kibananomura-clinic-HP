import { timingSafeEqual } from "node:crypto";
import { pushFeverNotice } from "../../../lib/fever-line";

/**
 * 院内サイネージ（Clinic_signage）から呼ぶ。薬局が「調剤済み」を押したとき、
 * 発熱外来の車の方（公式LINEから到着受付を開いた方）に公式LINEでお知らせする。
 * Authorization: Bearer <SIGNAGE_NOTIFY_SECRET> がない依頼は受け付けない。
 */
export async function POST(request: Request) {
  const secret = process.env.SIGNAGE_NOTIFY_SECRET;
  if (!secret || !process.env.LINE_OA_CHANNEL_SECRET || !process.env.LINE_OA_CHANNEL_ACCESS_TOKEN) {
    return Response.json({ error: "not configured" }, { status: 503 });
  }
  const given = Buffer.from((request.headers.get("authorization") ?? "").replace(/^Bearer /, ""));
  const expected = Buffer.from(secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { token?: unknown; kind?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (typeof body.token !== "string" || typeof body.kind !== "string") {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const result = await pushFeverNotice(body.token, body.kind);
  return Response.json(result, { status: result.ok ? 200 : 400 });
}
