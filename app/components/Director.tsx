"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { SoftBlob, LeafSprig, Blossom } from "./Decor";
import { useSite } from "../lib/site";

export default function Director() {
  const { t } = useSite();

  return (
    <section id="director" className="section-pad relative overflow-hidden bg-cream">
      <SoftBlob className="absolute -left-24 top-20 h-72 w-72 bg-blossom/20" />
      <SoftBlob className="absolute -right-16 bottom-10 h-80 w-80 bg-primary/10" />
      <LeafSprig className="absolute left-8 bottom-10 hidden h-24 w-16 rotate-6 opacity-40 lg:block" />

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16">
          <FadeIn>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Blossom className="absolute -left-3 -top-3 z-10 h-12 w-12 opacity-90" />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl shadow-soft">
                <Image
                  src="/director.png"
                  alt={t.director.portraitAria}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <span className="eyebrow">{t.director.eyebrow}</span>
            <h2 className="mt-5 text-2xl font-bold text-ink sm:text-3xl">
              {t.director.roleLabel}　{t.director.name}
              <span className="ml-3 text-base font-medium text-muted">
                {t.director.reading}
              </span>
            </h2>

            <ul className="mt-4 flex flex-wrap gap-2">
              {t.director.qualifications.map((q) => (
                <li
                  key={q}
                  className="whitespace-nowrap rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-primary-dark"
                >
                  {q}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4 text-[15px] leading-[1.9] text-ink/80">
              <p>{t.director.storyIntro}</p>
              <p className="rounded-2xl border-l-4 border-primary bg-accent/50 px-5 py-3 font-medium text-ink">
                {t.director.quote}
              </p>
              {t.director.storyBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <p className="mt-7 whitespace-nowrap font-bold leading-relaxed text-primary-dark [font-size:clamp(0.9rem,4.2vw,1.25rem)] sm:text-2xl">
              {t.director.catch}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
