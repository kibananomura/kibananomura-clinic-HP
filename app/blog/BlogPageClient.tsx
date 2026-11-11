"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, LeafSprig } from "../components/Decor";
import { useSite } from "../lib/site";
import {
  posts,
  getContent,
  getSeriesNumber,
  seriesLabel,
  SERIES_CATEGORIES,
  type BlogPost,
  type BlogContent,
} from "../lib/blog";
import { withWbr } from "../lib/jp-break";
import BlogRequestNote from "../components/BlogRequestNote";

// カテゴリの表示順（院長ブログで実際に使われているカテゴリに対応）。
// ここにないカテゴリの記事があった場合は、末尾に自動的にまとめて表示される。
const CATEGORY_ORDER: { ja: string; en: string }[] = [
  { ja: "健康・予防の話", en: "Health and prevention" },
  { ja: "診療で大切にしていること", en: "What I value in care" },
  { ja: "診療所づくり", en: "Building the clinic" },
  { ja: "院長の歩み", en: "The director's journey" },
];

// 「健康・予防の話」のサブ分類の表示順（記事の subcategory_ja に対応）。
// ここにないサブ分類の記事があった場合は、末尾に自動的に表示される。
const HEALTH_CATEGORY = "健康・予防の話";
const SUBCATEGORY_ORDER: { ja: string; en: string }[] = [
  { ja: "感染症・ワクチン", en: "Infections & vaccines" },
  { ja: "子どもの健康", en: "Children's health" },
  { ja: "胃腸・消化器", en: "Stomach & digestion" },
  { ja: "肺・呼吸器・アレルギー", en: "Lungs, breathing & allergies" },
  { ja: "血圧", en: "Blood pressure" },
  { ja: "コレステロール・尿酸", en: "Cholesterol & uric acid" },
  { ja: "糖尿病・生活習慣病", en: "Diabetes & lifestyle diseases" },
  { ja: "食事・運動", en: "Diet & exercise" },
  { ja: "健診・検査", en: "Checkups & tests" },
  { ja: "足・腰・けが", en: "Feet, back & injuries" },
  { ja: "男性の健康", en: "Men's health" },
];

// 「今の季節のおすすめ」に出すサブ分類（月 → サブ分類）。
const SEASONAL_SUBCATEGORY: Record<number, string> = {
  1: "感染症・ワクチン",
  2: "肺・呼吸器・アレルギー",
  3: "肺・呼吸器・アレルギー",
  4: "健診・検査",
  5: "食事・運動",
  6: "胃腸・消化器",
  7: "感染症・ワクチン",
  8: "感染症・ワクチン",
  9: "健診・検査",
  10: "感染症・ワクチン",
  11: "感染症・ワクチン",
  12: "感染症・ワクチン",
};

// 最初の画面で、カテゴリ・サブ分類ごとに見せる記事の数（残りは「もっと見る」で開く）。
const PREVIEW_COUNT = 3;

