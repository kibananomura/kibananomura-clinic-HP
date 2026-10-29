import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import InsurancePageClient from "./InsurancePageClient";

export const metadata: Metadata = {
  title: `保険診療の自己負担（1〜3割・子ども医療費・生活保護） | ${BRAND.ja.titleSuffix}`,
  description:
    "木花のむら総合診療所（宮崎市熊野）の保険診療の自己負担についてのご案内。年齢ごとの負担割合（1〜3割）、生活保護の方、宮崎市・都城市・日南市・国富町・綾町・三股町の子ども医療費助成をまとめました。",
  alternates: {
    canonical: "/insurance",
  },
};

export default function InsurancePage() {
  return <InsurancePageClient />;
}
