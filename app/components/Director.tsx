"use client";

import Image from "next/image";
import Link from "next/link";
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
        <div className="grid items-start gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16">
          <FadeIn>
            <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-24 lg:max-w-none">
              <Blossom className="absolute -left-3 -top-3 z-10 h-12 w-12 opacity-90" />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl shadow-soft">
                <Image
                  src="/director.png"
                  alt={t.director.portraitAria}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <span className="eyebrow">{t.director.eyebrow}</span>
            <h2 className="mt-5 whitespace-pre-line text-xl font-bold leading-relaxed text-ink sm:text-2xl">
              {t.director.greetingTitle}
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-[1.9] text-ink/80">
              {t.director.greetingLead.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-5 space-y-3">
              {t.director.greetingDepts.map((d) => (
                <li
                  key={d.label}
                  className="flex items-start gap-3 rounded-2xl border-l-4 border-primary bg-accent/50 px-4 py-3 text-[15px] leading-relaxed text-ink"
                >
                  <span className="mt-0.5 shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                    {d.label}
                  </span>
                  <span>{d.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-4 text-[15px] leading-[1.9] text-ink/80">
              {t.director.greetingClosing.map((p, i, arr) => (
                <p
                  key={i}
                  className={i === arr.length - 1 ? "font-bold text-primary-dark sm:text-lg" : undefined}
                >
                  {p}
                </p>
              ))}
            </div>

            <p className="mt-6 text-right text-sm leading-relaxed text-ink/70">
              {t.director.signatureOrg}
              <br />
              <span className="text-base font-bold text-ink">
                {t.director.signatureRole}　{t.director.name}
              </span>
            </p>

            <div className="mt-8 rounded-3xl bg-surface/90 p-5 shadow-card sm:p-6">
              <h3 className="text-sm font-bold text-primary-dark">{t.director.profileHeading}</h3>
              <p className="mt-2 text-lg font-bold text-ink">
                {t.director.roleLabel}　{t.director.name}
                <span className="ml-3 text-sm font-medium text-muted">{t.director.reading}</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {t.director.qualifications.map((q) => (
                  <li
                    key={q}
                    className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary-dark"
                  >
                    {q}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-[1.9] text-ink/75">{t.director.storyIntro}</p>
              <Link
                href={t.director.storyMoreHref}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-dark underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
              >
                {t.director.storyMore}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
