"use client";

import Link from "next/link";
import { useSite } from "../lib/site";

/**
 * 記事・解説ページの上部に出す「今どこにいるか」の道しるべ（例：トップ ＞ 病気について調べる ＞ 高血圧）。
 * 一覧ページの名前はメニュー（t.nav）と同じ言葉を使う。Google向けの BreadcrumbJsonLd とは別に、画面に表示する。
 */
export default function Breadcrumbs({ parentHref, current }: { parentHref: string; current: string }) {
  const { t, lang } = useSite();
  const parentLabel = t.nav.find((n) => n.href === parentHref)?.label ?? parentHref;

  return (
    <nav aria-label={lang === "en" ? "Breadcrumb" : "現在の位置"} className="mb-5 text-xs text-ink/60 sm:text-sm">
      <ol className="flex min-w-0 items-center gap-1.5">
        <li className="shrink-0">
          <Link href="/" className="underline-offset-2 hover:text-primary-dark hover:underline">
            {lang === "en" ? "Home" : "トップ"}
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0">›</li>
        <li className="shrink-0">
          <Link href={parentHref} className="font-bold text-primary-dark underline-offset-2 hover:underline">
            {parentLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0">›</li>
        <li aria-current="page" className="min-w-0 truncate">
          {current}
        </li>
      </ol>
    </nav>
  );
}
