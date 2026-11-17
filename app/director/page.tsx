import type { Metadata } from "next";
import DirectorPageClient from "./DirectorPageClient";

const BASE_URL = "https://www.kibananomura.jp";

export const metadata: Metadata = {
  title: "院長 野村信介（医師）｜宮崎市熊野・木花のむら総合診療所（2027年10月開院予定）",
  description:
    "宮崎市熊野（木花）に2027年10月1日開院予定の木花のむら総合診療所、院長 野村信介（のむら しんすけ）のプロフィール。医学博士、外科専門医・消化器外科専門医、健康スポーツ医。防衛医科大学校卒業後、災害医療・大学病院・地域の病院・米国留学を経て、宮崎で開業へ。",
  alternates: { canonical: "/director" },
  openGraph: {
    title: "院長 野村信介（医師）｜木花のむら総合診療所",
    url: `${BASE_URL}/director`,
    images: ["/director.png"],
  },
};

/** 院長個人のデータ（検索エンジン向け）。トップの診療所データの院長（#director）と同じ人として結びつける */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": `${BASE_URL}/director#person`,
  name: "野村信介",
  alternateName: ["野村 信介", "のむら しんすけ", "Shinsuke Nomura"],
  jobTitle: "院長",
  url: `${BASE_URL}/director`,
  image: `${BASE_URL}/director.png`,
  medicalSpecialty: ["Surgery", "Gastroenterology"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "防衛医科大学校" },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "医学博士" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "日本外科学会認定 外科専門医" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "日本消化器外科学会認定 消化器外科専門医" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "日本医師会認定 健康スポーツ医" },
  ],
  worksFor: { "@type": "MedicalClinic", name: "木花のむら総合診療所", url: BASE_URL },
  sameAs: ["https://researchmap.jp/shinsuke_nomura"],
};

export default function DirectorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <DirectorPageClient />
    </>
  );
}
