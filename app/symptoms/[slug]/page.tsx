import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
import { BASE_URL } from "../../lib/seo";
import { getSymptom, SYMPTOMS } from "../../lib/symptoms-data";
import { DISEASE_LINK_LABELS, DISEASE_LINK_LABELS_EN } from "../../lib/diseases-data";
import SymptomPageClient from "./SymptomPageClient";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

// 長いラベルから先に判定することで、「糖尿病」より「糖尿病性神経障害」のような
// より具体的なラベルを優先して一致させる。サーバー側でソートして渡すことで、
// クライアントバンドルに疾患データ全体（diseases-data.ts）を含めずに済む。
const SORTED_DISEASE_LINK_LABELS_JA = [...DISEASE_LINK_LABELS].sort(
  (a, b) => b.label.length - a.label.length,
);
const SORTED_DISEASE_LINK_LABELS_EN = [...DISEASE_LINK_LABELS_EN].sort(
  (a, b) => b.label.length - a.label.length,
);

export function generateStaticParams() {
  return SYMPTOMS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const symptom = getSymptom(slug);
  if (!symptom) {
    return { title: `症状から探す | ${BRAND.ja.titleSuffix}` };
  }
  const description = `${symptom.summary}。考えられる主な原因・当院で行う可能性のある検査・一般的な治療の考え方をご紹介します。このページは診断を行うものではなく、実際の診断・治療には受診が必要です。`;
  return {
    title: `${symptom.title} | 症状から探す | ${BRAND.ja.titleSuffix}`,
    description,
    alternates: {
      canonical: `/symptoms/${slug}`,
    },
    openGraph: {
      title: `${symptom.title} | 症状から探す`,
      description,
      url: `${BASE_URL}/symptoms/${slug}`,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function SymptomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symptom = getSymptom(slug);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "トップ", url: "/" },
          { name: "症状から探す", url: "/symptoms" },
          { name: symptom?.title ?? slug, url: `/symptoms/${slug}` },
        ]}
      />
      <SymptomPageClient
        symptom={symptom}
        diseaseLinkLabelsJa={SORTED_DISEASE_LINK_LABELS_JA}
        diseaseLinkLabelsEn={SORTED_DISEASE_LINK_LABELS_EN}
      />
    </>
  );
}
