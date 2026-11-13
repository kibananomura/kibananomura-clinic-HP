"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { useSite } from "../lib/site";
import { posts, getPost, getContent } from "../lib/blog";
import { SNS_FEATURED } from "../lib/sns-featured";

/** Instagram のプロフィールのリンク先。紹介した記事を新しい順に、大きな表紙つきで並べる */
export default function SnsPageClient() {
  const { lang } = useSite();
  const ja = lang === "ja";
  type Item = { key: string; href: string; title: string; cover?: string; date?: string };
  const featured: Item[] = SNS_FEATURED.flatMap((f): Item[] => {
    if (f.slug) {
      const p = getPost(f.slug);
      if (!p) return [];
      const c = getContent(p, lang);
      return [{ key: f.slug, href: `/blog/${f.slug}`, title: c.title, cover: p.cover, date: p.date }];
    }
    return [{ key: f.href!, href: f.href!, title: (ja ? f.ja : f.en) ?? "" }];
  });
  const shown = new Set(SNS_FEATURED.map((f) => f.slug).filter(Boolean));
  const latest = [...posts].reverse().filter((p) => !shown.has(p.slug)).slice(0, 4);

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            eyebrow="Instagram"
            title={ja ? "Instagramで紹介した記事" : "Posts featured on Instagram"}
            as="h1"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-ink/75">
            {ja
              ? "見てくださってありがとうございます。いちばん上が、最近紹介した記事です。"
              : "Thank you for visiting. The most recently featured post is at the top."}
          </p>
        </FadeIn>

        <ul className="mx-auto mt-8 grid max-w-3xl gap-4">
          {featured.map((f, i) => (
            <FadeIn as="li" key={f.key} delay={Math.min(i, 4) * 0.05}>
              <Link
                href={f.href}
                className="group flex items-center gap-4 rounded-2xl bg-surface/90 p-3 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft sm:p-4"
              >
                {f.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={f.cover}
                    alt=""
                    className="aspect-video w-32 shrink-0 rounded-xl object-cover sm:w-44"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                ) : (
                  <span className="flex aspect-video w-32 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-primary-dark sm:w-44">
                    {ja ? "募集" : "Careers"}
                  </span>
                )}
                <span className="min-w-0">
                  {i === 0 && (
                    <span className="mb-1 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
                      {ja ? "最新" : "Latest"}
                    </span>
                  )}
                  <span className="block text-[15px] font-bold leading-snug text-ink group-hover:text-primary-dark">
                    {f.title}
                  </span>
                  {f.date && <span className="mt-1 block text-xs text-ink/60">{f.date}</span>}
                </span>
              </Link>
            </FadeIn>
          ))}
        </ul>

        <FadeIn delay={0.1}>
          <h2 className="mx-auto mt-12 max-w-3xl text-base font-bold text-ink">
            {ja ? "そのほかの新しい記事" : "Other recent posts"}
          </h2>
          <ul className="mx-auto mt-3 grid max-w-3xl gap-2">
            {latest.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="block rounded-xl bg-surface/80 px-4 py-3 text-sm font-bold text-ink hover:text-primary-dark">
                  {getContent(p, lang).title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/blog" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-soft">
              {ja ? "院長ブログの一覧へ" : "All blog posts"}
            </Link>
            <Link href="/about" className="rounded-full border border-primary/40 bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark">
              {ja ? "当院の想い" : "Our Purpose"}
            </Link>
            <Link href="/" className="rounded-full border border-primary/40 bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark">
              {ja ? "トップページ" : "Home"}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
