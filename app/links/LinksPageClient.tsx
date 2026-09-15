"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, LeafSprig } from "../components/Decor";
import { useSite } from "../lib/site";
import {
  PATIENT_LINK_GROUPS,
  PATIENT_LINK_PAGE,
  PATIENT_LINK_PHASE_LABELS,
} from "../lib/patient-links";

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 opacity-60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M14 3h7v7M10 14L21 3M21 14v6a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h6" />
    </svg>
  );
}

export default function LinksPageClient() {
  const { lang, t } = useSite();
  const copy = PATIENT_LINK_PAGE[lang];
  const phaseLabels = PATIENT_LINK_PHASE_LABELS[lang];

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -right-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.heading} />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            {copy.intro}
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 max-w-3xl space-y-10">
          {PATIENT_LINK_GROUPS.map((group, gi) => {
            const groupTitle = lang === "en" ? group.en.title : group.ja.title;
            const phaseLabel = phaseLabels[group.phase];

            return (
              <FadeIn key={group.phase} delay={gi * 0.06}>
                <section aria-labelledby={`link-phase-${group.phase}`}>
                  <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary-dark">
                      {phaseLabel}
                    </span>
                    <h2
                      id={`link-phase-${group.phase}`}
                      className="text-lg font-bold text-ink"
                    >
                      {groupTitle}
                    </h2>
                  </div>

                  <ul className="space-y-3">
                    {group.items.map((item) => {
                      const c = lang === "en" ? item.en : item.ja;
                      return (
                        <li key={c.label}>
                          <article className="rounded-2xl bg-surface/90 p-5 shadow-card transition-shadow hover:shadow-soft sm:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                {item.href ? (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-primary-dark transition-colors hover:text-primary"
                                  >
                                    {c.label}
                                    <ExternalIcon />
                                  </a>
                                ) : (
                                  <p className="text-[15px] font-bold text-primary-dark">
                                    {c.label}
                                  </p>
                                )}
                                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                                  {c.desc}
                                </p>
                              </div>

                              {item.tel && (
                                <a
                                  href={`tel:${item.tel}`}
                                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
                                >
                                  {c.telLabel && (
                                    <span className="text-xs font-normal text-white/85">
                                      {c.telLabel}
                                    </span>
                                  )}
                                  {item.tel}
                                </a>
                              )}
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-ink/55">
            {copy.disclaimer}
          </p>
        </FadeIn>

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
