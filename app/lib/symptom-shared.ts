/**
 * 症状ページの型定義・小さな定数・ヘルパー関数だけを集めたファイル。
 *
 * app/lib/symptoms-data.ts は全症状の本文（原因・検査・治療等のテキスト）を
 * 含み非常に大きいため、クライアントコンポーネント（SymptomPageClient等）が
 * そこから何か1つでもimportすると、バンドラーが全文テキストを含むSYMPTOMS
 * 配列ごとクライアントバンドルに含めてしまう（tree-shakingされない）。
 * そのため、クライアント側で必要な「型・小さな定数・ヘルパー関数」だけを
 * このファイルに分離し、SYMPTOMS本体とは別モジュールにしている。
 * クライアントコンポーネントは symptoms-data.ts ではなく、このファイルから
 * import すること。
 */

export type SymptomCategory = "internal" | "surgical" | "pediatric" | "selfpay";

export const CATEGORY_LABEL: Record<SymptomCategory, string> = {
  internal: "内科系",
  surgical: "外科系",
  pediatric: "小児科系",
  selfpay: "自費診療系",
};

export const CATEGORY_LABEL_EN: Record<SymptomCategory, string> = {
  internal: "Internal medicine",
  surgical: "Surgery",
  pediatric: "Pediatrics",
  selfpay: "Self-pay care",
};

export type EmergencyBox = {
  /** 見出し（例: 次のような場合は要注意） */
  heading: string;
  points: string[];
  /** 取るべき行動（例: 様子を見ず救急要請・救急外来受診） */
  action: string;
  /** 胸痛・動悸・息切れ、小児の発熱など、特に強い警告表示にするページ */
  strong?: boolean;
};

export type SymptomSelfPay = {
  /** 自由診療である旨・標準治療でないことの明記 */
  isSelfPayNote: string;
  priceItems: { name: string; price: string }[];
  risks: string;
  /** 問い合わせ先 */
  contactNote: string;
};

/** 英語版コンテンツ。未設定の項目は日本語版の値にフォールバックする（getSymptomContentを参照）。 */
export type SymptomTranslation = {
  title?: string;
  summary?: string;
  emergencyBox?: EmergencyBox;
  possibleCauses?: { name: string; note: string }[];
  relatedTests?: string[];
  treatmentOverview?: string[];
  whenToVisit?: string[];
  selfPay?: SymptomSelfPay;
};

export type SymptomEntry = {
  slug: string;
  title: string;
  category: SymptomCategory;
  /** 一覧ページ用の短い説明 */
  summary: string;
  emergencyBox?: EmergencyBox;
  possibleCauses: { name: string; note: string }[];
  relatedTests: string[];
  treatmentOverview: string[];
  whenToVisit: string[];
  /** MedicalWebPageJsonLd の lastReviewed に渡す実際のレビュー実施日（YYYY-MM-DD） */
  lastReviewed: string;
  /** 胸痛・冷や汗を伴う場合の救急要請バナーを個別ページ上部にも表示するか */
  showChestPainBanner?: boolean;
  /** 自費診療ページのみ */
  selfPay?: SymptomSelfPay;
  /** 英語版。未翻訳の症状はundefinedのままでよく、ページ側は日本語にフォールバックする */
  en?: SymptomTranslation;
};

/** lang="en"かつ英語版フィールドがあればそれを、なければ日本語版の値を返す */
export function getSymptomContent(symptom: SymptomEntry, lang: "ja" | "en") {
  const en = symptom.en;
  return {
    title: (lang === "en" && en?.title) || symptom.title,
    summary: (lang === "en" && en?.summary) || symptom.summary,
    emergencyBox: (lang === "en" && en?.emergencyBox) || symptom.emergencyBox,
    possibleCauses: (lang === "en" && en?.possibleCauses) || symptom.possibleCauses,
    relatedTests: (lang === "en" && en?.relatedTests) || symptom.relatedTests,
    treatmentOverview: (lang === "en" && en?.treatmentOverview) || symptom.treatmentOverview,
    whenToVisit: (lang === "en" && en?.whenToVisit) || symptom.whenToVisit,
    selfPay: (lang === "en" && en?.selfPay) || symptom.selfPay,
  };
}

/** 免責文言（共通・ページ冒頭と末尾の2箇所で使用） */
export const SYMPTOM_DISCLAIMER_INTRO = {
  ja: "このページは一般的な医学情報の提供を目的としており、診断を行うものではありません。実際の診断・治療には受診が必要です。症状が強い場合や不安な場合は、様子を見ずに受診してください。",
  en: "This page is intended to provide general medical information and does not constitute a diagnosis. An actual diagnosis and treatment require an in-person visit. If your symptoms are severe or you feel anxious, please don't wait — come see us.",
};

/** 免責文言（短縮版・症状ページ冒頭専用。詳細版は末尾の SYMPTOM_DISCLAIMER_OUTRO を参照） */
export const SYMPTOM_DISCLAIMER_INTRO_SHORT = {
  ja: "このページは一般的な医学情報の提供を目的としています。",
  en: "This page is intended to provide general medical information.",
};

export const SYMPTOM_DISCLAIMER_OUTRO = {
  ja: "※ 本ページの内容は一般的な医学情報の紹介であり、個々の患者さんの診断・治療方針を示すものではありません。実際の診断・治療方針は、受診のうえ医師が症状・経過・検査結果を踏まえて判断します。症状が強い場合、急に悪化した場合、不安が続く場合は、様子を見ずに受診・ご相談ください。",
  en: "* The content on this page is general medical information and does not represent a diagnosis or treatment plan for any individual patient. An actual diagnosis and treatment plan are determined by a physician after an in-person visit, based on your symptoms, history, and test results. If your symptoms are severe, suddenly worsen, or your anxiety persists, please don't wait — come see us.",
};

/** 胸痛・動悸に関する共通の救急要請バナー（症状一覧ページ・胸やけ/動悸ページで共通利用） */
export const CHEST_PAIN_EMERGENCY_BANNER = {
  ja: "胸の痛み・締め付け感・冷や汗を伴う場合は、今すぐ救急要請（119番）してください。",
  en: "If you have chest pain, tightness, or cold sweats, call emergency services (119) right away.",
};
