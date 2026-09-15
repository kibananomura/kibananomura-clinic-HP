import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import CareersPageClient from "./CareersPageClient";

export const metadata: Metadata = {
  title: `採用・求人募集（看護師・事務） | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野、2027年10月1日開院予定）の採用情報。1日約70名程度の外来を支える看護師・事務スタッフを募集しています。",
};

export default function CareersPage() {
  return <CareersPageClient />;
}
