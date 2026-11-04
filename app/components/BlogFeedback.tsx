"use client";

import { useState, useSyncExternalStore } from "react";
import { useSite } from "../lib/site";
import { OPEN_CHAT_EVENT } from "./chat-events";

/**
 * ブログ記事の最後の「この記事は役に立ちましたか？」。押した数はHPには出さず、院長がダッシュボードで見る。
 * 一度押した記事は、この端末では「ありがとうございます」を表示したままにする（押し直しはしない）。
 */
export default function BlogFeedback({ slug, className = "" }: { slug: string; className?: string }) {
  const { t } = useSite();
  const f = t.blog.feedback;
  const storageKey = `blog-feedback:${slug}`;
  // この端末で前に押した答え（サーバー描画時は「未回答」）。保存できない環境でも、ボタンはそのまま使える
  const saved = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        const v = localStorage.getItem(storageKey);
        return v === "yes" || v === "no" ? v : null;
      } catch {
        return null;
      }
    },
    () => null
  );
  const [pressed, setPressed] = useState<"yes" | "no" | null>(null);
  const answer = pressed ?? saved;

  const send = (helpful: boolean) => {
    const value = helpful ? "yes" : "no";
    setPressed(value);
    try {
      localStorage.setItem(storageKey, value);
    } catch {}
    fetch("/api/blog-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, helpful }),
    }).catch(() => {});
  };

  return (
    <div className={`rounded-2xl border border-primary/20 bg-surface/90 px-5 py-4 text-center ${className}`}>
      {answer === null ? (
        <>
          <p className="text-sm font-bold text-ink">{f.question}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => send(true)}
              className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              {f.yes}
            </button>
            <button
              type="button"
              onClick={() => send(false)}
              className="rounded-full border border-primary/30 bg-white px-5 py-2 text-sm font-bold text-primary-dark transition-colors hover:bg-accent/60"
            >
              {f.no}
            </button>
          </div>
          <p className="mt-2 text-xs text-ink/55">{f.note}</p>
        </>
      ) : (
        <>
          <p className="text-sm font-bold text-ink">{f.thanks}</p>
          {answer === "no" && (
            <>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{f.noFollow}</p>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
              >
                {f.noButton}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
