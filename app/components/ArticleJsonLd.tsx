import { BASE_URL, SITE_SEO } from "../lib/seo";

/**
 * schema.org Article 構造化データ。ブログ記事ページ（/blog/[slug]）で使用する。
 */
export default function ArticleJsonLd({
  slug,
  title,
  description,
  cover,
  date, // "YYYY.MM.DD"
  updated, // "YYYY.MM.DD"（任意）
  sources = [],
}: {
  slug: string;
  title: string;
  description: string;
  cover: string;
  date: string;
  updated?: string;
  sources?: { label: string; url?: string }[];
}) {
  const isoDate = date.replace(/\./g, "-");
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `${BASE_URL}${cover}`,
    datePublished: isoDate,
    dateModified: updated ? updated.replace(/\./g, "-") : isoDate,
    mainEntityOfPage: `${BASE_URL}/blog/${slug}`,
    ...(sources.length > 0
      ? {
          citation: sources.map((s) =>
            s.url ? { "@type": "CreativeWork", name: s.label, url: s.url } : { "@type": "CreativeWork", name: s.label }
          ),
        }
      : {}),
    author: {
      "@type": "Person",
      name: "野村信介",
      jobTitle: "院長",
      sameAs: ["https://researchmap.jp/shinsuke_nomura"],
    },
    publisher: {
      "@type": "MedicalClinic",
      name: SITE_SEO.title,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-emblem.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
