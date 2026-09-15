"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, LeafSprig } from "../components/Decor";
import { useSite } from "../lib/site";

export default function NewsPageClient() {
  const { t } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -right-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.news.eyebrow} title={t.news.heading} />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-relaxed text-ink/75">
            {t.news.intro}
          </p>
        </FadeIn>

        <ul className="mx-auto mt-10 max-w-2xl space-y-5">
          {t.news.items.map((item, i) => (
            <FadeIn as="li" key={`${item.date}-${i}`} delay={i * 0.05}>
              <article className="rounded-3xl bg-surface/90 p-6 shadow-card transition-shadow hover:shadow-soft sm:p-7">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <time className="font-bold text-primary-dark">{item.date}</time>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
                    {item.tag}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold text-ink">{item.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                  {item.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </ul>

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
