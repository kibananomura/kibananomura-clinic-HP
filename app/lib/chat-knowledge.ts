/**
 * HP案内チャットボットの参照テキスト（RAG用）を、サイト内のデータから組み立てて検索する。
 * サーバー側（app/admin/chatbot/ask/route.ts）からのみ使うこと。
 * "use client" の site.tsx は読み込めないため、診療案内・料金・初診案内などの本文は
 * scripts/gen-chat-site-text.mjs がビルド前に chat-site-text.generated.ts へ書き出したものを使う。
 * 診療時間・所在地などの基本情報は下の BASIC_INFO にまとめている（HPの表記を変えたら、ここも合わせて直す）。
 */
import { BRAND } from "./brand";
import { SCHEDULE } from "./schedule";
import { LINE_URL } from "./site-config";
import { FAQ_ITEMS_JA } from "./faq-data";
import { DISEASES } from "./diseases-data";
import { SYMPTOMS } from "./symptoms-data";
import { SELFPAY_ITEMS } from "./selfpay-data";
import { equipment } from "./equipment";
import { posts } from "./blog";
import { SITE_TEXT_CHUNKS } from "./chat-site-text.generated";
import { CAREER_POSITIONS, COMMON_EMPLOYMENT_TERMS } from "./careers";

export type KnowledgeChunk = { title: string; url: string; text: string };

const MAX_CHUNK_CHARS = 900;

/** 本文中の簡易Markdown（**太字**・__下線__・[リンク](/path)）を素のテキストにする */
function plain(text: string): string {
  return text
    .replace(/\*\*|__/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s*/gm, "")
    .trim();
}

/** 長い本文を、段落の切れ目でおよそ MAX_CHUNK_CHARS ごとに分ける */
function split(title: string, url: string, body: string): KnowledgeChunk[] {
  const paragraphs = plain(body).split(/\n+/).filter(Boolean);
  const chunks: KnowledgeChunk[] = [];
  let current = "";
  for (const p of paragraphs) {
    if (current && current.length + p.length > MAX_CHUNK_CHARS) {
      chunks.push({ title, url, text: current });
      current = "";
    }
    current += (current ? "\n" : "") + p;
  }
  if (current) chunks.push({ title, url, text: current });
  return chunks;
}

const weekdays = ["月", "火", "水", "木", "金"];
const scheduleText = SCHEDULE.map((d, i) => {
  const am = d.am.open ? `午前${d.am.start}〜${d.am.end}` : "午前休診";
  const pm = d.pm.open ? `午後${d.pm.start}〜${d.pm.end}` : "午後休診";
  return `${weekdays[i]}曜：${am}／${pm}`;
}).join("、");

const BASIC_INFO: KnowledgeChunk = {
  title: "診療所の基本情報（所在地・診療時間・開院日・連絡先）",
  url: "/",
  text: [
    `名称：${BRAND.ja.primary}`,
    `英語名：${BRAND.en.primary}`,
    BRAND.ja.seoDescription,
    "所在地：〒889-2151 宮崎県宮崎市熊野5233-2（現在建設準備中）",
    "開院：2027年10月1日予定。現在は建設準備中のため、診療は行っていません。ご予約の受付は開院前に開始予定です。",
    `受付時間（開院後の予定）：${scheduleText}。土曜・日曜・祝日は休診。`,
    "電話番号：開院後に設定いたします。",
    `お問い合わせ：ホームページの「お問い合わせ」ページ（/contact）、またはLINE公式アカウント（${LINE_URL}）。`,
    "診療科：内科・外科・小児科を中心に対応予定。",
    // HPには載せていない、キバナビだけが答える情報（聞かれたときだけ答える）
    "お支払い方法：現金・クレジットカード（開院後）。QRコード決済（PayPay等）について聞かれた場合は「QRコード決済は対応の予定はありません」と答える。",
  ].join("\n"),
};

function buildChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [BASIC_INFO, ...SITE_TEXT_CHUNKS];

  // よくある質問は、該当する質問の位置へ直接案内する（id は faq-data.ts。予約・支払い・アクセス等は各ページの本文側）
  for (const item of FAQ_ITEMS_JA) {
    chunks.push({ title: `よくある質問：${item.q}`, url: `/faq#${item.id}`, text: plain(`Q. ${item.q}\nA. ${item.a}`) });
  }

  for (const d of DISEASES) {
    const body = [d.summary, d.pathology, `検査：${d.tests}`, `治療：${d.treatment}`, `一口メモ：${d.tip}`].join("\n");
    chunks.push(...split(`病気の解説：${d.title}`, `/diseases/${d.slug}`, body));
  }

  for (const s of SYMPTOMS) {
    const body = [
      s.summary,
      `考えられる原因：${s.possibleCauses.map((c) => `${c.name}（${c.note}）`).join("、")}`,
      `関連する検査：${s.relatedTests.join("、")}`,
      `受診の目安：${s.whenToVisit.join("、")}`,
    ].join("\n");
    chunks.push(...split(`症状の解説：${s.title}`, `/symptoms/${s.slug}`, body));
  }

  for (const item of SELFPAY_ITEMS) {
    const body = [
      item.summary,
      `特長：${item.highlights.join("、")}`,
      `こんな方に：${item.suitableFor.join("、")}`,
      `費用：${item.priceNote}`,
      `主なリスク・副作用：${item.cautions}`,
      `承認について：${item.approvalStatus}`,
      ...item.faq.map((f) => `Q. ${f.q}\nA. ${f.a}`),
    ].join("\n");
    chunks.push(...split(`自費診療：${item.title}`, `/self-pay/${item.slug}`, body));
  }

  for (const e of equipment) {
    chunks.push({ title: `設備：${e.ja.name}`, url: "/equipment", text: plain(e.ja.body) });
  }

  // 採用情報。給与額は未決定のため、採用ページの金額は「参考の幅」として渡し、正式な金額はハローワークの求人票を案内する
  const condition = (c: { label: string; value: string }) =>
    /給与|時給|月給/.test(c.label)
      ? `${c.label}：【準備中】給与額は未決定です。参考の幅は${c.value}。正式な金額はハローワークに掲載している求人票をご参照ください`
      : `${c.label}：${c.value}`;
  for (const pos of CAREER_POSITIONS) {
    if (pos.hidden) continue;
    const body = [
      `${pos.ja.title}（${pos.ja.badge}）`,
      pos.ja.summary,
      `仕事内容：${pos.ja.duties.join("、")}`,
      `応募条件：${pos.ja.requirements.join("、")}`,
      ...(pos.ja.conditions ?? []).map(condition),
      pos.ja.note ?? "",
    ].join("\n");
    chunks.push(...split(`採用情報：${pos.ja.title}`, "/careers", body));
  }
  chunks.push(
    ...split("採用情報：共通の雇用条件", "/careers", COMMON_EMPLOYMENT_TERMS.ja.items.map(condition).join("\n"))
  );

  for (const post of posts) {
    const body = post.ja.body
      .filter((b) => b.kind === "text")
      .map((b) => (b.kind === "text" ? b.text : ""))
      .join("\n");
    chunks.push(...split(`院長ブログ：${post.ja.title}`, `/blog/${post.slug}`, body));
  }

  return chunks;
}

const CHUNKS = buildChunks();

/** 日本語向けに、文字の2文字組（bigram）の重なりで関連度を測る簡易検索 */
function bigrams(text: string): Set<string> {
  const normalized = text.toLowerCase().replace(/\s+/g, "");
  const set = new Set<string>();
  for (let i = 0; i < normalized.length - 1; i++) set.add(normalized.slice(i, i + 2));
  return set;
}

const CHUNK_BIGRAMS = CHUNKS.map((c) => ({ title: bigrams(c.title), text: bigrams(c.text) }));

// 「ます」「は何」のようにどのページにも出てくる2文字組の重みを下げる（IDF）
const DOC_FREQ = new Map<string, number>();
for (const { text } of CHUNK_BIGRAMS) {
  for (const g of text) DOC_FREQ.set(g, (DOC_FREQ.get(g) ?? 0) + 1);
}
function idf(gram: string): number {
  return Math.log((CHUNKS.length + 1) / ((DOC_FREQ.get(gram) ?? 0) + 1));
}

/**
 * 質問に特定の言葉が入っていたら、必ず参照に含めるページ（2文字組の検索だけでは
 * 拾いきれない定番の質問への保険）。
 */
