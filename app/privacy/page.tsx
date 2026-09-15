import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野）における個人情報の取り扱いに関するプライバシーポリシーです。",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
