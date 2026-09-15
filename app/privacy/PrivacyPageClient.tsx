"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob } from "../components/Decor";
import { useSite } from "../lib/site";

export default function PrivacyPageClient() {
  const { t } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -right-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            eyebrow={t.privacy.eyebrow}
            title={t.privacy.heading}
          />
        </FadeIn>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-surface/90 p-7 shadow-card sm:p-10">
          <FadeIn>
            <p className="text-[15px] leading-[1.9] text-ink/80">
              {t.privacy.intro}
            </p>
          </FadeIn>

          <div className="mt-8 space-y-8">
            {t.privacy.sections.map((section, i) => (
              <FadeIn key={section.title} delay={Math.min(i * 0.04, 0.2)}>
                <div>
                  <h2 className="text-base font-bold text-primary-dark sm:text-lg">
                    {section.title}
                  </h2>
                  <div className="mt-2 space-y-1.5 text-[15px] leading-[1.9] text-ink/80">
                    {section.body.map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <p className="mt-10 text-sm text-ink/55">{t.privacy.updated}</p>
        </div>

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
