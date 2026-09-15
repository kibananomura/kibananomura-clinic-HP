"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";
import {
  CAREERS_PAGE,
  CAREER_POSITIONS,
  OBSERVER_PROGRAM,
  LINE_RECRUIT_URL,
} from "../lib/careers";

const MISSION_ICONS = ["👀", "👂", "🌱"];
const MISSION_ICON_BG = ["bg-sky/50", "bg-blossom/30", "bg-sun/40"];

const POSITION_ICONS: Record<string, ReactNode> = {
  physician: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4v16M8 8h8M6 20h12" strokeLinecap="round" />
      <circle cx="12" cy="7" r="3" />
    </svg>
  ),
  nurse: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4a3 3 0 100 6 3 3 0 000-6zM5 20v-1a7 7 0 0114 0v1" strokeLinecap="round" />
      <path d="M12 10v4M10 12h4" strokeLinecap="round" />
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
    </svg>
  ),
  radiologicTechnologist: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16M4 12h16" strokeLinecap="round" />
    </svg>
  ),
  medicalTechnologist: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-9V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  communityLiaison: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="7" cy="8" r="3" />
      <circle cx="17" cy="8" r="3" />
      <path d="M2 20c0-3 2.5-5 5-5s5 2 5 5M12 20c0-3 2.5-5 5-5s5 2 5 5" strokeLinecap="round" />
    </svg>
  ),
  dietitian: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 3v8a3 3 0 003 3v7M6 3v6M9 3v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 3c-2 0-3 2-3 5s1 4 3 4v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function CareersPageClient() {
  const { lang, t } = useSite();
  const copy = CAREERS_PAGE[lang];
  const observer = OBSERVER_PROGRAM[lang];

  return (
    <section className="section-pad relative overflow-hidden bg-accent/40 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.heading} />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            {copy.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="eyebrow">{t.mission.eyebrow}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
              {t.mission.visionQuote}
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-3">
          {t.mission.cards.map((card, i) => (
            <FadeIn key={card.title} delay={0.08 + i * 0.06} as="article">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white bg-surface/90 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                <div
                  className={`absolute -right-6 -top-6 h-20 w-20 blob-2 ${MISSION_ICON_BG[i]} opacity-60 transition-transform group-hover:scale-110`}
                  aria-hidden="true"
                />
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${MISSION_ICON_BG[i]} text-xl shadow-sm`}
                  aria-hidden="true"
                >
                  {MISSION_ICONS[i]}
                </div>
                <h3 className="relative mt-4 text-base font-bold text-ink">
                  {card.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink/75">
                  {card.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.08}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-surface/90 p-6 shadow-card sm:p-8">
            <h2 className="text-base font-bold text-primary-dark sm:text-lg">
              {copy.overviewHeading}
            </h2>
            <dl className="mt-4 divide-y divide-ink/8">
              {copy.overviewItems.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4"
                >
                  <dt className="text-sm font-bold text-ink/60">{item.label}</dt>
                  <dd className="text-sm leading-relaxed text-ink/85">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-primary px-6 py-10 text-center text-white shadow-soft sm:px-10">
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
              {copy.teamVisionLabel}
            </p>
            <p className="mt-3 text-base font-bold leading-relaxed [text-wrap:balance] sm:text-lg">
              {copy.teamVisionBody}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.11}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-surface/90 p-6 shadow-card sm:p-8">
            <h2 className="text-base font-bold text-primary-dark sm:text-lg">
              {copy.directorMessageLabel}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink/80">
              {copy.directorMessageBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-4 text-right text-sm font-bold text-ink/70">
              {copy.directorMessageName}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.115}>
          <div className="mx-auto mt-10 max-w-3xl">
            <h2 className="text-center text-lg font-bold text-ink">
              {copy.valuesHeading}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {copy.values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-3xl border border-white bg-surface/90 p-5 shadow-card"
                >
                  <h3 className="text-sm font-bold text-primary-dark">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.118}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-primary/15 bg-primary/5 p-6 sm:p-8">
            <h2 className="text-base font-bold text-primary-dark sm:text-lg">
              {copy.idealHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{copy.idealIntro}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/80">
              {copy.idealItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-primary/15 pt-5">
              <h3 className="text-sm font-bold text-primary-dark">
                {copy.snsNoticeLabel}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                {copy.snsNoticeBody}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <h2 className="mx-auto mt-12 max-w-3xl text-center text-lg font-bold text-ink">
            {copy.positionsHeading}
          </h2>
        </FadeIn>

        <div className="mx-auto mt-8 max-w-3xl space-y-6">
          {CAREER_POSITIONS.filter((position) => !position.hidden).map((position, i) => {
            const c = lang === "en" ? position.en : position.ja;
            return (
              <FadeIn key={position.id} delay={0.12 + i * 0.05}>
                <article className="rounded-3xl bg-surface/90 p-6 shadow-card sm:p-8">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary-dark">
                      {POSITION_ICONS[position.id]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                      <p className="mt-1 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary-dark">
                        {c.badge}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink/75">
                        {c.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-bold text-primary-dark">
                        {copy.dutiesLabel}
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/80">
                        {c.duties.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span className="text-primary" aria-hidden="true">
                              ·
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-dark">
                        {copy.requirementsLabel}
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/80">
                        {c.requirements.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span className="text-primary" aria-hidden="true">
                              ·
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {c.conditions && c.conditions.length > 0 && (
                    <div className="mt-6 border-t border-ink/8 pt-5">
                      <h4 className="text-sm font-bold text-primary-dark">
                        {copy.conditionsLabel}
                      </h4>
                      <dl className="mt-2 divide-y divide-ink/8">
                        {c.conditions.map((item) => (
                          <div
                            key={item.label}
                            className="grid gap-1 py-2.5 sm:grid-cols-[7rem_1fr] sm:gap-4"
                          >
                            <dt className="text-xs font-bold text-ink/55">{item.label}</dt>
                            <dd className="text-sm leading-relaxed text-ink/80">{item.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  {c.note && (
                    <p className="mt-4 text-xs leading-relaxed text-ink/55">
                      {c.note}
                    </p>
                  )}
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.22}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-primary/15 bg-primary/5 p-6 sm:p-8">
            <h2 className="text-base font-bold text-primary-dark sm:text-lg">
              {copy.highlightsHeading}
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/80">
              {copy.highlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-primary" aria-hidden="true">
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.24}>
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl border-2 border-dashed border-sun/60 bg-sun/10 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-dark">
              {observer.eyebrow}
            </p>
            <h2 className="mt-2 text-lg font-bold text-ink sm:text-xl">
              {observer.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/80">
              {observer.intro}
            </p>

            <h3 className="mt-6 text-sm font-bold text-primary-dark">
              {observer.whatYouSeeHeading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
              {observer.whatYouSee.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-primary" aria-hidden="true">
                    ·
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-bold text-primary-dark">
              {observer.formatHeading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {observer.formatBody}
            </p>

            <p className="mt-6 text-xs leading-relaxed text-ink/55">
              {observer.disclaimer}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.26}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-surface/90 p-7 text-center shadow-card sm:p-10">
            <h2 className="text-lg font-bold text-ink">{copy.applyHeading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">
              {copy.applyBody}
            </p>
            <a
              href={LINE_RECRUIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-line px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
            >
              {copy.applyLineButton}
              <span aria-hidden="true">→</span>
            </a>
            <p className="mt-3 text-xs text-ink/55">{copy.applyLineNote}</p>
            <p className="mt-6 text-xs leading-relaxed text-ink/50">
              {copy.applyDisclaimer}
            </p>
          </div>
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
