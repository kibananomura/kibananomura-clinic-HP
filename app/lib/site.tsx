"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { BRAND } from "./brand";
import { FAQ_CATEGORIES_EN, FAQ_CATEGORIES_JA, type FaqCategory } from "./faq-data";

/**
 * 駐車場の台数・状態（「完備予定」の文言）を一元管理する定数。
 * 開院後に「予定」を外す際は、ここだけを更新すればヒーロー補足バッジ
 * （hero.supp3）とAccessセクション（access.parkingValue）の両方に反映される。
 */
export const PARKING_STATUS = {
  ja: "駐車場32台 完備予定",
  ja_short: "32台（うち発熱の方専用5台）完備予定",
  en: "32 parking spaces planned",
  en_short: "32 spaces planned (5 reserved for patients with a fever)",
} as const;

export type Lang = "ja" | "en";

type NavItem = { href: string; label: string };
type Titled = { title: string; body: string };

export interface SiteDict {
  common: {
    toTop: string;
    menuOpen: string;
    menuClose: string;
    langSwitch: string;
    backHome: string;
  };
  nav: NavItem[];
  headerCta: string;
  notice: { lead: string; strong: string; tail: string; close: string };
  hero: {
    eyebrow: string;
    titleLines: string[][];
    subLocation: string;
    subDept: string;
    subOpen: string;
    ctaLine: string;
    ctaGuide: string;
    guide: Titled[];
    guideLink: string;
    firstVisitLink: string;
    faqLink: string;
    supp1: string;
    supp2: string;
    supp3: string;
    careersBadge: string;
  };
  mission: {
    eyebrow: string;
    heading: string;
    cards: Titled[];
    visionQuote: string;
    visionCaption: string;
  };
  features: {
    eyebrow: string;
    heading: string;
    items: Titled[];
    miniLegendPre: string;
    miniLegendStrong: string;
    miniDays: string[];
    weekendNote: string;
  };
  director: {
    eyebrow: string;
    roleLabel: string;
    name: string;
    reading: string;
    qualifications: string[];
    storyIntro: string;
    quote: string;
    storyBody: string[];
    storyMore: string;
    storyMoreHref: string;
    catch: string;
    photoNote: string;
    portraitAria: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    deptLabel: string;
    departments: string[];
    detailHeading: string;
    details: {
      title: string;
      items: { label: string; href?: string }[];
      note: string;
      wide: boolean;
    }[];
    diseasesLink: string;
    insuranceBadge: string;
    insuranceTitle: string;
    insuranceBody: string;
    insuranceTags: string[];
    selfpayBadge: string;
    selfpayTitle: string;
    selfpayItems: { label: string; slug: string }[];
    selfpayMore: string;
    pricingLink: string;
    equipmentLink: string;
    checkupsBadge: string;
    checkupsTitle: string;
    checkupsBody: string;
    checkupsTags: string[];
    checkupsLink: string;
    scheduleTitle: string;
    amLabel: string;
    pmLabel: string;
    legendOpen: string;
    legendClosed: string;
    scheduleNotes: string[];
    closedNote: string;
    days: string[];
    cta: string;
  };
  access: {
    eyebrow: string;
    heading: string;
    mapTitle: string;
    mapSub: string;
    mapUrl: string;
    mapEmbed: string;
    mapButton: string;
    addressLabel: string;
    addressValue: string;
    addressNote: string;
    parkingLabel: string;
    parkingValue: string;
    /** 駐輪場・バス・薬局・バリアフリーなど、来院に関わる情報（駐車場の下に並べる）。value の \n は改行して表示する */
    details: { label: string; value: string }[];
    openLabel: string;
    openValue: string;
    note: string;
  };
  register: {
    badge: string;
    heading: string;
    body: string;
    button: string;
    note: string;
  };
  footer: {
    tagline: string;
    badge: string;
    menuHeading: string;
    deptHeading: string;
    deptItems: string[];
    snsHeading: string;
    copyrightDept: string;
    privacyLabel: string;
    /** プライバシーポリシーの「ホームページの安全性について」（/privacy#security）へのリンク */
    securityLabel: string;
    careersLabel: string;
    firstVisitLabel: string;
    faqLabel: string;
    contactLabel: string;
    tokushohoLabel: string;
    blogLabel: string;
    newsLabel: string;
    lineAria: string;
    instaAria: string;
  };
  privacy: {
    eyebrow: string;
    heading: string;
    intro: string;
    /** id はページ内リンク用（例：/privacy#security） */
    sections: { id?: string; title: string; body: string[] }[];
    updated: string;
  };
  equipment: {
    eyebrow: string;
    heading: string;
    intro: string;
    imageNote: string;
  };
  blog: {
    eyebrow: string;
    heading: string;
    intro: string;
    readMore: string;
    backToList: string;
    latestHeading: string;
    viewAll: string;
    prev: string;
    next: string;
    allCategories: string;
    postCountSuffix: string;
    contactCta: {
      heading: string;
      body: string;
      button: string;
    };
    /** ブログの題材のご要望をキバナビで受け付ける案内（キバナビが院長に届ける） */
    requestNote: { body: string; button: string };
  };
  news: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: { date: string; tag: string; title: string; body: string }[];
  };
  pricing: {
    eyebrow: string;
    heading: string;
    intro: string;
    groups: {
      title: string;
      items: {
        name: string;
        price: string;
        /** 医療広告ガイドライン対応：①治療内容の概要（自費診療のみ） */
        overview?: string;
        /** ③主なリスク・副作用（自費診療のみ） */
        risks?: string;
        /** ④未承認医薬品等・適応外使用に関する明示（自費診療のみ） */
        approval?: string;
      }[];
    }[];
    disclaimer: string;
    servicesLinkLabel: string;
  };
  servicesPage: {
    eyebrow: string;
    heading: string;
    intro: string;
    deptDescs: string[];
    selfpayHeading: string;
    selfpayIntro: string;
    selfpayItems: { name: string; desc: string; slug: string }[];
    scheduleHeading: string;
    linksHeading: string;
    equipmentLabel: string;
    pricingLabel: string;
  };
  survey: {
    badge: string;
    heading: string;
    body: string;
    cta: string;
    dismiss: string;
  };
  firstVisit: {
    eyebrow: string;
    heading: string;
    intro: string;
    steps: { num: string; title: string; body: string }[];
    prepHeading: string;
    prepSubnote: string;
    prepItems: string[];
    insuranceHeading: string;
    insuranceBody: string;
    noteHeading: string;
    notes: string[];
  };
  /** 初診の方へページの「発熱・感染症の症状がある方へ」（/first-visit#fever） */
  feverVisit: {
    heading: string;
    /** 見出し横のバッジ（予約制であることを色で示す） */
    badge: string;
    /** 見出しの直下に色付きで出す、予約が必要なことのお知らせ（全体を太字で出すので ** は使わない） */
    reservationNotice: string;
    intro: string;
    steps: string[];
    notes: string[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    intro: string;
    /** 予約・料金・アクセスなど、よくある質問から各ページへ案内するリンク */
    pagesHeading: string;
    /** tone: "fever" は発熱の受診方法（予約制）。初診の方へページの発熱の枠と同じ暖色で出す */
    pageLinks: { label: string; href: string; tone?: "fever" }[];
    categories: FaqCategory[];
  };
  tokushoho: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: { label: string; value: string }[];
    disclaimer: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
    lineLabel: string;
    lineNote: string;
    emailLabel: string;
    emailNote: string;
    note: string;
  };
}

