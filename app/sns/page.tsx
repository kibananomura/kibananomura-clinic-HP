import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import SnsPageClient from "./SnsPageClient";

export const metadata: Metadata = {
  title: `Instagramで紹介した記事 | ${BRAND.ja.titleSuffix}`,
  description: "木花のむら総合診療所のInstagramで紹介した院長ブログの記事を、新しい順にまとめています。",
  alternates: { canonical: "/sns" },
  robots: { index: false, follow: true },
};

export default function SnsPage() {
  return <SnsPageClient />;
}
