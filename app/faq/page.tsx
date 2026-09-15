import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import { FAQ_ITEMS_JA } from "../lib/faq-data";
import FaqJsonLd from "../components/FaqJsonLd";
import FaqPageClient from "./FaqPageClient";

export const metadata: Metadata = {
  title: `よくある質問（FAQ） | ${BRAND.ja.primary}`,
  description:
    "予約方法・駐車場・CT/胃カメラの当日対応・小児診療・訪問診療など、木花のむら診療所（宮崎市熊野）へのよくあるご質問にお答えします。2027年10月1日開院予定。",
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={FAQ_ITEMS_JA} />
      <FaqPageClient />
    </>
  );
}
