import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import SchoolAttendanceClient from "./SchoolAttendanceClient";

export const metadata: Metadata = {
  title: `学校感染症と出席停止期間の基準 | ${BRAND.ja.titleSuffix}`,
  description:
    "インフルエンザ・新型コロナウイルス感染症・溶連菌感染症・手足口病など、お子さんがよくかかる感染症の出席停止期間の目安を一覧表でご紹介します。木花のむら総合診療所（宮崎市熊野）。",
  alternates: {
    canonical: "/school-attendance",
  },
};

export default function SchoolAttendancePage() {
  return <SchoolAttendanceClient />;
}
