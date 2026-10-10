"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "../lib/site";
import { BRAND } from "../lib/brand";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { t, lang } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface/90 shadow-card backdrop-blur-md" : "bg-surface/40 backdrop-blur-sm"
      }`}
    >
      {/* 建設準備中の控えめなお知らせ */}
      {noticeOpen && (
        <div role="status" className="bg-accent/90 text-ink/75">
          <div className="container-page flex items-center justify-center gap-2 py-1.5 text-center text-[12px] leading-relaxed sm:text-[13px]">
            <span aria-hidden="true">🌱</span>
            <p>
              {t.notice.lead}
              <strong className="font-medium text-primary-dark">
                {t.notice.strong}
              </strong>
              {t.notice.tail}
            </p>
            <button
              type="button"
              onClick={() => setNoticeOpen(false)}
              aria-label={t.notice.close}
              className="ml-1 hidden h-5 w-5 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-white/60 hover:text-ink sm:flex"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto flex min-h-24 w-full max-w-7xl items-center justify-between gap-2 overflow-visible px-4 sm:min-h-[6.5rem] sm:gap-4 sm:px-6 xl:px-8">
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-2 overflow-visible sm:gap-3.5"
          aria-label={t.common.toTop}
        >
          <Image
            src="/logo-emblem.png?v=2"
            alt={BRAND[lang].logoEmblemAlt}
            width={303}
            height={268}
            priority
            unoptimized
            className="header-brand-logo shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <span className="min-w-0 flex-1">
            <span className="header-brand-name">{BRAND[lang].primary}</span>
            <span className="header-brand-dept">{t.hero.subDept}</span>
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-2.5 xl:flex xl:gap-3 2xl:gap-4"
          aria-label={t.common.toTop}
        >
          {t.nav.map((link) =>
            link.children && link.children.length > 0 ? (
              <div key={link.href} className="group/nav relative shrink-0">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 whitespace-nowrap text-[13px] font-medium leading-none text-ink/80 transition-colors hover:text-primary 2xl:text-sm"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-[10px]">▾</span>
                </Link>
                <div className="invisible absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                  <div className="flex min-w-[11rem] flex-col gap-1 rounded-2xl bg-surface p-2 shadow-card">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="whitespace-nowrap rounded-xl px-3 py-2 text-[13px] font-medium text-ink/80 transition-colors hover:bg-accent hover:text-primary-dark"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 whitespace-nowrap text-[13px] font-medium leading-none text-ink/80 transition-colors hover:text-primary 2xl:text-sm"
              >
                {link.label}
              </Link>
            )
          )}
          <LanguageToggle className="shrink-0" />
          <Link
            href="/#register"
            className="shrink-0 whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark 2xl:px-5 2xl:text-sm"
          >
            {t.headerCta}
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 xl:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink"
            aria-label={open ? t.common.menuClose : t.common.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-6 rounded bg-current transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-y-auto bg-surface/95 backdrop-blur-md transition-[max-height,opacity] duration-300 xl:hidden ${
          open ? "max-h-[calc(100vh-6rem)] opacity-100 shadow-card" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="container-page flex flex-col gap-1 py-4"
          aria-label={t.common.toTop}
        >
          {t.nav.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-ink/90 transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
              {link.children && link.children.length > 0 && (
                <div className="ml-3 flex flex-col border-l border-ink/10 pl-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-accent hover:text-primary-dark"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/#register"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-base font-bold text-white"
          >
            {t.headerCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