const ja: SiteDict = {
  common: {
    toTop: "木花のむら総合診療所 トップへ",
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
    langSwitch: "言語を切り替え",
    backHome: "トップへ戻る",
  },
  nav: [
    { href: "/#director", label: "院長紹介" },
    { href: "/blog", label: "院長ブログ" },
    { href: "/#services", label: "診療案内" },
    { href: "/symptoms", label: "症状から調べる" },
    { href: "/diseases", label: "病気について調べる" },
    { href: "/faq", label: "よくある質問" },
    { href: "/first-visit", label: "初診の方へ" },
    { href: "/pricing", label: "料金について" },
    { href: "/#access", label: "アクセス" },
  ],
  headerCta: "開院情報を受け取る",
  notice: {
    lead: "現在は",
    strong: "建設準備中",
    tail: "です。ご予約の受付は開院前に開始予定です（2027年10月1日開院予定）。",
    close: "お知らせを閉じる",
  },
  hero: {
    eyebrow: `宮崎市熊野 ｜ ${BRAND.ja.withSub} ｜ よろず相談所のようなクリニック`,
    titleLines: [
      ["内科・外科・小児科から"],
      ["何科かわからない症状まで診る"],
      ["よろず診療所"],
    ],
    subLocation: "宮崎市熊野",
    subDept: "内科・外科・小児科",
    subOpen: "2027年10月1日 開院予定",
    ctaLine: "開院情報を受け取る（LINE登録）",
    ctaGuide: "診療のご案内",
    guide: [
      {
        title: "保険診療",
        body: "内科・外科に対応予定（内科ではアレルギー・小児の一次対応も行う予定）。CT・胃カメラ・エコー・外科小手術に院内で対応できる体制を整備予定です。",
      },
      {
        title: "自費診療",
        body: "GLP-1受容体作動薬（肥満治療）、AGA・FAGA、ED治療、TRT など。",
      },
      {
        title: "受付時間",
        body: "月〜金（土日祝休み）。午前・午後とも診療します。昼休みは近隣施設への訪問診療の時間帯として予定。土曜・日曜は院長の都合がつく日に限り、17:30〜18:30に外科処置専門の特別外来を開設することがあります。",
      },
    ],
    guideLink: "詳しい診療内容を見る →",
    firstVisitLink: "初診の方へ →",
    faqLink: "よくある質問 →",
    supp1: "平日は毎日、午前・午後診察",
    supp2: "CT・胃カメラ・外科処置に院内で対応予定",
    supp3: PARKING_STATUS.ja,
    careersBadge: "職員募集",
  },
  mission: {
    eyebrow: "私たちの約束",
    heading: "木花のむら総合診療所が目指すもの",
    cards: [
      {
        title: "理念",
        body: "患者さんもスタッフもみんなを笑顔にするクリニック",
      },
      {
        title: "ミッション",
        body: "誰もが気兼ねなく医療につながり、安心して暮らし続けられる地域を創ること",
      },
      {
        title: "ビジョン",
        body: "子供から高齢者まで、すべての世代の安心を支える地域のかかりつけ診療所になる",
      },
      {
        title: "バリュー",
        body: "①誠実な対話と共同意思決定　②たゆまない自己研鑽　③高潔な医療倫理　④ITの積極活用による患者へのゆとり　⑤主体性・チーム全体最適・持続可能な運営　⑥自己の心身管理",
      },
    ],
    visionQuote: "子供から高齢者まで、すべての世代の安心を支える地域のかかりつけ診療所になる",
    visionCaption: "── 木花のむら総合診療所　ビジョン",
  },
  features: {
    eyebrow: "選ばれる理由",
    heading: "診療所の4つの特徴",
    items: [
      {
        title: "平日は毎日、午前・午後診察",
        body: "月曜から金曜まで、毎日午前・午後とも診察します。仕事の合間・学校帰りにも、気軽に立ち寄れます。",
      },
      {
        title: "CTから外科処置まで、院内で対応予定",
        body: "16列CT・デジタルX線・エコー・経鼻内視鏡を院内に整備予定。まずは何でもご相談いただき、できる限り院内で検査・対応できる体制を目指します（内容によっては適切な専門医療機関をご紹介します）。",
      },
      {
        title: "待たない仕組み",
        body: "Web問診（スマホ事前入力）・セミセルフレジ・車内でのオンライン受付で、来院から会計まで概ね30分程度を目安に、できるだけ早くお帰りいただける体制を目指します。もちろんWebを使わないご来院・直接のご予約も可能です。テクノロジーは、人に寄り添うための道具です。",
      },
      {
        title: "地元の医師が、長く診続ける",
        body: "院長もこの地域で暮らしています。開院して終わりではなく、お名前と顔を覚えて、ずっと診ていきます。",
      },
    ],
    miniLegendPre: "上＝午前 / 下＝午後・",
    miniLegendStrong: "平日は毎日診察",
    miniDays: ["月", "火", "水", "木", "金"],
    weekendNote: "★ 土・日も、院長の都合がつく日に限り外科処置専門の特別外来を開設することがあります",
  },
  director: {
    eyebrow: "院長紹介",
    roleLabel: "院長",
    name: "野村 信介",
    reading: "のむら しんすけ",
    qualifications: ["日本外科学会認定 外科専門医", "日本消化器外科学会認定 消化器外科専門医", "日本医師会認定 健康スポーツ医"],
    storyIntro:
      "防衛医科大学校を卒業。同校は、医師である幹部自衛官（自衛隊医官）としての使命感を持ち、プライマリケアや総合臨床に対応できる人材の育成を理念に掲げており、その中で幅広い診療科に対応する力を培いました。卒業後は大学病院や地域の病院で消化器外科を中心に診療を重ね、手術室をはじめ、さまざまな現場で患者さんと向き合ってきました。",
    quote: "「どこに相談したらいいか分からない」——そんなときこそ、頼ってほしい。",
    storyBody: [
      "木花のむら総合診療所は、宮崎市熊野に根ざす地域密着型のクリニックです。内科・外科・小児科を中心に、お子さんからご高齢の方まで、日常のちょっとした不調から人生の節目まで寄り添う、かかりつけ診療所を目指します。",
      "私たちが大切にしているのは「患者さんもスタッフもみんなを笑顔にするクリニック」という理念です。",
    ],
    storyMore: "院長ブログでキャリアの話を読む",
    storyMoreHref: "/blog/kara-no-michi",
    catch: "あなたとご家族のかかりつけ診療所に。",
    photoNote: "※ 写真は開院準備中（イメージ）",
    portraitAria: "木花のむら総合診療所 院長 野村信介",
  },
  services: {
    eyebrow: "診療のご案内",
    heading: "内科・外科・小児科、幅広い症状に院内で対応予定。",
    deptLabel: "標榜科",
    departments: ["内科", "外科", "小児科"],
    detailHeading: "診療内容",
    diseasesLink: "対応する疾患を一覧で見る →",
    details: [
      {
        title: "内科",
        items: [
          { label: "発熱・せき・のどの痛みが続く", href: "/symptoms/fever-cold" },
          { label: "せきが長引く", href: "/symptoms/persistent-cough" },
          { label: "お腹が痛い", href: "/symptoms/abdominal-pain" },
          { label: "胸やけ・胃もたれが気になる", href: "/symptoms/heartburn-stomach-discomfort" },
          { label: "下痢・便秘などお通じの変化が続く", href: "/symptoms/bowel-changes" },
          { label: "健診で生活習慣病を指摘された", href: "/symptoms/checkup-lifestyle-disease" },
          { label: "首の腫れ・だるさが続く", href: "/symptoms/neck-swelling-fatigue" },
          { label: "鼻水・くしゃみ・肌のかゆみが続く", href: "/symptoms/allergy-rhinitis-itching" },
          { label: "いびき・日中の眠気が気になる", href: "/symptoms/snoring-daytime-sleepiness" },
          { label: "動悸・息切れがある", href: "/symptoms/palpitations-shortness-of-breath" },
          { label: "めまいがする", href: "/symptoms/dizziness" },
          { label: "手足のしびれがある", href: "/symptoms/numbness" },
          { label: "頭痛が続く", href: "/symptoms/headache" },
          { label: "皮膚の赤み・腫れ・熱感がある", href: "/symptoms/skin-redness-swelling" },
          { label: "足のかゆみ・皮むけがある", href: "/symptoms/itchy-feet-skin-peeling" },
        ],
        note: "",
        wide: true,
      },
      {
        title: "外科",
        items: [
          { label: "きず・やけどの処置をしてほしい", href: "/symptoms/wounds-burns" },
          { label: "できもの・しこりが気になる", href: "/symptoms/lumps-and-bumps" },
          { label: "巻き爪・陥入爪など爪のトラブル", href: "/symptoms/nail-trouble" },
          { label: "おしり・痔の症状がある", href: "/symptoms/hemorrhoids" },
          { label: "お腹の張り・痛みが心配", href: "/symptoms/abdominal-distension-surgical" },
          { label: "打撲・捻挫などのケガをした", href: "/symptoms/bruises-sprains-injuries" },
        ],
        note: "骨折の恐れがある場合は、整形外科をご紹介いたします。",
        wide: false,
      },
      {
        title: "小児科",
        items: [
          { label: "お子さんの急な発熱・かぜ", href: "/symptoms/child-fever-cold" },
          { label: "お子さんの鼻水・鼻づまり", href: "/symptoms/child-runny-nose" },
          { label: "お子さんの嘔吐・下痢が心配", href: "/symptoms/child-vomiting-diarrhea" },
        ],
        note: "当院は消化器外科・内科を専門とするクリニックですが、周辺に小児科が少ない地域のインフラとして、お子様の急な風邪、胃腸炎、各種ワクチン接種などの「一次対応（プライマリケア）」に全力を尽くします。より専門的な検査や加療が必要と判断した場合は、速やかに近隣の小児科専門医や基幹病院へご紹介する「安心のハブ（中継点）」としての役割を担います。",
        wide: false,
      },
      {
        title: "予防接種・各種ワクチン",
        items: [
          { label: "インフルエンザ" },
          { label: "新型コロナ（COVID-19）" },
          { label: "HPV（子宮頸がん予防）" },
          { label: "帯状疱疹" },
          { label: "肺炎球菌" },
          { label: "海外渡航のためのワクチン" },
          { label: "その他 各種ワクチン" },
        ],
        note: "接種をご希望の方は、お電話やLINEでお気軽にお問い合わせください。海外渡航に伴うワクチン接種証明書の発行（外国語対応）も行っております。",
        wide: true,
      },
    ],
    insuranceBadge: "保険診療",
    insuranceTitle: "院内の検査・設備",
    insuranceBody:
      "CT・胃カメラ・エコーから外科小手術まで、必要な検査や処置を院内で行えます。気になる症状をその日のうちに調べられます。",
    insuranceTags: [
      "16列CT",
      "経鼻内視鏡（胃カメラ）",
      "エコー",
      "デジタルX線",
      "FENO（喘息診断）",
      "外科小手術",
    ],
    selfpayBadge: "自費診療",
    selfpayTitle: "お悩みに合わせて",
    selfpayItems: [
      { label: "GLP-1受容体作動薬（肥満治療）", slug: "glp1" },
      { label: "AGA（男性型脱毛症）", slug: "aga" },
      { label: "LOH症候群・TRT", slug: "loh-trt" },
      { label: "FAGA（女性の薄毛）", slug: "faga" },
      { label: "ED治療薬", slug: "ed" },
      { label: "花粉症ステロイド注射", slug: "pollen-steroid" },
    ],
    selfpayMore: "ほか",
    pricingLink: "料金の詳細を見る →",
    equipmentLink: "検査・設備の詳細を見る →",
    checkupsBadge: "健診・検診",
    checkupsTitle: "健康診断・各種検診も行えます",
    checkupsBody:
      "一般的な健康診断・人間ドックから、特定健診、胃がん・大腸がん・肺がんの各種がん検診、結核健診、ABC検診、肝炎ウイルス検診、企業健診（法定健診・特定業務健診）まで対応予定。院内CTを用いた肺がん2次検診（精密検査）も行います。宮崎市の特定健診・がん検診の対象となる方や自己負担額は、宮崎市からの案内（受診券など）をご確認ください。",
    checkupsTags: [
      "健康診断",
      "人間ドック",
      "特定健診",
      "胃がん検診",
      "大腸がん検診",
      "肺がん検診",
      "結核健診",
      "ABC検診",
      "肝炎ウイルス検診",
      "企業健診",
      "特定業務健診",
      "肺がん2次検診（CT）",
    ],
    checkupsLink: "健診・検診の詳細を見る →",
    scheduleTitle: "受付時間",
    amLabel: "午前",
    pmLabel: "午後",
    legendOpen: "受付",
    legendClosed: "休診",
    scheduleNotes: [
      "★ 昼休みは近隣施設への訪問診療の時間帯として予定しています",
      "★ 土・日は院長の都合がつく日に限り、17:30〜18:30に外科処置専門の特別外来を開設することがあります（空き日程は前週までにご案内予定）",
    ],
    closedNote: "休診：土曜・日曜・祝日（外科処置外来を除く）",
    days: ["月", "火", "水", "木", "金"],
    cta: "詳しい診療内容を見る",
  },
  access: {
    eyebrow: "アクセス",
    heading: "通いやすい場所で、お待ちしています。",
    mapTitle: "木花のむら総合診療所 開院予定地",
    mapSub: "〒889-2151 宮崎県宮崎市熊野5233-2",
    mapUrl: "https://maps.google.com/maps?q=%E5%AE%AE%E5%B4%8E%E7%9C%8C%E5%AE%AE%E5%B4%8E%E5%B8%82%E7%86%8A%E9%87%8E5233-2",
    mapEmbed:
      "https://maps.google.com/maps?q=%E5%AE%AE%E5%B4%8E%E7%9C%8C%E5%AE%AE%E5%B4%8E%E5%B8%82%E7%86%8A%E9%87%8E5233-2&z=14&output=embed",
    mapButton: "Googleマップで開く",
    addressLabel: "所在地",
    addressValue: "〒889-2151 宮崎県宮崎市熊野5233-2",
    parkingLabel: "駐車場",
    parkingValue: PARKING_STATUS.ja_short,
    details: [
      { label: "駐輪場", value: "正面玄関の右横に設置予定（自転車・バイク）" },
      { label: "お車で", value: "JR木花駅から約5分\nJR清武駅から約10分\nJR青島駅から約12分\n宮崎空港から約13分\nJR南宮崎駅から約16分\nJR田野駅から約20分\n日南東郷ICから約30分\n（いずれも目安）" },
      { label: "近くの主な施設から（お車で）", value: "宮崎大学（木花キャンパス）から約2分\n宮崎県総合運動公園から約5分\n宮崎大学医学部附属病院から約5分\n清武南ICから約10分\n清武ICから約11分" },
      { label: "近くの学校から（お車で）", value: "約2〜5分：木花中学校・木花小学校・学園木花台小学校\n約7〜8分：清武小学校・清武中学校・国富小学校・鏡洲小学校\n約11〜13分：本郷小学校・本郷中学校・赤江中学校・青島小学校・青島中学校\n約14〜15分：宮崎南小学校・加納小学校・加納中学校・赤江東中学校\n約20〜21分：田野小学校・田野中学校" },
      { label: "バス", value: "最寄りの下原バス停から徒歩約3分" },
      { label: "薬局", value: "隣の敷地に調剤薬局が開設予定" },
      { label: "バリアフリー", value: "院内はバリアフリー設計で、車いすのままお入りいただけます。車いす用トイレもございます" },
    ],
    openLabel: "開院",
    openValue: "2027年10月1日 予定（現在 建設準備中）",
    addressNote: "※現在建設準備中です。",
    note: "山下橋（清武川）開通後は、まなび野・学園台方面からのアクセスがさらに便利になります。宮崎市南部（木花・熊野・学園木花台・本郷・清武エリア）にお住まいの方を中心に、JR木花駅・運動公園駅や宮崎大学木花キャンパス周辺からもお車でお越しいただきやすい立地です。",
  },
  register: {
    badge: "2027年10月1日 開院予定",
    heading: "開院情報を、いち早くお届けします",
    body: "2027年10月1日の開院に向けて、準備状況・内覧会情報・予約開始のお知らせを、LINE公式アカウントでご連絡します。",
    button: "LINE で登録する",
    note: "※ 現在は建設準備中のため、ご予約の受付は開院前に開始いたします。",
  },
  footer: {
    tagline:
      "宮崎市熊野の木花のむら総合診療所。内科・外科・小児科を中心に、よろず相談所のように気軽に立ち寄れる場所を目指しています。宮崎市南部（木花・熊野・学園木花台・本郷・清武エリア）の皆さまのかかりつけ医として。",
    badge: "2027年10月1日 開院予定 ／ 建設準備中",
    menuHeading: "メニュー",
    deptHeading: "診療科・所在地",
    deptItems: [
      "内科・外科・小児科",
      "〒889-2151 宮崎県宮崎市熊野5233-2",
      "TEL：開院後に設定いたします",
    ],
    snsHeading: "SNS",
    copyrightDept: "宮崎市熊野 ｜ 内科・外科・小児科",
    privacyLabel: "プライバシーポリシー",
    securityLabel: "ホームページの安全性",
    careersLabel: "医療関係者向け",
    firstVisitLabel: "初診の方へ",
    faqLabel: "よくある質問",
    contactLabel: "お問い合わせ",
    tokushohoLabel: "特定商取引法に基づく表記",
    blogLabel: "ブログ",
    newsLabel: "お知らせ",
    lineAria: "LINE公式アカウント",
    instaAria: "Instagram",
  },
  privacy: {
    eyebrow: "プライバシーポリシー",
    heading: "プライバシーポリシー",
    intro:
      "木花のむら総合診療所（以下「当院」といいます）は、患者さんをはじめとする皆さまの個人情報を適切に保護することを重要な責務と考え、関係法令およびガイドラインを遵守し、以下の方針に基づいて個人情報を取り扱います。",
    sections: [
      {
        title: "1. 個人情報の取得について",
        body: [
          "当院は、適法かつ公正な手段によって個人情報を取得します。診療や各種お問い合わせに際して、お名前・連絡先・健康に関する情報などをお預かりすることがあります。",
        ],
      },
      {
        title: "2. 個人情報の利用目的",
        body: [
          "取得した個人情報は、次の目的の範囲内で利用します。",
          "・診療、検査、治療など医療サービスの提供",
          "・診療報酬の請求、ご予約や各種お問い合わせへの対応",
          "・他の医療機関や薬局等との連携、ご紹介",
          "・医療サービスの維持・向上のための検討",
          "・法令に基づく対応",
        ],
      },
      {
        title: "3. 第三者への提供",
        body: [
          "当院は、法令で認められる場合を除き、あらかじめご本人の同意を得ることなく個人情報を第三者に提供することはありません。",
        ],
      },
      {
        title: "4. 個人情報の安全管理",
        body: [
          "当院は、個人情報への不正アクセス、紛失、破壊、改ざん、漏えいなどを防止するため、適切な安全管理措置を講じ、継続的な改善に努めます。",
        ],
      },
      {
        id: "security",
        title: "5. ホームページの安全性について",
        body: [
          "近年、WordPressなどPHPで動くホームページの弱点を突いた改ざんや情報漏えいが多く報告されています。当院のホームページは、PHPやWordPressを使わず、Next.jsという仕組みで作り、Vercel社（米国）のサーバーから配信しています。PHPやWordPressの弱点を狙った攻撃の影響は受けない構成です。",
          "・ホームページとの通信は、すべて暗号化（HTTPS）しています。",
          "・このホームページには、会員登録やお問い合わせフォームなど、お名前・ご住所・電話番号・保険証の情報などを登録していただく機能はありません。お問い合わせは、お電話・LINE公式アカウント・メールでお受けしています。",
          "・電子カルテなど、診療の情報を扱うシステムは、このホームページとはつながっていません。",
          "・インターネット上の安全に「絶対」はないため、使っている仕組みを最新の状態に保ち、見直しを続けます。",
        ],
      },
      {
        title: "6. 案内チャットボット「キバナビ」について",
        body: [
          "当院のホームページと公式LINEでは、AI（人工知能）がホームページ内の情報をもとに自動でお答えする案内チャットボット「キバナビ」を提供しています。公式LINEでは、メニューの「キバナビに質問する」を選んだ場合にのみキバナビがお答えし、それ以外のメッセージには当院スタッフが対応します。",
          "・ご入力いただいたご質問は、回答を作成するため、AIサービス提供事業者（Anthropic社・米国）に送信されます。同社は、送信された内容をAIの学習には利用しません。",
          "・ご質問と回答の内容は、ホームページの改善やよくあるご質問の充実のため、当院および当院の開業準備を支援する担当者が記録・分析します。記録の際、電話番号・メールアドレスと思われる文字列は自動で伏せ字にし、IPアドレスやLINEのユーザーIDなど個人を特定する情報は記録しません。記録は1年を経過した時点で削除します。",
          "・院長ブログの題材のご要望をいただいた場合は、ご要望の内容を院長に伝えるため、別に記録します。",
          "・お名前・連絡先などの個人情報や、詳しい症状は入力しないでください。チャットボットは診断や治療の判断を行うものではありません。",
        ],
      },
      {
        title: "7. アクセス解析について",
        body: [
          "ホームページの改善のため、Google アナリティクス（Google社）と Vercel Web Analytics（Vercel社）を使い、閲覧されたページ・閲覧環境などの統計情報を集めています。Google アナリティクスは Cookie（クッキー）を使いますが、集める情報に、お名前など個人を特定する情報は含まれません。",
          "・Cookie は、ブラウザの設定で無効にできます。Google アナリティクスによる情報の収集は、Google社が提供する「Google アナリティクス オプトアウト アドオン」でも止められます。",
        ],
      },
      {
        title: "8. 開示・訂正・利用停止のご請求",
        body: [
          "ご本人からご自身の個人情報の開示・訂正・利用停止等のご請求をいただいた場合は、ご本人であることを確認のうえ、法令に従い適切に対応します。",
        ],
      },
      {
        title: "9. お問い合わせ",
        body: [
          "個人情報の取り扱いに関するお問い合わせは、開院後に当院窓口・お電話・LINE公式アカウントにて承ります。",
        ],
      },
      {
        title: "10. 本ポリシーの改定",
        body: [
          "当院は、必要に応じて本ポリシーを見直し、改定することがあります。改定後の内容は、本ページに掲載した時点から適用されます。",
        ],
      },
    ],
    updated: "制定日：2026年6月／改定日：2026年10月（案内チャットボット「キバナビ」・ホームページの安全性・アクセス解析の項目を追加。開院に合わせて改定予定）",
  },
  equipment: {
    eyebrow: "院内の検査・設備",
    heading: "院内でできる検査・設備",
    intro:
      "気になる症状をその日のうちに調べられるよう、院内に検査機器をそろえます。それぞれの検査について、ご案内します。",
    imageNote: "※ 写真はイメージです（実際の機器に差し替え予定）。",
  },
  blog: {
    eyebrow: "院長ブログ",
    heading: "開業前ブログ",
    intro:
      "開院までの準備の様子や、地域のこと、診療への想いを、院長が少しずつお伝えします。",
    readMore: "続きを読む →",
    backToList: "ブログ一覧へ戻る",
    latestHeading: "院長ブログ",
    viewAll: "ブログ一覧を見る →",
    prev: "前の記事",
    next: "次の記事",
    allCategories: "すべて",
    postCountSuffix: "件",
    contactCta: {
      heading: "ご興味・ご質問がある方へ",
      body: "記事の内容について気になることや、開業準備についてのご質問があれば、どうぞお気軽にご連絡ください。",
      button: "contact@kibananomura.jp 宛にメールする",
    },
    requestNote: {
      body: "「〇〇をテーマにブログを書いてほしい」などのご要望があれば、キバナビにお気軽にお寄せください。院長にお伝えします。",
      button: "キバナビにリクエストする",
    },
  },
  news: {
    eyebrow: "お知らせ",
    heading: "クリニックからのお知らせ",
    intro:
      "開院準備の進捗や診療に関する情報をお届けします。最新情報はLINE公式アカウントでもお知らせします。",
    items: [
      {
        date: "2026.06",
        tag: "お知らせ",
        title: "公式ホームページを公開しました",
        body: "木花のむら総合診療所の公式サイトを公開しました。開院（2027年10月1日予定）に向けて、診療内容やアクセスなどの情報を順次お届けしてまいります。",
      },
      {
        date: "2026.06",
        tag: "準備中",
        title: "LINE公式アカウントの友だち募集を準備しています",
        body: "開院情報や予約開始のご案内をいち早くお届けするため、LINE公式アカウントを準備中です。開設までもうしばらくお待ちください。",
      },
    ],
  },
  pricing: {
    eyebrow: "料金",
    heading: "料金のご案内",
    intro:
      "保険診療は各種健康保険が適用されます。自費診療の料金は現時点の参考価格です。金額が最終確定し次第、こちらを更新いたします。",
    groups: [
      {
        title: "保険診療",
        items: [
          { name: "内科・外科・小児科", price: "各種保険適用" },
          { name: "各種検査（CT・胃カメラ・エコー など）", price: "保険診療に準じます" },
          { name: "外科処置・日帰り手術（粉瘤・脂肪腫など）", price: "保険診療（大きさ・部位・必要な検査などで変わるため、診察のうえでご説明します）" },
          { name: "管理栄養士の栄養指導（2回目以降をオンラインで受ける場合のシステム利用料）", price: "1回550円（税込）。保険診療の自己負担とは別にいただきます" },
        ],
      },
      {
        title: "自費診療",
        items: [
          {
            name: "GLP-1ダイエット（低用量開始プラン）",
            price: "月額19,800円〜",
            overview: "GLP-1受容体作動薬を少量から用いる、医師管理下の体重マネジメント治療です。",
            risks:
              "吐き気・嘔吐・下痢・便秘等の消化器症状が比較的高頻度にみられるほか、まれに低血糖、急性膵炎・胆嚢炎等の重篤な副作用が報告されています。効果・体重減少の程度には個人差があります。",
            approval:
              "使用する薬剤によっては、肥満治療としての国内適応外使用、または国内未承認薬の使用に該当する場合があります。使用薬剤の国内承認状況・入手経路は、治療開始前に医師より個別にご説明します。",
          },
          {
            name: "AGA治療（フィナステリド）",
            price: "月額6,200円",
            overview: "男性型脱毛症（AGA）に対する、国内承認薬の内服治療です。",
            risks: "性機能への影響（性欲減退・勃起機能低下等）、肝機能への影響等が報告されています。妊娠中・妊娠の可能性がある女性は薬剤に触れることも避ける必要があります。",
            approval: "国内で承認されている医薬品を、保険適用外の自由診療として処方します（未承認医薬品ではありません）。",
          },
          {
            name: "AGA治療（デュタステリド系）",
            price: "月額10,000円台〜",
            overview: "男性型脱毛症（AGA）に対する、国内承認薬の内服治療です。",
            risks: "性機能への影響（性欲減退・勃起機能低下等）、肝機能への影響等が報告されています。妊娠中・妊娠の可能性がある女性は薬剤に触れることも避ける必要があります。",
            approval: "国内で承認されている医薬品を、保険適用外の自由診療として処方します（未承認医薬品ではありません）。",
          },
          {
            name: "FAGA（女性の薄毛）",
            price: "準備中",
            overview: "女性の薄毛（FAGA）に対する自費診療です。具体的な治療内容は提供開始までにご案内します。",
            risks: "使用薬剤に応じたリスク・副作用は、提供開始までに個別にご案内します。",
            approval: "使用薬剤の国内承認状況は、提供開始までに個別にご案内します。",
          },
          {
            name: "LOH症候群・TRT",
            price: "準備中",
            overview: "加齢男性性腺機能低下症候群（LOH症候群）に対するテストステロン補充療法（TRT）です。具体的な治療内容は提供開始までにご案内します。",
            risks: "多血症、前立腺への影響、睡眠時無呼吸症候群の悪化等が報告されています。詳細は提供開始までに個別にご案内します。",
            approval: "使用薬剤の国内承認状況は、提供開始までに個別にご案内します。",
          },
          {
            name: "ED治療薬（バイアグラ）",
            price: "1錠2,400円",
            overview: "勃起不全（ED）に対する、国内承認薬の内服治療です。",
            risks: "頭痛・ほてり・動悸・消化不良等が報告されています。硝酸剤を使用中の方は併用禁忌です。",
            approval: "国内で承認されている医薬品を、保険適用外の自由診療として処方します（未承認医薬品ではありません）。",
          },
          {
            name: "ED治療薬（シアリス）",
            price: "1錠1,700円",
            overview: "勃起不全（ED）に対する、国内承認薬の内服治療です。",
            risks: "頭痛・ほてり・消化不良・背部痛等が報告されています。硝酸剤を使用中の方は併用禁忌です。",
            approval: "国内で承認されている医薬品を、保険適用外の自由診療として処方します（未承認医薬品ではありません）。",
          },
          {
            name: "花粉症ステロイド注射",
            price: "1回4,000円（診察料別途）",
            overview: "花粉症（アレルギー性鼻炎）の症状を一時的に抑えるステロイドの筋肉注射です。内服薬・点鼻薬での治療を基本とし、ご希望の方に選択肢としてご案内します。",
            risks: "月経異常、糖尿病の悪化、感染症への抵抗力低下、続発性副腎皮質機能不全、消化性潰瘍、精神症状等が報告されています。繰り返しの使用は特に注意が必要です。",
            approval: "使用する注射薬は、花粉症（アレルギー性鼻炎）への使用が添付文書上の適応として明記されていない場合があり、医師の裁量による投与（適応外使用）となることがあります。",
          },
          {
            name: "にんにく注射",
            price: "1回1,500円",
            overview: "ビタミンB1等を含む注射による、一時的な疲労感の緩和を目的とした自費診療です。",
            risks: "まれにアレルギー反応、注射部位の痛み・発赤等が起こることがあります。",
            approval: "使用する製剤は国内で承認されたビタミン剤等です。",
          },
          {
            name: "インフルエンザ予防接種",
            price: "1回3,000円",
            overview: "インフルエンザワクチンの接種です。65歳以上の方など（定期接種の対象の方）は1,400円です。お住まいの自治体からの助成により、自己負担額が異なる場合があります。",
            risks: "接種部位の腫れ・痛み、発熱等の一般的な副反応のほか、まれにアナフィラキシー等の重い副反応が報告されています。",
            approval: "国内で承認されているワクチンを使用します。",
          },
          {
            name: "診断書（当院書式）",
            price: "2,500円",
            overview: "当院の書式で作成する診断書です（保険適用外）。",
          },
          {
            name: "各種予防接種・ワクチン",
            price: "準備中",
            overview: "任意接種のワクチン（成人用ワクチン等）です。具体的な種類・料金は提供開始までにご案内します。",
            risks: "接種部位の腫れ・痛み、発熱等の一般的な副反応のほか、まれにアナフィラキシー等の重い副反応が報告されています。",
            approval: "国内で承認されているワクチンを使用します。",
          },
          {
            name: "ピロリ菌3次除菌（2次除菌まで不成功の場合）",
            price: "25,000円（診察・お薬・除菌判定検査込み、目安）",
            overview: "2次除菌までの治療で不成功だった場合の、3次除菌治療（保険適用外）です。",
            risks: "下痢・軟便、味覚異常、発疹等が報告されています。除菌率は1次・2次除菌と比べて個人差があります。",
            approval: "使用する薬剤の組み合わせによっては、ピロリ菌除菌としての国内適応外使用に該当する場合があります。詳細は診察時に医師よりご説明します。",
          },
        ],
      },
      {
        title: "健診（自費診療・保険診療とは異なります）",
        items: [
          {
            name: "半日人間ドック",
            price: "準備中（今後掲載予定）",
            overview: "半日で主要な検査項目を一通り受けていただける、保険適用外の総合健診です。内容・料金は提供開始までにご案内します。",
          },
          {
            name: "胃カメラ（健診としてのご希望）",
            price: "準備中（今後掲載予定）",
            overview: "症状がない方が、健診として自費でご希望される場合の胃カメラ検査です。",
            risks: "鼻から挿入する経鼻内視鏡で、鎮静剤は原則使用しません。鼻腔の前処置・局所麻酔に伴う鼻出血や痛み、まれに出血・穿孔等の合併症が報告されています。",
          },
          {
            name: "胃がんリスク検診（ABC検診）",
            price: "準備中（今後掲載予定）",
            overview: "採血でピロリ菌抗体とペプシノゲンを測定し、胃がんになりやすさをA〜D群に分類する検査です。がんそのものを見つける検査ではないため、判定に応じて胃カメラをおすすめします。",
            risks: "採血に伴う内出血・痛み等が起こることがあります。除菌治療後の方、胃酸を抑える薬を服用中の方、胃の手術を受けた方などは正しく判定できないため対象外です。",
          },
          {
            name: "CT検査（健診としてのご希望）",
            price: "準備中（今後掲載予定）",
            overview: "症状がない方が、健診として自費でご希望される場合のCT検査です。",
            risks: "検査に伴うX線被ばくがあります。造影剤を使用する場合はアレルギー反応等のリスクがあります。",
          },
          {
            name: "腹部エコー（健診としてのご希望）",
            price: "準備中（今後掲載予定）",
            overview: "症状がない方が、健診として自費でご希望される場合の腹部超音波検査です。",
          },
          {
            name: "頸動脈エコー（健診としてのご希望）",
            price: "準備中（今後掲載予定）",
            overview: "動脈硬化の評価を目的とした、頸動脈の超音波検査です。",
          },
          {
            name: "心電図（健診としてのご希望）",
            price: "準備中（今後掲載予定）",
            overview: "症状がない方が、健診として自費でご希望される場合の心電図検査です。",
          },
          {
            name: "血液型検査（ABO式・Rh式）",
            price: "2,200円",
            overview: "ご希望の方に、自費で行う血液型の検査です（保険診療の対象外です）。",
            risks: "採血に伴う内出血・痛み等が起こることがあります。",
          },
          {
            name: "PSA検査（前立腺がん）",
            price: "準備中（今後掲載予定）",
            overview: "前立腺がんのスクリーニングを目的とした、採血による腫瘍マーカー検査です。",
            risks: "採血に伴う内出血・痛み等が起こることがあります。数値が高い場合でも、がん以外の原因（前立腺肥大・炎症等）のこともあります。",
          },
          {
            name: "法定健診（雇入時の健康診断 等）",
            price: "10,000円",
            overview: "事業所の皆さまを対象とした、労働安全衛生法に基づく雇入時の健康診断です。既往歴・自覚症状の確認、身体計測、血圧測定、胸部X線、血液・尿検査、心電図等を含みます。保険診療ではなく、事業所・ご本人による自費のお支払いとなります。",
          },
        ],
      },
    ],
    disclaimer:
      "※ 自費診療の料金は2026年時点の参考価格であり、開院前に正式決定いたします。表示はすべて税込予定です。各治療の主なリスク・副作用は治療内容ごとに異なるため、診察時に医師より個別にご説明します。詳しくは開院後の窓口・お電話・LINEでお問い合わせください。",
    servicesLinkLabel: "各治療内容・主なリスクの詳細は診療案内ページをご覧ください →",
  },
  servicesPage: {
    eyebrow: "診療内容のご案内",
    heading: "各診療科の詳しい診療内容",
    intro:
      "木花のむら総合診療所は内科・外科・小児科を中心に、地域のかかりつけ診療所として幅広い診療を行います。「何科に行けばいいか分からない」という場合も、まずはお気軽にご相談ください。",
    deptDescs: [
      "生活習慣病の長期管理から急性症状・消化器の不調・アレルギー疾患まで総合的に対応します。CT・胃カメラ・エコー・FeNO測定などを院内で行い、その日のうちに結果をお伝えできる場合があります。",
      "外科専門医（消化器外科専門医）が担当します。傷・やけどの処置から粉瘤・脂肪腫などの日帰り小手術・巻き爪の処置まで対応。外科的な判断が必要な腹部症状にも CT・エコーを用いて対応します。",
      "お子さんの総合診療科として、発熱・かぜ・消化器症状を中心に診察します。「この症状、受診すべきかな？」とためらう場面でも気軽にご相談いただける環境を目指しています。一部の乳幼児健診や定期接種については、かかりつけの小児科をご案内する場合があります。",
      "定期的な予防接種に加え、成人向けワクチン（帯状疱疹・肺炎球菌・HPVなど）も対応します。ご希望の方はお電話・LINEでお問い合わせください。",
    ],
    selfpayHeading: "自費診療（美容・予防・生活習慣の改善）",
    selfpayIntro:
      "保険診療では対応が難しい治療・予防医療について、自費診療（公的医療保険の適用外・全額自己負担）として対応します。初回に医師が主なリスク・副作用・標準的な費用を十分にご説明したうえで治療方針を決定します。ご相談だけでもお気軽にどうぞ。料金は準備中のものが多く、確定次第こちらに掲載いたします。",
    selfpayItems: [
      {
        name: "GLP-1受容体作動薬（肥満治療）",
        desc: "食欲抑制作用があるとされ、血糖値コントロールのサポートも期待されます。消化器症状（吐き気・下痢など）が現れる場合があるほか、まれに急性膵炎・胆嚢炎等の重篤な副作用が報告されているため、強い腹痛がある場合は速やかに受診してください。効果には個人差があり、医師が継続的な体重管理をサポートします。",
        slug: "glp1",
      },
      {
        name: "AGA（男性型脱毛症）",
        desc: "ミノキシジル外用薬・フィナステリド内服薬など、エビデンスに基づく薄毛治療。フィナステリドでは性機能への影響が報告されています。定期的な経過観察を行います。",
        slug: "aga",
      },
      {
        name: "FAGA（女性の薄毛）",
        desc: "女性ホルモンのバランスやストレス・栄養状態を考慮しながら、ミノキシジル外用を中心に対応します。頭皮刺激症状が出る場合があります。",
        slug: "faga",
      },
      {
        name: "LOH症候群・TRT（男性ホルモン補充療法）",
        desc: "倦怠感・気力低下・性欲低下などテストステロン低下に伴う症状に対して、ホルモン補充療法で対応します。多血症・前立腺への影響等、定期的な検査が必要です。",
        slug: "loh-trt",
      },
      {
        name: "ED治療薬",
        desc: "シルデナフィル・タダラフィルなど、医師の診察のうえで処方します。頭痛・顔面紅潮・血圧低下などの副作用が出る場合があります。",
        slug: "ed",
      },
      {
        name: "花粉症ステロイド注射",
        desc: "季節性アレルギー性鼻炎のシーズン前に行うステロイド（トリアムシノロンアセトニド）注射。注射部位反応・血糖値上昇のほか、繰り返しの使用では月経異常・免疫力低下・注射部位の皮膚萎縮などのリスクがあり、頻回の使用はおすすめできません。",
        slug: "pollen-steroid",
      },
    ],
    scheduleHeading: "受付時間",
    linksHeading: "あわせてご覧ください",
    equipmentLabel: "院内の検査・設備を見る →",
    pricingLabel: "料金のご案内を見る →",
  },
  survey: {
    badge: "開院準備アンケート",
    heading: "どの時間帯に通いたいですか？",
    body: "2027年10月1日の開院に向けて、診療時間を決めるためのアンケートを実施しています。30秒で答えられます。ぜひご協力ください。",
    cta: "アンケートに答える",
    dismiss: "閉じる",
  },
  firstVisit: {
    eyebrow: "はじめての方へ",
    heading: "初診・受診の流れ",
    intro: "はじめて木花のむら総合診療所を受診される方へ、診察の流れや持ち物をご案内します。「これくらいで受診していいのかな？」と思ったときも、どうぞお気軽にお越しください。",
    steps: [
      { num: "01", title: "ご予約（開院後）", body: "電話・Web・LINEにてご予約いただけます（開院後に受付開始）。当日のご来院も受け付けます。**予約優先制**のため、事前予約をお勧めします。ご予約のキャンセル・変更は、**今後設定する当院の電話番号**におかけください（電話番号は決まり次第お知らせします）。" },
      { num: "02", title: "来院・受付", body: "受付にて保険証・お薬手帳をご提示ください。Web問診システム（スマートフォン対応）で事前に症状をご入力いただくこともできますし、ご来院時に直接ご入力いただいても構いません。__順番は受付順ではなく、診察準備が整った順番__でお呼びしますので、あらかじめご了承ください。Web問診や予約システムなどの医療DXを活用し、待ち時間をできる限り短くできるよう努めます。" },
      { num: "03", title: "問診・診察", body: "医師が症状をていねいにお聞きします。CTやエコーなど必要な検査はその日のうちに院内で行えます。胃カメラは**予約制**です。午前10時までの空腹の状態で、内視鏡担当の看護師が勤務している日時にご案内いたします。__※午前の検査をご希望の場合、前日21時以降は絶食が必要です（水・お茶は可）。__ ※介助看護師の配置状況により、ご希望の日時に添えない場合がありますので、事前のWeb・お電話でのご予約をおすすめします。" },
      { num: "04", title: "会計・お薬", body: "セミセルフレジで会計をスムーズに行います。お薬が処方される場合は処方箋をお渡ししますので、**院外の調剤薬局**にお持ちください。" },
    ],
    prepHeading: "持ち物チェックリスト",
    prepSubnote: "来院前にこちらでご確認ください。",
    prepItems: [
      "**健康保険証またはマイナ保険証**",
      "お薬手帳（お持ちの方）",
      "各種医療証（お持ちの方：子ども医療費受給資格証など）",
      "紹介状（他院からの紹介がある方）",
      "お支払い：現金・クレジットカード（開院後）",
    ],
    insuranceHeading: "保険診療について",
    insuranceBody: "各種健康保険・国民健康保険・後期高齢者医療保険に対応予定です。**マイナ保険証**もご利用いただけます。労災・自賠責にも対応いたします。**子ども医療費の助成制度**もご利用いただけますので、受診の際は子ども医療費受給資格証などの医療証をお持ちください。自費診療（GLP-1・AGAなど）については別途ご案内します。",
    noteHeading: "ご来院の際のお願い",
    notes: [
      "__発熱・感染症の症状がある方は、上の「発熱・感染症の症状がある方へ」の流れでご来院ください__",
      "お子さんの受診には保護者同伴をお願いします",
      "診察の前にトイレに行かれる場合は、**受付にひと声おかけください**。腹痛や背中・腰の痛みがある方（尿管結石などが疑われる場合）や、高血圧・高尿酸血症で通院中の方などは、尿検査を行うことがあります。我慢できないときは遠慮なくどうぞ",
      "お水などのお飲み物は、待合室の**ウォーターサーバー**をご利用いただけます（設置予定）。自動販売機の設置予定はありません",
      "**英語での診察**にも対応しています（院長が担当します）",
      "駐車場は**32台**（一般27台・発熱の方専用5台）完備予定です",
    ],
  },
  feverVisit: {
    heading: "発熱・感染症の症状がある方へ",
    badge: "予約制",
    reservationNotice: "熱があるときの受診は予約制です。ご来院の前に、必ず発熱外来の枠でご予約ください。",
    intro: "発熱や、感染症が疑われる症状がある方は、ほかの患者さんと接することなく受診いただけるよう、**お車の中でお待ちいただく形**を予定しています。インフルエンザ・新型コロナなどの検査も行います（開院後）。",
    steps: [
      "開院後にご用意する**Web予約の発熱外来用の枠**からご予約ください。",
      "ご予約の時間に、**クリニック横のひさしの下（発熱の方専用の駐車区画・5台）**へ、**頭から入れる形で駐車**し、そのまま車内でお待ちください。",
      "カメラでご来院を確認し、スタッフの準備が整い次第、お車まで伺います。",
    ],
    notes: [
      "お車でお待ちの間にトイレに行きたくなったときは、院内に入らずにお使いいただける**発熱の方専用の屋外トイレ**をご利用ください（設置予定）。ほかの患者さんと顔を合わせずに済みます。",
      "お車でお待ちの間に具合が悪くなった場合は、__お連れの方が正面玄関のインターホンを鳴らして、職員にお伝えください__。",
      "お一人でお車でお越しの方には、__車内から院内にお電話いただける発熱外来専用の番号__をご案内します。",
    ],
  },
  faq: {
    eyebrow: "よくあるご質問",
    heading: "FAQ",
    intro: "各ページに載せていない、そのほかのご質問をまとめました。その他ご不明な点はLINEまたはお電話でお気軽にお問い合わせください。",
    pagesHeading: "予約・料金・アクセスなどは、こちらのページでご案内しています",
    pageLinks: [
      { label: "初診の方へ（予約・持ち物・支払い・保険証）", href: "/first-visit" },
      { label: "熱があるときの受診方法（予約制）", href: "/first-visit#fever", tone: "fever" },
      { label: "料金について（予防接種・診断書など）", href: "/pricing" },
      { label: "保険診療の自己負担（1〜3割・子ども医療費）", href: "/insurance" },
      { label: "アクセス（駐車場・バス・薬局）", href: "/#access" },
      { label: "診療案内（小児科・健診・自費診療）", href: "/services" },
    ],
    categories: FAQ_CATEGORIES_JA,
  },
  tokushoho: {
    eyebrow: "法的表記",
    heading: "特定商取引法に基づく表記",
    intro: "自費診療サービスの提供に関する特定商取引法に基づく表記です。",
    items: [
      { label: "販売業者", value: "木花のむら総合診療所（開院準備中）" },
      { label: "運営責任者", value: "野村 信介（院長）" },
      { label: "所在地", value: "〒889-2151 宮崎県宮崎市熊野5233-2" },
      { label: "電話番号", value: "開院後に公開予定" },
      { label: "メールアドレス", value: "contact@kibananomura.jp" },
      { label: "診療時間", value: "月〜金：午前・午後  土・日・祝：休診" },
      { label: "提供サービス", value: "自費診療（GLP-1受容体作動薬、AGA/FAGA治療、LOH症候群・TRT、ED治療薬、花粉症ステロイド注射 ほか）" },
      { label: "料金", value: "開院後に確定次第掲載します。初回診察時に医師より詳細をご説明します。表示価格はすべて税込予定。" },
      { label: "支払方法", value: "現金・クレジットカード（開院後に対応予定）" },
      { label: "支払時期", value: "診察・処置終了後、当日お支払い" },
      { label: "キャンセルポリシー", value: "診察のご予約はご来院の2時間前までにご連絡ください。薬剤等を事前発注している場合はキャンセル料が発生することがあります。" },
      { label: "副作用・リスク", value: "各治療の主なリスク・副作用は、診察時に医師より説明します。詳細は診療内容ページもご参照ください。" },
    ],
    disclaimer: "※ 保険診療には本表記は適用されません。自費診療のみが対象です。内容は変更になる場合があります。",
  },
  contact: {
    eyebrow: "お問い合わせ",
    heading: "お気軽にご連絡ください",
    body: "現在は建設準備中のため、電話でのお問い合わせは受け付けておりません。ご質問・ご要望は LINE公式アカウントまたはメールよりお問い合わせください。開院情報の配信もLINEにて行います。",
    lineLabel: "LINEでお問い合わせ・開院情報を受け取る",
    lineNote: "LINEアプリが開きます。友だち追加後にメッセージをお送りください。",
    emailLabel: "contact@kibananomura.jp",
    emailNote: "メールでのお問い合わせはこちらのアドレスまでお願いいたします。",
    note: "※ 診断・処方・医療相談はお受けできません。開院後は電話・窓口でもご対応いたします。",
  },
};

