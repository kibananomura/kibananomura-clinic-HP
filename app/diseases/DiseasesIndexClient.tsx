"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";
import {
  DISEASE_CATEGORY_LABEL,
  DISEASE_CATEGORY_ORDER,
  DISEASE_DISCLAIMER_INTRO,
  getDiseasesByCategory,
} from "../lib/diseases-data";

export default function DiseasesIndexClient() {
  const { t } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-accent/60 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow="疾患について" title="主な疾患から調べる" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            当院で診療している代表的な疾患について、病態・検査方法・治療法をご紹介します。
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-surface/90 p-4 text-center text-sm leading-relaxed text-ink/70 shadow-card">
            {DISEASE_DISCLAIMER_INTRO}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Link
            href="/diet-guidance"
            className="mx-auto mt-6 block max-w-2xl rounded-2xl bg-primary/10 p-5 text-center shadow-card transition-transform hover:-translate-y-0.5"
          >
            <p className="text-[15px] font-bold text-primary-dark">
              🍚 高血圧・糖尿病・脂質異常症・高尿酸血症の食事について
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
              複数の病気をお持ちの方でも実践しやすい、食事のポイントをまとめました →
            </p>
          </Link>
        </FadeIn>

        <div className="mx-auto mt-12 max-w-4xl space-y-10">
          {DISEASE_CATEGORY_ORDER.map((category) => {
            const items = getDiseasesByCategory(category);
            if (items.length === 0) return null;
            return (
              <FadeIn key={category}>
                <h2 className="text-lg font-bold text-primary-dark">
                  {DISEASE_CATEGORY_LABEL[category]}
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/diseases/${item.slug}`}
                      className="group block rounded-2xl bg-surface/90 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <p className="text-[15px] font-bold text-ink group-hover:text-primary-dark">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                        {item.summary}
                      </p>
                    </Link>
                  ))}
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
