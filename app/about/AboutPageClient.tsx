"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";

/**
 * 当院の想い（/about）。Whyから始める：経営理念（芯）→パーパス→ミッション・ビジョン・バリュー→合言葉。
 * 文言は t.mission（職員募集と共通）を使い、患者さん向けの説明だけ t.about に置く。
 * 職員向けのクレド・評価シートは載せない。
 */
export default function AboutPageClient() {
  const { t } = useSite();
  const m = t.mission;
  const a = t.about;

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={a.eyebrow} title={a.heading} as="h1" />
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">{a.intro}</p>
        </FadeIn>

        {/* パーパスと、その芯の経営理念 */}
        <FadeIn delay={0.08}>
          <div className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] bg-surface/90 p-7 text-center shadow-card sm:p-10">
            <p className="text-xs font-bold tracking-wide text-primary-dark">{m.purposeLabel}</p>
            <p className="mt-3 text-2xl font-bold leading-snug text-ink sm:text-3xl">{m.purpose}</p>
            <div className="mx-auto mt-6 h-px w-16 bg-primary/30" />
            <p className="mt-6 text-xs text-ink/60">{m.philosophyLabel}</p>
            <p className="mt-2 text-base font-bold leading-relaxed text-ink/85 [text-wrap:balance]">{m.philosophy}</p>
          </div>
        </FadeIn>

        {/* なぜ（パーパスの意味） */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-2xl">
            <h2 className="text-lg font-bold text-ink sm:text-xl">{a.whyHeading}</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-[1.9] text-ink/80">
              {a.whyBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ミッション・ビジョン・バリュー */}
        <FadeIn delay={0.12}>
          <h2 className="mx-auto mt-14 max-w-5xl text-center text-lg font-bold text-ink sm:text-xl">{a.layersHeading}</h2>
        </FadeIn>
        <div className="mx-auto mt-6 grid max-w-5xl gap-5 lg:grid-cols-3">
          {m.cards.map((card, i) => (
            <FadeIn key={card.title} delay={0.14 + i * 0.05} as="article">
              <div className="h-full rounded-3xl bg-surface/90 p-6 shadow-card">
                <h3 className="text-base font-bold text-primary-dark">{card.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink/80">{card.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 合言葉 */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-10 max-w-3xl rounded-[1.75rem] bg-accent/50 p-6 text-center sm:p-8">
            <p className="text-xs font-bold tracking-wide text-primary-dark">{m.mottoLabel}</p>
            <p className="mt-2 text-lg font-bold leading-snug text-ink sm:text-xl">{m.motto}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{m.mottoNote}</p>
          </div>
        </FadeIn>

        {/* あわせて読む */}
        <FadeIn delay={0.22}>
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-sm font-bold text-ink/70">{a.linksHeading}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/#director" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105">
                {a.directorLink}
              </Link>
              <Link href="/blog" className="rounded-full border border-primary/40 bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark transition-transform hover:scale-105">
                {a.blogLink}
              </Link>
              <Link href="/careers" className="rounded-full border border-primary/40 bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark transition-transform hover:scale-105">
                {a.careersLink}
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
