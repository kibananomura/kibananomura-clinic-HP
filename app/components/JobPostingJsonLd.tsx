import { BASE_URL } from "../lib/seo";
import { BRAND } from "../lib/brand";

/**
 * schema.org JobPosting 構造化データ（Googleしごと検索対応）。
 * 看護師・医療事務それぞれの常勤・パートの4求人を出力する。
 * 給与等は app/lib/careers.ts の CAREER_POSITIONS（nurse/admin）と
 * 必ず一致させること。
 */

const HIRING_ORGANIZATION = {
  "@type": "Organization",
  name: BRAND.ja.primary,
  sameAs: BASE_URL,
  logo: `${BASE_URL}/icon.png`,
};

const JOB_LOCATION = {
  "@type": "Place",
  address: {
    "@type": "PostalAddress",
    streetAddress: "熊野5233-2",
    addressLocality: "宮崎市",
    addressRegion: "宮崎県",
    postalCode: "889-2151",
    addressCountry: "JP",
  },
};

/** 直近の募集要項更新日（給与等を変更した場合はここも更新すること） */
const DATE_POSTED = "2026-10-15";
/** 開院（2027年10月1日）に向けた募集のため、開院前日までを目安に設定 */
const VALID_THROUGH = "2027-09-30";

type JobDef = {
  identifier: string;
  title: string;
  description: string;
  employmentType: "FULL_TIME" | "PART_TIME";
  baseSalary: { minValue: number; maxValue: number; unitText: "MONTH" | "HOUR" };
};

const JOBS: JobDef[] = [
  {
    identifier: "nurse-fulltime",
    title: "看護師（常勤・正職員）",
    description:
      "木花のむら総合診療所（2027年10月1日開院予定、宮崎市熊野）での常勤看護師の募集です。外来診療の看護、採血・心電図・内視鏡・エコー等の検査補助を担当します。消化器内視鏡の介助経験、外科処置の補助、小児科・救急外来での勤務経験がある方は給与面で優遇します。未経験・ブランクのある方も丁寧に指導します。平日勤務のみ（土日祝休み）、駐車場32台完備予定。2027年10月開院のオープニングスタッフとして、ゼロからチームづくりに参加いただけます。",
    employmentType: "FULL_TIME",
    baseSalary: { minValue: 220000, maxValue: 270000, unitText: "MONTH" },
  },
  {
    identifier: "nurse-parttime",
    title: "看護師（パート・非常勤）",
    description:
      "木花のむら総合診療所（2027年10月1日開院予定、宮崎市熊野）でのパート看護師の募集です。外来診療の看護、採血・心電図・内視鏡・エコー等の検査補助を担当します。消化器内視鏡の介助経験、外科処置の補助、小児科・救急外来での勤務経験がある方は給与面で優遇します。勤務日数・時間帯はご相談に応じます。平日勤務のみ（土日祝休み）、駐車場32台完備予定。",
    employmentType: "PART_TIME",
    baseSalary: { minValue: 1400, maxValue: 1650, unitText: "HOUR" },
  },
  {
    identifier: "admin-fulltime",
    title: "医療事務・受付・診療補助（常勤・正職員）",
    description:
      "木花のむら総合診療所（2027年10月1日開院予定、宮崎市熊野）での常勤医療事務の募集です。受付・会計、レセプト作成、電話・LINE対応等を担当します。クリニックでの受付・レセプト業務経験者、電子カルテ・Web問診等のITツール操作に抵抗がない方を歓迎します。未経験の方も意欲があればご相談ください。平日勤務のみ（土日祝休み）、駐車場32台完備予定。2027年10月開院のオープニングスタッフとして、ゼロからチームづくりに参加いただけます。",
    employmentType: "FULL_TIME",
    baseSalary: { minValue: 185000, maxValue: 225000, unitText: "MONTH" },
  },
  {
    identifier: "admin-parttime",
    title: "医療事務・受付・診療補助（パート・非常勤）",
    description:
      "木花のむら総合診療所（2027年10月1日開院予定、宮崎市熊野）でのパート医療事務の募集です。受付・会計、レセプト作成、電話・LINE対応等を担当します。クリニックでの受付・レセプト業務経験者、電子カルテ・Web問診等のITツール操作に抵抗がない方を歓迎します。勤務日数・時間帯はご相談に応じます。平日勤務のみ（土日祝休み）、駐車場32台完備予定。",
    employmentType: "PART_TIME",
    baseSalary: { minValue: 1150, maxValue: 1300, unitText: "HOUR" },
  },
];

export default function JobPostingJsonLd() {
  const postings = JOBS.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    identifier: {
      "@type": "PropertyValue",
      name: BRAND.ja.primary,
      value: job.identifier,
    },
    title: job.title,
    description: job.description,
    hiringOrganization: HIRING_ORGANIZATION,
    jobLocation: JOB_LOCATION,
    employmentType: job.employmentType,
    datePosted: DATE_POSTED,
    validThrough: VALID_THROUGH,
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.baseSalary.minValue,
        maxValue: job.baseSalary.maxValue,
        unitText: job.baseSalary.unitText,
      },
    },
  }));

  return (
    <>
      {postings.map((posting) => (
        <script
          key={String(posting.identifier.value)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(posting) }}
        />
      ))}
    </>
  );
}
