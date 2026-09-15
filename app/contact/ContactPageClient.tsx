"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";

export default function ContactPageClient() {
  const { t } = useSite();
  const c = t.contact;

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={c.eyebrow} title={c.heading} />
        </FadeIn>

        <FadeIn delay={0.05} className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-[15px] leading-relaxed text-ink/80">{c.body}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-10 max-w-sm">
          <div className="rounded-3xl bg-surface/90 p-8 shadow-card text-center">
            <svg viewBox="0 0 24 24" className="mx-auto h-12 w-12 text-line" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.58 7.48 8.41 8.12.33.07.78.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.89.55 1.09-.46 5.86-3.45 8-5.91 1.47-1.62 2.18-3.27 2.18-5.04C22 5.69 17.52 2 12 2Z" />
            </svg>
            <p className="mt-4 text-[15px] font-bold text-ink">{c.lineLabel}</p>
            <p className="mt-2 text-sm text-ink/60">{c.lineNote}</p>
            <a
              href="https://line.me/R/ti/p/@159yebck"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-line py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.58 7.48 8.41 8.12.33.07.78.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.89.55 1.09-.46 5.86-3.45 8-5.91 1.47-1.62 2.18-3.27 2.18-5.04C22 5.69 17.52 2 12 2Z" />
              </svg>
              LINE を開く
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.11} className="mx-auto mt-6 max-w-sm">
          <div className="rounded-3xl bg-surface/90 p-8 shadow-card text-center">
            <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-.828.672-1.5 1.5-1.5h16.5c.828 0 1.5.672 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6.75Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
            </svg>
            <p className="mt-4 text-[15px] font-bold text-ink">{c.emailNote}</p>
            <a
              href="mailto:contact@kibananomura.jp"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-[1.02]"
            >
              {c.emailLabel}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-ink/60">
            {c.note}
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
