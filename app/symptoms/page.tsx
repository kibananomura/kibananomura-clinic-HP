import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import SymptomsIndexClient from "./SymptomsIndexClient";

export const metadata: Metadata = {
  title: `症状から探す | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野）の症状別ページ一覧。発熱・腹痛・咳などの症状ごとに、考えられる原因・当院で行う検査・一般的な治療の考え方をご案内します。診断を行うものではなく、実際の診断・治療には受診が必要です。",
};

export default function SymptomsIndexPage() {
  return <SymptomsIndexClient />;
}
