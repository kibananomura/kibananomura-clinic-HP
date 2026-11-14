import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: `当院の想い（パーパス・ミッション・ビジョン・バリュー） | ${BRAND.ja.titleSuffix}`,
  description:
    "木花のむら総合診療所（宮崎市熊野、2027年10月1日開院予定）が大切にしていること。パーパス「医療を忘れていられる明日」をつくる、と、その芯にある経営理念・ミッション・ビジョン・バリューをご紹介します。",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
