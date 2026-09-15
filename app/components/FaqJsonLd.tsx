type FaqEntry = { q: string; a: string };

/**
 * schema.org FAQPage 構造化データ。
 * FAQの内容は app/lib/site.tsx の t.faq.items（日本語版）を渡して使う。
 */
export default function FaqJsonLd({ items }: { items: FaqEntry[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
