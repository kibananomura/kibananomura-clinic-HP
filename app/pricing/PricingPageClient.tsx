"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";

export default function PricingPageClient() {
  const { t } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-accent/60 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.heading} />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            {t.pricing.intro}
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          {t.pricing.groups.map((group, gi) => (
            <FadeIn key={group.title} delay={gi * 0.08}>
              <div className="overflow-hidden rounded-3xl bg-surface/90 shadow-card">
                <h2 className="border-b border-accent bg-accent/50 px-6 py-4 text-lg font-bold text-primary-dark">
                  {group.title}
                </h2>
                <ul className="divide-y divide-accent">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-4"
                    >
                      <span className="text-[15px] text-ink/85">{item.name}</span>
                      <span className="whitespace-nowrap text-sm font-bold text-primary-dark">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink/65">
            {t.pricing.disclaimer}
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm">
            <Link href="/services" className="font-bold text-primary-dark underline underline-offset-2">
              {t.pricing.servicesLinkLabel}
            </Link>
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
