"use client";

import { useSite } from "../lib/site";
import { OPEN_CHAT_EVENT } from "./chat-events";
import { FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from "../lib/site-config";

/**
 * 「〇〇をテーマにブログを書いてほしい」というご要望を、キバナビで受け付ける案内（ボタンでチャット窓が開く）。
 * showSns：Instagram・Facebook・YouTube への小さなリンク（記事ページでは SnsFollowLinks を別に出すので消す）
 * showMail：記事やご質問のメール窓口（記事ページで、別のカードにせずここにまとめる）
 */
export default function BlogRequestNote({
  className = "",
  showSns = true,
  showMail = false,
}: {
  className?: string;
  showSns?: boolean;
  showMail?: boolean;
}) {
  const { t, lang } = useSite();
  const sns = [
    { href: INSTAGRAM_URL, label: "Instagram" },
    { href: FACEBOOK_URL, label: "Facebook" },
    { href: YOUTUBE_URL, label: "YouTube" },
  ].filter((l) => l.href);
  return (
    <div className={`rounded-2xl border border-primary/20 bg-accent/50 px-5 py-4 text-center ${className}`}>
      <p className="text-sm leading-relaxed text-ink/80">{t.blog.requestNote.body}</p>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
      >
        {t.blog.requestNote.button}
      </button>
      {showMail && (
        <p className="mt-3 text-xs leading-relaxed text-ink/60">
          {lang === "en" ? "Questions about this article or our opening: " : "記事や開業準備についてのご質問は "}
          <a href="mailto:contact@kibananomura.jp" className="font-bold text-primary underline-offset-2 hover:underline">
            contact@kibananomura.jp
          </a>
          {lang === "en" ? "" : " へ"}
        </p>
      )}
      {showSns && (
        <p className="mt-3 text-xs text-ink/60">
          {lang === "en" ? "New posts are also announced on " : "新しい記事は "}
          {sns.map((l, i) => (
            <span key={l.label}>
              {i > 0 && "・"}
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline-offset-2 hover:underline">
                {l.label}
              </a>
            </span>
          ))}
          {lang === "en" ? "." : " でもお知らせしています"}
        </p>
      )}
    </div>
  );
}
