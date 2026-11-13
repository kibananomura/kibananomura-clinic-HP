"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import { useSite } from "../lib/site";

/** ホームの院長あいさつの上に置く、パーパス1行（Whyから始める）。詳しくは /about */
export default function PurposeBand() {
  const { t } = useSite();
  return (
    <section className="bg-cream pt-12 sm:pt-16" aria-label={t.about.bandLabel}>
      <FadeIn>
        <div className="container-page text-center">
          <p className="text-xs font-bold tracking-wide text-primary-dark">{t.about.bandLabel}</p>
          <p className="mt-2 text-xl font-bold leading-snug text-ink sm:text-2xl">{t.mission.purpose}</p>
          <Link href="/about" className="mt-3 inline-block text-sm font-bold text-primary underline-offset-4 hover:underline">
            {t.about.bandLink}
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
