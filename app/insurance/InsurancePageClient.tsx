"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";
import { INSURANCE_COPAY } from "../lib/insurance-copay";

export default function InsurancePageClient() {
  const { t, lang } = useSite();
  const c = INSURANCE_COPAY[lang];

  return (
    <section className="section-pad relative overflow-hidden bg-accent/60 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={c.eyebrow} title={c.heading} as="h1" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">{c.intro}</p>
        </FadeIn>

        <div className="mx-auto mt-12 max-w-3xl space-y-6">
          {/* 年齢ごとの負担割合 */}
          <FadeIn>
            <section className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card sm:p-9">
              <h2 className="text-lg font-bold text-primary-dark">{c.ratioHeading}</h2>
              <table className="mt-5 w-full text-left text-[15px]">
                <thead>
                  <tr className="border-b border-accent text-xs text-ink/55">
                    <th className="py-2 pr-3 font-bold">{c.ratioWhoLabel}</th>
                    <th className="py-2 font-bold">{c.ratioRateLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.ratios.map((r) => (
                    <tr key={r.who} className="border-b border-accent/60 align-top">
                      <td className="py-3 pr-3 text-ink/80">{r.who}</td>
                      <td className="py-3 font-bold text-primary-dark">{r.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="mt-4 space-y-2">
                {c.ratioNotes.map((note) => (
                  <li key={note} className="flex gap-2 text-sm leading-relaxed text-ink/70">
                    <span aria-hidden="true">※</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          {/* 生活保護 */}
          <FadeIn>
            <section className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card sm:p-9">
              <h2 className="text-lg font-bold text-primary-dark">{c.welfareHeading}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{c.welfareBody}</p>
            </section>
          </FadeIn>

          {/* 子ども医療費助成 */}
          <FadeIn>
            <section id="children" className="scroll-mt-44 rounded-[1.75rem] bg-surface/90 p-7 shadow-card sm:p-9">
              <h2 className="text-lg font-bold text-primary-dark">{c.childHeading}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{c.childIntro}</p>
              <div className="mt-6 space-y-4">
                {c.municipalities.map((m) => (
                  <div key={m.name} className="rounded-2xl border border-accent bg-cream/60 p-5">
                    <h3 className="font-bold text-ink">{m.name}</h3>
                    <dl className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[7rem_1fr]">
                      {(
                        [
                          [c.labels.target, m.target],
                          [c.labels.outpatient, m.outpatient],
                          [c.labels.inpatient, m.inpatient],
                          [c.labels.pharmacy, m.pharmacy],
                        ] as const
                      ).map(([label, value]) => (
                        <div key={label} className="contents">
                          <dt className="font-bold text-primary-dark">{label}</dt>
                          <dd className="leading-relaxed text-ink/80">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    {m.note && <p className="mt-3 text-xs leading-relaxed text-ink/60">※{m.note}</p>}
                    <a
                      href={m.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs font-bold text-primary-dark underline underline-offset-2"
                    >
                      {c.labels.source} ↗
                    </a>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-2">
                {c.childNotes.map((note) => (
                  <li key={note} className="flex gap-2 text-sm leading-relaxed text-ink/70">
                    <span aria-hidden="true">※</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-ink/55">{c.checkedNote}</p>
            </section>
          </FadeIn>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
          >
            {t.nav.find((n) => n.href === "/pricing")?.label}
            <span aria-hidden="true">→</span>
          </Link>
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
