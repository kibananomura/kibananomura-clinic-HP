"use client";

import { useState } from "react";
import Link from "next/link";
import { BODY_REGIONS, SYMPTOM_TITLES, type BodyRegion } from "../lib/body-map-data";
import { useSite } from "../lib/site";

type Props = {
  /** sm: ホームの簡易版 / lg: 症状一覧ページの詳細版 */
  size?: "sm" | "lg";
  className?: string;
};

/** 症状ページは日本語のみ提供のため、英語表示時は何も描画しない */
export default function BodySchema({ size = "lg", className = "" }: Props) {
  const { lang } = useSite();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  if (lang !== "ja") return null;
  const selected = BODY_REGIONS.find((r) => r.id === selectedId) ?? null;
  const figureRegions = BODY_REGIONS.filter((r) => r.onFigure);
  const chipRegions = BODY_REGIONS.filter((r) => !r.onFigure);

  const handleSelect = (region: BodyRegion) => {
    setSelectedId((cur) => (cur === region.id ? null : region.id));
  };

  const svgSize = size === "sm" ? 140 : 220;

  return (
    <div className={`flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-8 ${className}`}>
      <div className="flex shrink-0 flex-col items-center gap-3">
        <svg
          viewBox="0 0 200 420"
          width={svgSize}
          height={(svgSize * 420) / 200}
          role="group"
          aria-label="気になる部位を選んでください"
          className="shrink-0"
        >
          {figureRegions.map((region) => {
            const isActive = region.id === selectedId;
            return (
              <g
                key={region.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={region.label}
                className="cursor-pointer outline-none"
                onClick={() => handleSelect(region)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(region);
                  }
                }}
              >
                {region.shapes.map((shape, i) =>
                  shape.type === "circle" ? (
                    <circle
                      key={i}
                      cx={shape.cx}
                      cy={shape.cy}
                      r={shape.r}
                      className={`transition-colors ${
                        isActive ? "fill-primary" : "fill-primary/20 hover:fill-primary/35"
                      }`}
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeOpacity={0.25}
                    />
                  ) : (
                    <rect
                      key={i}
                      x={shape.x}
                      y={shape.y}
                      width={shape.width}
                      height={shape.height}
                      rx={shape.rx}
                      className={`transition-colors ${
                        isActive ? "fill-primary" : "fill-primary/20 hover:fill-primary/35"
                      }`}
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeOpacity={0.25}
                    />
                  )
                )}
              </g>
            );
          })}
        </svg>
        <p className="text-center text-xs text-ink/50">
          気になる部位をタップしてください
        </p>
      </div>

      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          {chipRegions.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => handleSelect(region)}
              aria-pressed={region.id === selectedId}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
                region.id === selectedId
                  ? "border-primary bg-primary text-white"
                  : "border-primary/30 bg-surface text-primary-dark hover:bg-accent"
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>

        <div className="mt-4 min-h-[88px] rounded-2xl bg-surface/90 p-5 shadow-card">
          {!selected && (
            <p className="text-sm text-ink/60">
              頭・首・胸・お腹・おしり・手足など、気になる部位を選ぶと、関連する症状ページが表示されます。
            </p>
          )}
          {selected && (
            <>
              <p className="text-sm font-bold text-primary-dark">{selected.label}の症状</p>
              <ul className="mt-3 space-y-2">
                {selected.slugs.map((slug) => {
                  const title = SYMPTOM_TITLES[slug];
                  if (!title) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/symptoms/${slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-ink/80 transition-colors hover:bg-accent/60"
                      >
                        <span>{title}</span>
                        <span className="shrink-0 text-primary-dark" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
