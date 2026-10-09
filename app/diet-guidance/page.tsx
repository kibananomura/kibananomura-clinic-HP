import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import DietGuidanceClient from "./DietGuidanceClient";

export const metadata: Metadata = {
  title: `高血圧・糖尿病・脂質異常症・高尿酸血症の食事 | ${BRAND.ja.primary}`,
  description:
    "高血圧・糖尿病・脂質異常症・高尿酸血症を併せ持つ方のための、重複なく実践しやすい食事のポイントをご紹介します。木花のむら総合診療所（宮崎市熊野）。",
  alternates: {
    canonical: "/diet-guidance",
  },
};

export default function DietGuidancePage() {
  return <DietGuidanceClient />;
}
