"use client";

import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { SoftBlob, Dots, LeafSprig } from "./Decor";
import Link from "next/link";
import { useSite } from "../lib/site";

const ICON_PROPS = {
  className: "h-7 w-7",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ICONS = [
  // 01：発熱の方はお車で（車のアイコン）
  <svg key="0" viewBox="0 0 24 24" {...ICON_PROPS}>
    <path d="M5 16V11l2-4.5h10L19 11v5" />
    <path d="M3 16h18v2H3z" />
    <circle cx="7.5" cy="18.5" r="1.5" />
    <circle cx="16.5" cy="18.5" r="1.5" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" {...ICON_PROPS}>
    <path d="M3 12h4l2 5 4-12 2 7h6" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" {...ICON_PROPS}>
    <rect x="6" y="3" width="12" height="18" rx="3" />
    <path d="M11 18h2" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" {...ICON_PROPS}>
    <path d="M12 21s-7-4.35-7-9a4 4 0 017-2.65A4 4 0 0119 12c0 4.65-7 9-7 9z" />
  </svg>,
];

export default function Features() {
  const { t } = useSite();

  return (
    <section id="features" className="section-pad relative overflow-hidden bg-accent/60">
      <SoftBlob className="absolute -right-24 top-16 h-80 w-80 bg-primary/10" />
      <SoftBlob className="absolute -left-20 bottom-10 h-72 w-72 bg-sun/20" />
      <Dots className="absolute left-6 top-12 hidden h-12 w-24 text-primary/40 sm:block" />
      <LeafSprig className="absolute right-8 bottom-8 h-24 w-16 -rotate-12 opacity-40" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.features.heading} eyebrowAsTitle />
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {t.features.items.map((f, i) => (
            <FadeIn key={f.title} delay={(i % 2) * 0.1} as="article">
              <div className="flex h-full flex-col rounded-[1.75rem] bg-surface/90 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft sm:p-7">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-14 sm:w-14">
                    {ICONS[i]}
                  </div>
                  <span className="font-display text-2xl font-bold text-primary/20 sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                  {f.body}
                </p>

                {i === 0 && (
                  <Link
                    href="/first-visit#fever"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    {t.features.feverLink}
                  </Link>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
