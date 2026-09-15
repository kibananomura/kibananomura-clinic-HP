import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import FirstVisitPageClient from "./FirstVisitPageClient";

export const metadata: Metadata = {
  title: `初診・受診の流れ | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野）の初診の流れと持ち物のご案内。予約・受付からWeb問診、CT・胃カメラ・エコーの当日検査、会計までをわかりやすく解説します。",
};

export default function FirstVisitPage() {
  return <FirstVisitPageClient />;
}
