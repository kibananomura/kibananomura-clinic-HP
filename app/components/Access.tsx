"use client";

import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { SoftBlob, LeafSprig } from "./Decor";
import { useSite } from "../lib/site";

export default function Access() {
  const { t } = useSite();

  return (
    <section id="access" className="section-pad relative overflow-hidden bg-cream">
      <SoftBlob className="absolute -right-24 top-16 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.access.eyebrow} title={t.access.heading} />
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-accent shadow-card">
              <iframe
                src={t.access.mapEmbed}
                title={t.access.mapTitle}
                className="block aspect-[4/3] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="flex flex-wrap items-center justify-between gap-3 bg-surface/95 px-5 py-4">
                <p className="text-sm leading-relaxed text-ink/75">
                  {t.access.mapSub}
                </p>
                <a
                  href={t.access.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
                >
                  {t.access.mapButton}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="flex h-full flex-col rounded-3xl bg-accent/40 p-7">
              <dl className="space-y-5">
                <div>
                  <dt className="text-sm font-bold text-primary-dark">
                    {t.access.addressLabel}
                  </dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-ink/80">
                    {t.access.addressValue}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-primary-dark">
                    {t.access.parkingLabel}
                  </dt>
                  <dd className="mt-1 text-[15px] text-ink/80">
                    {t.access.parkingValue}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-primary-dark">
                    {t.access.openLabel}
                  </dt>
                  <dd className="mt-1 text-[15px] text-ink/80">
                    {t.access.openValue}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed text-ink/75">
                {t.access.note}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
