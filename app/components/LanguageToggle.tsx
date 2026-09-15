"use client";

import { useSite } from "../lib/site";

/**
 * 日本語 / English の言語切替セグメントコントロール。
 */
export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang, t } = useSite();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-ink/15 bg-white/70 p-0.5 text-[10px] font-bold backdrop-blur sm:text-xs ${className}`}
      role="group"
      aria-label={t.common.langSwitch}
    >
      <button
        type="button"
        onClick={() => setLang("ja")}
        aria-pressed={lang === "ja"}
        className={`rounded-full px-1.5 py-1 transition-colors sm:px-3 ${
          lang === "ja" ? "bg-primary text-white" : "text-muted hover:text-ink"
        }`}
      >
        日本語
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-1.5 py-1 transition-colors sm:px-3 ${
          lang === "en" ? "bg-primary text-white" : "text-muted hover:text-ink"
        }`}
      >
        EN
      </button>
    </div>
  );
}
