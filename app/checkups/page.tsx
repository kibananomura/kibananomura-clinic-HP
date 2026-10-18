import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import CheckupsPageClient from "./CheckupsPageClient";

export const metadata: Metadata = {
  title: `健康診断・各種検診のご案内 | ${BRAND.ja.titleSuffix}`,
  description:
    "木花のむら総合診療所（宮崎市熊野）で対応予定の健康診断・人間ドック・特定健診・ABC検診・肝炎ウイルス検診・企業健診（法定健診）・肺がん2次検診（院内CT）のご案内。",
  alternates: {
    canonical: "/checkups",
  },
};

export default function CheckupsPage() {
  return <CheckupsPageClient />;
}
