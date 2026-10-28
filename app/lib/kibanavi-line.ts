import { createHmac, timingSafeEqual } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { MAX_QUESTION_CHARS, answerQuestion, rateLimited, type Source } from "./chatbot-server";

/**
 * 公式LINEのキバナビ（app/api/line/webhook/route.ts から呼ぶ）。
 * リッチメニューの「キバナビに質問する」を押した人にだけ、最後の質問から15分間、キバナビが答える。
 * 受付中でないメッセージには何も返さず、これまでどおりスタッフのチャットで対応する。
 *
 * 必要な環境変数（院長個人用のLINE秘書とは別アカウントのため、名前を分けている）:
 *   LINE_OA_CHANNEL_SECRET, LINE_OA_CHANNEL_ACCESS_TOKEN … 公式LINE（Messaging API）のもの
 *   CHATBOT_LOG_SUPABASE_URL, CHATBOT_LOG_SUPABASE_KEY … 受付状態の管理と記録（HPのチャットと共通）
 * LINEのユーザーIDは保存せず、チャネルシークレットを鍵にしたハッシュにしてから受付状態の管理に使う。
 */

const SITE_ORIGIN = "https://kibananomura.jp";
const SENDER = { name: "キバナビ", iconUrl: `${SITE_ORIGIN}/kibanavi/kibanavi-face.png` };
const MAX_LINKS = 3;

const START_WORDS = ["キバナビに質問する", "キバナビに質問", "キバナビ"];
const END_WORDS = ["キバナビを終了", "終了"];
const END_LABEL = "キバナビを終了";
const EXAMPLES = ["駐車場はありますか？", "熱があるときの受診方法は？", "開院はいつですか？"];

const TEXT = {
  greeting:
    "こんにちは、キバナビです。ホームページの情報から、当院のことをご案内します。ご質問をどうぞ。\n\n" +
    "※AIが自動でお答えします。内容に誤りがある場合もあります。お名前・連絡先などの個人情報や、詳しい症状は送らないでください。ご質問と回答はサービス改善のために記録しています。\n" +
    "※最後のご質問から15分たつと、キバナビの受付は自動で終わります。",
  bye: "キバナビの受付を終了しました。またいつでも、メニューの「キバナビに質問する」からどうぞ。スタッフへのお問い合わせは、このままメッセージをお送りください。",
  notText: "キバナビは、文字でのご質問にお答えしています。ご質問を文章で送ってください。",
  tooLong: `ご質問は${MAX_QUESTION_CHARS}文字以内でお願いします。`,
  busy: "ご質問が続いたため、しばらく時間をおいてからお試しください。",
  error: "うまくお答えできませんでした。時間をおいてお試しいただくか、ホームページの『お問い合わせ』からご連絡ください。",
  linksTitle: "詳しくはこちらのページで",
};

type LineEvent = {
  type: string;
  replyToken?: string;
  source?: { type: string; userId?: string };
  message?: { type: string; text?: string };
  deliveryContext?: { isRedelivery?: boolean };
};

type LineMessage = Record<string, unknown>;

/** LINEからの通知であることを署名で確かめる */
export function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LINE_OA_CHANNEL_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest();
  const given = Buffer.from(signature, "base64");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function handleLineEvents(events: LineEvent[]) {
  for (const event of events) {
    try {
      await handleEvent(event);
    } catch (error) {
      console.error("kibanavi line event failed", error);
    }
  }
}

async function handleEvent(event: LineEvent) {
  // 1対1のトークだけを扱う。LINE側の再送（同じ通知の2回目）には答えない
  if (event.type !== "message" || event.source?.type !== "user" || !event.source.userId || !event.replyToken) return;
  if (event.deliveryContext?.isRedelivery) return;

  const userHash = hashUser(event.source.userId);
  const text = event.message?.type === "text" ? (event.message.text ?? "").trim() : "";

  if (START_WORDS.includes(text)) {
    await session(userHash, "start");
    await reply(event.replyToken, [withQuickReply({ type: "text", text: TEXT.greeting }, EXAMPLES)]);
    return;
  }

  const sessionId = await session(userHash, "touch");
  if (!sessionId) return; // 受付中でなければ何もしない（スタッフのチャットで対応）

  if (END_WORDS.includes(text)) {
    await session(userHash, "end");
    await reply(event.replyToken, [{ type: "text", text: TEXT.bye }]);
    return;
  }
  if (!text) {
    await reply(event.replyToken, [withQuickReply({ type: "text", text: TEXT.notText })]);
    return;
  }
  if (text.length > MAX_QUESTION_CHARS) {
    await reply(event.replyToken, [withQuickReply({ type: "text", text: TEXT.tooLong })]);
    return;
  }
  if (rateLimited(`line:${userHash}`)) {
    await reply(event.replyToken, [withQuickReply({ type: "text", text: TEXT.busy })]);
    return;
  }

  await showLoading(event.source.userId);
  try {
    const { answer, sources } = await answerQuestion(text, { sessionId, channel: "line" });
    const messages: LineMessage[] = [{ type: "text", text: answer }];
    if (sources.length > 0) messages.push(linksMessage(sources.slice(0, MAX_LINKS)));
    messages[messages.length - 1] = withQuickReply(messages[messages.length - 1]);
    await reply(event.replyToken, messages);
  } catch (error) {
    if (error instanceof Anthropic.APIError) console.error("kibanavi line API error", error.status, error.message);
    else console.error("kibanavi line answer failed", error);
    await reply(event.replyToken, [withQuickReply({ type: "text", text: TEXT.error })]);
  }
}

