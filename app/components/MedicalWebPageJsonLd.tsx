/**
 * schema.org MedicalWebPage 構造化データ。
 * 症状ページ用。診断ツールではなく一般的な医学情報ページである旨を
 * lastReviewed 等と併せて明示する簡易的な実装。
 */
export default function MedicalWebPageJsonLd({
  name,
  description,
  url,
  lastReviewed,
}: {
  name: string;
  description: string;
  url: string;
  /** 実際のレビュー実施日（YYYY-MM-DD）。呼び出し側の症状データから渡す。 */
  lastReviewed: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    description,
    url,
    lastReviewed,
    disclaimer:
      "このページは一般的な医学情報の提供を目的としており、診断を行うものではありません。実際の診断・治療には受診が必要です。",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
