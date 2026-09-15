import type { Lang } from "./site";
import { generatedPosts } from "./blog-data.generated";

export type BlogBlock =
  | { kind: "text"; text: string }
  | { kind: "image"; src: string; caption?: string };

export type BlogContent = {
  category: string;
  title: string;
  excerpt: string;
  body: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  date: string; // YYYY.MM.DD
  cover: string;
  coverPosition?: string; // Tailwind object-position クラス（既定: object-center）
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
