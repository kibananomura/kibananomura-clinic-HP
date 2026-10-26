import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
import { BASE_URL } from "../../lib/seo";
import { getPost, getContent } from "../../lib/blog";
import BlogArticleClient from "./BlogArticleClient";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";
import ArticleJsonLd from "../../components/ArticleJsonLd";
import { getDisease } from "../../lib/diseases-data";
import { getRelatedDiseaseSlugs, type RelatedLink } from "../../lib/related-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: `院長ブログ | ${BRAND.ja.titleSuffix}` };
  }
  const c = getContent(post, "ja");
  return {
    title: `${c.title} | 院長ブログ | ${BRAND.ja.titleSuffix}`,
    description: c.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${c.title} | 院長ブログ`,
      description: c.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      images: [{ url: `${BASE_URL}${post.cover}` }],
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
  const relatedDiseases: RelatedLink[] = getRelatedDiseaseSlugs(slug).flatMap((diseaseSlug) => {
    const d = getDisease(diseaseSlug);
    return d ? [{ slug: d.slug, titleJa: d.title, titleEn: d.en?.title ?? d.title }] : [];
  });
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "トップ", url: "/" },
          { name: "開業前ブログ", url: "/blog" },
          { name: title, url: `/blog/${slug}` },
        ]}
      />
      {post && (
        <ArticleJsonLd
          slug={slug}
          title={title}
          description={getContent(post, "ja").excerpt}
          cover={post.cover}
          date={post.date}
        />
      )}
      <BlogArticleClient relatedDiseases={relatedDiseases} />
    </>
  );
}
