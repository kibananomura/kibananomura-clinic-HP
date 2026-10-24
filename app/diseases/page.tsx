import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import DiseasesIndexClient, { type DiseaseCategoryGroup } from "./DiseasesIndexClient";
import {
  DISEASE_CATEGORY_LABEL,
  DISEASE_CATEGORY_LABEL_EN,
  DISEASE_CATEGORY_ORDER,
  INTERNAL_SUBCATEGORIES,
  getDiseasesByCategory,
  getDisease,
  type DiseaseEntry,
} from "../lib/diseases-data";

export const metadata: Metadata = {
  title: `疾患について（高血圧・糖尿病・花粉症など）| ${BRAND.ja.titleSuffix}`,
  description:
    "木花のむら総合診療所（宮崎市熊野）で診療している代表的な疾患の一覧。高血圧・糖尿病・花粉症・気管支喘息・粉瘤など、病態・検査方法・治療法をご案内します。診断を行うものではなく、実際の診断・治療には受診が必要です。",
  alternates: {
    canonical: "/diseases",
  },
};

function toListItem(d: DiseaseEntry) {
  return {
    slug: d.slug,
    title: d.title,
    titleEn: d.en?.title ?? d.title,
    summary: d.summary,
    summaryEn: d.en?.summary ?? d.summary,
  };
}

/**
 * 疾患一覧ページで必要な「表示用の軽いデータ」だけをサーバー側で組み立てて
 * クライアントコンポーネントへ渡す。病態・検査・治療等の本文テキストを含む
 * diseases-data.ts 全体をクライアントバンドルに含めないための対応。
 */
function buildGroups(): DiseaseCategoryGroup[] {
  const groups: DiseaseCategoryGroup[] = [];
  for (const category of DISEASE_CATEGORY_ORDER) {
    const items = getDiseasesByCategory(category);
    if (items.length === 0) continue;
    const categoryLabel = DISEASE_CATEGORY_LABEL[category];
    const categoryLabelEn = DISEASE_CATEGORY_LABEL_EN[category];

    if (category === "internal") {
      const subcategories = INTERNAL_SUBCATEGORIES.map((sub) => {
        const subItems = sub.slugs
          .map((slug) => getDisease(slug))
          .filter((d): d is DiseaseEntry => Boolean(d))
          .map(toListItem);
        return { label: sub.label, labelEn: sub.labelEn, items: subItems };
      }).filter((sub) => sub.items.length > 0);
      groups.push({ category, categoryLabel, categoryLabelEn, items: [], subcategories });
    } else {
      groups.push({ category, categoryLabel, categoryLabelEn, items: items.map(toListItem) });
    }
  }
  return groups;
}

export default function DiseasesIndexPage() {
  return <DiseasesIndexClient groups={buildGroups()} />;
}
