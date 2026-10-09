import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
import { getDisease, DISEASES } from "../../lib/diseases-data";
import DiseasePageClient from "./DiseasePageClient";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

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
    return { title: `疾患について | ${BRAND.ja.primary}` };
  }
  return {
    title: `${disease.title} | 疾患について | ${BRAND.ja.primary}`,
    description: `${disease.summary} 病態・検査方法・治療法をご紹介します。このページは診断を行うものではなく、実際の診断・治療には受診が必要です。`,
    alternates: {
      canonical: `/diseases/${slug}`,
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
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "トップ", url: "/" },
          { name: "疾患について", url: "/diseases" },
          { name: disease?.title ?? slug, url: `/diseases/${slug}` },
        ]}
      />
      <DiseasePageClient />
    </>
  );
}
