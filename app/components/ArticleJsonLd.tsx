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
}: {
  slug: string;
  title: string;
  description: string;
  cover: string;
  date: string;
}) {
  const isoDate = date.replace(/\./g, "-");
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `${BASE_URL}${cover}`,
    datePublished: isoDate,
    dateModified: isoDate,
    mainEntityOfPage: `${BASE_URL}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: "野村信介",
      jobTitle: "院長",
    },
    publisher: {
      "@type": "MedicalClinic",
      name: SITE_SEO.title,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
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
