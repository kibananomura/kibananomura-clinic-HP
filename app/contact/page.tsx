import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: `お問い合わせ | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野、2027年10月1日開院予定）へのお問い合わせはLINE公式アカウントから。開院準備の状況やご質問はお気軽にご連絡ください。",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
