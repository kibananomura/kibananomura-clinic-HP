"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import FadeIn from "../../components/FadeIn";
import { SoftBlob } from "../../components/Decor";
import MedicalWebPageJsonLd from "../../components/MedicalWebPageJsonLd";
import InlineRichText from "../../components/InlineRichText";
import { useSite } from "../../lib/site";
import {
  DISEASE_CATEGORY_LABEL,
  DISEASE_DISCLAIMER_INTRO,
  DISEASE_DISCLAIMER_OUTRO,
  getDisease,
} from "../../lib/diseases-data";

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

export default function DiseasePageClient() {
  const { t } = useSite();
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const disease = getDisease(slug);

  if (!disease) {
    notFound();
  }

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />

      <MedicalWebPageJsonLd
        name={disease.title}
        description={disease.summary}
        url={`/diseases/${disease.slug}`}
        lastReviewed={disease.lastReviewed}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
              {DISEASE_CATEGORY_LABEL[disease.category]}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
              {disease.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
              {disease.summary}
            </p>
          </FadeIn>

          <FadeIn delay={0.03}>
            <p className="mt-6 rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              {DISEASE_DISCLAIMER_INTRO}
            </p>
          </FadeIn>

          <FadeIn delay={0.06} className="rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
            <Block heading="病態" body={disease.pathology} />
            <Block heading="検査方法" body={disease.tests} />
            <Block heading="治療法" body={disease.treatment} />
            <div className="mt-6 rounded-2xl bg-accent/50 p-5">
              <h2 className="text-sm font-bold text-primary-dark">💡 一口メモ</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                <InlineRichText text={disease.tip} />
              </p>
            </div>
          </FadeIn>

          {disease.subsections && disease.subsections.length > 0 && (
            <div className="mt-8 space-y-6">
              {disease.subsections.map((sub) => (
                <FadeIn
                  key={sub.title}
                  className="rounded-[1.75rem] border border-primary/15 bg-surface/80 p-7 shadow-card"
                >
                  <h2 className="text-base font-bold text-ink">{sub.title}</h2>
                  <Block heading="病態" body={sub.pathology} />
                  <Block heading="検査方法" body={sub.tests} />
                  <Block heading="治療法" body={sub.treatment} />
                  <div className="mt-6 rounded-2xl bg-accent/50 p-5">
                    <h3 className="text-sm font-bold text-primary-dark">💡 一口メモ</h3>
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
              {DISEASE_DISCLAIMER_OUTRO}
            </p>
          </FadeIn>

          <FadeIn delay={0.16} className="mt-8 text-center">
            <a
              href="https://line.me/R/ti/p/@337njouw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              {t.register.button}
              <span aria-hidden="true">→</span>
            </a>
          </FadeIn>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/diseases"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              疾患一覧へ戻る
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
