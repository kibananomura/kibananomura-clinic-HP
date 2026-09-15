"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob } from "../components/Decor";
import { useSite } from "../lib/site";

export default function TokushohoPageClient() {
  const { t } = useSite();
  const tk = t.tokushoho;

  return (
    <section className="section-pad relative overflow-hidden bg-accent/60 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={tk.eyebrow} title={tk.heading} />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            {tk.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-3xl bg-surface/90 shadow-card">
            <dl className="divide-y divide-accent">
              {tk.items.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 px-6 py-5 sm:grid-cols-[200px_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-bold text-primary-dark">{item.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-ink/80">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ink/60">
            {tk.disclaimer}
          </p>
        </FadeIn>

        <div className="mt-10 text-center">
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
