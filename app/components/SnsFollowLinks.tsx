"use client";

import { useSite } from "../lib/site";
import { FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from "../lib/site-config";

/** 院長ブログの下などに出す、Instagram・Facebook・YouTube への入口（1枚にまとめて縦に長くしない） */
export default function SnsFollowLinks({ className = "" }: { className?: string }) {
  const { lang } = useSite();
  const en = lang === "en";
  const links = [
    {
      href: INSTAGRAM_URL,
      label: "Instagram",
      note: en ? "Health tips in pictures" : "健康の話を画像で",
      cls: "border-[#E1306C]/25 text-[#C13584] hover:bg-[#E1306C]/5",
    },
    {
      href: FACEBOOK_URL,
      label: "Facebook",
      note: en ? "Daily updates" : "毎日の更新",
      cls: "border-[#1877F2]/25 text-[#1877F2] hover:bg-[#1877F2]/5",
    },
    {
      href: YOUTUBE_URL,
      label: "YouTube",
      note: en ? "60-second talks" : "院長の60秒動画",
      cls: "border-[#c00]/20 text-[#c00] hover:bg-[#FF0000]/5",
    },
  ].filter((l) => l.href);

  return (
    <div className={`rounded-3xl bg-surface/90 p-5 text-center shadow-card sm:p-6 ${className}`}>
      <p className="text-sm font-bold text-ink">
        {en ? "Follow us for new posts and our road to opening" : "新しい記事や開院までの様子は、SNSでもお届けしています"}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center rounded-2xl border bg-surface px-2 py-3 transition-colors ${l.cls}`}
          >
            <span className="text-sm font-bold">{l.label}</span>
            <span className="mt-0.5 text-[11px] leading-tight text-ink/55">{l.note}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
