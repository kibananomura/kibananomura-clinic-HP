import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
import { BASE_URL } from "../../lib/seo";
import { getDisease, DISEASES } from "../../lib/diseases-data";
import DiseasePageClient from "./DiseasePageClient";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";
import { getPost } from "../../lib/blog";
import { getRelatedPostSlugs, type RelatedLink } from "../../lib/related-content";

export function generateStaticParams() {
  return DISEASES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const disease = getDisease(slug);
  if (!disease) {
    return { title: `疾患について | ${BRAND.ja.titleSuffix}` };
  }
  const title = `${disease.title} | 疾患について | ${BRAND.ja.titleSuffix}`;
  const description = `${disease.summary} 病態・検査方法・治療法をご紹介します。このページは診断を行うものではなく、実際の診断・治療には受診が必要です。`;
  return {
    title,
    description,
    alternates: {
      canonical: `/diseases/${slug}`,
    },
    openGraph: {
      title: `${disease.title} | 疾患について`,
      description,
      url: `${BASE_URL}/diseases/${slug}`,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function DiseasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const disease = getDisease(slug);
  const relatedPosts: RelatedLink[] = getRelatedPostSlugs(slug).flatMap((postSlug) => {
    const post = getPost(postSlug);
    return post ? [{ slug: post.slug, titleJa: post.ja.title, titleEn: post.en.title }] : [];
  });
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "トップ", url: "/" },
          { name: "疾患について", url: "/diseases" },
          { name: disease?.title ?? slug, url: `/diseases/${slug}` },
        ]}
      />
      <DiseasePageClient disease={disease} relatedPosts={relatedPosts} />
    </>
  );
}
