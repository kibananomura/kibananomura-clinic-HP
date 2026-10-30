"use client";

import { useSite } from "../lib/site";
import { OPEN_CHAT_EVENT } from "./chat-events";

/** 「〇〇をテーマにブログを書いてほしい」というご要望を、キバナビで受け付ける案内（ボタンでチャット窓が開く） */
export default function BlogRequestNote({ className = "" }: { className?: string }) {
  const { t } = useSite();
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
    </div>
  );
}
