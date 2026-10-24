"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";
import {
  DISEASE_CATEGORY_LABEL,
  DISEASE_CATEGORY_LABEL_EN,
  DISEASE_CATEGORY_ORDER,
  DISEASE_DISCLAIMER_INTRO,
  INTERNAL_SUBCATEGORIES,
  getDiseasesByCategory,
  getDisease,
  getDiseaseContent,
} from "../lib/diseases-data";

const UI_TEXT = {
  ja: {
    eyebrow: "疾患について",
    heading: "主な疾患から調べる",
    intro: "当院で診療している代表的な疾患について、病態・検査方法・治療法をご紹介します。",
    dietCardTitle: "🍚 高血圧・糖尿病・脂質異常症・高尿酸血症の食事について",
    dietCardBody: "複数の病気をお持ちの方でも実践しやすい、食事のポイントをまとめました →",
    schoolCardTitle: "🏫 学校感染症と出席停止期間の基準",
    schoolCardBody: "インフルエンザ・溶連菌感染症・手足口病等の登校の目安を一覧表でご紹介 →",
  },
  en: {
    eyebrow: "Conditions we treat",
    heading: "Browse by condition",
    intro: "Here's an overview of what's happening, how we test, and how we treat the conditions we commonly see.",
    dietCardTitle: "🍚 Eating well with high blood pressure, diabetes, dyslipidemia, or gout",
    dietCardBody: "Practical diet tips that work even if you're managing more than one condition at once →",
    schoolCardTitle: "🏫 School infections and exclusion periods",
    schoolCardBody: "A table of guidelines for when kids can return to school after flu, strep, hand-foot-mouth disease, and more →",
  },
};

export default function DiseasesIndexClient() {
  const { t, lang } = useSite();
  const ui = UI_TEXT[lang];

  return (
    <section className="section-pad relative overflow-hidden bg-accent/60 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={ui.eyebrow} title={ui.heading} as="h1" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            {ui.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-surface/90 p-4 text-center text-sm leading-relaxed text-ink/70 shadow-card">
            {DISEASE_DISCLAIMER_INTRO[lang]}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
            <Link
              href="/diet-guidance"
              className="block rounded-2xl bg-primary/10 p-5 text-center shadow-card transition-transform hover:-translate-y-0.5"
            >
              <p className="text-[15px] font-bold text-primary-dark">
                {ui.dietCardTitle}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                {ui.dietCardBody}
              </p>
            </Link>
            <Link
              href="/school-attendance"
              className="block rounded-2xl bg-primary/10 p-5 text-center shadow-card transition-transform hover:-translate-y-0.5"
            >
              <p className="text-[15px] font-bold text-primary-dark">
                {ui.schoolCardTitle}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                {ui.schoolCardBody}
              </p>
            </Link>
          </div>
        </FadeIn>

        <div className="mx-auto mt-12 max-w-4xl space-y-10">
          {DISEASE_CATEGORY_ORDER.map((category) => {
            const items = getDiseasesByCategory(category);
            if (items.length === 0) return null;
            const categoryLabel = lang === "en" ? DISEASE_CATEGORY_LABEL_EN[category] : DISEASE_CATEGORY_LABEL[category];

            if (category === "internal") {
              return (
                <FadeIn key={category}>
                  <h2 className="text-lg font-bold text-primary-dark">
                    {categoryLabel}
                  </h2>
                  <div className="mt-6 space-y-8">
                    {INTERNAL_SUBCATEGORIES.map((sub) => {
                      const subItems = sub.slugs
                        .map((slug) => getDisease(slug))
                        .filter((d): d is NonNullable<typeof d> => Boolean(d));
                      if (subItems.length === 0) return null;
                      return (
                        <div key={sub.label}>
                          <h3 className="text-sm font-bold text-ink/60">
                            {lang === "en" ? sub.labelEn : sub.label}
                          </h3>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {subItems.map((item) => {
                              const c = getDiseaseContent(item, lang);
                              return (
                                <Link
                                  key={item.slug}
                                  href={`/diseases/${item.slug}`}
                                  className="group block rounded-2xl bg-surface/90 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
                                >
                                  <p className="text-[15px] font-bold text-ink group-hover:text-primary-dark">
                                    {c.title}
                                  </p>
                                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                                    {c.summary}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </FadeIn>
              );
            }

            return (
              <FadeIn key={category}>
                <h2 className="text-lg font-bold text-primary-dark">
                  {categoryLabel}
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {items.map((item) => {
                    const c = getDiseaseContent(item, lang);
                    return (
                      <Link
                        key={item.slug}
                        href={`/diseases/${item.slug}`}
                        className="group block rounded-2xl bg-surface/90 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
                      >
                        <p className="text-[15px] font-bold text-ink group-hover:text-primary-dark">
                          {c.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                          {c.summary}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
          >
            <span aria-hidden="true">←</span>
            {t.common.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
