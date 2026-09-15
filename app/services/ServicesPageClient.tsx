"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import { useSite } from "../lib/site";
import { SCHEDULE, WED_PM_INDEX } from "../lib/schedule";
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

const SELFPAY_ICONS = [
  // weight / GLP-1
  <svg key="glp" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <path d="M12 2a7 7 0 100 14A7 7 0 0012 2z" />
    <path d="M12 9v3l2 2M8 21h8M12 16v5" />
  </svg>,
  // hair / AGA
  <svg key="aga" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <path d="M12 3C8 3 5 6 5 10c0 2.5 1.2 4.7 3 6.1V19h8v-2.9c1.8-1.4 3-3.6 3-6.1 0-4-3-7-7-7z" />
  </svg>,
  // FAGA
  <svg key="faga" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20v-1a6 6 0 0112 0v1M12 12v3" />
  </svg>,
  // LOH / TRT
  <svg key="trt" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
  </svg>,
  // ED
  <svg key="ed" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <path d="M19 14c1.5-1 2-3 2-5a7 7 0 00-14 0c0 2 .5 4 2 5l3 5h4l3-5z" />
  </svg>,
  // Kenacort / flower
  <svg key="ken" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>,
  // DIP bone density
  <svg key="dip" viewBox="0 0 24 24" {...DEPT_ICON_PROPS}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </svg>,
];

export default function ServicesPageClient() {
  const { t, lang } = useSite();
  const linkCopy = PATIENT_LINK_PAGE[lang];

  return (
    <section className="section-pad relative overflow-hidden bg-accent/60 page-top">
      <SoftBlob className="absolute -left-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -right-20 bottom-16 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        {/* ページヘッダー */}
        <FadeIn>
          <SectionHeading
            eyebrow={t.servicesPage.eyebrow}
            title={t.servicesPage.heading}
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-ink/75">
            {t.servicesPage.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <p className="mx-auto mt-4 text-center text-sm">
            <Link
              href="/symptoms"
              className="font-bold text-primary-dark underline underline-offset-2"
            >
              症状から調べる（発熱・腹痛・咳などの症状別ページ）→
            </Link>
          </p>
        </FadeIn>

        {/* 診療科ごとの詳細 */}
        <div className="mt-12 space-y-6">
          {t.services.details.map((dept, i) => (
            <FadeIn key={dept.title} delay={Math.min(i * 0.07, 0.25)}>
              <article className="overflow-hidden rounded-[1.75rem] bg-surface/90 shadow-card">
                <div className="flex items-center gap-3 border-b border-accent bg-accent/30 px-7 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {DEPT_ICONS[i]}
                  </span>
                  <h2 className="text-xl font-bold text-primary-dark">
                    {dept.title}
                  </h2>
                </div>

                <div className="p-7">
                  <p className="text-[15px] leading-relaxed text-ink/80">
                    {t.servicesPage.deptDescs[i]}
                  </p>

                  {dept.items.length > 0 && (
                    <ul
                      className={`mt-5 text-[15px] leading-relaxed text-ink/80 ${
                        dept.wide ? "sm:columns-2 sm:[column-gap:2.5rem]" : ""
                      }`}
                    >
                      {dept.items.map((item) => (
                        <li
                          key={item}
                          className="mb-2.5 flex break-inside-avoid gap-2.5"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {dept.note && (
                    <p
                      className={`text-[15px] text-ink/75 ${
                        dept.items.length === 0
                          ? "mt-0 leading-[1.9]"
                          : "mt-4 leading-relaxed"
                      }`}
                    >
                      {dept.note}
                    </p>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* 自費診療 */}
        <FadeIn delay={0.1} className="mt-14">
          <div className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card sm:p-9">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-white">
                {t.services.selfpayBadge}
              </span>
              <h2 className="text-xl font-bold text-ink">
                {t.servicesPage.selfpayHeading}
              </h2>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
              {t.servicesPage.selfpayIntro}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {t.servicesPage.selfpayItems.map((item, i) => (
                <div
                  key={item.name}
                  className="flex gap-4 rounded-2xl border border-primary/10 bg-accent/40 p-4"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {SELFPAY_ICONS[i]}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-primary-dark">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/75">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
            >
              {t.servicesPage.pricingLabel}
            </Link>
          </div>
        </FadeIn>

        {/* 院内検査・設備リンク */}
        <FadeIn delay={0.12} className="mt-6">
          <div className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card sm:p-9">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                {t.services.insuranceBadge}
              </span>
              <h2 className="text-lg font-bold text-ink">
                {t.services.insuranceTitle}
              </h2>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
              {t.services.insuranceBody}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
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
              {t.servicesPage.equipmentLabel}
            </Link>
          </div>
        </FadeIn>

        {/* 受付時間 */}
        <FadeIn delay={0.14} className="mt-6">
          <div className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card sm:p-9">
            <h2 className="text-lg font-bold text-ink">
              {t.servicesPage.scheduleHeading}
            </h2>

            <div className="mt-5 overflow-x-auto">
              <div className="min-w-[520px] overflow-hidden rounded-2xl border border-accent">
                <div className="grid grid-cols-[52px_repeat(6,1fr)] bg-accent text-center text-xs font-bold sm:grid-cols-[64px_repeat(6,1fr)] sm:text-sm">
                  <div className="py-2.5" aria-hidden="true" />
                  {t.services.days.map((day, i) => (
                    <div
                      key={day}
                      className={`py-2.5 ${i === 5 ? "text-sky-500" : "text-ink"}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <ScheduleRow
                  label={t.services.amLabel}
                  slots={SCHEDULE.map((d) => d.am)}
                  openLabel={t.services.legendOpen}
                  closedLabel={t.services.legendClosed}
                />
                <ScheduleRow
                  label={t.services.pmLabel}
                  slots={SCHEDULE.map((d) => d.pm)}
                  highlightIndex={WED_PM_INDEX}
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

        <FadeIn delay={0.16} className="mt-8 text-center">
          <p className="text-sm font-bold text-ink">{t.servicesPage.linksHeading}</p>
          <Link
            href="/links"
            className="mt-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-primary/30 bg-surface px-6 py-3 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105 hover:border-primary"
          >
            {linkCopy.viewAll}
            <span aria-hidden="true">→</span>
          </Link>
        </FadeIn>

        {/* LINE登録CTA */}
        <FadeIn delay={0.18} className="mt-10 text-center">
          <a
            href="https://line.me/R/ti/p/@159yebck"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
          >
            {t.register.button}
            <span aria-hidden="true">→</span>
          </a>
        </FadeIn>

        {/* トップへ戻る */}
        <div className="mt-10 text-center">
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

function ScheduleRow({
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
    <div className="grid grid-cols-[52px_repeat(6,1fr)] border-t border-accent text-center sm:grid-cols-[64px_repeat(6,1fr)]">
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
