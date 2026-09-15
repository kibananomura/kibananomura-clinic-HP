import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
import { getPost, getContent } from "../../lib/blog";
import BlogArticleClient from "./BlogArticleClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: `院長ブログ | ${BRAND.ja.primary}` };
  }
  const c = getContent(post, "ja");
  return {
    title: `${c.title} | 院長ブログ | ${BRAND.ja.primary}`,
    description: c.excerpt,
  };
}

export default function BlogArticle() {
  return <BlogArticleClient />;
}
