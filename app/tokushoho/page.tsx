import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import TokushohoPageClient from "./TokushohoPageClient";

export const metadata: Metadata = {
  title: `特定商取引法に基づく表記 | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野）の自費診療サービス提供に関する特定商取引法に基づく表記です。",
  robots: { index: false, follow: true },
};

export default function TokushohoPage() {
  return <TokushohoPageClient />;
}
