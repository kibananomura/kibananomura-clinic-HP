import { BRAND } from "../lib/brand";
import { SITE_SEO } from "../lib/seo";
import { SCHEDULE } from "../lib/schedule";

const DAY_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

/**
 * schedule.ts（月〜金、午前・午後の受付時間）を schema.org の
 * OpeningHoursSpecification 配列へ変換する。
 * 午前・午後の間（昼休み）は一旦closedとして分割表現する。
 */
function buildOpeningHoursSpecification() {
  return SCHEDULE.flatMap((day, index) => {
    const dayOfWeek = DAY_OF_WEEK[index];
    const specs: Array<{
      "@type": "OpeningHoursSpecification";
      dayOfWeek: string;
      opens: string;
      closes: string;
    }> = [];
    if (day.am.open && day.am.start && day.am.end) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: day.am.start,
        closes: day.am.end,
      });
    }
    if (day.pm.open && day.pm.start && day.pm.end) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: day.pm.start,
        closes: day.pm.end,
      });
    }
    return specs;
  });
}

export default function ClinicJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: BRAND.ja.primary,
    alternateName: [...BRAND.ja.alternateNames],
    description: SITE_SEO.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "宮崎市",
      addressRegion: "宮崎県",
      addressCountry: "JP",
      streetAddress: "木花",
    },
    // 緯度経度（geo）・電話番号（telephone）・hasMap は、開院準備中のため
    // 住所（接道交渉中）・電話番号ともに未確定。確定情報が入り次第、
    // 架空の値を作らずここに追加すること。
    email: "contact@kibananomura.jp",
    areaServed: {
      "@type": "City",
      name: "宮崎市",
    },
    medicalSpecialty: [
      "Internal Medicine",
      "Pediatrics",
      "Surgery",
      "Gastroenterology",
      "Allergy",
    ],
    openingHoursSpecification: buildOpeningHoursSpecification(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
