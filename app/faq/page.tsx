import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import { FAQ_ITEMS_JA } from "../lib/faq-data";
import FaqJsonLd from "../components/FaqJsonLd";
import FaqPageClient from "./FaqPageClient";

export const metadata: Metadata = {
  title: `よくある質問（FAQ） | ${BRAND.ja.titleSuffix}`,
  description:
    "お薬だけの処方・オンライン診療・訪問診療・大きな病院への紹介・舌下免疫療法など、木花のむら総合診療所（宮崎市熊野）へのよくあるご質問にお答えします。予約・料金・駐車場は各ページでご案内しています。2027年10月1日開院予定。",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={FAQ_ITEMS_JA} />
      <FaqPageClient />
    </>
  );
}
