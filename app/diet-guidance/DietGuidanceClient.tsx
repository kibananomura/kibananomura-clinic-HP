"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import InlineRichText from "../components/InlineRichText";
import MedicalWebPageJsonLd from "../components/MedicalWebPageJsonLd";
import { useSite } from "../lib/site";
import {
  DIET_GUIDANCE_INTRO,
  DIET_GUIDANCE_COMMON,
  DIET_GUIDANCE_BY_DISEASE,
  DIET_GUIDANCE_PRIORITY,
  DIET_GUIDANCE_FOOD_LIST,
  DIET_GUIDANCE_CAUTION,
  DIET_GUIDANCE_DISCLAIMER,
  DIET_GUIDANCE_LAST_REVIEWED,
  type DietGuidanceSection,
} from "../lib/diet-guidance-data";

function Section({ heading, body }: DietGuidanceSection) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-primary-dark">{heading}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
        <InlineRichText text={body} />
      </p>
    </div>
  );
}

export default function DietGuidanceClient() {
  const { t } = useSite();

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <MedicalWebPageJsonLd
        name="高血圧・糖尿病・脂質異常症・高尿酸血症の食事"
        description="複数の生活習慣病をお持ちの方のための、重複なく実践しやすい食事指導のポイント。"
        url="/diet-guidance"
        lastReviewed={DIET_GUIDANCE_LAST_REVIEWED}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <SectionHeading
              eyebrow="食事指導"
              title="高血圧・糖尿病・脂質異常症・高尿酸血症の食事"
            />
          </FadeIn>

          <FadeIn delay={0.03}>
            <p className="mt-6 rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              <InlineRichText text={DIET_GUIDANCE_INTRO} />
            </p>
          </FadeIn>

          <FadeIn delay={0.06} className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
            <Section heading={DIET_GUIDANCE_COMMON.heading} body={DIET_GUIDANCE_COMMON.body} />
          </FadeIn>

          <div className="mt-8 space-y-6">
            {DIET_GUIDANCE_BY_DISEASE.map((section) => (
              <FadeIn
                key={section.heading}
                className="rounded-[1.75rem] border border-primary/15 bg-surface/80 p-7 shadow-card"
              >
                <Section heading={section.heading} body={section.body} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.06} className="mt-8 rounded-[1.75rem] bg-accent/50 p-7">
            <Section heading={DIET_GUIDANCE_PRIORITY.heading} body={DIET_GUIDANCE_PRIORITY.body} />
          </FadeIn>

          <FadeIn delay={0.06} className="mt-8 rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
            <h2 className="text-lg font-bold text-primary-dark">{DIET_GUIDANCE_FOOD_LIST.heading}</h2>
            <p className="mt-2 text-xs text-ink/60">
              ※個人差があり、腎機能や薬剤により変わる場合があります。
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-primary/10 p-4">
                <p className="text-sm font-bold text-primary-dark">積極的にとりたい食品</p>
                <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-ink/80">
                  {DIET_GUIDANCE_FOOD_LIST.recommended.map((item) => (
                    <li key={item}>・{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-ink/5 p-4">
                <p className="text-sm font-bold text-ink/70">控えたい食品</p>
                <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-ink/80">
                  {DIET_GUIDANCE_FOOD_LIST.limit.map((item) => (
                    <li key={item}>・{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-8 rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
            <Section heading={DIET_GUIDANCE_CAUTION.heading} body={DIET_GUIDANCE_CAUTION.body} />
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10">
            <p className="rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {DIET_GUIDANCE_DISCLAIMER}
            </p>
          </FadeIn>

          <FadeIn delay={0.16} className="mt-8 text-center">
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
              href="/diseases"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              疾患一覧へ戻る
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
