import { BASE_URL } from "../lib/seo";

export type BreadcrumbItem = {
  /** パンくずに表示する名称 */
  name: string;
  /** サイトルート相対パス（例: "/symptoms/fever"） */
  url: string;
};

/**
 * schema.org BreadcrumbList 構造化データ。
 * 症状ページ（/symptoms/[slug]）・ブログ記事ページ（/blog/[slug]）など、
 * トップ→一覧→詳細の階層を持つページで使用する。
 */
export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
