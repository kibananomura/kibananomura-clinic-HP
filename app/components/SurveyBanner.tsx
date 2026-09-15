"use client";

import { useState, useEffect } from "react";
import { useSite } from "../lib/site";
import { SURVEY_FORM_URL } from "../lib/survey";

const STORAGE_KEY = "kibana-survey-dismissed";

export default function SurveyBanner() {
  const { t } = useSite();
  const s = t.survey;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={s.badge}
      className="relative border-b border-primary/20 bg-gradient-to-r from-primary/10 via-sky/20 to-primary/5"
    >
      <div className="container-page py-4 sm:py-5 lg:py-7">
        {/* モバイル：閉じるボタンと重ならないよう上段に配置 */}
        <div className="flex items-start justify-between gap-3 lg:hidden">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
            <ClipboardIcon />
            {s.badge}
          </span>
          <DismissButton label={s.dismiss} onClick={dismiss} />
        </div>

        <div className="mt-3 flex flex-col gap-4 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:gap-5">
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-white lg:inline-flex">
              <ClipboardIcon className="h-4 w-4" />
              {s.badge}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-snug text-ink [word-break:keep-all] lg:text-xl">
                {s.heading}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70 lg:mt-1.5 lg:text-base">
                {s.body}
              </p>
            </div>
          </div>

          <a
            href={SURVEY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-primary-dark lg:w-auto lg:px-8 lg:py-3.5 lg:text-lg"
          >
            {s.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <DismissButton
        label={s.dismiss}
        onClick={dismiss}
        className="absolute right-3 top-3 hidden lg:flex"
      />
    </div>
  );
}

function ClipboardIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DismissButton({
  label,
  onClick,
  className = "",
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-black/8 hover:text-ink ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
      </svg>
    </button>
  );
}
