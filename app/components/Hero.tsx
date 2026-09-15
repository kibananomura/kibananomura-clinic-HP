"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import LineButton from "./LineButton";
import { useSite } from "../lib/site";

export default function Hero() {
  const { t } = useSite();
  const [openGuide, setOpenGuide] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 page-top sm:flex sm:min-h-[100svh] sm:items-start"
    >
      {/* PC: 背景いっぱいに地図を敷き、テキストを重ねる */}
      <div className="hidden sm:block">
        <HeroBackground />
      </div>

      <div className="container-page">
        {/* スマホ: 地図はバナーとして上に、テキストはその下に配置 */}
        <div className="-mx-5 mb-7 h-52 overflow-hidden sm:hidden">
          <img
            src="/hero-map.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="max-w-2xl">
          <motion.div
            className="hidden sm:block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-4 py-1.5 text-sm font-bold text-primary-dark shadow-sm ring-1 ring-primary/15 backdrop-blur transition-colors hover:bg-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" />
              </svg>
              {t.hero.careersBadge}
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          <motion.h1
            className="mt-6 text-[22px] font-bold leading-[1.45] text-ink [text-wrap:balance] sm:text-[34px] sm:[word-break:keep-all] lg:text-[42px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t.hero.titleLines.map((line, li) => (
              <span key={li} className="block">
                {line.map((chunk, ci) => (
                  <span
                    key={ci}
                    className={`inline-block ${
                      li === 1 && ci === 1 ? "text-primary" : ""
                    }`}
                  >
                    {chunk}
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-medium text-ink/80 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="whitespace-nowrap">{t.hero.subOpen}</span>
          </motion.p>

          <motion.div
            className="mt-8 hidden gap-3 sm:flex sm:flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <LineButton label={t.hero.ctaLine} size="lg" />
            <button
              type="button"
              onClick={() => setOpenGuide((v) => !v)}
              aria-expanded={openGuide}
              aria-controls="hero-quick-guide"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-primary/30 bg-white/70 px-7 py-4 text-base font-bold text-primary-dark backdrop-blur transition-colors hover:border-primary hover:bg-white"
            >
              {t.hero.ctaGuide}
              <svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 transition-transform ${openGuide ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>

          <AnimatePresence initial={false}>
            {openGuide && (
              <motion.div
                id="hero-quick-guide"
                key="guide"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid gap-3 rounded-3xl border border-primary/15 bg-white/80 p-5 backdrop-blur sm:grid-cols-3">
                  {t.hero.guide.map((item) => (
                    <div key={item.title}>
                      <p className="text-sm font-bold text-primary-dark">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/75">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  <a
                    href="/services"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t.hero.guideLink}
                  </a>
                  <Link
                    href="/first-visit"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t.hero.firstVisitLink}
                  </Link>
                  <Link
                    href="/faq"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t.hero.faqLink}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            className="mt-7 flex flex-wrap items-center gap-2 text-sm text-ink/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-primary/10 backdrop-blur-sm">
              <Dot /> {t.hero.supp1}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-primary/10 backdrop-blur-sm">
              <Dot /> {t.hero.supp2}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-primary/10 backdrop-blur-sm">
              <Dot /> {t.hero.supp3}
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />;
}
