"use client";

import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { SoftBlob, LeafSprig } from "./Decor";
import { useSite } from "../lib/site";

export default function Access() {
  const { t, lang } = useSite();
  // 略図はページの上に重ねて拡大表示する（別タブで開くと元のページに戻れないため）
  const [zoomed, setZoomed] = useState<number | null>(null);
  const closeLabel = lang === "en" ? "Close" : "閉じる";

  useEffect(() => {
    if (zoomed === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomed]);

  return (
    <section id="access" className="section-pad relative overflow-clip bg-cream">
      <SoftBlob className="absolute -right-24 top-16 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.access.eyebrow} title={t.access.heading} />
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* 地図は右の案内と同じ高さの列の中でついてくる（下に大きな空白を作らない） */}
          <FadeIn>
            <div className="space-y-4 lg:sticky lg:top-36">
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
            {/* 道順の略図（方面ごと） */}
            {t.access.routeMaps.map((m, i) => (
              <figure key={m.src} className="overflow-hidden rounded-3xl border border-accent bg-white shadow-card">
                <button
                  type="button"
                  onClick={() => setZoomed(i)}
                  className="block w-full cursor-zoom-in"
                  aria-label={m.caption}
                >
                  <img
                    src={m.src}
                    alt={m.alt}
                    width={m.width}
                    height={m.height}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </button>
                <figcaption className="bg-surface/95 px-5 py-3 text-sm leading-relaxed text-ink/75">
                  {m.caption}
                </figcaption>
              </figure>
            ))}
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
                  <dd className="mt-0.5 text-xs text-ink/50">{t.access.addressNote}</dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-primary-dark">
                    {t.access.parkingLabel}
                  </dt>
                  <dd className="mt-1 text-[15px] text-ink/80">
                    {t.access.parkingValue}
                  </dd>
                </div>
                {t.access.details.map((d) => (
                  <div key={d.label}>
                    <dt className="text-sm font-bold text-primary-dark">{d.label}</dt>
                    <dd className="mt-1 whitespace-pre-line text-[15px] leading-relaxed text-ink/80">{d.value}</dd>
                  </div>
                ))}
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
      {zoomed !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.access.routeMaps[zoomed].caption}
          className="fixed inset-0 z-[100] overflow-auto bg-black/90 px-3 pb-6 pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-8"
          onClick={() => setZoomed(null)}
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="fixed right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-[101] rounded-full bg-white px-4 py-2 text-sm font-bold text-ink shadow-card sm:right-6 sm:top-6"
          >
            ✕ {closeLabel}
          </button>
          <img
            src={t.access.routeMaps[zoomed].src}
            alt={t.access.routeMaps[zoomed].alt}
            width={t.access.routeMaps[zoomed].width}
            height={t.access.routeMaps[zoomed].height}
            className="mx-auto mt-14 block h-auto w-full max-w-5xl rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
