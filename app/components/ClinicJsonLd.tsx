import { BRAND } from "../lib/brand";
import { BASE_URL, SITE_SEO } from "../lib/seo";
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

const DIRECTOR = {
  "@type": "Physician",
  name: "野村信介",
  honorificSuffix: "院長",
  jobTitle: "院長",
  medicalSpecialty: ["Surgery", "Gastroenterology"],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "防衛医科大学校卒" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "日本外科学会専門医" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "日本消化器外科学会専門医" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "日本医師会認定健康スポーツ医" },
  ],
  url: `${BASE_URL}/#director`,
} as const;

export default function ClinicJsonLd() {
  const website = {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: BRAND.ja.primary,
    inLanguage: "ja",
  };

  const clinic = {
    "@type": "MedicalClinic",
    "@id": `${BASE_URL}/#clinic`,
    name: BRAND.ja.primary,
    alternateName: [...BRAND.ja.alternateNames],
    description: SITE_SEO.description,
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "熊野5233-2",
      addressLocality: "宮崎市",
      addressRegion: "宮崎県",
      postalCode: "889-2151",
      addressCountry: "JP",
    },
    // 緯度経度（geo）・電話番号（telephone）は、開院準備中のため未確定。
    // 確定情報が入り次第、架空の値を作らずここに追加すること。
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
    availableLanguage: ["Japanese", "English"],
    founder: DIRECTOR,
    employee: [DIRECTOR],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "駐車場", value: true, additionalProperty: { "@type": "PropertyValue", name: "台数", value: "32台（完備予定）" } },
    ],
    availableService: [
      { "@type": "MedicalProcedure", name: "16列CT検査" },
      { "@type": "MedicalProcedure", name: "経鼻内視鏡（胃カメラ）検査" },
      { "@type": "MedicalProcedure", name: "腹部エコー（超音波）検査" },
      { "@type": "MedicalProcedure", name: "FeNO検査（気管支喘息の診断・管理）" },
      { "@type": "MedicalProcedure", name: "日帰り外科小手術" },
    ],
    openingHoursSpecification: buildOpeningHoursSpecification(),
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [website, clinic],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
