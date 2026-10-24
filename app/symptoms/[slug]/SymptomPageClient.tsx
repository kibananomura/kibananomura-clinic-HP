"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import FadeIn from "../../components/FadeIn";
import { SoftBlob } from "../../components/Decor";
import MedicalWebPageJsonLd from "../../components/MedicalWebPageJsonLd";
import ArticleSupervisor from "../../components/ArticleSupervisor";
import PreOpeningAlert from "../../components/PreOpeningAlert";
import LineLink from "../../components/LineLink";
import { useSite } from "../../lib/site";
import {
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  CHEST_PAIN_EMERGENCY_BANNER,
  SYMPTOM_DISCLAIMER_INTRO_SHORT,
  SYMPTOM_DISCLAIMER_OUTRO,
  getSymptom,
  getSymptomContent,
} from "../../lib/symptoms-data";
import { DISEASE_LINK_LABELS, DISEASE_LINK_LABELS_EN } from "../../lib/diseases-data";

const UI_TEXT = {
  ja: {
    possibleCauses: "考えられる主な原因",
    possibleCausesNote: "症状から特定の疾患を断定するものではありません。複数の可能性を示しています。",
    relatedTests: "行う可能性のある検査",
    relatedTestsNote: "これらの中から症状に応じて医師が判断します。",
    treatmentOverview: "一般的な治療の考え方",
    selfPayBadge: "自費診療（自由診療）",
    selfPayPricing: "料金",
    selfPayRisks: "治療内容・主なリスク・副作用",
    selfPayPricingLink: "料金のご案内ページで確認する →",
    whenToVisit: "受診の目安",
    backToList: "症状一覧へ戻る",
  },
  en: {
    possibleCauses: "Possible causes",
    possibleCausesNote: "This doesn't diagnose a specific condition from your symptom alone — it shows several possibilities.",
    relatedTests: "Tests we may run",
    relatedTestsNote: "Your doctor will decide which of these are needed based on your symptoms.",
    treatmentOverview: "General approach to treatment",
    selfPayBadge: "Self-pay (not covered by insurance)",
    selfPayPricing: "Pricing",
    selfPayRisks: "What's involved, and the main risks/side effects",
    selfPayPricingLink: "Check our pricing page →",
    whenToVisit: "When to come in",
    backToList: "Back to all symptoms",
  },
};

// 長いラベルから先に判定することで、「糖尿病」より「糖尿病性神経障害」のような
// より具体的なラベルを優先して一致させる。
const SORTED_DISEASE_LINK_LABELS = [...DISEASE_LINK_LABELS].sort(
  (a, b) => b.label.length - a.label.length,
);
const SORTED_DISEASE_LINK_LABELS_EN = [...DISEASE_LINK_LABELS_EN].sort(
  (a, b) => b.label.length - a.label.length,
);

/**
 * 原因名の文字列内に疾患ページ・自費診療ページの名称が含まれていれば、
 * その部分だけをリンクにする（例:「副鼻腔炎への移行」→「副鼻腔炎」のみリンク）。
 * 一致するラベルがなければ、元の文字列をそのまま返す。
 */
function renderCauseName(name: string, lang: "ja" | "en") {
  const labels = lang === "en" ? SORTED_DISEASE_LINK_LABELS_EN : SORTED_DISEASE_LINK_LABELS;
  // 英語版は翻訳元ごとに大文字小文字の揺れがあるため、検索は大文字小文字を無視し、
  // 実際に表示する文字列は name 側の元の表記（マッチした範囲）をそのまま使う。
  const nameLower = lang === "en" ? name.toLowerCase() : name;
  for (const entry of labels) {
    if (!entry.label) continue;
    const entryKey = lang === "en" ? entry.label.toLowerCase() : entry.label;
    const idx = nameLower.indexOf(entryKey);
    if (idx === -1) continue;
    const before = name.slice(0, idx);
    const matched = name.slice(idx, idx + entry.label.length);
    const after = name.slice(idx + entry.label.length);
    return (
      <>
        {before}
        <Link
          href={entry.href ?? `/diseases/${entry.slug}`}
          className="text-primary-dark underline decoration-primary/40 underline-offset-2 hover:text-primary"
        >
          {matched}
        </Link>
        {after}
      </>
    );
  }
  return name;
}