function hashUser(userId: string): string {
  return createHmac("sha256", process.env.LINE_OA_CHANNEL_SECRET ?? "").update(userId).digest("hex");
}

/** 受付状態を Supabase の関数 kibanavi_line_session で開始・確認（延長）・終了する。受付中なら会話IDが返る */
async function session(userHash: string, action: "start" | "touch" | "end"): Promise<string | null> {
  const url = process.env.CHATBOT_LOG_SUPABASE_URL;
  const key = process.env.CHATBOT_LOG_SUPABASE_KEY;
  if (!url || !key) return null;
  const res = await fetch(`${url}/rest/v1/rpc/kibanavi_line_session`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify({ p_user_hash: userHash, p_action: action }),
  });
  if (!res.ok) {
    console.error("kibanavi line session failed", res.status);
    return null;
  }
  return (await res.json()) as string | null;
}

/** HPへのリンク。LINE経由で読まれたことが分かるよう、アクセス解析用の印（utm）を付ける */
function siteUrl(path: string): string {
  const [pathname, hash] = path.split("#");
  const url = new URL(pathname, SITE_ORIGIN);
  url.searchParams.set("utm_source", "line");
  url.searchParams.set("utm_medium", "kibanavi");
  return hash ? `${url.toString()}#${hash}` : url.toString();
}

/** 回答の下に出す「詳しくはこちらのページで」のカード（ページ名を押すとHPが開く） */
function linksMessage(sources: Source[]): LineMessage {
  return {
    type: "flex",
    altText: `${TEXT.linksTitle}：${sources.map((s) => s.title).join("、")}`,
    contents: {
      type: "bubble",
      size: "kilo",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          { type: "text", text: TEXT.linksTitle, weight: "bold", size: "sm", color: "#1e8a4c" },
          ...sources.map((s) => ({
            type: "box",
            layout: "horizontal",
            backgroundColor: "#d9f2e1",
            cornerRadius: "md",
            paddingAll: "md",
            action: { type: "uri", label: s.title.slice(0, 40), uri: siteUrl(s.url) },
            contents: [
              { type: "text", text: s.title, size: "sm", wrap: true, flex: 1, color: "#14532d" },
              { type: "text", text: "→", size: "sm", flex: 0, color: "#1e8a4c" },
            ],
          })),
        ],
      },
    },
  };
}

/** メッセージの下に、ワンタップで送れるボタン（質問例・終了）を付ける */
function withQuickReply(message: LineMessage, examples: string[] = []): LineMessage {
  const items = [...examples, END_LABEL].map((label) => ({
    type: "action",
    action: { type: "message", label: label.slice(0, 20), text: label },
  }));
  return { ...message, quickReply: { items } };
}

async function reply(replyToken: string, messages: LineMessage[]) {
  const res = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.LINE_OA_CHANNEL_ACCESS_TOKEN}` },
    // 送り主の名前とアイコンを「キバナビ」にする（スタッフからの返信と見分けられるように）
    body: JSON.stringify({ replyToken, messages: messages.map((m) => ({ ...m, sender: SENDER })) }),
  });
  if (!res.ok) console.error("kibanavi line reply failed", res.status, await res.text());
}

/** 回答を作っている間、トーク画面に「入力中」の表示を出す */
async function showLoading(userId: string) {
  await fetch("https://api.line.me/v2/bot/chat/loading/start", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.LINE_OA_CHANNEL_ACCESS_TOKEN}` },
    body: JSON.stringify({ chatId: userId, loadingSeconds: 20 }),
  }).catch(() => {});
}