function sortNewestFirst(list: BlogPost[]): BlogPost[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

// 連載のカテゴリは第1話から読めるように古い順、それ以外は新しい順。
function sortForCategory(key: string, list: BlogPost[]): BlogPost[] {
  return SERIES_CATEGORIES.includes(key)
    ? [...list].sort((a, b) => a.date.localeCompare(b.date))
    : sortNewestFirst(list);
}

// ── 記事検索 ──────────────────────────────────────────────
// 全角/半角・大文字/小文字・カタカナ/ひらがなの違いを吸収して比べる。
function normalize(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

// 漢字とひらがなで書き方が分かれやすい言葉は、どちらで探しても見つかるようにする。
const SEARCH_VARIANTS: string[][] = [
  ["痺れ", "しびれ"],
  ["咳", "せき"],
  ["痰", "たん"],
  ["鼻水", "はなみず"],
  ["風邪", "かぜ"],
  ["薬", "くすり"],
  ["怪我", "けが"],
  ["痛風", "つうふう"],
  ["貧血", "ひんけつ"],
  ["痩せ", "やせ"],
];

function variantsOf(term: string): string[] {
  const out = new Set([term]);
  for (const group of SEARCH_VARIANTS) {
    const g = group.map(normalize);
    for (const v of g) {
      if (term.includes(v)) for (const w of g) out.add(term.replace(v, w));
    }
  }
  return [...out];
}

function contentText(c: BlogContent): string {
  const body = c.body.map((b) => (b.kind === "text" ? b.text : b.caption ?? "")).join(" ");
  return [c.title, c.excerpt, c.category, c.subcategory ?? "", body].join(" ");
}

// タイトル・分類に出てくる記事を上に、本文に出てくるだけの記事はその後ろに並べる。
const SEARCH_INDEX: { post: BlogPost; head: string; text: string }[] = posts.map((post) => ({
  post,
  head: normalize(
    [post.ja.title, post.ja.subcategory ?? "", post.en.title, post.en.subcategory ?? ""].join(" ")
  ),
  text: normalize(contentText(post.ja) + " " + contentText(post.en)),
}));

function searchPosts(query: string): BlogPost[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  const hit = (hay: string, t: string) => variantsOf(t).some((v) => hay.includes(v));
  return SEARCH_INDEX.filter(({ text }) => terms.every((t) => hit(text, t)))
    .map(({ post, head }) => ({ post, score: terms.filter((t) => hit(head, t)).length }))
    .sort((x, y) => y.score - x.score || y.post.date.localeCompare(x.post.date))
    .map(({ post }) => post);
}

const SEARCH_SUGGESTIONS: { ja: string; en: string }[] = [
  { ja: "血圧", en: "blood pressure" },
  { ja: "コレステロール", en: "cholesterol" },
  { ja: "風邪", en: "cold" },
  { ja: "ワクチン", en: "vaccine" },
  { ja: "胃カメラ", en: "gastroscopy" },
  { ja: "薬", en: "medicine" },
];


export default function BlogPageClient() {
  const { t, lang } = useSite();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const searching = query.trim().length > 0;
  const results = useMemo(() => searchPosts(query), [query]);

  function selectCategory(key: string | null) {
    setActiveCategory(key);
    setActiveSubcategory(null);
    setQuery("");
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
        posts: sortForCategory(entry.ja, list),
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

  // 新着3本
  const latest = useMemo(() => sortNewestFirst(posts).slice(0, PREVIEW_COUNT), []);

  // 今の季節のおすすめ（新着に出ている記事は除く）
  const seasonal = useMemo(() => {
    const key = SEASONAL_SUBCATEGORY[new Date().getMonth() + 1];
    const shown = new Set(latest.map((p) => p.slug));
    const list = sortNewestFirst(posts.filter((p) => p.ja.subcategory === key && !shown.has(p.slug)));
    const entry = SUBCATEGORY_ORDER.find((e) => e.ja === key);
    return {
      label: entry ? (lang === "en" ? entry.en : entry.ja) : key ?? "",
      posts: list.slice(0, PREVIEW_COUNT),
    };
  }, [latest, lang]);

  // 「健康・予防の話」をサブ分類ごとに分けたもの
  const healthBySubcategory = useMemo(() => {
    const health = groups.find((g) => g.key === HEALTH_CATEGORY);
    if (!health) return [];
    const result = subcategories.map((sc) => ({
      key: sc.key,
      label: sc.label,
      posts: health.posts.filter((p) => p.ja.subcategory === sc.key),
    }));
    const others = health.posts.filter((p) => !p.ja.subcategory);
    if (others.length > 0) {
      result.push({ key: "__others", label: lang === "en" ? "Others" : "その他", posts: others });
    }
    return result;
  }, [groups, subcategories, lang]);

  function openTopic(category: string, subcategory: string | null) {
    setActiveCategory(category);
    setActiveSubcategory(subcategory === "__others" ? null : subcategory);
    setQuery("");
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function GroupTitle({ label, count, note }: { label: string; count?: number; note?: string }) {
    return (
      <h2 className="mb-4 flex flex-wrap items-center gap-2 text-base font-bold text-primary-dark">
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
        {label}
        {count !== undefined && (
          <span className="font-medium text-ink/50">
            （{count}
            {t.blog.postCountSuffix}）
          </span>
        )}
        {note && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-primary-dark">{note}</span>
        )}
      </h2>
    );
  }

  function PostList({ list }: { list: BlogPost[] }) {
    return (
      <div className="flex flex-col gap-4">
        {list.map((post, i) => (
          <PostCard key={post.slug} post={post} delay={(i % 4) * 0.05} />
        ))}
      </div>
    );
  }

  function MoreButton({ total, onClick }: { total: number; onClick: () => void }) {
    return (
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-surface px-5 py-2 text-sm font-bold text-primary-dark transition-colors hover:bg-accent"
        >
          {lang === "en" ? `See all ${total}` : `もっと見る（全${total}件）`}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    );
  }

  function TopicTile({ label, count, onClick }: { label: string; count: number; onClick: () => void }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex flex-col items-start rounded-2xl bg-surface/90 p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-soft"
      >
        <span className="text-sm font-bold leading-snug text-ink">{label}</span>
        <span className="mt-1 text-xs text-ink/50">
          {count}
          {t.blog.postCountSuffix}
        </span>
      </button>
    );
  }

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
            {getSeriesNumber(post) && (
              <span className="rounded-full border border-primary/30 px-2.5 py-0.5 font-bold text-primary-dark/80">
                {seriesLabel(getSeriesNumber(post)!, lang)}
              </span>
            )}
          </div>
          <h2 className="mt-2 text-lg font-bold text-ink transition-colors group-hover:text-primary-dark">
            {withWbr(c.title)}
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

        <FadeIn delay={0.06}>
          <BlogRequestNote className="mx-auto mt-6 max-w-xl" />
        </FadeIn>

        {/* 記事検索 */}
        <FadeIn delay={0.07}>
          <div className="mx-auto mt-8 max-w-xl">
            <label htmlFor="blog-search" className="sr-only">
              {lang === "en" ? "Search articles" : "記事を検索"}
            </label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="blog-search"
                type="text"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === "en" ? "Search by keyword (e.g. blood pressure)" : "キーワードで記事を探す（例：血圧、しびれ）"
                }
                className="w-full rounded-full border border-ink/15 bg-surface py-3 pl-11 pr-11 text-[15px] text-ink shadow-card outline-none placeholder:text-ink/40 focus:border-primary"
              />
              {searching && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={lang === "en" ? "Clear search" : "検索をクリア"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-ink/50 hover:bg-accent"
                >
                  ×
                </button>
              )}
            </div>
            {!searching && (
              <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
                <span className="py-1 text-ink/50">{lang === "en" ? "Try:" : "たとえば："}</span>
                {SEARCH_SUGGESTIONS.map((sg) => (
                  <button
                    key={sg.ja}
                    type="button"
                    onClick={() => setQuery(lang === "en" ? sg.en : sg.ja)}
                    className="rounded-full border border-ink/15 bg-surface px-3 py-1 font-bold text-ink/60 hover:bg-accent"
                  >
                    {lang === "en" ? sg.en : sg.ja}
                  </button>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* カテゴリ絞り込みチップ */}
        <div ref={topRef} className="scroll-mt-24" />
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
        {!searching && activeCategory === HEALTH_CATEGORY && subcategories.length > 0 && (
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

        {searching && (
          <div className="mx-auto mt-10 max-w-3xl">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-primary-dark">
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {lang === "en"
                ? `Results for “${query.trim()}” (${results.length})`
                : `「${query.trim()}」の記事（${results.length}${t.blog.postCountSuffix}）`}
            </h2>
            {results.length === 0 ? (
              <p className="rounded-2xl bg-surface/90 p-6 text-center text-sm leading-relaxed text-ink/70 shadow-card">
                {lang === "en"
                  ? "No articles matched. Try a shorter or different word."
                  : "見つかりませんでした。短い言葉や、別の言い方でも探してみてください。"}
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {results.map((post, i) => (
                  <PostCard key={post.slug} post={post} delay={(i % 4) * 0.05} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 最初の画面：新着・季節のおすすめ・テーマの入口・カテゴリごとに3本ずつ */}
        {!searching && activeCategory === null && (
          <div className="mx-auto mt-10 max-w-3xl space-y-12">
            <div>
              <GroupTitle label={lang === "en" ? "Latest" : "新着の記事"} />
              <PostList list={latest} />
            </div>

            {seasonal.posts.length > 0 && (
              <div>
                <GroupTitle
                  label={lang === "en" ? "Good reads for this season" : "今の季節に読みたい記事"}
                  note={seasonal.label}
                />
                <PostList list={seasonal.posts} />
              </div>
            )}

            <div>
              <GroupTitle label={lang === "en" ? "Browse by topic" : "テーマから探す"} />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {subcategories.map((sc) => (
                  <TopicTile
                    key={sc.key}
                    label={sc.label}
                    count={sc.count}
                    onClick={() => openTopic(HEALTH_CATEGORY, sc.key)}
                  />
                ))}
                {groups
                  .filter((g) => g.key !== HEALTH_CATEGORY)
                  .map((g) => (
                    <TopicTile
                      key={g.key}
                      label={g.label}
                      count={g.posts.length}
                      onClick={() => openTopic(g.key, null)}
                    />
                  ))}
              </div>
            </div>

            {groups.map((g) => (
              <div key={g.key}>
                <GroupTitle label={g.label} count={g.posts.length} />
                <PostList list={g.posts.slice(0, PREVIEW_COUNT)} />
                {g.posts.length > PREVIEW_COUNT && (
                  <MoreButton total={g.posts.length} onClick={() => openTopic(g.key, null)} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* 「健康・予防の話」を選んだとき（サブ分類は未選択）：サブ分類ごとに3本ずつ */}
        {!searching && activeCategory === HEALTH_CATEGORY && activeSubcategory === null && (
          <div className="mx-auto mt-10 max-w-3xl space-y-12">
            {healthBySubcategory.map((sg) => (
              <div key={sg.key}>
                <GroupTitle label={sg.label} count={sg.posts.length} />
                <PostList list={sg.posts.slice(0, PREVIEW_COUNT)} />
                {sg.posts.length > PREVIEW_COUNT && (
                  <MoreButton total={sg.posts.length} onClick={() => openTopic(HEALTH_CATEGORY, sg.key)} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* それ以外のカテゴリ、またはサブ分類を選んだとき：全件 */}
        {!searching &&
          activeCategory !== null &&
          !(activeCategory === HEALTH_CATEGORY && activeSubcategory === null) && (
            <div className="mx-auto mt-10 max-w-3xl">
              {SERIES_CATEGORIES.includes(activeCategory) && (
                <p className="mb-4 text-center text-sm text-ink/60">
                  {lang === "en"
                    ? "This is a series. Start from Part 1."
                    : "連載です。第1話から順に読めます。"}
                </p>
              )}
              {visibleGroups.map((g) => (
                <PostList key={g.key} list={g.posts} />
              ))}
            </div>
          )}

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
