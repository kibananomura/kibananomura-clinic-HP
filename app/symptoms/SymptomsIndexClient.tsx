"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  CHEST_PAIN_EMERGENCY_BANNER,
  SYMPTOM_DISCLAIMER_INTRO,
  getSymptomsByCategory,
} from "../lib/symptoms-data";

export default function SymptomsIndexClient() {
  const { t } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-accent/60 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <div className="mx-auto mb-8 max-w-2xl rounded-2xl border-2 border-red-400 bg-red-50 p-5 text-center text-sm font-bold leading-relaxed text-red-900 shadow-card">
            ⚠ {CHEST_PAIN_EMERGENCY_BANNER}
          </div>
        </FadeIn>

        <FadeIn>
          <SectionHeading eyebrow="症状から探す" title="症状別に調べる" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            気になる症状から、考えられる主な原因・当院で行う可能性のある検査・一般的な治療の考え方をご紹介します。
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-surface/90 p-4 text-center text-sm leading-relaxed text-ink/70 shadow-card">
            {SYMPTOM_DISCLAIMER_INTRO}
          </p>
        </FadeIn>

        <div className="mx-auto mt-12 max-w-4xl space-y-10">
          {CATEGORY_ORDER.map((category) => {
            const items = getSymptomsByCategory(category);
            if (items.length === 0) return null;
            return (
              <FadeIn key={category}>
                <h2 className="text-lg font-bold text-primary-dark">
                  {CATEGORY_LABEL[category]}
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/symptoms/${item.slug}`}
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
