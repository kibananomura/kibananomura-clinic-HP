export type PatientLinkItem = {
  href?: string;
  tel?: string;
  ja: { label: string; desc: string; telLabel?: string };
  en: { label: string; desc: string; telLabel?: string };
};

export type PatientLinkGroup = {
  phase: 1 | 2 | 3;
  ja: { title: string };
  en: { title: string };
  items: PatientLinkItem[];
};

export const PATIENT_LINK_PHASE_LABELS = {
  ja: {
    1: "休日・夜間・緊急時",
    2: "予防・健診・制度",
    3: "感染症・医療機関検索",
  },
  en: {
    1: "Holidays, nights & emergencies",
    2: "Prevention, checkups & programs",
    3: "Infections & facility search",
  },
} as const;

export const PATIENT_LINK_PAGE = {
  ja: {
    eyebrow: "患者さん・ご家族向け",
    heading: "関連リンク",
    intro:
      "当院が休診の日や、夜間・休日に不安を感じたときに役立つ、宮崎市・宮崎県の公式情報へのリンクです。内容は変更になることがあります。",
    disclaimer:
      "※ 当番・診療時間・制度内容は変更になる場合があります。必ず各公式サイトまたはお電話で最新情報をご確認ください。当院の診療サービスではない外部サイトへのリンクです。",
    schedulePrompt: "日曜・祝日・当院休診時の受診先は",
    scheduleLink: "関連リンク一覧",
    footerHeading: "患者さん・ご家族向け",
    viewAll: "関連リンク一覧を見る",
  },
  en: {
    eyebrow: "For patients & families",
    heading: "Related links",
    intro:
      "Official Miyazaki City and Prefecture resources for when we are closed or you need help on nights and holidays.",
    disclaimer:
      "* Schedules and programs may change. Always confirm on the official site or by phone. These are external sites, not services provided by our clinic.",
    schedulePrompt: "When we are closed (Sun, holidays, etc.), see",
    scheduleLink: "related links",
    footerHeading: "For patients & families",
    viewAll: "View all related links",
  },
} as const;

