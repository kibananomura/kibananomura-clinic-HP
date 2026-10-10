"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import FadeIn from "../../components/FadeIn";
import { SoftBlob } from "../../components/Decor";
import InlineRichText from "../../components/InlineRichText";
import { useSite } from "../../lib/site";
import {
  SELFPAY_DISCLAIMER_INTRO,
  SELFPAY_DISCLAIMER_OUTRO,
  getSelfPayEntry,
} from "../../lib/selfpay-data";

export default function SelfPayPageClient() {
  const { t } = useSite();
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const item = getSelfPayEntry(slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-white">
              {item.badge}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
              {item.title}
            </h1>
            <p className="mt-3 text-base font-bold leading-relaxed text-primary-dark">
              {item.catchCopy}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
              <InlineRichText text={item.summary} />
            </p>
          </FadeIn>

          <FadeIn delay={0.03}>
            <p className="mt-6 rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {SELFPAY_DISCLAIMER_INTRO}
            </p>
          </FadeIn>

          {/* ハイライト */}
          <FadeIn delay={0.05} className="mt-8 rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
            <h2 className="text-lg font-bold text-primary-dark">この治療の特徴</h2>
            <ul className="mt-4 space-y-3">
              {item.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                  <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">
                    ●
                  </span>
                  <InlineRichText text={h} />
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* こんな方に */}
          <FadeIn delay={0.07} className="mt-6 rounded-[1.75rem] border border-primary/15 bg-accent/40 p-7">
            <h2 className="text-lg font-bold text-primary-dark">こんな方におすすめです</h2>
            <ul className="mt-4 space-y-2">
              {item.suitableFor.map((s) => (
                <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                  <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* 治療の流れ */}
          <FadeIn delay={0.09} className="mt-6 rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
            <h2 className="text-lg font-bold text-primary-dark">治療の流れ</h2>
            <ol className="mt-5 space-y-5">
              {item.howItWorks.map((step) => (
                <li key={step.title}>
                  <p className="text-sm font-bold text-ink">{step.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink/75">
                    <InlineRichText text={step.body} />
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>

          {/* 料金 */}
          <FadeIn delay={0.1}>
            <Link
              href="/pricing"
              className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-surface px-5 py-4 text-sm text-ink/80 shadow-card transition-colors hover:bg-accent/60"
            >
              <span>{item.priceNote}</span>
              <span className="shrink-0 font-bold text-primary-dark">
                料金ページへ →
              </span>
            </Link>
          </FadeIn>

          {/* 主なリスク・副作用 */}
          <FadeIn delay={0.12} className="mt-6 rounded-[1.75rem] border border-primary/15 bg-surface/80 p-7 shadow-card">
            <h2 className="text-sm font-bold text-primary-dark">⚠️ 主なリスク・副作用</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
              <InlineRichText text={item.cautions} />
            </p>
          </FadeIn>

          {/* FAQ */}
          {item.faq.length > 0 && (
            <FadeIn delay={0.14} className="mt-6 rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
              <h2 className="text-lg font-bold text-primary-dark">よくあるご質問</h2>
              <div className="mt-4 space-y-5">
                {item.faq.map((f) => (
                  <div key={f.q}>
                    <p className="text-sm font-bold text-ink">Q. {f.q}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink/75">A. {f.a}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.16} className="mt-10">
            <p className="rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {SELFPAY_DISCLAIMER_OUTRO}
            </p>
          </FadeIn>

          <FadeIn delay={0.18} className="mt-8 rounded-[1.75rem] bg-surface/90 p-7 text-center shadow-card">
            <p className="text-sm font-bold text-primary-dark">{t.register.heading}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{t.register.body}</p>
            <a
              href="https://line.me/R/ti/p/@337njouw"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              {t.register.button}
              <span aria-hidden="true">→</span>
            </a>
          </FadeIn>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              診療案内へ戻る
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              料金一覧を見る
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
