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

// 「健康・予防の話」のサブ分類の表示順（記事の subcategory_ja に対応）。
// ここにないサブ分類の記事があった場合は、末尾に自動的に表示される。
const HEALTH_CATEGORY = "健康・予防の話";
const SUBCATEGORY_ORDER: { ja: string; en: string }[] = [
  { ja: "感染症・ワクチン", en: "Infections & vaccines" },
  { ja: "胃腸・消化器", en: "Stomach & digestion" },
  { ja: "肺・呼吸器", en: "Lungs & breathing" },
  { ja: "生活習慣病・お薬", en: "Lifestyle diseases & medication" },
  { ja: "健診・検査", en: "Checkups & tests" },
  { ja: "けが・外科", en: "Injuries & surgery" },
];

function sortNewestFirst(list: BlogPost[]): BlogPost[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export default function BlogPageClient() {
  const { t, lang } = useSite();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  function selectCategory(key: string | null) {
    setActiveCategory(key);
    setActiveSubcategory(null);
  }

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

  // 「健康・予防の話」選択時に出すサブ分類チップ（言語に依存しないキーとして日本語ラベルを使う）
  const subcategories = useMemo(() => {
    const health = groups.find((g) => g.key === HEALTH_CATEGORY);
    if (!health) return [];
    const counts = new Map<string, { label: string; count: number }>();
    for (const post of health.posts) {
      const key = post.ja.subcategory;
      if (!key) continue;
      const entry = counts.get(key) ?? { label: getContent(post, lang).subcategory ?? key, count: 0 };
      entry.count += 1;
      counts.set(key, entry);
    }
    const ordered: { key: string; label: string; count: number }[] = [];
    for (const entry of SUBCATEGORY_ORDER) {
      const found = counts.get(entry.ja);
      if (!found) continue;
      ordered.push({ key: entry.ja, label: lang === "en" ? entry.en : entry.ja, count: found.count });
      counts.delete(entry.ja);
    }
    for (const [key, v] of counts) ordered.push({ key, label: v.label, count: v.count });
    return ordered;
  }, [groups, lang]);

  const visibleGroups = (activeCategory ? groups.filter((g) => g.key === activeCategory) : groups).map(
    (g) =>
      g.key === HEALTH_CATEGORY && activeSubcategory
        ? { ...g, posts: g.posts.filter((p) => p.ja.subcategory === activeSubcategory) }
        : g
  );

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
            {c.subcategory && (
              <span className="rounded-full border border-primary/30 px-2.5 py-0.5 font-bold text-primary-dark/80">
                {c.subcategory}
              </span>
            )}
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
              onClick={() => selectCategory(null)}
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
                onClick={() => selectCategory(g.key)}
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

        {/* 「健康・予防の話」選択時のみ、サブ分類で絞り込めるようにする */}
        {activeCategory === HEALTH_CATEGORY && subcategories.length > 0 && (
          <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSubcategory(null)}
              aria-pressed={activeSubcategory === null}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
                activeSubcategory === null
                  ? "border-primary bg-accent text-primary-dark"
                  : "border-ink/15 bg-surface text-ink/60 hover:bg-accent"
              }`}
            >
              {t.blog.allCategories}
            </button>
            {subcategories.map((sc) => (
              <button
                key={sc.key}
                type="button"
                onClick={() => setActiveSubcategory(sc.key)}
                aria-pressed={activeSubcategory === sc.key}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  activeSubcategory === sc.key
                    ? "border-primary bg-accent text-primary-dark"
                    : "border-ink/15 bg-surface text-ink/60 hover:bg-accent"
                }`}
              >
                {sc.label}
                <span className="ml-1 opacity-70">
                  ({sc.count}
                  {t.blog.postCountSuffix})
                </span>
              </button>
            ))}
          </div>
        )}

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