export const PATIENT_LINK_GROUPS: PatientLinkGroup[] = [
  {
    phase: 1,
    ja: { title: "休日・夜間・緊急時" },
    en: { title: "Holidays, nights & emergencies" },
    items: [
      {
        href: "https://www.city.miyazaki.miyazaki.jp/health/disease/785.html",
        ja: {
          label: "休日・祝日の当番医（宮崎市）",
          desc: "日曜・祝日・年末年始の在宅当番医。医師会・歯科医師会の情報へ。受診前に電話確認を。",
        },
        en: {
          label: "Holiday duty doctors (Miyazaki City)",
          desc: "On-call doctors on Sundays, holidays and year-end. Call ahead before visiting.",
        },
      },
      {
        href: "https://www.shiyaku-miyazaki.or.jp/",
        ja: {
          label: "休日当番薬局（宮崎市郡薬剤師会）",
          desc: "休日・祝日に開局する当番薬局の一覧。",
        },
        en: {
          label: "Holiday duty pharmacies (Miyazaki City)",
          desc: "List of pharmacies open on holidays.",
        },
      },
      {
        href: "https://www.city.miyazaki.miyazaki.jp/health/disease/12245.html",
        ja: {
          label: "夜間急病センター（宮崎市）",
          desc: "毎日19時〜翌7時。内科・外科 0985-77-9915／小児科 0985-29-0119。事前に電話を。",
          telLabel: "内科・外科",
        },
        en: {
          label: "Night emergency center (Miyazaki City)",
          desc: "Daily 7 PM–7 AM. Internal med & surgery 0985-77-9915 / Pediatrics 0985-29-0119. Call first.",
          telLabel: "Internal med & surgery",
        },
      },
      {
        href: "https://www.city.miyazaki.miyazaki.jp/health/disease/486.html",
        ja: {
          label: "宮崎市の救急医療体制",
          desc: "休日当番医・夜間急病センターなど、市内の救急医療の全体像。",
        },
        en: {
          label: "Miyazaki City emergency medical system",
          desc: "Overview of holiday duty care and night emergency centers in the city.",
        },
      },
      {
        href: "http://www.pref.miyazaki.lg.jp/iryoseisaku/kurashi/iryo/index-03.html",
        tel: "0985358855",
        ja: {
          label: "＃8000 子ども救急医療電話相談（宮崎県）",
          desc: "小児科医・看護師等が電話相談。携帯は #8000、一般回線は 0985-35-8855。診断・治療は行いません。",
          telLabel: "一般回線",
        },
        en: {
          label: "#8000 Child emergency phone consultation (Miyazaki)",
          desc: "Phone advice from pediatric staff. Mobile #8000, landline 0985-35-8855. Not a diagnosis service.",
          telLabel: "Landline",
        },
      },
    ],
  },
  {
    phase: 2,
    ja: { title: "予防・健診・制度" },
    en: { title: "Prevention, checkups & programs" },
    items: [
      {
        href: "https://www.city.miyazaki.miyazaki.jp/education/vaccination/202016.html",
        ja: {
          label: "予防接種（宮崎市）",
          desc: "定期・任意接種の実施医療機関一覧など。接種は事前予約が必要です。",
        },
        en: {
          label: "Vaccinations (Miyazaki City)",
          desc: "List of providers for routine and subsidized vaccines. Advance booking required.",
        },
      },
      {
        href: "https://www.city.miyazaki.miyazaki.jp/education/vaccination/202021.html",
        ja: {
          label: "任意予防接種の助成（宮崎市）",
          desc: "おたふくかぜ・3種混合・HPV（男子）など、市の助成制度。",
        },
        en: {
          label: "Optional vaccination subsidies (Miyazaki City)",
          desc: "City subsidies for mumps, DPT booster, HPV (boys), etc.",
        },
      },
      {
        href: "https://www.city.miyazaki.miyazaki.jp/health/health/checkup/2273.html",
        ja: {
          label: "特定健診・がん検診（宮崎市）",
          desc: "特定健康診査、各種がん検診の案内・受診券について。",
        },
        en: {
          label: "Health & cancer screenings (Miyazaki City)",
          desc: "Specific health checkups and cancer screening programs.",
        },
      },
      {
        href: "https://www.city.miyazaki.miyazaki.jp/education/childbirth/399034.html",
        ja: {
          label: "子ども医療費助成（宮崎市）",
          desc: "0歳〜中学3年生の医療費助成。受給資格証の交付申請が必要です。",
        },
        en: {
          label: "Child medical fee subsidy (Miyazaki City)",
          desc: "Medical fee support for ages 0 through junior high. Certificate required.",
        },
      },
      {
        href: "https://www.iryou.teikyouseido.mhlw.go.jp/znk-web/juminkanja/S2300/initialize",
        ja: {
          label: "医療情報ネット「ナビイ」（厚生労働省）",
          desc: "全国の病院・診療所・薬局を診療科目などから検索。",
        },
        en: {
          label: "Medical Information Net “Navii” (MHLW)",
          desc: "Search hospitals, clinics and pharmacies nationwide.",
        },
      },
    ],
  },
  {
    phase: 3,
    ja: { title: "感染症・医療機関情報" },
    en: { title: "Infections & medical facility info" },
    items: [
      {
        href: "https://www.pref.miyazaki.lg.jp/contents/org/fukushi/eikanken/center/infectious/",
        ja: {
          label: "宮崎県感染症情報（感染症週報）",
          desc: "インフルエンザなど、県内の感染症発生動向。",
        },
        en: {
          label: "Miyazaki Prefecture infectious disease reports",
          desc: "Weekly reports on flu and other infections in the prefecture.",
        },
      },
      {
        href: "https://www.pref.miyazaki.lg.jp/yakumukansensho/kurashi/hoken/20240315162547.html",
        ja: {
          label: "発熱時の相談・受診（宮崎県）",
          desc: "発熱などの症状がある場合の受診の考え方。かかりつけ医への事前連絡など。",
        },
        en: {
          label: "Fever & when to seek care (Miyazaki Prefecture)",
          desc: "Guidance on consulting your family doctor when you have a fever.",
        },
      },
      {
        href: "https://www.pref.miyazaki.lg.jp/iryoseisaku/kurashi/iryo/20251222112444.html",
        ja: {
          label: "医療機能情報（宮崎県）",
          desc: "医療機関の機能情報提供制度の案内。ナビイでの検索方法も。",
        },
        en: {
          label: "Medical facility information (Miyazaki Prefecture)",
          desc: "How to find facilities by function via official systems.",
        },
      },
      {
        href: "https://www.gakkohoken.jp/system_information/jssh_absence_information_mapping",
        ja: {
          label: "学校等欠席者・感染症情報（感染症マップ）",
          desc: "学校保健会の感染症情報マップ。お子さんの登園・登校判断の参考に。",
        },
        en: {
          label: "School absence & infection map (Japan School Health)",
          desc: "Reference map for school-related infection trends.",
        },
      },
    ],
  },
];

/** フッターに表示する Phase 1 の主要リンク */
export const FOOTER_LINK_HREFS: readonly string[] = [
  "https://www.city.miyazaki.miyazaki.jp/health/disease/785.html",
  "https://www.shiyaku-miyazaki.or.jp/",
  "https://www.city.miyazaki.miyazaki.jp/health/disease/12245.html",
  "http://www.pref.miyazaki.lg.jp/iryoseisaku/kurashi/iryo/index-03.html",
];

export function getFooterHighlightLinks(lang: "ja" | "en") {
  const phase1 = PATIENT_LINK_GROUPS.find((g) => g.phase === 1);
  if (!phase1) return [];
  return phase1.items.filter(
    (item) => item.href && FOOTER_LINK_HREFS.includes(item.href),
  ).map((item) => ({
    href: item.href!,
    label: lang === "en" ? item.en.label : item.ja.label,
  }));
}
