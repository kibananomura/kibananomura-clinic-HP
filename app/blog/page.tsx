import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: `開業前ブログ（院長コラム・開院準備の様子） | ${BRAND.ja.titleSuffix}`,
  description:
    "聞きたかったけど、聞けなかった。そんな「からだの疑問」に、木花のむら総合診療所（宮崎市熊野、2027年10月1日開院予定）の院長がお答えするブログです。暮らしのことや開院までの様子、診療への想いもお伝えします。",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
