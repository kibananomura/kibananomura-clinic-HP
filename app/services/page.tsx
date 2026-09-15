import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: `診療内容（内科・小児科・外科ほか6科） | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野）は内科・消化器内科・アレルギー内科・呼吸器内科・外科・小児科の6科に対応予定。CT・胃カメラ・エコー・外科小手術に院内で対応できる体制を整備予定です。",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