export default function SymptomPageClient() {
  const { t, lang } = useSite();
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const symptom = getSymptom(slug);

  if (!symptom) {
    notFound();
  }

  const c = getSymptomContent(symptom, lang);
  const ui = UI_TEXT[lang];
  const isStrongEmergency = c.emergencyBox?.strong;

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />

      <MedicalWebPageJsonLd
        name={c.title}
        description={c.summary}
        url={`/symptoms/${symptom.slug}`}
        lastReviewed={symptom.lastReviewed}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          {/* 胸痛・冷や汗を伴う場合の救急要請バナー（常時表示） */}
          {symptom.showChestPainBanner && (
            <FadeIn>
              <div className="mb-6 rounded-2xl border-2 border-red-400 bg-red-50 p-5 text-sm font-bold leading-relaxed text-red-900 shadow-card">
                ⚠ {CHEST_PAIN_EMERGENCY_BANNER[lang]}
              </div>
            </FadeIn>
          )}

          {/* 緊急性のあるカテゴリはページ最上部にも重ねて配置 */}
          {isStrongEmergency && (
            <FadeIn>
              <div className="mb-6 rounded-2xl border-2 border-red-400 bg-red-50 p-5 text-sm leading-relaxed text-red-900 shadow-card">
                <p className="font-bold">{SYMPTOM_DISCLAIMER_INTRO_SHORT[lang]}</p>
              </div>
            </FadeIn>
          )}

          <FadeIn>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
              {lang === "en" ? CATEGORY_LABEL_EN[symptom.category] : CATEGORY_LABEL[symptom.category]}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
              {c.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
              {c.summary}
            </p>
          </FadeIn>

          {/* 免責文言：本文直下（冒頭） */}
          <FadeIn delay={0.03}>
            <p className="mt-6 rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {SYMPTOM_DISCLAIMER_INTRO_SHORT[lang]}
            </p>
          </FadeIn>

          {/* 緊急性の注意喚起ボックス */}
          {c.emergencyBox && (
            <FadeIn delay={0.05}>
              <div
                className={`mt-6 rounded-2xl border-2 p-5 shadow-card ${
                  isStrongEmergency
                    ? "border-red-400 bg-red-50"
                    : "border-amber-300 bg-amber-50"
                }`}
              >
                <h2
                  className={`text-base font-bold ${
                    isStrongEmergency ? "text-red-900" : "text-amber-900"
                  }`}
                >
                  ⚠ {c.emergencyBox.heading}
                </h2>
                <ul
                  className={`mt-3 space-y-1.5 text-[15px] leading-relaxed ${
                    isStrongEmergency ? "text-red-900/90" : "text-amber-900/90"
                  }`}
                >
                  {c.emergencyBox.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden="true">・</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className={`mt-3 text-[15px] font-bold ${
                    isStrongEmergency ? "text-red-900" : "text-amber-900"
                  }`}
                >
                  {c.emergencyBox.action}
                </p>
              </div>
            </FadeIn>
          )}

          {/* 考えられる主な原因 */}
          <FadeIn delay={0.08} className="mt-10">
            <h2 className="text-lg font-bold text-primary-dark">
              {ui.possibleCauses}
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              {ui.possibleCausesNote}
            </p>
            <ul className="mt-4 space-y-3">
              {c.possibleCauses.map((cause) => (
                <li
                  key={cause.name}
                  className="rounded-2xl bg-surface/90 p-4 shadow-card"
                >
                  <p className="text-[15px] font-bold text-ink">
                    {renderCauseName(cause.name, lang)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {cause.note}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* 行う可能性のある検査 */}
          {c.relatedTests.length > 0 && (
            <FadeIn delay={0.1} className="mt-10">
              <h2 className="text-lg font-bold text-primary-dark">
                {ui.relatedTests}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.relatedTests.map((test) => (
                  <li
                    key={test}
                    className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-primary-dark"
                  >
                    {test}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {ui.relatedTestsNote}
              </p>
            </FadeIn>
          )}

          {/* 一般的な治療の考え方 */}
          <FadeIn delay={0.12} className="mt-10">
            <h2 className="text-lg font-bold text-primary-dark">
              {ui.treatmentOverview}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {c.treatmentOverview.map((line) => (
                <li key={line} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* 自費診療：料金・リスク・問い合わせ先 */}
          {c.selfPay && (
            <FadeIn delay={0.14} className="mt-10">
              <div className="rounded-2xl border border-primary/15 bg-accent/40 p-6">
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-white">
                  {ui.selfPayBadge}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  {c.selfPay.isSelfPayNote}
                </p>
                <h3 className="mt-4 text-sm font-bold text-primary-dark">{ui.selfPayPricing}</h3>
                <ul className="mt-2 space-y-1.5">
                  {c.selfPay.priceItems.map((p) => (
                    <li
                      key={p.name}
                      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl bg-surface/80 px-4 py-2.5 text-sm"
                    >
                      <span className="text-ink/85">{p.name}</span>
                      <span className="font-bold text-primary-dark">{p.price}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-4 text-sm font-bold text-primary-dark">
                  {ui.selfPayRisks}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">
                  {c.selfPay.risks}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {c.selfPay.contactNote}
                </p>
                <Link
                  href="/pricing"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  {ui.selfPayPricingLink}
                </Link>
              </div>
            </FadeIn>
          )}

          {/* 受診の目安 */}
          <FadeIn delay={0.16} className="mt-10">
            <h2 className="text-lg font-bold text-primary-dark">{ui.whenToVisit}</h2>
            <ul className="mt-4 space-y-2.5">
              {c.whenToVisit.map((line) => (
                <li key={line} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* 免責文言：末尾 */}
          <FadeIn delay={0.18} className="mt-10">
            <p className="rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {SYMPTOM_DISCLAIMER_OUTRO[lang]}
            </p>
          </FadeIn>

          {/* 開院前アラート */}
          <FadeIn delay={0.19}>
            <PreOpeningAlert />
          </FadeIn>

          {/* 執筆・監修ボックス */}
          <FadeIn delay={0.2}>
            <ArticleSupervisor />
          </FadeIn>

          {/* 受診予約への導線 */}
          <FadeIn delay={0.2} className="mt-8 text-center">
            <LineLink className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark">
              {t.register.button}
              <span aria-hidden="true">→</span>
            </LineLink>
          </FadeIn>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/symptoms"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              {ui.backToList}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              {t.common.backHome}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
