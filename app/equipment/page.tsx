import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import EquipmentPageClient from "./EquipmentPageClient";

export const metadata: Metadata = {
  title: `院内の検査・設備（CT・胃カメラ・エコー） | ${BRAND.ja.primary}`,
  description:
    "木花のむら診療所（宮崎市熊野）が院内に整備する検査機器のご案内。CT・経鼻内視鏡（胃カメラ）・腹部エコーなどをそろえ、当日の検査対応を目指します。",
};

export default function EquipmentPage() {
  return <EquipmentPageClient />;
}
