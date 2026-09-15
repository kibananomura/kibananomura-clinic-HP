"use client";

import { useSite } from "../lib/site";

/**
 * PC表示／スマホ表示を切り替えるフローティングコントロール。
 * 画面右下に常時表示し、枠の外側に置くことでどちらの表示でも操作できる。
 */
export default function DevicePreviewToggle() {
  const { device, setDevice, t } = useSite();

  return (
    <div
      className="fixed bottom-[5.75rem] right-4 z-[70] flex items-center gap-1 rounded-full border border-ink/10 bg-surface/95 p-1 shadow-soft backdrop-blur sm:bottom-4"
      role="group"
      aria-label={t.common.deviceSwitch}
    >
      <button
        type="button"
        onClick={() => setDevice("desktop")}
        aria-pressed={device === "desktop"}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
          device === "desktop"
            ? "bg-primary text-white"
            : "text-muted hover:text-ink"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" strokeLinecap="round" />
        </svg>
        {t.common.deviceDesktop}
      </button>
      <button
        type="button"
        onClick={() => setDevice("mobile")}
        aria-pressed={device === "mobile"}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
          device === "mobile"
            ? "bg-primary text-white"
            : "text-muted hover:text-ink"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <path d="M11 18h2" strokeLinecap="round" />
        </svg>
        {t.common.deviceMobile}
      </button>
    </div>
  );
}
