import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import SymptomsIndexClient, { type SymptomCategoryGroup } from "./SymptomsIndexClient";
import { CATEGORY_LABEL, CATEGORY_LABEL_EN, CATEGORY_ORDER, getSymptomsByCategory } from "../lib/symptoms-data";

export const metadata: Metadata = {
  title: `症状から探す（発熱・腹痛・咳・頭痛など）| ${BRAND.ja.titleSuffix}`,
  description:
    "木花のむら総合診療所（宮崎市熊野）の症状別ページ一覧。発熱・腹痛・咳などの症状ごとに、考えられる原因・当院で行う検査・一般的な治療の考え方をご案内します。診断を行うものではなく、実際の診断・治療には受診が必要です。",
  alternates: {
    canonical: "/symptoms",
  },
};

/**
 * 症状一覧ページで必要な「表示用の軽いデータ」だけをサーバー側で組み立てて
 * クライアントコンポーネントへ渡す。原因・検査・治療等の本文テキストを含む
 * symptoms-data.ts 全体をクライアントバンドルに含めないための対応。
 */
function buildGroups(): SymptomCategoryGroup[] {
  const groups: SymptomCategoryGroup[] = [];
  for (const category of CATEGORY_ORDER) {
    const items = getSymptomsByCategory(category);
    if (items.length === 0) continue;
    groups.push({
      category,
      categoryLabel: CATEGORY_LABEL[category],
      categoryLabelEn: CATEGORY_LABEL_EN[category],
      items: items.map((s) => ({
        slug: s.slug,
        title: s.title,
        titleEn: s.en?.title ?? s.title,
        summary: s.summary,
        summaryEn: s.en?.summary ?? s.summary,
      })),
    });
  }
  return groups;
}

export default function SymptomsIndexPage() {
  return <SymptomsIndexClient groups={buildGroups()} />;
}
