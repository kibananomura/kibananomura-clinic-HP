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
    id: "visit",
    title: "受診のしかた",
    items: [
      { id: "prescription-only", q: "お薬だけ出してもらえますか？", a: "お薬の処方には、医師の**診察が必要**です（法律で、診察をせずにお薬を出すことは認められていません）。症状が落ち着いている方は、**短い診察で継続して処方**いたします。通院が難しいときは、開院後に**オンライン診療**もご利用いただけます。オンライン診療でのお薬の受け取り方は、①薬局でオンラインの服薬指導を受けたうえで**ご自宅に配送**してもらう方法と、②ご希望の薬局に処方箋を送り、**薬局で受け取る**方法があります。②の場合、処方箋の有効期限は**発行日を含めて4日以内**のため、その間に薬局へお越しください。なお、初めての方のオンライン診療では、処方できるお薬の種類や日数に制限があります。" },
      { id: "online-consultation", q: "オンライン診療はありますか？", a: "開院後、**当院に通院しているかかりつけの方**を対象に、オンライン診療を行う予定です。出張や旅行などで来院が難しいときにも、いつもの治療を続けられるようにするためのものです。__初めて受診される方や、新しい症状がある方は、対面での診察__をお願いしています。オンライン診療では、保険診療の自己負担とは別に、**システム利用料1回1,000円（税込）**をいただきます。くわしい受け方は、開院が近づきましたらホームページと診療所の公式LINEでお知らせします。" },
      { id: "home-visit", q: "往診・訪問診療はしてもらえますか？", a: "開院当初は、**近隣の介護施設・グループホームなどの入居者の方**への訪問診療（昼休みを活用）から始める予定です。施設のご担当者様は、お気軽にLINEまたはお問い合わせフォームよりご相談ください。__ご自宅への往診は、開院当初は行う予定はありません__が、体制が整い次第、ホームページや診療所の公式LINEでお知らせします。" },
    ],
  },
  {
    id: "hospital",
    title: "大きな病院との連携",
    items: [
      { id: "referral", q: "他の病院へ紹介してもらえますか？", a: "はい。院内での対応が難しい場合は、宮崎大学医学部附属病院などの基幹病院をはじめ、専門医療機関に**紹介状を作成**してご案内します。" },
      { id: "miyazaki-university-hospital", q: "宮崎大学医学部附属病院とのつながりはありますか？", a: "院長は以前、**宮崎大学で臨床・教育・研究**に携わっていました。宮崎大学医学部附属病院は当院からお車で約5分の距離にあります。詳しい検査や入院、専門的な治療が必要な方には、**病状とご希望に合わせて**、宮崎大学医学部附属病院をはじめ適切な医療機関への紹介状を作成します。なお、当院は宮崎大学の関連施設ではありません。開院前には、宮崎大学医学部附属病院などへごあいさつにうかがう予定です。紹介先で治療が落ち着いた方は、紹介先の病院からのお返事をもとに、__当院で引き続き診ていきます__。" },
    ],
  },
  {
    id: "treatment",
    title: "行う予定の診療・開院当初は行わない診療",
    items: [
      { id: "pollen-slit", q: "スギ花粉症の舌下免疫療法はできますか？", a: "開院後、**スギ花粉症の舌下免疫療法（保険診療）**を行う予定です。毎日1回、舌の下にお薬を置いて体を花粉に少しずつ慣らしていく治療で、__3〜5年ほど続ける__ことがすすめられています。治療の効果には個人差があります。主な副作用は口の中のかゆみや腫れで、まれに強いアレルギー反応（アナフィラキシー）が起こることがあります。そのため初回は院内でお薬を飲み、しばらく様子を見ます。受けられるかどうかは、診察と血液検査でスギ花粉症と確かめてから判断します。スギ花粉が飛んでいる時期には始められないため、始められる時期が近づきましたら**ホームページと診療所の公式LINE**でお知らせします。花粉症のふだんの治療については、メニューの「病気について調べる」にある花粉症のページもご覧ください。" },
      { id: "colonoscopy", q: "大腸カメラはできますか？", a: "開院当初は行う予定はありませんが、体制が整い次第、ホームページや診療所の公式LINEでお知らせします。なお、胃カメラ（経鼻内視鏡）は開院当初から行う予定です。" },
      { id: "infant-checkup", q: "乳児健診はやっていますか？", a: "開院当初は行う予定はありませんが、体制が整い次第、ホームページや診療所の公式LINEでお知らせします。" },
      { id: "smoking-cessation", q: "禁煙外来はありますか？", a: "開院当初は行う予定はありませんが、体制が整い次第、ホームページや診療所の公式LINEでお知らせします。" },
    ],
  },
  {
    id: "other",
    title: "院内の設備・その他",
    items: [
      { id: "nursing-room", q: "授乳室やおむつ替えの場所はありますか？", a: "専用の授乳室はありませんが、**空いている診察室**または**車いす用トイレ**をご案内いたします。お気軽にスタッフにお声がけください。" },
      { id: "open-house", q: "内覧会はありますか？", a: "開院前に内覧会を予定しています。時期が近づきましたら、**ホームページと診療所の公式LINE**でお知らせいたします。" },
    ],
  },
];

