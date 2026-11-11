"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { SoftBlob } from "../../components/Decor";
import BlogRichText from "../../components/BlogRichText";
import { useSite } from "../../lib/site";
import { getPost, getContent, getAdjacentPosts, getSeriesNumber, seriesLabel } from "../../lib/blog";
import type { RelatedLink } from "../../lib/related-content";
import { withWbr } from "../../lib/jp-break";
import BlogRequestNote from "../../components/BlogRequestNote";
import BlogFeedback from "../../components/BlogFeedback";
import ShareButtons from "../../components/ShareButtons";
import { FACEBOOK_URL } from "../../lib/site-config";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function BlogArticle({ relatedDiseases = [] }: { relatedDiseases?: RelatedLink[] }) {
  const { t, lang } = useSite();
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const c = getContent(post, lang);
  const { prev, next } = getAdjacentPosts(post.slug);

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs parentHref="/blog" current={c.title} />
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
            <Image
              src={post.cover}
              alt={c.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className={`object-cover ${post.coverPosition ?? "object-center"}`}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <time className="font-bold text-primary-dark">{post.date}</time>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
              {c.category}
            </span>
            {getSeriesNumber(post) && (
              <span className="rounded-full border border-primary/30 px-3 py-1 text-xs font-bold text-primary-dark/80">
                {seriesLabel(getSeriesNumber(post)!, lang)}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
            {withWbr(c.title)}
          </h1>

          <p className="mt-3 text-xs leading-relaxed text-ink/55">
            {lang === "en" ? "Written and reviewed by " : "執筆・確認："}
            <a
              href="https://researchmap.jp/shinsuke_nomura"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary-dark underline decoration-primary/30 underline-offset-2"
            >
              {lang === "en" ? "Shinsuke Nomura, MD, Director" : "院長 野村信介（医師）"}
            </a>
            <span className="mx-1.5 text-ink/30">|</span>
            {lang === "en" ? "Last reviewed: " : "確認日："}
            <time dateTime={post.date.replace(/\./g, "-")}>{post.date}</time>
          </p>

          <div className="mt-8 space-y-5">
            {c.body.map((block, i) =>
              block.kind === "text" ? (
                <BlogRichText key={i} text={block.text} />
              ) : (
                <figure key={i} className="my-8">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
                    <Image
                      src={block.src}
                      alt={block.caption ?? ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="mt-2 text-center text-xs text-ink/55">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )
            )}
          </div>

          {post.sources && post.sources.length > 0 && (
            <div className="mt-10 border-t border-accent pt-5">
              <p className="text-sm font-bold text-ink/60">
                {lang === "en" ? "References" : "参考にした資料"}
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                {post.sources.map((source) => (
                  <li key={source.label} className="text-xs leading-relaxed text-ink/60">
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words underline decoration-ink/30 underline-offset-2 hover:text-primary-dark"
                      >
                        {source.label}
                      </a>
                    ) : (
                      source.label
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-ink/45">
                {lang === "en"
                  ? "This article reflects the information available when it was written. For your own symptoms and treatment, please consult a doctor."
                  : "記事の内容は、執筆時点の資料にもとづいています。ご自身の症状や治療については、医師にご相談ください。"}
              </p>
            </div>
          )}

          <ShareButtons path={`/blog/${post.slug}`} title={c.title} lang={lang} />

          {relatedDiseases.length > 0 && (
            <div className="mt-10 rounded-3xl bg-surface/90 p-6 shadow-card sm:p-7">
              <p className="text-base font-bold text-primary-dark">
                {lang === "en" ? "Learn more about the condition" : "関連する病気の解説"}
              </p>
              <ul className="mt-3 space-y-2">
                {relatedDiseases.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/diseases/${d.slug}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-primary/15 px-4 py-3 text-sm font-bold text-ink transition-colors hover:bg-accent/60 hover:text-primary-dark"
                    >
                      <span className="jp-wrap">{withWbr(lang === "en" ? d.titleEn : d.titleJa)}</span>
                      <span aria-hidden="true" className="shrink-0 text-primary">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {((post.related && post.related.length > 0) || (post.upcoming && post.upcoming.length > 0)) && (
            <div className="mt-6 rounded-3xl bg-surface/90 p-6 shadow-card sm:p-7">
              <p className="text-base font-bold text-primary-dark">
                {lang === "en" ? "Related posts from the director" : "関連する院長ブログ"}
              </p>
              <ul className="mt-3 space-y-2">
                {post.related?.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-primary/15 px-4 py-3 text-sm font-bold text-ink transition-colors hover:bg-accent/60 hover:text-primary-dark"
                    >
                      <span className="jp-wrap">{withWbr(lang === "en" ? r.en : r.ja)}</span>
                      <span aria-hidden="true" className="shrink-0 text-primary">→</span>
                    </Link>
                  </li>
                ))}
                {post.upcoming?.map((u) => (
                  <li
                    key={u.ja}
                    className="flex flex-col items-start gap-1.5 rounded-2xl border border-dashed border-primary/25 px-4 py-3 text-sm text-ink/60"
                  >
                    <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-primary-dark">
                      {lang === "en" ? "Coming soon" : "近日公開"}
                    </span>
                    <span className="jp-wrap">{withWbr(lang === "en" ? u.en : u.ja)}</span>
                  </li>
                ))}
              </ul>
              {post.upcoming && post.upcoming.length > 0 && (
                <p className="mt-3 text-xs leading-relaxed text-ink/45">
                  {lang === "en"
                    ? "Upcoming posts and their order may change."
                    : "公開予定の記事や順番は、変わることがあります。"}
                </p>
              )}
            </div>
          )}

          <BlogFeedback slug={post.slug} className="mt-12" />

          <BlogRequestNote className="mt-6" />

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-[#1877F2]/25 bg-surface/90 px-5 py-4 text-sm shadow-card transition-colors hover:bg-[#1877F2]/5"
          >
            <span className="leading-relaxed text-ink/80">
              {lang === "en"
                ? "We post new blog articles and updates on our road to opening every day on Facebook."
                : "Facebookページでも、院長ブログや開院までの準備の様子を毎日お届けしています。"}
            </span>
            <span className="shrink-0 font-bold text-[#1877F2]">{lang === "en" ? "Follow →" : "フォローする →"}</span>
          </a>

          <div className="mt-6 rounded-3xl bg-surface/90 p-6 text-center shadow-card sm:p-8">
            <p className="text-base font-bold text-ink">
              {t.blog.contactCta.heading}
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
              {t.blog.contactCta.body}
            </p>
            <a
              href="mailto:contact@kibananomura.jp"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              {t.blog.contactCta.button}
            </a>
          </div>

          <nav className="mt-12 grid gap-4 border-t border-accent pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-2xl bg-surface/90 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="text-xs font-bold text-primary">
                  ← {t.blog.prev}
                </span>
                <p className="jp-wrap mt-1 text-sm font-bold text-ink group-hover:text-primary-dark">
                  {withWbr(getContent(prev, lang).title)}
                </p>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-2xl bg-surface/90 p-5 text-right shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="text-xs font-bold text-primary">
                  {t.blog.next} →
                </span>
                <p className="jp-wrap mt-1 text-sm font-bold text-ink group-hover:text-primary-dark">
                  {withWbr(getContent(next, lang).title)}
                </p>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
          </nav>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              {t.blog.backToList}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              {t.common.backHome}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
