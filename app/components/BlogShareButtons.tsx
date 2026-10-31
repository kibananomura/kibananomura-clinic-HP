"use client";

import { useState, useSyncExternalStore } from "react";
import { BASE_URL } from "../lib/seo";

/**
 * ブログ記事のシェアボタン（LINE・X・Facebook・リンクのコピー）。
 * スマホなど端末の共有機能が使える場合は、「その他のアプリで共有」も出す。
 */
export default function BlogShareButtons({ slug, title, lang }: { slug: string; title: string; lang: "ja" | "en" }) {
  const url = `${BASE_URL}/blog/${slug}`;
  const [copied, setCopied] = useState(false);
  // 端末の共有機能があるか（サーバー側では false。表示後にブラウザの値に切り替わる）
  const canNativeShare = useSyncExternalStore(
    () => () => {},
    () => typeof navigator.share === "function",
    () => false
  );

  const u = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const links = [
    { label: "LINE", href: `https://social-plugins.line.me/lineit/share?url=${u}`, className: "bg-line text-white hover:brightness-95" },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${text}`, className: "bg-ink text-white hover:bg-ink/85" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, className: "bg-[#1877F2] text-white hover:brightness-95" },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(lang === "en" ? "Copy this link" : "このリンクをコピーしてください", url);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // 共有をやめた場合などは何もしない
    }
  }

  const buttonBase = "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition";

  return (
    <div className="mt-10 rounded-3xl bg-surface/90 p-6 text-center shadow-card sm:p-7">
      <p className="text-sm font-bold text-ink">{lang === "en" ? "Share this post" : "この記事をシェアする"}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} ${l.className}`}
          >
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          className={`${buttonBase} border border-primary/30 bg-surface text-primary-dark hover:bg-accent`}
        >
          {copied ? (lang === "en" ? "Copied!" : "コピーしました") : lang === "en" ? "Copy link" : "リンクをコピー"}
        </button>
        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            className={`${buttonBase} border border-primary/30 bg-surface text-primary-dark hover:bg-accent`}
          >
            {lang === "en" ? "More…" : "その他のアプリ"}
          </button>
        )}
      </div>
    </div>
  );
}