export const FAQ_CATEGORIES_EN: FaqCategory[] = [
  {
    id: "visit",
    title: "How to see us",
    items: [
      { id: "prescription-only", q: "Can I just get a prescription without seeing the doctor?", a: "A **consultation with the doctor is required** for any prescription (Japanese law does not allow medication to be prescribed without an examination). If your condition is stable, we will **continue your prescription after a short consultation**. If it is hard for you to come in, **online consultations** will also be available after opening. With an online consultation, you can either (1) receive medication guidance from a pharmacy online and have your medication **delivered to your home**, or (2) have the prescription sent to a pharmacy of your choice and **pick it up there**. For option (2), a prescription is **valid for 4 days, including the day it is issued**, so please visit the pharmacy within that period. For first-time patients, online consultations have limits on the types of medication and the number of days that can be prescribed." },
      { id: "online-consultation", q: "Do you offer online consultations?", a: "After opening, we plan to offer online consultations for **patients who already see us regularly**, so you can continue your usual treatment even when business trips or travel make it hard to visit. __If it is your first visit, or you have a new symptom, please come in for an in-person consultation__. For online consultations, a **system fee of ¥1,000 per session (incl. tax)** is charged in addition to your insurance co-payment. We will share how to book on our website and official LINE account as opening approaches." },
      { id: "home-visit", q: "Do you offer home visits?", a: "At opening, we plan to start with visits to **residents of nearby care facilities (nursing homes, group homes, etc.)** during our lunch break. If you are a facility coordinator, please feel free to contact us via LINE or our contact form. __Home visits to individual homes are not planned at opening__, but we will announce them on this website and our official LINE account once we are ready." },
    ],
  },
  {
    id: "hospital",
    title: "Working with hospitals",
    items: [
      { id: "referral", q: "Can you refer me to a specialist?", a: "Yes. When a condition requires specialist care, we will **write a referral** to hospitals such as the University of Miyazaki Hospital or other appropriate facilities." },
      { id: "miyazaki-university-hospital", q: "Do you have ties with the University of Miyazaki Hospital?", a: "The director previously worked at the **University of Miyazaki in clinical care, teaching and research**. The University of Miyazaki Hospital is about a 5-minute drive away. When you need detailed tests, admission or specialist treatment, we will write a referral to **an appropriate hospital, such as the University of Miyazaki Hospital, based on your condition and wishes**. Our clinic is not affiliated with the University of Miyazaki. Before opening, we plan to visit the University of Miyazaki Hospital and other hospitals to introduce ourselves. Once your condition is stable, __we can continue your care here, based on the report from the hospital__." },
    ],
  },
  {
    id: "treatment",
    title: "Services planned / not offered at opening",
    items: [
      { id: "pollen-slit", q: "Do you offer sublingual immunotherapy for cedar pollen allergy?", a: "After opening, we plan to offer **sublingual immunotherapy for Japanese cedar pollen allergy (covered by Japanese public health insurance)**. You place a tablet under your tongue once a day so your body gradually gets used to the pollen, and it is recommended to __continue for about 3 to 5 years__. Results vary from person to person. The main side effects are itching or swelling in the mouth; rarely, a severe allergic reaction (anaphylaxis) can occur, so the first dose is taken at the clinic under observation. Suitability is decided after a consultation and a blood test confirming cedar pollen allergy. It cannot be started while cedar pollen is in the air, so we will announce on **our website and official LINE account** when the starting season approaches. For everyday hay fever treatment, see the hay fever page in the conditions section of our website." },
      { id: "colonoscopy", q: "Can I have a colonoscopy?", a: "This is not planned at opening, but we will announce it on this website and our official LINE account once we are ready. Upper gastroscopy (transnasal endoscopy) will be available from opening." },
      { id: "infant-checkup", q: "Do you offer infant health check-ups?", a: "This is not planned at opening, but we will announce it on this website and our official LINE account once we are ready." },
      { id: "smoking-cessation", q: "Do you have a smoking cessation clinic?", a: "This is not planned at opening, but we will announce it on this website and our official LINE account once we are ready." },
    ],
  },
  {
    id: "other",
    title: "Facilities & other",
    items: [
      { id: "nursing-room", q: "Is there a nursing room or a place to change diapers?", a: "We do not have a dedicated nursing room, but we can show you to **an available consultation room** or our **wheelchair-accessible restroom**. Please just ask our staff." },
      { id: "open-house", q: "Will there be an open house?", a: "We plan to hold an open house before opening. We will announce the date on **this website and our official LINE account** as it approaches." },
    ],
  },
];

/** 構造化データ（FaqJsonLd）・キバナビ用の、カテゴリをまたいだ一覧 */
export const FAQ_ITEMS_JA: FaqItem[] = FAQ_CATEGORIES_JA.flatMap((c) => c.items);
