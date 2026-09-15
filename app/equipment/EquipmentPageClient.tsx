"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, LeafSprig } from "../components/Decor";
import { useSite } from "../lib/site";
import { equipment } from "../lib/equipment";

export default function EquipmentPageClient() {
  const { t, lang } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -right-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            eyebrow={t.equipment.eyebrow}
            title={t.equipment.heading}
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-relaxed text-ink/75">
            {t.equipment.intro}
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 max-w-4xl space-y-6">
          {equipment.map((item, i) => {
            const c = lang === "en" ? item.en : item.ja;
            return (
              <FadeIn key={c.name} delay={Math.min(i * 0.05, 0.2)}>
                <article className="grid items-stretch gap-0 overflow-hidden rounded-3xl bg-surface/90 shadow-card sm:grid-cols-2">
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[220px]">
                    <Image
                      src={item.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7">
                    <h2 className="text-lg font-bold text-primary-dark sm:text-xl">
                      {c.name}
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.9] text-ink/80">
                      {c.body}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-ink/50">
          {t.equipment.imageNote}
        </p>

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
