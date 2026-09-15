import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import NewsPageClient from "./NewsPageClient";

export const metadata: Metadata = {
  title: `お知らせ | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野、2027年10月1日開院予定）からのお知らせ。開院準備の進捗やLINE公式アカウントの情報などをお届けします。",
};

export default function NewsPage() {
  return <NewsPageClient />;
}
