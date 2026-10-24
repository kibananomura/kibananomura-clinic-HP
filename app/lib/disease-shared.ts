/**
 * 疾患ページの型定義・小さな定数・ヘルパー関数だけを集めたファイル。
 *
 * app/lib/diseases-data.ts は全疾患の本文（病態・検査・治療等のテキスト）を
 * 含み非常に大きいため、クライアントコンポーネント（DiseasePageClient等）が
 * そこから何か1つでもimportすると、バンドラーが全文テキストを含むDISEASES
 * 配列ごとクライアントバンドルに含めてしまう（tree-shakingされない）。
 * そのため、クライアント側で必要な「型・小さな定数・ヘルパー関数」だけを
 * このファイルに分離し、DISEASES本体とは別モジュールにしている。
 * クライアントコンポーネントは diseases-data.ts ではなく、このファイルから
 * import すること。
 */

export type DiseaseCategory = "internal" | "surgical";

export const DISEASE_CATEGORY_LABEL: Record<DiseaseCategory, string> = {
  internal: "内科系",
  surgical: "外科系",
};

export const DISEASE_CATEGORY_LABEL_EN: Record<DiseaseCategory, string> = {
  internal: "Internal medicine",
  surgical: "Surgery",
};

export type DiseaseSource = {
  label: string;
  url?: string;
};

export type DiseaseSubsection = {
  title: string;
  pathology: string;
  tests: string;
  treatment: string;
  tip: string;
};

/** 英語版コンテンツ。未設定の項目は日本語版の値にフォールバックする（getDiseaseContentを参照）。 */
export type DiseaseTranslation = {
  title?: string;
  summary?: string;
  pathology?: string;
  tests?: string;
  treatment?: string;
  tip?: string;
  subsections?: DiseaseSubsection[];
};

export type DiseaseEntry = {
  slug: string;
  title: string;
  category: DiseaseCategory;
  summary: string;
  pathology: string;
  tests: string;
  treatment: string;
  tip: string;
  /** 甲状腺疾患のように、1ページ内に代表的な下位疾患を併記する場合 */
  subsections?: DiseaseSubsection[];
  /** 自費診療の項目を含む疾患で、料金ページへの誘導文言を表示したい場合に設定 */
  pricingLinkNote?: string;
  /** 参考にした学会ガイドライン等の出典。確認できたものだけ記載する */
  sources?: DiseaseSource[];
  lastReviewed: string;
  /** 英語版。未翻訳の疾患はundefinedのままでよく、ページ側は日本語にフォールバックする */
  en?: DiseaseTranslation;
};

/** lang="en"かつ英語版フィールドがあればそれを、なければ日本語版の値を返す */
export function getDiseaseContent(disease: DiseaseEntry, lang: "ja" | "en") {
  const en = disease.en;
  return {
    title: (lang === "en" && en?.title) || disease.title,
    summary: (lang === "en" && en?.summary) || disease.summary,
    pathology: (lang === "en" && en?.pathology) || disease.pathology,
    tests: (lang === "en" && en?.tests) || disease.tests,
    treatment: (lang === "en" && en?.treatment) || disease.treatment,
    tip: (lang === "en" && en?.tip) || disease.tip,
    subsections: (lang === "en" && en?.subsections) || disease.subsections,
  };
}

export const DISEASE_DISCLAIMER_INTRO = {
  ja: "このページでご紹介している疾患は、基本的にすべて当院で診療いたします。病状によって、特に高度な専門治療が必要と判断した場合に限り、連携する医療機関へご紹介することがあります。なお本ページは一般的な医学情報の提供を目的としており、診断を行うものではありません。実際の診断・治療には受診が必要です。",
  en: "In general, we treat every condition introduced on this page ourselves. Only when a condition calls for especially advanced specialist care do we refer patients to a partner institution. This page is intended to provide general medical information and does not constitute a diagnosis. An actual diagnosis and treatment require an in-person visit.",
};

export const DISEASE_DISCLAIMER_OUTRO = {
  ja: "※ 本ページの内容は一般的な医学情報の紹介であり、個々の患者さんの診断・治療方針を示すものではありません。実際の診断・治療方針は、受診のうえ医師が症状・経過・検査結果を踏まえて判断します。治療の効果や必要な薬剤・処置には個人差があります。",
  en: "* The content on this page is general medical information and does not represent a diagnosis or treatment plan for any individual patient. An actual diagnosis and treatment plan are determined by a physician after an in-person visit, based on your symptoms, history, and test results. Treatment effects and the medications or procedures needed vary from person to person.",
};
