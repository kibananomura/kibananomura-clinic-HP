"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import FadeIn from "../../components/FadeIn";
import { SoftBlob } from "../../components/Decor";
import MedicalWebPageJsonLd from "../../components/MedicalWebPageJsonLd";
import { useSite } from "../../lib/site";
import {
  CATEGORY_LABEL,
  CHEST_PAIN_EMERGENCY_BANNER,
  SYMPTOM_DISCLAIMER_INTRO_SHORT,
  SYMPTOM_DISCLAIMER_OUTRO,
  getSymptom,
} from "../../lib/symptoms-data";

export default function SymptomPageClient() {
  const { t } = useSite();
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const symptom = getSymptom(slug);

  if (!symptom) {
    notFound();
  }

  const isStrongEmergency = symptom.emergencyBox?.strong;

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />

      <MedicalWebPageJsonLd
        name={symptom.title}
        description={symptom.summary}
        url={`/symptoms/${symptom.slug}`}
        lastReviewed={symptom.lastReviewed}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          {/* 胸痛・冷や汗を伴う場合の救急要請バナー（常時表示） */}
          {symptom.showChestPainBanner && (
            <FadeIn>
              <div className="mb-6 rounded-2xl border-2 border-red-400 bg-red-50 p-5 text-sm font-bold leading-relaxed text-red-900 shadow-card">
                ⚠ {CHEST_PAIN_EMERGENCY_BANNER}
              </div>
            </FadeIn>
          )}

          {/* 緊急性のあるカテゴリはページ最上部にも重ねて配置 */}
          {isStrongEmergency && (
            <FadeIn>
              <div className="mb-6 rounded-2xl border-2 border-red-400 bg-red-50 p-5 text-sm leading-relaxed text-red-900 shadow-card">
                <p className="font-bold">{SYMPTOM_DISCLAIMER_INTRO_SHORT}</p>
              </div>
            </FadeIn>
          )}

          <FadeIn>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
              {CATEGORY_LABEL[symptom.category]}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
              {symptom.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
              {symptom.summary}
            </p>
          </FadeIn>

          {/* 免責文言：本文直下（冒頭） */}
          <FadeIn delay={0.03}>
            <p className="mt-6 rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {SYMPTOM_DISCLAIMER_INTRO_SHORT}
            </p>
          </FadeIn>

          {/* 緊急性の注意喚起ボックス */}
          {symptom.emergencyBox && (
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
                  ⚠ {symptom.emergencyBox.heading}
                </h2>
                <ul
                  className={`mt-3 space-y-1.5 text-[15px] leading-relaxed ${
                    isStrongEmergency ? "text-red-900/90" : "text-amber-900/90"
                  }`}
                >
                  {symptom.emergencyBox.points.map((p) => (
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
                  {symptom.emergencyBox.action}
                </p>
              </div>
            </FadeIn>
          )}

          {/* 考えられる主な原因 */}
          <FadeIn delay={0.08} className="mt-10">
            <h2 className="text-lg font-bold text-primary-dark">
              考えられる主な原因
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              症状から特定の疾患を断定するものではありません。複数の可能性を示しています。
            </p>
            <ul className="mt-4 space-y-3">
              {symptom.possibleCauses.map((c) => (
                <li
                  key={c.name}
                  className="rounded-2xl bg-surface/90 p-4 shadow-card"
                >
                  <p className="text-[15px] font-bold text-ink">{c.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {c.note}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* 行う可能性のある検査 */}
          {symptom.relatedTests.length > 0 && (
            <FadeIn delay={0.1} className="mt-10">
              <h2 className="text-lg font-bold text-primary-dark">
                行う可能性のある検査
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {symptom.relatedTests.map((test) => (
                  <li
                    key={test}
                    className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-primary-dark"
                  >
                    {test}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                これらの中から症状に応じて医師が判断します。
              </p>
            </FadeIn>
          )}

          {/* 一般的な治療の考え方 */}
          <FadeIn delay={0.12} className="mt-10">
            <h2 className="text-lg font-bold text-primary-dark">
              一般的な治療の考え方
            </h2>
            <ul className="mt-4 space-y-2.5">
              {symptom.treatmentOverview.map((line) => (
                <li key={line} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* 自費診療：料金・リスク・問い合わせ先 */}
          {symptom.selfPay && (
            <FadeIn delay={0.14} className="mt-10">
              <div className="rounded-2xl border border-primary/15 bg-accent/40 p-6">
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-white">
                  自費診療（自由診療）
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  {symptom.selfPay.isSelfPayNote}
                </p>
                <h3 className="mt-4 text-sm font-bold text-primary-dark">料金</h3>
                <ul className="mt-2 space-y-1.5">
                  {symptom.selfPay.priceItems.map((p) => (
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
                  治療内容・主なリスク・副作用
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">
                  {symptom.selfPay.risks}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {symptom.selfPay.contactNote}
                </p>
                <Link
                  href="/pricing"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  料金のご案内ページで確認する →
                </Link>
              </div>
            </FadeIn>
          )}

          {/* 受診の目安 */}
          <FadeIn delay={0.16} className="mt-10">
            <h2 className="text-lg font-bold text-primary-dark">受診の目安</h2>
            <ul className="mt-4 space-y-2.5">
              {symptom.whenToVisit.map((line) => (
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
              {SYMPTOM_DISCLAIMER_OUTRO}
            </p>
          </FadeIn>

          {/* 受診予約への導線 */}
          <FadeIn delay={0.2} className="mt-8 text-center">
            <a
              href="https://line.me/R/ti/p/@337njouw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              {t.register.button}
              <span aria-hidden="true">→</span>
            </a>
          </FadeIn>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/symptoms"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              症状一覧へ戻る
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
