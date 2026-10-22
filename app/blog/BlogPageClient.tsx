"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, LeafSprig } from "../components/Decor";
import { useSite } from "../lib/site";
import { posts, getContent, type BlogPost } from "../lib/blog";

// カテゴリの表示順（院長ブログで実際に使われているカテゴリに対応）。
// ここにないカテゴリの記事があった場合は、末尾に自動的にまとめて表示される。
const CATEGORY_ORDER: { ja: string; en: string }[] = [
  { ja: "健康・予防の話", en: "Health and prevention" },
  { ja: "クリニックのこと", en: "About the clinic" },
  { ja: "開業への想い", en: "Why we're opening" },
  { ja: "院長のキャリア", en: "Director's career" },
  { ja: "院長のメッセージ", en: "A message from the director" },
  { ja: "ごあいさつ", en: "Greeting" },
];

function sortNewestFirst(list: BlogPost[]): BlogPost[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export default function BlogPageClient() {
  const { t, lang } = useSite();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 言語に依存しない「カテゴリの識別子」として常に日本語ラベルを使う
  // （post.ja.category は言語に関わらず一意なキーとして使える）。
  const groups = useMemo(() => {
    const byJaCategory = new Map<string, BlogPost[]>();
    for (const post of posts) {
      const key = post.ja.category;
      const list = byJaCategory.get(key) ?? [];
      list.push(post);
      byJaCategory.set(key, list);
    }

    const ordered: { key: string; label: string; posts: BlogPost[] }[] = [];
    for (const entry of CATEGORY_ORDER) {
      const list = byJaCategory.get(entry.ja);
      if (!list || list.length === 0) continue;
      ordered.push({
        key: entry.ja,
        label: lang === "en" ? entry.en : entry.ja,
        posts: sortNewestFirst(list),
      });
      byJaCategory.delete(entry.ja);
    }
    // CATEGORY_ORDER未掲載のカテゴリが今後増えた場合に備えたフォールバック
    for (const [key, list] of byJaCategory) {
      ordered.push({
        key,
        label: getContent(list[0], lang).category,
        posts: sortNewestFirst(list),
      });
    }
    return ordered;
  }, [lang]);

  const visibleGroups = activeCategory
    ? groups.filter((g) => g.key === activeCategory)
    : groups;

  function PostCard({ post, delay }: { post: BlogPost; delay: number }) {
    const c = getContent(post, lang);
    return (
      <FadeIn as="article" delay={delay}>
        <Link
          href={`/blog/${post.slug}`}
          className="group block rounded-2xl bg-surface/90 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft sm:p-6"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <time className="font-bold text-primary-dark">{post.date}</time>
            <span className="rounded-full bg-accent px-2.5 py-0.5 font-bold text-primary-dark">
              {c.category}
            </span>
          </div>
          <h2 className="mt-2 text-lg font-bold text-ink transition-colors group-hover:text-primary-dark">
            {c.title}
          </h2>
          <p className="mt-2 line-clamp-1 text-sm leading-relaxed text-ink/70">
            {c.excerpt}
          </p>
          <span className="mt-3 inline-block text-sm font-bold text-primary transition-colors group-hover:text-primary-dark">
            {t.blog.readMore}
          </span>
        </Link>
      </FadeIn>
    );
  }

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -right-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.blog.eyebrow} title={t.blog.heading} as="h1" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-relaxed text-ink/75">
            {t.blog.intro}
          </p>
        </FadeIn>

        {/* カテゴリ絞り込みチップ */}
        <FadeIn delay={0.08}>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-pressed={activeCategory === null}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                activeCategory === null
                  ? "bg-primary text-white shadow-soft"
                  : "bg-surface text-ink/70 hover:bg-accent"
              }`}
            >
              {t.blog.allCategories}
              <span className="ml-1 opacity-70">
                ({posts.length}
                {t.blog.postCountSuffix})
              </span>
            </button>
            {groups.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setActiveCategory(g.key)}
                aria-pressed={activeCategory === g.key}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  activeCategory === g.key
                    ? "bg-primary text-white shadow-soft"
                    : "bg-surface text-ink/70 hover:bg-accent"
                }`}
              >
                {g.label}
                <span className="ml-1 opacity-70">
                  ({g.posts.length}
                  {t.blog.postCountSuffix})
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="mx-auto mt-10 max-w-3xl space-y-12">
          {visibleGroups.map((g) => (
            <div key={g.key}>
              {/* 「すべて」表示時のみ見出しを出し、特定カテゴリ選択時は一覧だけを見せる */}
              {activeCategory === null && (
                <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-primary-dark">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {g.label}
                  <span className="font-medium text-ink/50">
                    （{g.posts.length}
                    {t.blog.postCountSuffix}）
                  </span>
                </h2>
              )}
              <div className="flex flex-col gap-4">
                {g.posts.map((post, i) => (
                  <PostCard key={post.slug} post={post} delay={(i % 4) * 0.05} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
          >
            <span aria-hidden="true">←</span>
            {t.common.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
