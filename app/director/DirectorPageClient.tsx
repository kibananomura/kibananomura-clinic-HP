"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "../components/FadeIn";
import Director from "../components/Director";
import { SoftBlob } from "../components/Decor";
import { useSite } from "../lib/site";

/**
 * 院長紹介（/director）。見出しに「院長 野村 信介」を漢字で出し、検索で院長の名前から見つけてもらう。
 * 写真・名前・資格 → 院長あいさつ（写真なし）→ 経歴 → 院長の思いを読む、の順。写真は1回だけ。
 */
export default function DirectorPageClient() {
  const { t } = useSite();
  const d = t.director;
  const p = d.page;

  return (
    <>
      <section className="section-pad relative overflow-hidden bg-cream page-top">
        <SoftBlob className="absolute -right-20 top-16 h-72 w-72 bg-primary/10" />
        <div className="container-page relative">
          <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[2fr_3fr]">
            <FadeIn>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-4xl shadow-soft">
                <Image src="/director.png" alt={d.portraitAria} fill priority sizes="(max-width: 768px) 80vw, 30vw" className="object-cover object-top" />
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <span className="eyebrow">{p.eyebrow}</span>
              <h1 className="mt-4 text-3xl font-bold tracking-wide text-ink sm:text-4xl">
                {d.roleLabel}　{d.name}
              </h1>
              <p className="mt-2 text-sm text-muted">{d.reading}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {d.qualifications.map((q) => (
                  <li key={q} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary-dark">
                    {q}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[15px] leading-[1.9] text-ink/80">{p.lead}</p>
            </FadeIn>
          </div>

        </div>
      </section>
      {/* 写真はページ上部に1回だけ。あいさつは写真なしで続ける */}
      <Director withPortrait={false} />
      <section className="section-pad relative overflow-hidden bg-cream pt-0">
        <div className="container-page relative">
          <FadeIn delay={0.08}>
            <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-surface/90 p-6 shadow-card sm:p-8">
              <h2 className="text-lg font-bold text-primary-dark">{p.careerHeading}</h2>
              <ol className="mt-4 space-y-3 border-l-2 border-primary/25 pl-5">
                {p.career.map((c, i) => (
                  <li key={i} className="relative text-[15px] leading-relaxed text-ink/85">
                    <span aria-hidden="true" className="absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
                    {c.when && <span className="mr-2 text-sm font-bold text-primary-dark">{c.when}</span>}
                    {c.text}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-ink/60">{p.careerNote}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl">
              <h2 className="text-lg font-bold text-ink">{p.readHeading}</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {p.reads.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="flex h-full items-center justify-between gap-3 rounded-2xl border border-primary/15 bg-surface px-4 py-3 text-sm font-bold text-ink transition-colors hover:bg-accent/60 hover:text-primary-dark"
                    >
                      <span>{r.label}</span>
                      <span aria-hidden="true" className="shrink-0 text-primary">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                <a
                  href="https://researchmap.jp/shinsuke_nomura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary-dark underline decoration-primary/40 underline-offset-4 hover:text-primary"
                >
                  {p.researchmap} ↗
                </a>
              </p>
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  );
}
