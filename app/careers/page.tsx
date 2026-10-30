import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import CareersPageClient from "./CareersPageClient";

export const metadata: Metadata = {
  title: `看護師・医療事務 求人（平日のみ・オープニングスタッフ） | ${BRAND.ja.titleSuffix}`,
  description:
    "宮崎市南部・2027年10月開院のオープニングスタッフ募集。看護師（常勤月給220,000〜270,000円／パート時給1,200〜1,500円）、医療事務（常勤月給185,000〜215,000円／パート時給1,150〜1,300円）。平日勤務のみ・土日祝休み、駐車場32台完備予定。",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return <CareersPageClient />;
}
