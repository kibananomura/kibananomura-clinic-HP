"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "../../components/FadeIn";
import { SoftBlob } from "../../components/Decor";
import MedicalWebPageJsonLd from "../../components/MedicalWebPageJsonLd";
import ArticleSupervisor from "../../components/ArticleSupervisor";
import PreOpeningAlert from "../../components/PreOpeningAlert";
import LineLink from "../../components/LineLink";
import InlineRichText from "../../components/InlineRichText";
import PollenCalendarKyushu from "../../components/PollenCalendarKyushu";
import AllergenSourcesIllustration from "../../components/AllergenSourcesIllustration";
import { useSite } from "../../lib/site";
import {
  DISEASE_CATEGORY_LABEL,
  DISEASE_DISCLAIMER_INTRO,
  DISEASE_DISCLAIMER_OUTRO,
  getDiseaseContent,
  type DiseaseEntry,
} from "../../lib/disease-shared";
import type { RelatedLink } from "../../lib/related-content";
import { withWbr } from "../../lib/jp-break";

const UI_TEXT = {
  ja: {
    pathology: "病態",
    tests: "検査方法",
    treatment: "治療法",
    tip: "💡 一口メモ",
    pricingLink: "料金ページへ →",
    sources: "出典",
    backToList: "疾患一覧へ戻る",
    relatedPosts: "関連する院長ブログ",
  },
  en: {
    pathology: "What's happening",
    tests: "Tests",
    treatment: "Treatment",
    tip: "💡 A quick note",
    pricingLink: "View pricing →",
    sources: "Sources",
    backToList: "Back to all conditions",
    relatedPosts: "Related posts from the director's blog",
  },
};

function Block({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-primary-dark">{heading}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
        <InlineRichText text={body} />
      </p>
    </div>
  );
}

export default function DiseasePageClient({
  disease,
  relatedPosts = [],
}: {
  disease: DiseaseEntry | undefined;
  relatedPosts?: RelatedLink[];
}) {
  const { t, lang } = useSite();

  if (!disease) {
    notFound();
  }

  const c = getDiseaseContent(disease, lang);
  const ui = UI_TEXT[lang];

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />

      <MedicalWebPageJsonLd
        name={c.title}
        description={c.summary}
        url={`/diseases/${disease.slug}`}
        lastReviewed={disease.lastReviewed}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          {/* ページタイトル（LCP対象になりやすいため、アニメーションで初期非表示にせず即時描画する） */}
          <div>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
              {DISEASE_CATEGORY_LABEL[disease.category]}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
              {withWbr(c.title)}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
              {c.summary}
            </p>
          </div>

          <FadeIn delay={0.03}>
            <p className="mt-6 rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {DISEASE_DISCLAIMER_INTRO[lang]}
            </p>
          </FadeIn>

          <FadeIn delay={0.06} className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
            <Block heading={ui.pathology} body={c.pathology} />
            <Block heading={ui.tests} body={c.tests} />
            <Block heading={ui.treatment} body={c.treatment} />
            <div className="mt-6 rounded-2xl bg-accent/50 p-5">
              <h2 className="text-sm font-bold text-primary-dark">{ui.tip}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                <InlineRichText text={c.tip} />
              </p>
            </div>

            {disease.slug === "hay-fever" && <PollenCalendarKyushu />}
            {disease.slug === "allergic-rhinitis" && <AllergenSourcesIllustration />}

            {disease.pricingLinkNote && (
              <Link
                href="/pricing"
                className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-surface px-5 py-4 text-sm text-ink/80 transition-colors hover:bg-accent/60"
              >
                <span>{disease.pricingLinkNote}</span>
                <span className="shrink-0 font-bold text-primary-dark">
                  {ui.pricingLink}
                </span>
              </Link>
            )}

            {disease.sources && disease.sources.length > 0 && (
              <div className="mt-6 border-t border-accent pt-4">
                <p className="text-xs font-bold text-ink/50">{ui.sources}</p>
                <ul className="mt-1.5 space-y-1">
                  {disease.sources.map((source) => (
                    <li key={source.label} className="text-xs leading-relaxed text-ink/60">
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-ink/30 underline-offset-2 hover:text-primary-dark"
                        >
                          {source.label}
                        </a>
                      ) : (
                        source.label
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FadeIn>

          {relatedPosts.length > 0 && (
            <FadeIn className="mt-8 rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
              <h2 className="text-base font-bold text-primary-dark">{ui.relatedPosts}</h2>
              <ul className="mt-3 space-y-2">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-primary/15 px-4 py-3 text-sm font-bold text-ink transition-colors hover:bg-accent/60 hover:text-primary-dark"
                    >
                      <span className="jp-wrap">{withWbr(lang === "en" ? p.titleEn : p.titleJa)}</span>
                      <span aria-hidden="true" className="shrink-0 text-primary">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}

          {c.subsections && c.subsections.length > 0 && (
            <div className="mt-8 space-y-6">
              {c.subsections.map((sub) => (
                <FadeIn
                  key={sub.title}
                  className="rounded-[1.75rem] border border-primary/15 bg-surface/80 p-7 shadow-card"
                >
                  <h2 className="text-base font-bold text-ink">{sub.title}</h2>
                  <Block heading={ui.pathology} body={sub.pathology} />
                  <Block heading={ui.tests} body={sub.tests} />
                  <Block heading={ui.treatment} body={sub.treatment} />
                  <div className="mt-6 rounded-2xl bg-accent/50 p-5">
                    <h3 className="text-sm font-bold text-primary-dark">{ui.tip}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                      <InlineRichText text={sub.tip} />
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}

          <FadeIn delay={0.12} className="mt-10">
            <p className="rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {DISEASE_DISCLAIMER_OUTRO[lang]}
            </p>
          </FadeIn>

          <FadeIn delay={0.13}>
            <PreOpeningAlert />
          </FadeIn>

          <FadeIn delay={0.14}>
            <ArticleSupervisor />
          </FadeIn>

          <FadeIn delay={0.16} className="mt-8 rounded-[1.75rem] bg-surface/90 p-7 text-center shadow-card">
            <p className="text-sm font-bold text-primary-dark">{t.register.heading}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{t.register.body}</p>
            <LineLink className="mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark">
              {t.register.button}
              <span aria-hidden="true">→</span>
            </LineLink>
          </FadeIn>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/diseases"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              {ui.backToList}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              {t.common.backHome}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
