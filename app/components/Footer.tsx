"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "../lib/site";
import {
  PATIENT_LINK_PAGE,
  getFooterHighlightLinks,
} from "../lib/patient-links";
import { BRAND } from "../lib/brand";

export default function Footer() {
  const { t, lang } = useSite();
  const linkCopy = PATIENT_LINK_PAGE[lang];
  const highlightLinks = getFooterHighlightLinks(lang);

  return (
    <footer className="bg-ink text-white/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="group -ml-1 inline-block"
            aria-label={t.common.toTop}
          >
            <Image
              src="/logo.png"
              alt={BRAND[lang].logoAlt}
              width={1024}
              height={558}
              className="h-20 w-auto max-w-[14rem] object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-24 sm:max-w-[16rem] lg:h-28 lg:max-w-[18rem]"
            />
          </Link>
          <p className="mt-2 text-xs text-white/50">
            {BRAND[lang].withSub}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
            {t.footer.tagline}
          </p>
          <p className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
            {t.footer.badge}
          </p>
        </div>

        <nav aria-label={t.footer.menuHeading}>
          <h2 className="text-sm font-bold text-white">{t.footer.menuHeading}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {t.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={linkCopy.footerHeading}>
          <h2 className="text-sm font-bold text-white">{linkCopy.footerHeading}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {highlightLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/links"
                className="font-bold text-primary-light transition-colors hover:text-white"
              >
                {linkCopy.viewAll}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold text-white">
            {t.footer.deptHeading}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            {t.footer.deptItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-7 text-sm font-bold text-white">
            {t.footer.snsHeading}
          </h2>
          <div className="mt-4 flex gap-3">
            <a
              href="https://line.me/R/ti/p/@159yebck"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.lineAria}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-line"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.58 7.48 8.41 8.12.33.07.78.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.89.55 1.09-.46 5.86-3.45 8-5.91 1.47-1.62 2.18-3.27 2.18-5.04C22 5.69 17.52 2 12 2Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label={t.footer.instaAria}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {BRAND[lang].copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-end">
            <Link href="/first-visit" className="text-white/60 transition-colors hover:text-white">
              {t.footer.firstVisitLabel}
            </Link>
            <Link href="/symptoms" className="text-white/60 transition-colors hover:text-white">
              症状から探す
            </Link>
            <Link href="/faq" className="text-white/60 transition-colors hover:text-white">
              {t.footer.faqLabel}
            </Link>
            <Link href="/contact" className="text-white/60 transition-colors hover:text-white">
              {t.footer.contactLabel}
            </Link>
            <Link href="/blog" className="text-white/60 transition-colors hover:text-white">
              {t.footer.blogLabel}
            </Link>
            <Link href="/news" className="text-white/60 transition-colors hover:text-white">
              {t.footer.newsLabel}
            </Link>
            <Link href="/careers" className="text-white/60 transition-colors hover:text-white">
              {t.footer.careersLabel}
            </Link>
            <Link href="/privacy" className="text-white/60 transition-colors hover:text-white">
              {t.footer.privacyLabel}
            </Link>
            <Link href="/tokushoho" className="text-white/60 transition-colors hover:text-white">
              {t.footer.tokushohoLabel}
            </Link>
            <p>{t.footer.copyrightDept}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
