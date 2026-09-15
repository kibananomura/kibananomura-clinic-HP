import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
import { getSymptom, SYMPTOMS } from "../../lib/symptoms-data";
import SymptomPageClient from "./SymptomPageClient";

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
    return { title: `症状から探す | ${BRAND.ja.primary}` };
  }
  return {
    title: `${symptom.title} | 症状から探す | ${BRAND.ja.primary}`,
    description: `${symptom.summary}。考えられる主な原因・当院で行う可能性のある検査・一般的な治療の考え方をご紹介します。このページは診断を行うものではなく、実際の診断・治療には受診が必要です。`,
  };
}

export default function SymptomPage() {
  return <SymptomPageClient />;
}
