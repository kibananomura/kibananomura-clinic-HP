import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: `開業前ブログ | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野、2027年10月1日開院予定）の院長が綴る開業準備ブログ。開院までの様子や地域のこと、診療への想いをお伝えします。",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
