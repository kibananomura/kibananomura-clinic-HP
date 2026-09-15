"use client";

import Link from "next/link";
import { useSite } from "../lib/site";
import { LINE_RECRUIT_URL } from "../lib/careers";

/**
 * スマホ画面下部に常時固定表示する3ボタンのタブバー（LINEリッチメニュー風）。
 * 「診療のご案内」「開院情報を受け取る（LINE）」「職員募集」への導線を、
 * どのページを見ていても常に指一本で届く場所に置く。
 */
export default function MobileTabBar() {
  const { t } = useSite();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-3 border-t border-ink/10 bg-surface/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label={t.hero.ctaGuide}
    >
      <Link
        href="/#services"
        className="flex flex-col items-center justify-center gap-1.5 py-3.5 text-ink/80 transition-colors active:bg-accent/60"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
        </svg>
        <span className="text-[13px] font-bold leading-none">{t.hero.ctaGuide}</span>
      </Link>

      <a
        href={LINE_RECRUIT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1.5 bg-line py-3.5 text-white transition-opacity active:opacity-80"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.58 7.48 8.41 8.12.33.07.78.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.89.55 1.09-.46 5.86-3.45 8-5.91 1.47-1.62 2.18-3.27 2.18-5.04C22 5.69 17.52 2 12 2Z" />
        </svg>
        <span className="text-[13px] font-bold leading-none">{t.headerCta}</span>
      </a>

      <Link
        href="/careers"
        className="flex flex-col items-center justify-center gap-1.5 py-3.5 text-ink/80 transition-colors active:bg-accent/60"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" />
        </svg>
        <span className="text-[13px] font-bold leading-none">{t.hero.careersBadge}</span>
      </Link>
    </nav>
  );
}
