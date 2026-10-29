"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";
import InlineRichText from "../components/InlineRichText";

export default function FirstVisitPageClient() {
  const { t } = useSite();
  const fv = t.firstVisit;
  const fever = t.feverVisit;

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={fv.eyebrow} title={fv.heading} as="h1" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            {fv.intro}
          </p>
        </FadeIn>

        {/* 受診の流れ */}
        <div className="mt-14 space-y-5">
          {fv.steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.07}>
              <div className="flex gap-5 rounded-[1.75rem] bg-surface/90 p-6 shadow-card sm:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
                  {step.num}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary-dark">{step.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                    <InlineRichText text={step.body} />
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 発熱・感染症の症状がある方へ（/first-visit#fever。よくある質問・キバナビから直接案内する） */}
        <FadeIn delay={0.08} className="mt-10">
          <div id="fever" className="scroll-mt-28 rounded-[1.75rem] border-2 border-primary/30 bg-surface/90 p-7 shadow-card sm:p-9">
            <h2 className="flex items-center gap-2 text-lg font-bold text-primary-dark">
              <span aria-hidden="true">🌡️</span>
              {fever.heading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
              <InlineRichText text={fever.intro} />
            </p>
            <ol className="mt-5 space-y-3">
              {fever.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <InlineRichText text={step} />
                  </span>
                </li>
              ))}
            </ol>
            <ul className="mt-5 space-y-2 border-t border-accent pt-4">
              {fever.notes.map((note) => (
                <li key={note} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>
                    <InlineRichText text={note} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* 持ち物 */}
        <FadeIn delay={0.1} className="mt-10">
          <div className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card sm:p-9">
            <h2 className="text-lg font-bold text-ink">{fv.prepHeading}</h2>
            <p className="mt-1.5 text-xs text-ink/50">{fv.prepSubnote}</p>
            <ul className="mt-5 space-y-3">
              {fv.prepItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-ink/80">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-primary/40 bg-surface"
                    aria-hidden="true"
                  />
                  <InlineRichText text={item} />
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* 保険診療 */}
        <FadeIn delay={0.12} className="mt-6">
          <div className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card sm:p-9">
            <h2 className="text-lg font-bold text-ink">{fv.insuranceHeading}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
              <InlineRichText text={fv.insuranceBody} />
            </p>
          </div>
        </FadeIn>

        {/* ご来院のお願い */}
        <FadeIn delay={0.14} className="mt-6">
          <div className="rounded-[1.75rem] border border-primary/20 bg-accent/60 p-7 sm:p-9">
            <h2 className="flex items-center gap-2 text-lg font-bold text-primary-dark">
              <span aria-hidden="true">🌿</span>
              {fv.noteHeading}
            </h2>
            <ul className="mt-4 space-y-3">
              {fv.notes.map((note) => (
                <li key={note} className="flex gap-3 text-[15px] text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>
                    <InlineRichText text={note} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* FAQ リンク */}
        <FadeIn delay={0.16} className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-surface px-6 py-3 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-accent"
          >
            よくある質問を見る →
          </Link>
        </FadeIn>

        <div className="mt-8 text-center">
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
