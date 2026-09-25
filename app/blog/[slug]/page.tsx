import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
import { getPost, getContent } from "../../lib/blog";
import BlogArticleClient from "./BlogArticleClient";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

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
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post ? getContent(post, "ja").title : slug;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "トップ", url: "/" },
          { name: "開業前ブログ", url: "/blog" },
          { name: title, url: `/blog/${slug}` },
        ]}
      />
      <BlogArticleClient />
    </>
  );
}
