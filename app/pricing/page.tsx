import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: `料金のご案内 | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野）の保険診療・自費診療（GLP-1、AGA/FAGA、ED治療、花粉症ステロイド注射 ほか）の料金案内。自費診療は2026年時点の参考価格を掲載しており、開院前に正式決定します。",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
