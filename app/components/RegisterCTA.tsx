"use client";

import FadeIn from "./FadeIn";
import LineButton from "./LineButton";
import { useSite } from "../lib/site";

export default function RegisterCTA() {
  const { t } = useSite();

  return (
    <section id="register" className="relative overflow-hidden bg-primary py-20 sm:py-28">
      <div className="absolute -left-16 -top-16 h-64 w-64 bg-white/10 blob" aria-hidden="true" />
      <div className="absolute -bottom-20 -right-10 h-72 w-72 bg-white/10 blob" aria-hidden="true" />

      <div className="container-page relative text-center text-white">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            <span aria-hidden="true">🌸</span>
            {t.register.badge}
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-bold leading-relaxed sm:text-4xl">
            {t.register.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
            {t.register.body}
          </p>

          <div className="mt-9 flex justify-center">
            <LineButton label={t.register.button} size="lg" className="!bg-line shadow-xl" />
          </div>

          <p className="mt-5 text-xs text-white/70">{t.register.note}</p>
        </FadeIn>
      </div>
    </section>
  );
}