const en: SiteDict = {
  common: {
    toTop: "Back to Kibana Nomura General Medicine Clinic home",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langSwitch: "Switch language",
    backHome: "Back to home",
  },
  nav: [
    { href: "/#director", label: "Director" },
    { href: "/blog", label: "Blog" },
    { href: "/#services", label: "Services" },
    { href: "/symptoms", label: "Find by Symptom" },
    { href: "/faq", label: "FAQ" },
    { href: "/first-visit", label: "First Visit" },
    { href: "/pricing", label: "Pricing" },
    { href: "/#access", label: "Access" },
  ],
  headerCta: "Get opening updates",
  notice: {
    lead: "We are ",
    strong: "currently under construction",
    tail: ". Online booking will open before we open (planned for October 2027).",
    close: "Dismiss notice",
  },
  hero: {
    eyebrow: "Kumano, Miyazaki ｜ Kibana Nomura General Medicine Clinic ｜ An all-purpose consultation spot",
    titleLines: [
      ["From children to seniors,"],
      ["a family clinic that supports"],
      ["every generation's peace of mind"],
    ],
    subLocation: "Kumano, Miyazaki",
    subDept: "Internal Medicine, Surgery, Pediatrics",
    subOpen: "Opening October 1, 2027",
    ctaLine: "Get opening updates (LINE)",
    ctaGuide: "Our Services",
    guide: [
      {
        title: "Insured care",
        body: "Internal medicine, surgery and pediatrics. CT, gastroscopy, ultrasound and minor surgery completed in-house.",
      },
      {
        title: "Self-pay care",
        body: "GLP-1 receptor agonists (weight loss), AGA / FAGA, ED treatment, TRT and more.",
      },
      {
        title: "Reception hours",
        body: "Mon–Fri (closed Sat, Sun & holidays). Open mornings and afternoons every weekday. Lunch breaks reserved for facility visits (care homes etc.). On select Saturdays and Sundays, depending on the director's availability, we may open a special surgical procedure clinic from 5:30–6:30 PM.",
      },
    ],
    guideLink: "See full services →",
    firstVisitLink: "First visit guide →",
    faqLink: "FAQ →",
    supp1: "Open mornings & afternoons, every weekday",
    supp2: "CT, gastroscopy & surgery in one place",
    supp3: PARKING_STATUS.en,
    careersBadge: "We're hiring",
  },
  mission: {
    eyebrow: "Our Promise",
    heading: "What Kibana Nomura General Medicine Clinic stands for",
    cards: [
      {
        title: "Our Philosophy",
        body: "A clinic where both patients and staff can smile.",
      },
      {
        title: "Mission",
        body: "To create a community where everyone can access healthcare without hesitation and live with peace of mind.",
      },
      {
        title: "Vision",
        body: "A family clinic that supports every generation, from children to seniors.",
      },
      {
        title: "Values",
        body: "① Honest dialogue & shared decision-making  ② Continuous self-improvement  ③ High medical ethics  ④ Leveraging IT for patient-centred care  ⑤ Proactive teamwork & sustainable management  ⑥ Personal health stewardship",
      },
    ],
    visionQuote:
      "A family clinic that supports every generation, from children to seniors.",
    visionCaption: "── Kibana Nomura General Medicine Clinic Vision",
  },
  features: {
    eyebrow: "Why Us",
    heading: "4 features of our clinic",
    items: [
      {
        title: "Open mornings & afternoons, every weekday",
        body: "We see patients every weekday morning and afternoon, Monday through Friday — easy to drop by between work or after school.",
      },
      {
        title: "From CT to surgery, all in one place",
        body: "16-row CT, digital X-ray, ultrasound and transnasal endoscopy on-site. We aim to see you first for just about anything, testing and treating as much as possible in-house (and referring you to the right specialist when needed).",
      },
      {
        title: "A system that doesn't keep you waiting",
        body: "AI pre-screening on your phone, semi-self payment kiosks, and online check-in from your car aim to get you from arrival to payment in around 30 minutes or less — often faster. Walking in or booking without using the web is also perfectly fine. Technology is simply a tool to stay close to people.",
      },
      {
        title: "A local doctor who keeps caring, long-term",
        body: "Our director lives in Kibana. Opening is just the beginning — we'll remember your name and face, and keep caring for you.",
      },
    ],
    miniLegendPre: "Top = AM / Bottom = PM · ",
    miniLegendStrong: "Open every weekday",
    miniDays: ["Mo", "Tu", "We", "Th", "Fr"],
    weekendNote: "★ On select Saturdays and Sundays, depending on the director's availability, we may also open a special surgical procedure clinic",
  },
  director: {
    eyebrow: "Director",
    roleLabel: "Director",
    name: "Dr. Shinsuke Nomura",
    reading: "Nomura Shinsuke",
    qualifications: [
      "Board-certified Surgeon (Japanese Surgical Society)",
      "Board-certified Gastroenterological Surgeon (Japanese Society of Gastroenterological Surgery)",
      "Certified Sports and Health Physician (Japan Medical Association)",
    ],
    storyIntro:
      "I graduated from the National Defense Medical College, whose mission is to train medical officers with a strong sense of duty who can also handle primary care and general clinical practice — an education that gave me a broad clinical foundation. From there, I trained mainly in gastroenterological surgery at university and regional hospitals, facing patients in the operating room and many other settings along the way.",
    quote: "“I don’t know where to turn.” Those are exactly the moments I want you to rely on us.",
    storyBody: [
      "Kibana Nomura General Medicine Clinic is a community-based clinic rooted in Kumano, Miyazaki. Centered on internal medicine, surgery and pediatrics, we aim to be the family clinic you can turn to with confidence, from children to the elderly, for everyday ailments and life's turning points alike.",
      "What we value most is the idea of a clinic where patients and staff alike leave with a smile.",
    ],
    storyMore: "Read more about my career on the blog",
    storyMoreHref: "/blog/kara-no-michi",
    catch: "Your family clinic.",
    photoNote: "* Photo coming soon (image)",
    portraitAria: "Dr. Shinsuke Nomura, Director of Kibana Nomura General Medicine Clinic",
  },
  services: {
    eyebrow: "Services",
    heading: "Internal medicine, surgery and pediatrics, a wide range of care in one place.",
    deptLabel: "Departments",
    departments: ["Internal Medicine", "Surgery", "Pediatrics"],
    detailHeading: "What we treat",
    diseasesLink: "Browse conditions we cover →",
    details: [
      {
        title: "Internal Medicine",
        items: [
          { label: "Fever, cough or sore throat that won't go away", href: "/symptoms/fever-cold" },
          { label: "A cough that lingers", href: "/symptoms/persistent-cough" },
          { label: "Abdominal pain", href: "/symptoms/abdominal-pain" },
          { label: "Heartburn or stomach discomfort", href: "/symptoms/heartburn-stomach-discomfort" },
          { label: "Ongoing diarrhea or constipation", href: "/symptoms/bowel-changes" },
          { label: "A checkup flagged a lifestyle-disease risk", href: "/symptoms/checkup-lifestyle-disease" },
          { label: "Neck swelling or lingering fatigue", href: "/symptoms/neck-swelling-fatigue" },
          { label: "Ongoing sneezing, runny nose or itchy skin", href: "/symptoms/allergy-rhinitis-itching" },
          { label: "Snoring or daytime sleepiness", href: "/symptoms/snoring-daytime-sleepiness" },
          { label: "Palpitations or shortness of breath", href: "/symptoms/palpitations-shortness-of-breath" },
          { label: "Dizziness", href: "/symptoms/dizziness" },
          { label: "Numbness in the hands or feet", href: "/symptoms/numbness" },
          { label: "Headaches that won't go away", href: "/symptoms/headache" },
          { label: "Red, swollen or warm skin", href: "/symptoms/skin-redness-swelling" },
          { label: "Itchy or peeling skin on the feet", href: "/symptoms/itchy-feet-skin-peeling" },
        ],
        note: "",
        wide: true,
      },
      {
        title: "Surgery",
        items: [
          { label: "Need a wound or burn treated", href: "/symptoms/wounds-burns" },
          { label: "A lump or growth you're concerned about", href: "/symptoms/lumps-and-bumps" },
          { label: "Ingrown nail trouble", href: "/symptoms/nail-trouble" },
          { label: "Hemorrhoid symptoms", href: "/symptoms/hemorrhoids" },
          { label: "Worried about abdominal bloating or pain", href: "/symptoms/abdominal-distension-surgical" },
          { label: "A bruise, sprain or other injury", href: "/symptoms/bruises-sprains-injuries" },
        ],
        note: "If a fracture is suspected, we refer you to an orthopedic specialist.",
        wide: false,
      },
      {
        title: "Pediatrics",
        items: [
          { label: "Your child has a sudden fever or cold", href: "/symptoms/child-fever-cold" },
          { label: "Your child has a runny or stuffy nose", href: "/symptoms/child-runny-nose" },
          { label: "Worried about your child's vomiting or diarrhea", href: "/symptoms/child-vomiting-diarrhea" },
        ],
        note: "General care for children — fever, colds, stomach upsets and more. For vaccinations and infant check-ups we may not always be able to help, and we may guide you to your family doctor or a specialized clinic depending on the case. If something is difficult for us to handle, we consult with local pediatric clinics and core hospitals and refer you when needed.",
        wide: false,
      },
      {
        title: "Vaccinations",
        items: [
          { label: "Influenza" },
          { label: "COVID-19" },
          { label: "HPV (cervical cancer prevention)" },
          { label: "Shingles" },
          { label: "Pneumococcal" },
          { label: "Travel vaccines" },
          { label: "Other vaccines" },
        ],
        note: "If you would like a vaccination, please feel free to contact us by phone or LINE. We also issue vaccination certificates for international travel, with support in foreign languages.",
        wide: true,
      },
    ],
    insuranceBadge: "Insured",
    insuranceTitle: "In-house testing & equipment",
    insuranceBody:
      "From CT, gastroscopy and ultrasound to minor surgery, the tests and procedures you need are handled in-house — often on the same day.",
    insuranceTags: [
      "16-row CT",
      "Transnasal endoscopy (gastroscopy)",
      "Ultrasound",
      "Digital X-ray",
      "FeNO (asthma)",
      "Minor surgery",
    ],
    selfpayBadge: "Self-pay",
    selfpayTitle: "Tailored to your needs",
    selfpayItems: [
      { label: "GLP-1 receptor agonists (weight loss)", slug: "glp1" },
      { label: "AGA (male pattern hair loss)", slug: "aga" },
      { label: "LOH syndrome / TRT", slug: "loh-trt" },
      { label: "FAGA (female hair loss)", slug: "faga" },
      { label: "ED medication", slug: "ed" },
      { label: "Steroid injection for hay fever", slug: "pollen-steroid" },
    ],
    selfpayMore: "and more",
    pricingLink: "See pricing details →",
    equipmentLink: "See tests & equipment →",
    checkupsBadge: "Health checkups",
    checkupsTitle: "Health checkups & screening",
    checkupsBody:
      "From general health checkups and comprehensive health dock exams to statutory checkups, gastric, colorectal and lung cancer screening, tuberculosis screening, ABC screening, hepatitis virus screening, and employer checkups (statutory and special-duty). We also offer secondary lung cancer screening using our in-house CT. For eligibility and co-payments for Miyazaki City's specific health checkups and cancer screenings, please check the notice (such as a voucher) sent by the city.",
    checkupsTags: [
      "Health checkup",
      "Comprehensive health dock",
      "Specific health checkup",
      "Gastric cancer screening",
      "Colorectal cancer screening",
      "Lung cancer screening",
      "Tuberculosis screening",
      "ABC screening",
      "Hepatitis screening",
      "Employer checkups",
      "Special-duty checkups",
      "Lung cancer screening (CT)",
    ],
    checkupsLink: "See checkup details →",
    scheduleTitle: "Reception hours",
    amLabel: "AM",
    pmLabel: "PM",
    legendOpen: "Reception",
    legendClosed: "Closed",
    scheduleNotes: [
      "★ Lunch breaks are planned for facility visits (care homes, group homes, etc.)",
      "★ On select Saturdays and Sundays, depending on the director's availability, we may open a special surgical procedure clinic from 5:30–6:30 PM (available dates announced the week before)",
    ],
    closedNote: "Closed: Saturdays, Sundays & holidays (except the surgical procedure clinic)",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    cta: "See detailed services",
  },
  access: {
    eyebrow: "Access",
    heading: "Easy to reach, here for you.",
    mapTitle: "Planned location of Kibana Nomura General Medicine Clinic",
    mapSub: "5233-2 Kumano, Miyazaki City 889-2151, Japan",
    mapUrl: "https://maps.google.com/maps?q=%E5%AE%AE%E5%B4%8E%E7%9C%8C%E5%AE%AE%E5%B4%8E%E5%B8%82%E7%86%8A%E9%87%8E5233-2",
    mapEmbed:
      "https://maps.google.com/maps?q=%E5%AE%AE%E5%B4%8E%E7%9C%8C%E5%AE%AE%E5%B4%8E%E5%B8%82%E7%86%8A%E9%87%8E5233-2&z=14&output=embed",
    mapButton: "Open in Google Maps",
    addressLabel: "Address",
    addressValue: "5233-2 Kumano, Miyazaki City, Miyazaki 889-2151, Japan",
    addressNote: "※Currently under construction.",
    parkingLabel: "Parking",
    parkingValue: PARKING_STATUS.en_short,
    details: [
      { label: "Bicycle parking", value: "Planned to the right of the main entrance (bicycles and motorbikes)" },
      { label: "By car", value: "About 5 min from JR Kibana Station\n10 min from JR Kiyotake Station\n12 min from JR Aoshima Station\n13 min from Miyazaki Airport\n16 min from JR Minami-Miyazaki Station\n20 min from JR Tano Station\n30 min from Nichinan-Togo IC\n(approximate)" },
      { label: "From nearby landmarks (by car)", value: "About 2 min from University of Miyazaki (Kibana Campus)\n5 min from Miyazaki Prefectural Sports Park\n5 min from University of Miyazaki Hospital\n10 min from Kiyotake-minami IC\n11 min from Kiyotake IC" },
      { label: "From nearby schools (by car)", value: "About 2–5 min: 木花中学校, 木花小学校, 学園木花台小学校\n7–8 min: 清武小学校, 清武中学校, 国富小学校, 鏡洲小学校\n11–13 min: 本郷小学校, 本郷中学校, 赤江中学校, 青島小学校, 青島中学校\n14–15 min: 宮崎南小学校, 加納小学校, 加納中学校, 赤江東中学校\n20–21 min: 田野小学校, 田野中学校" },
      { label: "Bus", value: "About a 3-minute walk from the nearest stop, “下原”" },
      { label: "Pharmacy", value: "A dispensing pharmacy is planned on the neighbouring lot" },
      { label: "Accessibility", value: "The clinic is barrier-free and wheelchair accessible, with a wheelchair-accessible restroom" },
    ],
    openLabel: "Opening",
    openValue: "October 2027 (currently under construction)",
    note: "Once the Yamashita Bridge (Kiyotake River) opens, access from the Manabino and Gakuendai areas will become even more convenient. We're easy to reach by car from across southern Miyazaki City — including Kibana, Kumano, Gakuen-Kibanadai, Hongo and Kiyotake — as well as from near JR Kibana Station, Undokoen Station and the Kibana Campus of University of Miyazaki.",
  },
  register: {
    badge: "Opening October 2027",
    heading: "Be the first to hear our opening news",
    body: "Ahead of our October 2027 opening, we'll share construction updates, open-house information and booking start dates via our official LINE account.",
    button: "Register on LINE",
    note: "* As we are still under construction, booking will begin before we open.",
  },
  footer: {
    tagline:
      "Kibana Nomura General Medicine Clinic in Kumano, Miyazaki. Centered on internal medicine, surgery and pediatrics. An all-purpose consultation spot you can drop by with ease. Serving southern Miyazaki City — Kibana, Kumano, Gakuen-Kibanadai, Hongo and Kiyotake.",
    badge: "Opening October 2027 / Under construction",
    menuHeading: "Menu",
    deptHeading: "Departments & Location",
    deptItems: [
      "Internal Medicine, Surgery & Pediatrics",
      "5233-2 Kumano, Miyazaki City, Miyazaki 889-2151",
      "Tel: to be announced after opening",
    ],
    snsHeading: "Social",
    copyrightDept: "Kumano, Miyazaki ｜ Internal Medicine, Surgery & Pediatrics",
    privacyLabel: "Privacy Policy",
    securityLabel: "Website security",
    careersLabel: "For medical professionals",
    firstVisitLabel: "First visit",
    faqLabel: "FAQ",
    contactLabel: "Contact",
    tokushohoLabel: "Specified Commercial Transactions Act",
    blogLabel: "Blog",
    newsLabel: "News",
    lineAria: "Official LINE account",
    instaAria: "Instagram",
  },
  privacy: {
    eyebrow: "Privacy Policy",
    heading: "Privacy Policy",
    intro:
      "Kibana Nomura General Medicine Clinic (\"the Clinic\") regards the proper protection of the personal information of patients and others as an important responsibility, and handles personal information in accordance with applicable laws and guidelines under the following policy.",
    sections: [
      {
        title: "1. Collection of personal information",
        body: [
          "The Clinic collects personal information by lawful and fair means. In the course of medical care and inquiries, we may receive information such as your name, contact details and health-related information.",
        ],
      },
      {
        title: "2. Purposes of use",
        body: [
          "We use the personal information we collect within the scope of the following purposes:",
          "\u2022 Providing medical services such as examination, testing and treatment",
          "\u2022 Billing for medical fees and responding to reservations and inquiries",
          "\u2022 Coordinating with and referring to other medical institutions and pharmacies",
          "\u2022 Reviewing and improving our medical services",
          "\u2022 Responding to requirements under laws and regulations",
        ],
      },
      {
        title: "3. Provision to third parties",
        body: [
          "Except where permitted by law, the Clinic does not provide personal information to third parties without obtaining the prior consent of the individual.",
        ],
      },
      {
        title: "4. Security management",
        body: [
          "The Clinic takes appropriate security measures to prevent unauthorized access to, and the loss, destruction, alteration or leakage of, personal information, and strives for continuous improvement.",
        ],
      },
      {
        id: "security",
        title: "5. Website security",
        body: [
          "In recent years, many cases of website defacement and data leaks exploiting weaknesses in websites that run on PHP, such as WordPress, have been reported. Our website does not use PHP or WordPress: it is built with Next.js and served from the servers of Vercel (United States), so it is not affected by attacks that target weaknesses in PHP or WordPress.",
          "• All communication with this website is encrypted (HTTPS).",
          "• This website has no feature, such as member registration or an inquiry form, for registering your name, address, phone number or insurance details. We accept inquiries by phone, via our official LINE account and by email.",
          "• Systems that handle medical information, such as electronic medical records, are not connected to this website.",
          "• As nothing on the internet is ever absolutely safe, we keep the systems we use up to date and continue to review them.",
        ],
      },
      {
        title: "6. Our guide chatbot, Kibanavi",
        body: [
          "On our website and our official LINE account, we offer a guide chatbot, Kibanavi, in which AI (artificial intelligence) automatically answers questions based on the information on this website. On LINE, Kibanavi answers only after you select \"キバナビに質問する\" (Ask Kibanavi) from the menu; other messages are handled by our staff.",
          "• Questions you enter are sent to an AI service provider (Anthropic, United States) to generate an answer. The provider does not use the content sent to train its AI.",
          "• Questions and answers are recorded and analysed by the Clinic and the staff supporting our opening preparations, to improve the website and our FAQ. When recorded, strings that appear to be phone numbers or email addresses are automatically masked, and information that identifies individuals, such as IP addresses or LINE user IDs, is not recorded. Records are deleted after one year.",
          "• If you suggest a topic for the director's blog, we keep a separate record of the suggestion so that we can pass it on to our director.",
          "• Please do not enter personal information such as your name or contact details, or detailed symptoms. The chatbot does not provide diagnosis or treatment decisions.",
        ],
      },
      {
        title: "7. Website analytics",
        body: [
          "To improve the website, we use Google Analytics (Google) and Vercel Web Analytics (Vercel) to collect statistical information such as the pages viewed and the browsing environment. Google Analytics uses cookies, but the information collected does not include anything that identifies you, such as your name.",
          "• You can disable cookies in your browser settings. You can also stop Google Analytics from collecting information with the Google Analytics Opt-out Browser Add-on provided by Google.",
        ],
      },
      {
        title: "8. Disclosure, correction and suspension of use",
        body: [
          "If an individual requests the disclosure, correction or suspension of use of their own personal information, we will verify their identity and respond appropriately in accordance with the law.",
        ],
      },
      {
        title: "9. Contact",
        body: [
          "Inquiries regarding the handling of personal information will be accepted after opening at our reception, by phone, or via our official LINE account.",
        ],
      },
      {
        title: "10. Revisions to this policy",
        body: [
          "The Clinic may review and revise this policy as necessary. Revised content applies from the time it is posted on this page.",
        ],
      },
    ],
    updated: "Established: June 2026 / Revised: October 2026 (sections on our chatbot Kibanavi, website security and website analytics added; to be revised upon opening)",
  },
  equipment: {
    eyebrow: "In-house tests & equipment",
    heading: "Tests & equipment available in-house",
    intro:
      "We are equipping the clinic so that worrying symptoms can be checked the same day. Here is a guide to each test.",
    imageNote: "* Images are for illustration (to be replaced with actual equipment).",
  },
  blog: {
    eyebrow: "Director's Blog",
    heading: "Pre-opening blog",
    intro:
      "Our director gradually shares the preparations toward opening, stories about the area, and thoughts on care.",
    readMore: "Read more →",
    backToList: "Back to all posts",
    latestHeading: "Director's Blog",
    viewAll: "View all posts →",
    prev: "Previous",
    next: "Next",
    allCategories: "All",
    postCountSuffix: "",
    contactCta: {
      heading: "Have a question or interest?",
      body: "If anything in this article caught your interest, or you have questions about our opening, please feel free to reach out.",
      button: "Email contact@kibananomura.jp",
    },
    requestNote: {
      body: "If there's a topic you'd like our director to write about, just let Kibanavi know. We'll pass it on to our director.",
      button: "Send a request to Kibanavi",
    },
  },
  news: {
    eyebrow: "News",
    heading: "News from the clinic",
    intro:
      "Updates on our opening preparations and medical services. The latest news is also shared via our official LINE account.",
    items: [
      {
        date: "2026.06",
        tag: "News",
        title: "Our official website is now live",
        body: "We've launched the official website of Kibana Medical Office. Ahead of our opening (planned for October 2027), we'll keep sharing details about our services, access and more.",
      },
      {
        date: "2026.06",
        tag: "Coming soon",
        title: "Preparing our official LINE account",
        body: "We're setting up an official LINE account so we can share opening news and reservation details as early as possible. Please bear with us a little longer until it goes live.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "Pricing information",
    intro:
      "Insured care is covered by public health insurance. Self-pay pricing is still being finalized — we'll publish the amounts here as soon as they're confirmed.",
    groups: [
      {
        title: "Insured care",
        items: [
          {
            name: "Internal medicine, surgery, pediatrics",
            price: "Covered by insurance",
          },
          {
            name: "Tests (CT, gastroscopy, ultrasound, etc.)",
            price: "Per insured rates",
          },
          {
            name: "Minor surgery (sebaceous cysts, lipomas, etc.)",
            price: "Covered by insurance (varies with size, location and tests needed; explained at your consultation)",
          },
          {
            name: "Nutrition counselling by a registered dietitian (system fee for follow-up sessions held online)",
            price: "¥550 per session (incl. tax), charged separately from your insurance co-payment",
          },
        ],
      },
      {
        title: "Self-pay care",
        items: [
          {
            name: "GLP-1 receptor agonists (weight loss)",
            price: "Coming soon",
            overview: "Physician-supervised weight management using low-dose GLP-1 receptor agonists.",
            risks: "Nausea, vomiting, diarrhea and constipation are common; rare but serious risks include hypoglycemia, acute pancreatitis and gallbladder inflammation.",
            approval: "Depending on the medication used, this may involve off-label use for weight loss or a drug not approved in Japan. Approval status and sourcing will be explained individually before treatment begins.",
          },
          {
            name: "AGA (male pattern hair loss)",
            price: "Coming soon",
            overview: "Oral treatment with medications approved in Japan for male pattern hair loss.",
            risks: "Possible effects on sexual function (reduced libido, erectile difficulty) and liver function. Pregnant women or those who may become pregnant must avoid contact with the medication.",
            approval: "Uses medications approved in Japan, prescribed as self-pay care outside insurance coverage (not unapproved drugs).",
          },
          {
            name: "FAGA (female hair loss)",
            price: "Coming soon",
            overview: "Self-pay treatment for female pattern hair loss. Details will be announced before this service launches.",
            risks: "Risks will depend on the medication used and will be explained before this service launches.",
            approval: "Approval status of the medication used will be explained before this service launches.",
          },
          {
            name: "LOH syndrome / TRT",
            price: "Coming soon",
            overview: "Testosterone replacement therapy (TRT) for late-onset hypogonadism (LOH syndrome). Details will be announced before this service launches.",
            risks: "Reported risks include polycythemia, effects on the prostate, and worsening of sleep apnea.",
            approval: "Approval status of the medication used will be explained before this service launches.",
          },
          {
            name: "ED medication",
            price: "Coming soon",
            overview: "Oral treatment with medications approved in Japan for erectile dysfunction.",
            risks: "Headache, flushing, palpitations and indigestion have been reported. Contraindicated with nitrate medications.",
            approval: "Uses medications approved in Japan, prescribed as self-pay care outside insurance coverage (not unapproved drugs).",
          },
          {
            name: "Steroid injection for hay fever",
            price: "Coming soon",
            overview: "An intramuscular steroid injection to temporarily relieve hay fever symptoms, offered as an option alongside standard oral and nasal treatments.",
            risks: "Reported risks include menstrual irregularity, worsening of diabetes, reduced resistance to infection, adrenal insufficiency, peptic ulcers and psychiatric symptoms. Repeated use requires particular caution.",
            approval: "The injection used may not be explicitly indicated for hay fever (allergic rhinitis) in its approved labeling, meaning this can involve off-label use at the physician's discretion.",
          },
          {
            name: "Flu shot",
            price: "¥3,000 per dose",
            overview: "Influenza vaccination. For people aged 65 and over and others eligible for routine vaccination, it is ¥1,400. The co-payment may differ depending on subsidies from your local municipality.",
            risks: "Common reactions include injection-site swelling and pain, and fever; rare but serious reactions such as anaphylaxis have been reported.",
            approval: "Uses vaccines approved in Japan.",
          },
          {
            name: "Medical certificate (clinic format)",
            price: "¥2,500",
            overview: "A medical certificate issued in our clinic's own format (not covered by insurance).",
          },
          {
            name: "Vaccinations",
            price: "Coming soon",
            overview: "Optional vaccinations (adult vaccines, etc.). Specific options and pricing will be announced before launch.",
            risks: "Common reactions include injection-site swelling and pain, and fever; rare but serious reactions such as anaphylaxis have been reported.",
            approval: "Uses vaccines approved in Japan.",
          },
          {
            name: "H. pylori third-line eradication (if first and second attempts fail)",
            price: "¥25,000 (consultation, medication and follow-up test included, estimate)",
            overview: "Third-line eradication treatment (self-pay) when first- and second-line treatment has failed.",
            risks: "Reported risks include diarrhea, soft stools, taste disturbance and rash. Success rates vary more than with first- or second-line treatment.",
            approval: "Depending on the drug combination used, this may involve off-label use for H. pylori eradication. Details will be explained by the physician at your consultation.",
          },
        ],
      },
      {
        title: "Health screening (self-pay — separate from insured care)",
        items: [
          {
            name: "Half-day comprehensive health checkup",
            price: "Coming soon",
            overview: "A self-pay, half-day checkup covering the main screening items. Details and pricing will be announced before launch.",
          },
          {
            name: "Gastroscopy (elective screening)",
            price: "Coming soon",
            overview: "Gastroscopy requested as elective self-pay screening by patients without symptoms.",
            risks: "Performed with a transnasal endoscope, generally without sedation. Nasal preparation and local anesthesia can cause nosebleeds or discomfort; rare complications include bleeding and perforation.",
          },
          {
            name: "Stomach cancer risk screening (ABC screening)",
            price: "Coming soon",
            overview: "A blood test measuring H. pylori antibodies and pepsinogen to sort stomach cancer risk into groups A to D. It does not detect cancer itself, so a gastroscopy is recommended depending on the result.",
            risks: "Blood draws can cause bruising or pain. Results are unreliable for people who have had H. pylori eradication treatment, take acid-reducing medication or have had stomach surgery, so they are not eligible.",
          },
          {
            name: "CT scan (elective screening)",
            price: "Coming soon",
            overview: "CT scanning requested as elective self-pay screening by patients without symptoms.",
            risks: "Involves X-ray radiation exposure. Contrast agents, when used, carry a risk of allergic reaction.",
          },
          {
            name: "Abdominal ultrasound (elective screening)",
            price: "Coming soon",
            overview: "Abdominal ultrasound requested as elective self-pay screening by patients without symptoms.",
          },
          {
            name: "Carotid ultrasound (elective screening)",
            price: "Coming soon",
            overview: "Ultrasound of the carotid arteries to assess for arteriosclerosis.",
          },
          {
            name: "ECG (elective screening)",
            price: "Coming soon",
            overview: "An electrocardiogram requested as elective self-pay screening by patients without symptoms.",
          },
          {
            name: "Blood type test (ABO and Rh)",
            price: "¥2,200",
            overview: "A self-pay blood type test for those who wish to know their blood type (not covered by health insurance).",
            risks: "Blood draws can cause bruising or pain.",
          },
          {
            name: "PSA test (prostate cancer)",
            price: "Coming soon",
            overview: "A blood tumor-marker test for prostate cancer screening.",
            risks: "Blood draws can cause bruising or pain. An elevated result can also have causes other than cancer, such as prostate enlargement or inflammation.",
          },
          {
            name: "Statutory health checkup (pre-employment checkup, etc.)",
            price: "¥10,000",
            overview: "A pre-employment health checkup for local businesses, as required under Japan's Industrial Safety and Health Act. Includes a history review, physical measurements, blood pressure, chest X-ray, blood and urine tests, and an ECG. This is self-pay, billed to the employer or individual rather than through insurance.",
          },
        ],
      },
    ],
    disclaimer:
      "* All prices will be tax-included and are subject to change. The main risks and side effects vary by treatment and will be explained individually by the physician at your consultation. For details, please contact us after opening by phone, LINE or at the reception.",
    servicesLinkLabel: "See our Services page for treatment details and main risks →",
  },
  servicesPage: {
    eyebrow: "Our Services",
    heading: "Detailed services by department",
    intro:
      "Kibana Nomura General Medicine Clinic is centered on internal medicine, surgery and pediatrics, so you can rely on us as your family clinic. If you're unsure which department you need, please don't hesitate to ask.",
    deptDescs: [
      "We cover everything from chronic disease management to acute symptoms, digestive issues and allergic conditions. Tests including CT, gastroscopy, ultrasound and FeNO are available in-house, and in many cases results can be shared the same day.",
      "Our board-certified surgeon (gastroenterological surgery) handles wound and burn care, day-surgery for cysts and lipomas, ingrown nail treatment and more. Abdominal symptoms requiring surgical assessment are also handled with CT and ultrasound on-site.",
      "We serve as a general children's practice, focusing on fever, colds and digestive symptoms. We aim to be a place you feel comfortable consulting even when you're unsure whether a visit is warranted.",
      "We offer routine vaccinations as well as adult vaccines such as shingles, pneumococcal and HPV. Please contact us by phone or LINE if you'd like a vaccination.",
    ],
    selfpayHeading: "Self-pay care (cosmetic, preventive & lifestyle)",
    selfpayIntro:
      "For treatments and preventive medicine not covered by insurance, we offer self-pay options. All self-pay treatments are not covered by public health insurance and are paid fully out-of-pocket. On the first visit, the physician will explain the treatment plan, standard costs and main risks and side effects in full before starting treatment. You are welcome to come just for a consultation. Pricing is still being finalised and will be published here when confirmed.",
    selfpayItems: [
      {
        name: "GLP-1 receptor agonists (weight loss)",
        desc: "Appetite-regulating hormones suppress hunger and support blood-glucose control. Common side effects include nausea and gastrointestinal symptoms. A physician monitors your progress throughout treatment.",
        slug: "glp1",
      },
      {
        name: "AGA (male pattern hair loss)",
        desc: "Evidence-based treatment including topical minoxidil and oral finasteride, with regular follow-up visits. Finasteride may affect sexual function in some individuals.",
        slug: "aga",
      },
      {
        name: "FAGA (female hair loss)",
        desc: "Treatment centred on topical minoxidil, with consideration for hormonal balance, stress and nutritional factors. Scalp irritation may occur.",
        slug: "faga",
      },
      {
        name: "LOH syndrome / TRT",
        desc: "Testosterone replacement therapy for fatigue, low motivation and reduced libido associated with declining testosterone levels. Regular blood tests are required to monitor for polycythaemia and prostate changes.",
        slug: "loh-trt",
      },
      {
        name: "ED medication",
        desc: "Sildenafil, tadalafil and related medications prescribed after a medical consultation. Side effects may include headache, flushing and blood pressure changes.",
        slug: "ed",
      },
      {
        name: "Steroid injection for hay fever",
        desc: "A triamcinolone acetonide injection given before the pollen season to reduce nasal symptoms throughout the season. Possible side effects include injection-site reactions and transient blood glucose elevation.",
        slug: "pollen-steroid",
      },
    ],
    scheduleHeading: "Reception hours",
    linksHeading: "You may also be interested in",
    equipmentLabel: "See in-house tests & equipment →",
    pricingLabel: "See pricing information →",
  },
  survey: {
    badge: "Pre-opening survey",
    heading: "What time of day works best for you?",
    body: "We're deciding our clinic hours and want to hear from you. It takes just 30 seconds — please help us get it right.",
    cta: "Answer the survey",
    dismiss: "Dismiss",
  },
  firstVisit: {
    eyebrow: "First visit",
    heading: "Your first visit",
    intro: "A guide for first-time patients — what to expect and what to bring. If you're unsure whether your symptoms warrant a visit, please don't hesitate to come.",
    steps: [
      { num: "01", title: "Book an appointment (after opening)", body: "Bookings can be made by phone, online or LINE (to open after clinic launch). Walk-ins are also welcome, but **appointments are prioritised**. To cancel or change an appointment, please call **the clinic phone number, which will be announced once it is set up**." },
      { num: "02", title: "Arrive & check in", body: "Please present your insurance card and medication record at reception. Our web pre-screening system (smartphone-friendly) lets you enter your symptoms in advance, or you're welcome to fill it out in person when you arrive. __You'll be called in once we're ready for you, rather than strictly in check-in order__, so thank you for your understanding. We use digital tools such as online questionnaires and our booking system to keep waiting times as short as possible." },
      { num: "03", title: "Consultation & examination", body: "The physician will listen carefully to your symptoms. Tests such as CT and ultrasound can often be performed on the same day. Gastroscopy is **by appointment only**, scheduled for a fasting morning slot before 10am when our endoscopy nurse is on duty. __*For a morning exam, you'll need to fast from 9pm the night before (water and tea are fine).__ *Please book in advance online or by phone, as availability depends on endoscopy nurse staffing." },
      { num: "04", title: "Payment & prescription", body: "Semi-self payment kiosks keep checkout quick and simple. If medication is prescribed, we'll hand you a prescription slip to take to an **outside dispensing pharmacy**." },
    ],
    prepHeading: "What to bring — checklist",
    prepSubnote: "Please check these before your visit.",
    prepItems: [
      "**Health insurance card or My Number insurance card**",
      "Medication record book (if you have one)",
      "Medical certificates (e.g. child medical fee card)",
      "Referral letter (if referred by another clinic)",
      "Payment: cash or credit card (after opening)",
    ],
    insuranceHeading: "Insurance",
    insuranceBody: "We plan to accept national health insurance, employees' health insurance and the late-stage elderly medical care system. **My Number insurance cards** are accepted. Workers' compensation and CALI are also accepted. The **children's medical expense subsidy** can be used — please bring your child's medical certificate (such as the subsidy eligibility card). Self-pay treatments (GLP-1, AGA, etc.) are detailed separately.",
    noteHeading: "Please note",
    notes: [
      "__If you have a fever or possible infection, please follow the steps under \"If you have a fever\" above.__",
      "Children must be accompanied by a parent or guardian.",
      "If you need the restroom before your consultation, **please let reception know first**. Patients with abdominal, back or flank pain (such as when a kidney or ureteral stone is suspected), or those being treated for high blood pressure or high uric acid, may need a urine test. Please do not hesitate if you cannot wait.",
      "For drinking water, a **water dispenser** is planned for the waiting room. There are no plans for a vending machine.",
      "**Consultations in English** are available (with our director).",
      "**32 parking spaces** are planned on-site (27 general, 5 reserved for patients with a fever).",
    ],
  },
  feverVisit: {
    heading: "If you have a fever",
    badge: "Appointment only",
    reservationNotice: "Visits with a fever are by appointment only. Please be sure to book a fever outpatient slot before coming to the clinic.",
    intro: "If you have a fever or symptoms that may be infectious, we plan to have you **wait in your car**, so you never come into contact with other patients. We also test for influenza, COVID-19 and similar infections (after opening).",
    steps: [
      "Book a **fever outpatient slot** through the online reservation system we will provide after opening.",
      "At your appointment time, **park nose-in under the canopy beside the clinic** (the 5 spaces reserved for patients with a fever) and stay in your car.",
      "We will see that you have arrived on camera, and a staff member will come out to your car as soon as we are ready.",
    ],
    notes: [
      "If you need the toilet while waiting in your car, please use the **outdoor toilet reserved for patients with a fever** (planned), so you don't have to come inside or meet other patients.",
      "If you start to feel worse while waiting in your car, __please have the person accompanying you ring the intercom at the main entrance and let our staff know__.",
      "If you come alone by car, we will give you __a dedicated fever-outpatient phone number to call the clinic from your car__.",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
    intro: "Other questions that are not covered on our other pages. For anything else, please feel free to contact us via LINE or phone.",
    pagesHeading: "Appointments, fees and access are covered on these pages",
    pageLinks: [
      { label: "Your first visit (booking, what to bring, payment, insurance)", href: "/first-visit" },
      { label: "If you have a fever (appointment only)", href: "/first-visit#fever", tone: "fever" },
      { label: "Fees (vaccinations, medical certificates, etc.)", href: "/pricing" },
      { label: "Out-of-pocket costs for insured care (10–30%, children's subsidies)", href: "/insurance" },
      { label: "Access (parking, bus, pharmacy)", href: "/#access" },
      { label: "Services (children, health checkups, self-pay care)", href: "/services" },
    ],
    categories: FAQ_CATEGORIES_EN,
  },
  tokushoho: {
    eyebrow: "Legal",
    heading: "Specified Commercial Transactions Act disclosure",
    intro: "Disclosure required by Japan's Specified Commercial Transactions Act for self-pay medical services.",
    items: [
      { label: "Business operator", value: "Kibana Nomura General Medicine Clinic (under construction)" },
      { label: "Director", value: "Dr. Shinsuke Nomura" },
      { label: "Address", value: "5233-2 Kumano, Miyazaki City, Miyazaki 889-2151, Japan" },
      { label: "Phone", value: "To be published after opening" },
      { label: "Email", value: "contact@kibananomura.jp" },
      { label: "Clinic hours", value: "Mon–Fri: morning and afternoon  Sat, Sun & holidays: closed" },
      { label: "Services", value: "Self-pay treatments: GLP-1 receptor agonists, AGA, FAGA, LOH/TRT, ED medication, steroid injection for hay fever, and others" },
      { label: "Pricing", value: "Full pricing will be published after opening. The physician will provide detailed costs at your first consultation. All prices will be tax-inclusive." },
      { label: "Payment", value: "Cash and credit card (card payment planned after opening)" },
      { label: "Payment timing", value: "Payment is due on the day of consultation/treatment." },
      { label: "Cancellation policy", value: "Please cancel at least 2 hours before your appointment. A cancellation fee may apply if medication has been pre-ordered for your treatment." },
      { label: "Risks & side effects", value: "The physician will explain the main risks and side effects of each treatment at your consultation. Please also see our Services page for details." },
    ],
    disclaimer: "* This disclosure applies to self-pay treatments only, not to insured medical care. Details are subject to change.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Get in touch",
    body: "As we are currently under construction, phone enquiries are not yet available. Please contact us via our official LINE account or by email for questions or to receive opening updates.",
    lineLabel: "Contact us & get updates on LINE",
    lineNote: "This will open the LINE app. Please add us as a friend and send a message.",
    emailLabel: "contact@kibananomura.jp",
    emailNote: "Please use this address for enquiries by email.",
    note: "* We cannot provide medical advice, diagnoses or prescriptions via LINE. After opening, we will also accept enquiries by phone and in person.",
  },
};

const DICT: Record<Lang, SiteDict> = { ja, en };

type SiteContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: SiteDict;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ja");

  useEffect(() => {
    const savedLang = window.localStorage.getItem("kibana-lang");
    if (savedLang === "ja" || savedLang === "en") setLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("kibana-lang", lang);
  }, [lang]);

  const value: SiteContextValue = {
    lang,
    setLang,
    toggleLang: () => setLang((l) => (l === "ja" ? "en" : "ja")),
    t: DICT[lang],
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
