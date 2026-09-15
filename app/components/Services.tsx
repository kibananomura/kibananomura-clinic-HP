"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { SoftBlob, Blossom } from "./Decor";
import { useSite } from "../lib/site";
import { SCHEDULE } from "../lib/schedule";
import { PATIENT_LINK_PAGE } from "../lib/patient-links";

const DEPT_ICON_PROPS = {
  className: "h-6 w-6",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// 内科系 / 外科 / 小児科 のアイコン
const DEPT_ICONS = [
  <svg key="int" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <path d="M3 12h4l2 5 4-12 2 7h6" />
  </svg>,
  <svg key="sur" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <rect x="3" y="7" width="18" height="13" rx="3" />
    <path d="M9 7V5a3 3 0 016 0v2M12 11v5M9.5 13.5h5" />
  </svg>,
  <svg key="ped" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <circle cx="12" cy="7" r="3.2" />
    <path d="M5.5 21c0-4 2.9-7 6.5-7s6.5 3 6.5 7" />
  </svg>,
  <svg key="vac" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <path d="M14 4l6 6M17 7l-9.5 9.5L4 20l3.5-3.5L17 7M9 9l6 6M12 6l3 3" />
  </svg>,
];

export default function Services() {
  const { t, lang } = useSite();
  const linkCopy = PATIENT_LINK_PAGE[lang];

  return (
    <section id="services" className="section-pad relative overflow-hidden bg-accent/60">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.services.eyebrow} title={t.services.heading} />
        </FadeIn>

        {/* 診療科ごとの診療内容 */}
        <div className="mt-12">
          <h3 className="text-center text-xl font-bold text-ink sm:text-2xl">
            {t.services.detailHeading}
          </h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.services.details.map((d, i) => (
              <FadeIn
                key={d.title}
                delay={(i % 2) * 0.1}
                as="article"
                className={d.wide ? "sm:col-span-2" : ""}
              >
                <div className="flex h-full flex-col rounded-[1.75rem] bg-surface/90 p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex items-center gap-3 border-b border-accent pb-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      {DEPT_ICONS[i]}
                    </span>
                    <h4 className="text-lg font-bold text-primary-dark">
                      {d.title}
                    </h4>
                  </div>
                  {d.items.length > 0 && (
                    <ul
                      className={`mt-5 text-[15px] leading-relaxed text-ink/80 ${
                        d.wide ? "sm:columns-2 sm:[column-gap:2.5rem]" : ""
                      }`}
                    >
                      {d.items.map((it) => (
                        <li
                          key={it}
                          className="mb-2.5 flex break-inside-avoid gap-2.5"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            aria-hidden="true"
                          />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {d.note && (
                    <p
                      className={`text-[15px] text-ink/80 ${
                        d.items.length === 0
                          ? "my-auto leading-8"
                          : "mt-5 leading-relaxed"
                      }`}
                    >
                      {d.note}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <FadeIn as="article">
            <div className="h-full rounded-[1.75rem] bg-surface/90 p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                  {t.services.insuranceBadge}
                </span>
                <h3 className="text-lg font-bold text-ink">
                  {t.services.insuranceTitle}
                </h3>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
                {t.services.insuranceBody}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {t.services.insuranceTags.map((tag) => (
                  <li
                    key={tag}
                    className="whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-primary-dark"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <Link
                href="/equipment"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
              >
                {t.services.equipmentLink}
              </Link>
            </div>
          </FadeIn>

          <FadeIn as="article" delay={0.1}>
            <div className="h-full rounded-[1.75rem] bg-surface/90 p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-white">
                  {t.services.selfpayBadge}
                </span>
                <h3 className="text-lg font-bold text-ink">
                  {t.services.selfpayTitle}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.services.selfpayItems.map((item) => (
                  <li
                    key={item}
                    className="whitespace-nowrap rounded-full border border-primary/20 bg-accent/40 px-3 py-1.5 text-sm font-medium text-ink/80"
                  >
                    {item}
                  </li>
                ))}
                <li className="rounded-full px-3 py-1.5 text-sm text-muted">
                  {t.services.selfpayMore}
                </li>
              </ul>
              <Link
                href="/pricing"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
              >
                {t.services.pricingLink}
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15} className="mt-6">
          <div className="rounded-[1.75rem] bg-surface/90 p-5 shadow-card sm:p-7">
            <h3 className="text-lg font-bold text-ink">
              {t.services.scheduleTitle}
            </h3>

            <div className="mt-5 overflow-x-auto">
              <div className="min-w-[520px] overflow-hidden rounded-2xl border border-accent">
                <div className="grid grid-cols-[52px_repeat(5,1fr)] bg-accent text-center text-xs font-bold sm:grid-cols-[64px_repeat(5,1fr)] sm:text-sm">
                  <div className="py-2.5" aria-hidden="true" />
                  {t.services.days.map((day, i) => (
                    <div
                      key={day}
                      className="py-2.5 text-ink"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <SchedulePeriodRow
                  label={t.services.amLabel}
                  slots={SCHEDULE.map((d) => d.am)}
                  openLabel={t.services.legendOpen}
                  closedLabel={t.services.legendClosed}
                />
                <SchedulePeriodRow
                  label={t.services.pmLabel}
                  slots={SCHEDULE.map((d) => d.pm)}
                  openLabel={t.services.legendOpen}
                  closedLabel={t.services.legendClosed}
                />
              </div>
            </div>

            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary text-xs text-white">
                  ●
                </span>
                {t.services.legendOpen}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-accent text-xs text-muted">
                  −
                </span>
                {t.services.legendClosed}
              </span>
            </p>

            <ul className="mt-3 space-y-1 text-sm leading-relaxed text-ink/80">
              {t.services.scheduleNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm font-bold text-primary-dark">
              {t.services.closedNote}
            </p>
            <p className="mt-2 text-sm text-ink/75">
              {linkCopy.schedulePrompt}{" "}
              <Link
                href="/links"
                className="font-bold text-primary-dark underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary"
              >
                {linkCopy.scheduleLink}
              </Link>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
          >
            {t.services.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function SchedulePeriodRow({
  label,
  slots,
  highlightIndex,
  openLabel,
  closedLabel,
}: {
  label: string;
  slots: { open: boolean; start?: string; end?: string }[];
  highlightIndex?: number;
  openLabel: string;
  closedLabel: string;
}) {
  return (
    <div className="grid grid-cols-[52px_repeat(5,1fr)] border-t border-accent text-center sm:grid-cols-[64px_repeat(5,1fr)]">
      <div className="flex items-center justify-center bg-accent/40 py-3 text-xs font-bold text-ink">
        {label}
      </div>
      {slots.map((slot, i) => {
        const isHighlight = slot.open && i === highlightIndex;
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-0.5 px-0.5 py-2.5 sm:px-1"
            aria-label={
              slot.open
                ? `${label} ${openLabel} ${slot.start}–${slot.end}`
                : `${label} ${closedLabel}`
            }
          >
            {slot.open ? (
              <>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold sm:h-7 sm:w-7 sm:text-sm ${
                    isHighlight
                      ? "bg-primary text-white ring-2 ring-primary/30 ring-offset-1"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  ●
                </span>
                <span className="text-[10px] font-medium leading-tight text-ink/85 sm:text-[11px]">
                  {slot.start}
                </span>
                <span className="text-[9px] text-muted sm:text-[10px]">〜</span>
                <span className="text-[10px] font-medium leading-tight text-ink/85 sm:text-[11px]">
                  {slot.end}
                </span>
              </>
            ) : (
              <span className="py-4 text-muted">−</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
