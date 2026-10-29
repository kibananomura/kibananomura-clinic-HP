/**
 * FAQのQ&Aデータ本体。
 * サーバーコンポーネント（FaqJsonLd用のgenerateMetadata等）からも
 * 直接参照できるよう、"use client" を含む site.tsx とは切り離している。
 *
 * 「a」内の **強調したい文字** / __下線を引きたい文字__ は、
 * InlineRichTextコンポーネントが太字・下線として描画する（簡易Markdown記法）。
 *
 * よくある質問には、メニューのページ（初診の方へ・料金・アクセス・診療案内など）に載せられない
 * ニッチな質問だけを置く。予約・支払い・駐車場・発熱時の受診方法などは各ページに書き、
 * キバナビ（chat-knowledge.ts）もそちらを参照する。
 * id は /faq#id のリンク（キバナビの案内など）に使うため、一度決めたら変えない。
 */
export type FaqEntry = { q: string; a: string };
export type FaqItem = FaqEntry & { id: string };
export type FaqCategory = { id: string; title: string; items: FaqItem[] };

export const FAQ_CATEGORIES_JA: FaqCategory[] = [
  {
    id: "consult",
    title: "受診・お薬について",
    items: [
      { id: "prescription-only", q: "お薬だけ出してもらえますか？", a: "お薬の処方には、医師の**診察が必要**です（法律で、診察をせずにお薬を出すことは認められていません）。症状が落ち着いている方は、**短い診察で継続して処方**いたします。通院が難しいときは、開院後に**オンライン診療**もご利用いただけます。オンライン診療でのお薬の受け取り方は、①薬局でオンラインの服薬指導を受けたうえで**ご自宅に配送**してもらう方法と、②ご希望の薬局に処方箋を送り、**薬局で受け取る**方法があります。②の場合、処方箋の有効期限は**発行日を含めて4日以内**のため、その間に薬局へお越しください。なお、初めての方のオンライン診療では、処方できるお薬の種類や日数に制限があります。" },
      { id: "online-consultation", q: "オンライン診療はありますか？", a: "開業時・外来患者が少ない閑散時間帯に、仮想待合室型オンライン診療（イシャチョク®）を活用予定です。対面診療が安定した段階で縮小し、地域のかかりつけ診療所として完全移行する計画です。" },
      { id: "referral", q: "他の病院へ紹介してもらえますか？", a: "はい。院内での対応が難しい場合は、宮崎大学医学部附属病院などの基幹病院をはじめ、専門医療機関に**紹介状を作成**してご案内します。" },
      { id: "home-visit", q: "往診・訪問診療はしてもらえますか？", a: "開院当初は、**近隣の介護施設・グループホームなどの入居者の方**への訪問診療（昼休みを活用）から始める予定です。施設のご担当者様は、お気軽にLINEまたはお問い合わせフォームよりご相談ください。__ご自宅への往診は、開院当初は行う予定はありません__が、体制が整い次第、ホームページや診療所の公式LINEでお知らせします。" },
    ],
  },
  {
    id: "not-offered",
    title: "現在は行っていない診療",
    items: [
      { id: "infant-checkup", q: "乳児健診はやっていますか？", a: "開院当初は行う予定はありませんが、体制が整い次第、ホームページや診療所の公式LINEでお知らせします。" },
      { id: "colonoscopy", q: "大腸カメラはできますか？", a: "開院当初は行う予定はありませんが、体制が整い次第、ホームページや診療所の公式LINEでお知らせします。なお、胃カメラ（経鼻内視鏡）は開院当初から行う予定です。" },
      { id: "smoking-cessation", q: "禁煙外来はありますか？", a: "開院当初は行う予定はありませんが、体制が整い次第、ホームページや診療所の公式LINEでお知らせします。" },
    ],
  },
  {
    id: "other",
    title: "その他",
    items: [
      { id: "nursing-room", q: "授乳室やおむつ替えの場所はありますか？", a: "専用の授乳室はありませんが、**空いている診察室**または**車いす用トイレ**をご案内いたします。お気軽にスタッフにお声がけください。" },
      { id: "open-house", q: "内覧会はありますか？", a: "開院前に内覧会を予定しています。時期が近づきましたら、**ホームページと診療所の公式LINE**でお知らせいたします。" },
    ],
  },
];

export const FAQ_CATEGORIES_EN: FaqCategory[] = [
  {
    id: "consult",
    title: "Visits & prescriptions",
    items: [
      { id: "prescription-only", q: "Can I just get a prescription without seeing the doctor?", a: "A **consultation with the doctor is required** for any prescription (Japanese law does not allow medication to be prescribed without an examination). If your condition is stable, we will **continue your prescription after a short consultation**. If it is hard for you to come in, **online consultations** will also be available after opening. With an online consultation, you can either (1) receive medication guidance from a pharmacy online and have your medication **delivered to your home**, or (2) have the prescription sent to a pharmacy of your choice and **pick it up there**. For option (2), a prescription is **valid for 4 days, including the day it is issued**, so please visit the pharmacy within that period. For first-time patients, online consultations have limits on the types of medication and the number of days that can be prescribed." },
      { id: "online-consultation", q: "Do you offer online consultations?", a: "During quiet periods and at opening, we plan to use a virtual waiting-room online consultation service (Isya-choku®). Once in-person care stabilises, we will scale this back and focus fully on being your local family clinic." },
      { id: "referral", q: "Can you refer me to a specialist?", a: "Yes. When a condition requires specialist care, we will **write a referral** to hospitals such as the University of Miyazaki Hospital or other appropriate facilities." },
      { id: "home-visit", q: "Do you offer home visits?", a: "At opening, we plan to start with visits to **residents of nearby care facilities (nursing homes, group homes, etc.)** during our lunch break. If you are a facility coordinator, please feel free to contact us via LINE or our contact form. __Home visits to individual homes are not planned at opening__, but we will announce them on this website and our official LINE account once we are ready." },
    ],
  },
  {
    id: "not-offered",
    title: "Services not currently offered",
    items: [
      { id: "infant-checkup", q: "Do you offer infant health check-ups?", a: "This is not planned at opening, but we will announce it on this website and our official LINE account once we are ready." },
      { id: "colonoscopy", q: "Can I have a colonoscopy?", a: "This is not planned at opening, but we will announce it on this website and our official LINE account once we are ready. Upper gastroscopy (transnasal endoscopy) will be available from opening." },
      { id: "smoking-cessation", q: "Do you have a smoking cessation clinic?", a: "This is not planned at opening, but we will announce it on this website and our official LINE account once we are ready." },
    ],
  },
  {
    id: "other",
    title: "Other",
    items: [
      { id: "nursing-room", q: "Is there a nursing room or a place to change diapers?", a: "We do not have a dedicated nursing room, but we can show you to **an available consultation room** or our **wheelchair-accessible restroom**. Please just ask our staff." },
      { id: "open-house", q: "Will there be an open house?", a: "We plan to hold an open house before opening. We will announce the date on **this website and our official LINE account** as it approaches." },
    ],
  },
];

/** 構造化データ（FaqJsonLd）・キバナビ用の、カテゴリをまたいだ一覧 */
export const FAQ_ITEMS_JA: FaqItem[] = FAQ_CATEGORIES_JA.flatMap((c) => c.items);
