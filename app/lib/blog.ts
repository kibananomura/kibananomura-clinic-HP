import type { Lang } from "./site";
import { generatedPosts } from "./blog-data.generated";

export type BlogBlock =
  | { kind: "text"; text: string }
  | { kind: "image"; src: string; caption?: string; width?: number; height?: number };

export type BlogContent = {
  category: string;
  subcategory?: string; // 健康・予防の話などのサブ分類（任意）
  title: string;
  excerpt: string;
  seoTitle?: string; // 検索結果に出すタイトル（任意。無ければ title）。記事の見出しとは別に、検索される言葉を前に置く
  seoDescription?: string; // 検索結果の説明文（任意。無ければ excerpt）
  body: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  date: string; // YYYY.MM.DD
  updated?: string; // YYYY.MM.DD 内容を見直した日（任意。構造化データの dateModified）
  cover: string;
  coverPosition?: string; // Tailwind object-position クラス（既定: object-center）
  coverVersion?: string; // 表紙の中身から作った版番号（SNSに差し替えを伝えるため、生成時に自動計算）
  coverWidth?: number;
  coverHeight?: number;
  youtube?: string; // YouTubeショートの動画ID（記事の内容を院長が話した動画。記事の中に埋め込む）
  sources?: { label: string; url?: string }[]; // 参考にした資料（記事末尾に表示）
  related?: { slug: string; ja: string; en: string }[]; // 関連する院長ブログ（記事末尾に表示、生成時に自動計算）
  upcoming?: { ja: string; en: string }[]; // 関連する「近日公開予定」の記事（予約公開待ち）
  ja: BlogContent;
  en: BlogContent;
};

/**
 * 記事本体は content/blog/*.md に1記事1ファイルで置いてあります。
 * 追加・修正はそちらのMarkdownファイルを編集し、`npm run blog:gen` で
 * このファイルが読み込む app/lib/blog-data.generated.ts を再生成してください
 * （`npm run dev` / `npm run build` 実行時にも自動で再生成されます）。
 */
export const posts: BlogPost[] = generatedPosts;

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  prev?: BlogPost;
  next?: BlogPost;
} {
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? posts[idx - 1] : undefined,
    next: idx < posts.length - 1 ? posts[idx + 1] : undefined,
  };
}

export function getContent(post: BlogPost, lang: Lang): BlogContent {
  return lang === "en" ? post.en : post.ja;
}

// 読み物として順に読んでほしいカテゴリは「連載」として、古い順に第1話・第2話…と番号をつける。
export const SERIES_CATEGORIES = ["院長の歩み", "診療所づくり"];

const seriesNumbers = new Map<string, number>();
for (const cat of SERIES_CATEGORIES) {
  posts
    .filter((p) => p.ja.category === cat)
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((p, i) => seriesNumbers.set(p.slug, i + 1));
}

export function getSeriesNumber(post: BlogPost): number | undefined {
  return seriesNumbers.get(post.slug);
}

export function seriesLabel(n: number, lang: Lang): string {
  return lang === "en" ? `Part ${n}` : `第${n}話`;
}
