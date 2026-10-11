import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import FirstVisitPageClient from "./FirstVisitPageClient";

export const metadata: Metadata = {
  title: `初診・受診の流れ（予約・持ち物・当日の検査） | ${BRAND.ja.primary}`,
  description:
    "木花のむら総合診療所（宮崎市熊野）の初診の流れと持ち物のご案内。予約・受付からWeb問診、CT・胃カメラ・エコーの当日検査、会計までをわかりやすく解説します。",
  alternates: {
    canonical: "/first-visit",
  },
};

export default function FirstVisitPage() {
  return <FirstVisitPageClient />;
}