const TOPIC_RULES: { keywords: RegExp; titles: string[] }[] = [
  { keywords: /院長|先生|医師|ドクター|経歴|出身|学歴|専門医|資格/, titles: ["院長紹介"] },
  { keywords: /駐車|駐輪|自転車|バイク|アクセス|場所|住所|行き方|バス|駅|薬局|バリアフリー|車いす|車椅子/, titles: ["アクセス"] },
  {
    keywords: /初診|持ち物|保険証|マイナ|医療証|医療費助成|受診の流れ|予約|キャンセル|待ち時間|順番|支払|クレジット|カード|トイレ|おしっこ|英語|english/i,
    titles: ["初診の方へ"],
  },
  { keywords: /熱|発熱|インフル|コロナ|感染/, titles: ["発熱・感染症の症状がある方へ"] },
  { keywords: /自由診療|自費|保険外|保険がきかない|保険が効かない|self-pay/i, titles: ["診療案内（詳細）"] },
  { keywords: /健診|検診|健康診断|ドック/, titles: ["診療案内"] },
  { keywords: /料金|いくら|費用|値段|円|予防接種|ワクチン|診断書|血液型|粉瘤|脂肪腫/, titles: ["料金のご案内"] },
  { keywords: /薬だけ|お薬だけ|処方だけ|prescription/i, titles: ["よくある質問：お薬だけ出してもらえますか？"] },
  { keywords: /給与|給料|月給|時給|求人|採用|募集|働き|看護師|事務|パート|賞与|ボーナス|技師|栄養士/, titles: ["採用情報：共通の雇用条件"] },
  { keywords: /看護/, titles: ["採用情報：看護師"] },
  { keywords: /事務|受付/, titles: ["採用情報：事務"] },
  { keywords: /放射線/, titles: ["採用情報：診療放射線技師"] },
  { keywords: /臨床検査|検査技師/, titles: ["採用情報：臨床検査技師"] },
  { keywords: /栄養士/, titles: ["採用情報：管理栄養士"] },
];

// 症状・病気の解説ページは、ブログより少し優先して参照する（解説ページへ案内しやすくするため）
const HEALTH_PAGE_BOOST = 1.3;

export function searchKnowledge(query: string, limit = 5, maxChars = 5000): KnowledgeChunk[] {
  // 「頭が痛い」「お腹が痛い」→「頭痛」「腹痛」のように、話し言葉を症状名に寄せた語も足して検索する
  // 「自由診療」「保険外」のような言い方は、HPの表記（自費診療）に寄せた語も足す
  const expanded = `${query} ${query.replace(/(\S)が?痛(い|む|くて|み)/g, "$1痛")} ${/自由診療|保険外/.test(query) ? "自費診療" : ""}`;
  const q = bigrams(expanded);
  if (q.size === 0) return [BASIC_INFO];
  const scored = CHUNKS.map((chunk, i) => {
    let score = 0;
    for (const g of q) {
      const w = idf(g);
      if (CHUNK_BIGRAMS[i].text.has(g)) score += w;
      if (CHUNK_BIGRAMS[i].title.has(g)) score += 2 * w;
    }
    const boost = /^\/(symptoms|diseases)\//.test(chunk.url) ? HEALTH_PAGE_BOOST : 1;
    return { chunk, score: (boost * score) / Math.log(chunk.text.length + 50) };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // 基本情報は常に最初に入れる（開院前であること・連絡先を必ず参照できるように）
  const picked: KnowledgeChunk[] = [BASIC_INFO];
  let total = BASIC_INFO.text.length;
  for (const rule of TOPIC_RULES) {
    if (!rule.keywords.test(query)) continue;
    for (const chunk of CHUNKS) {
      if (total + chunk.text.length > maxChars) continue;
      if (rule.titles.includes(chunk.title) && !picked.includes(chunk)) {
        picked.push(chunk);
        total += chunk.text.length;
      }
    }
  }
  // 同じページの断片ばかりで枠が埋まらないよう、1ページから拾うのは2つまでにする
  // （症状・病気の解説やブログなど、複数のページへ案内できるように）
  const MAX_PER_URL = 2;
  for (const { chunk } of scored) {
    if (picked.includes(chunk)) continue;
    if (picked.length > limit) break;
    if (chunk === BASIC_INFO) continue;
    if (picked.filter((c) => c.url === chunk.url).length >= MAX_PER_URL) continue;
    if (total + chunk.text.length > maxChars) continue;
    picked.push(chunk);
    total += chunk.text.length;
  }
  return picked;
}
