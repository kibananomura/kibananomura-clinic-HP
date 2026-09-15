import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import LinksPageClient from "./LinksPageClient";

export const metadata: Metadata = {
  title: `関連リンク（休日・夜間・緊急時の受診先） | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野）が休診の日や夜間・休日に役立つ、宮崎市・宮崎県の公式情報リンク集。休日当番医・予防接種・健診情報などをまとめています。",
};

export default function LinksPage() {
  return <LinksPageClient />;
}
