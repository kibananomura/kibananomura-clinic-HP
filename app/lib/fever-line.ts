import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/**
 * 発熱外来の車の方を、公式LINEでご案内する（院内サイネージ Clinic_signage と連携）。
 * 1. 発熱区画に着いた方が公式LINEに「発熱到着」と送る → 発熱外来の到着受付画面（院内サイネージの fever.html）のURLを返す
 * 2. URLには、その方だけの目印（LINEのユーザーIDを暗号化したもの）を付ける。院内サイネージは目印を受付番号と一緒に覚えておく
 * 3. 薬局が「調剤済み」を押すと、院内サイネージが /api/line/fever-notify に目印を送り、その方にだけLINEでお知らせする
 * LINEのユーザーIDはどこにも保存しない（目印は16時間で使えなくなる）。
 *
 * 必要な環境変数:
 *   LINE_OA_CHANNEL_SECRET, LINE_OA_CHANNEL_ACCESS_TOKEN … 公式LINE（キバナビと共通）
 *   FEVER_SIGNAGE_URL … 院内サイネージのアドレス（例: http://192.168.11.57:3000）。未設定なら「準備中」と返す
 *   SIGNAGE_NOTIFY_SECRET … 院内サイネージからのお知らせ依頼を確かめる合言葉（サイネージ側の LINE_NOTIFY_SECRET と同じ値）
 */

const TOKEN_TTL_MS = 16 * 60 * 60 * 1000;
const ARRIVE_WORDS = ["発熱到着", "発熱で到着", "発熱到着しました", "発熱外来到着"];

const TEXT = {
  arrive:
    "到着のご連絡ありがとうございます。\n" +
    "院内のフリーWi-Fiにつないでから、下のURLで「発熱外来 到着受付」を開き、駐車番号・お車のナンバー・受診される方の人数を送ってください。\n" +
    "お薬の準備ができたら、このLINEでもお知らせします。",
  notReady: "発熱外来のLINE受付は準備中です。お手数ですが、駐車区画の看板のQRコードから到着受付を開くか、受付にお電話ください。",
  ready: "調剤が済みました。薬局横の所定の位置まで進んで停車してください。\n\nお薬を受け取ったら、到着受付の画面を閉じてください。",
};

type LineMessage = Record<string, unknown>;

/** 「発熱到着」「発熱到着3」のようなメッセージなら、区画番号（なければ空文字）を返す。違えば null */
export function parseFeverArrival(text: string): string | null {
  const t = text.replace(/[\s　]/g, "").replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0));
  const word = ARRIVE_WORDS.find((w) => t.startsWith(w));
  if (!word) return null;
  const rest = t.slice(word.length);
  return /^[1-9]$/.test(rest) ? rest : "";
}

/** 「発熱到着」への返信（到着受付のURL）。返信なので通数にはかぞえられない。
 *  院内のアドレス（http://192.168.…）はLINEでリンクにならないため、HPのURLから転送する */
export function feverArrivalMessages(userId: string, slot: string): LineMessage[] {
  const base = process.env.FEVER_SIGNAGE_URL;
  if (!base || !process.env.SIGNAGE_NOTIFY_SECRET) return [{ type: "text", text: TEXT.notReady }];
  // LINEは院内のアドレスをリンクにできないため、HPのHTTPSのURL（/api/line/fever-open）を経由して院内サイネージへ転送する
  const url = new URL("/api/line/fever-open", "https://www.kibananomura.jp");
  url.searchParams.set("lt", sealUser(userId));
  if (slot) url.searchParams.set("slot", slot);
  return [{ type: "text", text: `${TEXT.arrive}\n\n▼発熱外来 到着受付\n${url.toString()}` }];
}

/** 院内サイネージからの依頼で、目印の方にLINEを送る（今は「調剤済み」だけ） */
export async function pushFeverNotice(token: string, kind: string): Promise<{ ok: boolean; error?: string }> {
  if (kind !== "ready") return { ok: false, error: "unknown kind" };
  const userId = openUser(token);
  if (!userId) return { ok: false, error: "invalid or expired token" };
  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.LINE_OA_CHANNEL_ACCESS_TOKEN}` },
    body: JSON.stringify({ to: userId, messages: [{ type: "text", text: TEXT.ready }] }),
  });
  if (!res.ok) {
    console.error("fever line push failed", res.status, await res.text());
    return { ok: false, error: `push failed (${res.status})` };
  }
  return { ok: true };
}

// ---- 目印（LINEのユーザーIDと期限を暗号化した文字列）----

function key(): Buffer {
  return createHash("sha256").update(`fever-line:${process.env.LINE_OA_CHANNEL_SECRET ?? ""}`).digest();
}

function sealUser(userId: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify({ u: userId, e: Date.now() + TOKEN_TTL_MS }), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url");
}

function openUser(token: string): string | null {
  try {
    const raw = Buffer.from(token, "base64url");
    if (raw.length < 29) return null;
    const decipher = createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const data = JSON.parse(Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8"));
    return typeof data.u === "string" && typeof data.e === "number" && data.e > Date.now() ? data.u : null;
  } catch {
    return null;
  }
}
