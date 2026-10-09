import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import DiseasesIndexClient from "./DiseasesIndexClient";

export const metadata: Metadata = {
  title: `疾患について | ${BRAND.ja.primary}`,
  description:
    "木花のむら総合診療所（宮崎市熊野）で診療している代表的な疾患の一覧。高血圧・糖尿病・花粉症・気管支喘息・粉瘤など、病態・検査方法・治療法をご案内します。診断を行うものではなく、実際の診断・治療には受診が必要です。",
  alternates: {
    canonical: "/diseases",
  },
};

export default function DiseasesIndexPage() {
  return <DiseasesIndexClient />;
}
