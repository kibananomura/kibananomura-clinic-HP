"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl bg-surface/90 shadow-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="flex gap-3">
          <span className="mt-0.5 shrink-0 text-base font-bold text-primary">Q</span>
          <span className="text-[15px] font-bold text-ink">{q}</span>
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-accent px-6 py-5">
          <div className="flex gap-3">
            <span className="mt-0.5 shrink-0 text-base font-bold text-primary-dark">A</span>
            <p className="text-[15px] leading-relaxed text-ink/80">{a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FaqPageClient() {
  const { t } = useSite();
  const faq = t.faq;

  return (
    <section className="section-pad relative overflow-hidden bg-accent/60 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={faq.eyebrow} title={faq.heading} />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            {faq.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mx-auto mt-12 max-w-3xl space-y-3">
          {faq.items.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </FadeIn>

        {/* 施設担当者向け導線 */}
        <FadeIn delay={0.15} className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-[1.75rem] border-2 border-primary/30 bg-surface/90 p-7 shadow-card sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                🏥
              </span>
              <div>
                <h3 className="text-lg font-bold text-primary-dark">
                  介護施設・グループホームのご担当者様へ
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                  昼休みを活用した施設への訪問診療を予定しています。入居者の方の定期的な医療管理・急変時対応などについて、まずはお気軽にLINEまたはお問い合わせフォームよりご連絡ください。
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://line.me/R/ti/p/@159yebck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-line px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.58 7.48 8.41 8.12.33.07.78.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.89.55 1.09-.46 5.86-3.45 8-5.91 1.47-1.62 2.18-3.27 2.18-5.04C22 5.69 17.52 2 12 2Z" />
                    </svg>
                    LINEで相談する
                  </a>
                  <a
                    href="https://line.me/R/ti/p/@159yebck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-accent"
                  >
                    お問い合わせフォームへ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 一般患者向け LINE CTA */}
        <FadeIn delay={0.18} className="mt-8 text-center">
          <p className="mb-4 text-[15px] text-ink/75">その他ご不明な点はLINEでお気軽にお問い合わせください</p>
          <a
            href="https://line.me/R/ti/p/@159yebck"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-line px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.58 7.48 8.41 8.12.33.07.78.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.89.55 1.09-.46 5.86-3.45 8-5.91 1.47-1.62 2.18-3.27 2.18-5.04C22 5.69 17.52 2 12 2Z" />
            </svg>
            LINE でお問い合わせ
          </a>
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
