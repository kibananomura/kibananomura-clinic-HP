/**
 * 「保険診療の自己負担について」ページ（/insurance）の内容。
 * サーバー側（キバナビの参照テキスト chat-knowledge.ts）からも読むため、"use client" の site.tsx とは分けている。
 *
 * 子ども医療費助成は市町村ごとに違い、改定も多い。内容は各市町村の公式ページと
 * 宮崎県国民健康保険団体連合会「乳幼児医療費助成事業等 事業実施状況一覧（令和7年10月1日現在）」で確認した（2026年10月）。
 * 制度が変わったら CHILD_SUBSIDY_CHECKED と各行を更新すること。
 */

export const CHILD_SUBSIDY_CHECKED = { ja: "2026年10月", en: "October 2026" };

type Ratio = { who: string; rate: string };
type Municipality = {
  name: string;
  target: string;
  outpatient: string;
  inpatient: string;
  pharmacy: string;
  note?: string;
  source: string;
};

type CopayDict = {
  eyebrow: string;
  heading: string;
  intro: string;
  ratioHeading: string;
  ratioWhoLabel: string;
  ratioRateLabel: string;
  ratios: Ratio[];
  ratioNotes: string[];
  welfareHeading: string;
  welfareBody: string;
  childHeading: string;
  childIntro: string;
  labels: { target: string; outpatient: string; inpatient: string; pharmacy: string; source: string };
  municipalities: Municipality[];
  childNotes: string[];
  checkedNote: string;
  /** 料金ページ・初診の方へなどから、このページへ案内するリンクの文言 */
  linkLabel: string;
};

const ja: CopayDict = {
  eyebrow: "保険診療",
  heading: "保険診療の自己負担について",
  intro:
    "保険診療では、医療費のうち、年齢や所得に応じた割合（1〜3割）を窓口でお支払いいただきます。お子さんは、お住まいの市町村の子ども医療費助成により、窓口でのお支払いがさらに少なくなります。制度は変わることがありますので、詳しくはご加入の保険者・お住まいの市町村にご確認ください。",
  ratioHeading: "年齢ごとの自己負担の割合",
  ratioWhoLabel: "対象",
  ratioRateLabel: "自己負担",
  ratios: [
    { who: "小学校入学前のお子さん（6歳になった年度の3月31日まで）", rate: "2割" },
    { who: "小学生〜69歳の方", rate: "3割" },
    { who: "70〜74歳の方", rate: "2割（現役並みの所得がある方は3割）" },
    { who: "75歳以上の方（後期高齢者医療制度）", rate: "1割（一定以上の所得がある方は2割、現役並みの所得がある方は3割）" },
  ],
  ratioNotes: [
    "ご自分の負担の割合は、資格確認書・保険証やマイナポータルで確認できます。",
    "1か月の自己負担が高額になった場合は、高額療養費制度により上限を超えた分が払い戻されます。マイナ保険証をお使いいただくと、窓口でのお支払いが上限額までになります。",
  ],
  welfareHeading: "生活保護を受けている方",
  welfareBody:
    "生活保護を受けている方は、医療扶助により、保険診療の自己負担は原則としてありません。受診の際は、福祉事務所が発行する医療券、またはマイナンバーカードをお持ちください。",
  childHeading: "子ども医療費助成（お住まいの市町村別）",
  childIntro:
    "宮崎県内の医療機関では、保険証（マイナ保険証）と一緒に、お住まいの市町村が発行する「子ども医療費受給資格証」を窓口でお見せください。下の金額は、保険診療分について窓口でお支払いいただく額です。",
  labels: { target: "対象", outpatient: "通院", inpatient: "入院", pharmacy: "薬局（調剤）", source: "市町村のページ" },
  municipalities: [
    {
      name: "宮崎市（2027年4月受診分から）",
      target: "高校生年代まで（18歳になった年度の3月31日まで）",
      outpatient: "未就学児：無料／小学生：1日200円／中学生・高校生年代：1日500円（1医療機関ごとに月2,000円まで）",
      inpatient: "無料",
      pharmacy: "未就学児〜中学生：無料／高校生年代：1日500円（1薬局ごとに月2,000円まで）",
      note: "2027年3月までの受診分は、中学生まで（小中学生の通院は1医療機関ごとに月200円）です。",
      source: "https://www.city.miyazaki.miyazaki.jp/education/childbirth/408972.html",
    },
    {
      name: "都城市",
      target: "中学校卒業まで",
      outpatient: "無料",
      inpatient: "無料",
      pharmacy: "無料",
      source: "https://www.city.miyakonojo.miyazaki.jp/soshiki/66/4186.html",
    },
    {
      name: "日南市",
      target: "中学校卒業まで",
      outpatient: "未就学児：無料／小中学生：1医療機関ごとに月200円",
      inpatient: "無料",
      pharmacy: "無料",
      source: "https://www.city.nichinan.lg.jp/iryo_kenko_fukushi/iryo_kenko/4/1/2619.html",
    },
    {
      name: "三股町",
      target: "中学校卒業まで",
      outpatient: "未就学児：無料／小中学生：1医療機関ごとに月200円まで",
      inpatient: "無料",
      pharmacy: "無料",
      source: "https://www.town.mimata.lg.jp/contents/42.html",
    },
    {
      name: "国富町",
      target: "中学校卒業まで",
      outpatient: "無料",
      inpatient: "無料",
      pharmacy: "無料",
      source: "http://www.town.kunitomi.miyazaki.jp/main/health/children_welfare/page001044.html",
    },
    {
      name: "綾町",
      target: "中学校卒業まで",
      outpatient: "無料",
      inpatient: "小学校入学前のお子さん：無料（小中学生の入院は町にご確認ください）",
      pharmacy: "無料",
      source: "https://www.town.aya.miyazaki.jp/soshiki/hukusihokenka/",
    },
  ],
  childNotes: [
    "入院時の食事代、診断書などの文書料、予防接種、健診などは助成の対象外です。",
    "宮崎県外の医療機関では受給資格証が使えないため、いったん自己負担分をお支払いいただき、後日お住まいの市町村に申請します。",
    "ひとり親家庭医療費助成・重度心身障がい者医療費助成の対象の方は、そちらが優先される場合があります。",
    "上記以外の市町村にお住まいの方は、お住まいの市町村にご確認ください。",
  ],
  checkedNote: `各市町村の公式ページと宮崎県国民健康保険団体連合会の資料をもとに、${CHILD_SUBSIDY_CHECKED.ja}時点の内容をまとめています。最新の内容は、お住まいの市町村にご確認ください。`,
  linkLabel: "保険診療の自己負担（1〜3割・子ども医療費・生活保護）",
};

const en: CopayDict = {
  eyebrow: "Insured care",
  heading: "Out-of-pocket costs for insured care",
  intro:
    "With insured care, you pay a share of the medical costs (10–30%) at the counter, depending on your age and income. For children, the subsidy from your municipality reduces what you pay even further. Systems can change, so please check with your insurer or municipality for details.",
  ratioHeading: "Your share by age",
  ratioWhoLabel: "Who",
  ratioRateLabel: "You pay",
  ratios: [
    { who: "Children before starting elementary school (until 31 March after turning 6)", rate: "20%" },
    { who: "Elementary school age to 69", rate: "30%" },
    { who: "Ages 70–74", rate: "20% (30% with income equivalent to working-age)" },
    { who: "Age 75 and over (late-stage elderly medical care)", rate: "10% (20% above a certain income; 30% with income equivalent to working-age)" },
  ],
  ratioNotes: [
    "You can check your share on your eligibility certificate, insurance card or MyNa Portal.",
    "If your monthly costs are high, the High-Cost Medical Expense Benefit refunds the amount above the limit. With a My Number insurance card, you pay only up to the limit at the counter.",
  ],
  welfareHeading: "If you receive public assistance (seikatsu hogo)",
  welfareBody:
    "If you receive public assistance, medical aid generally covers your share of insured care. Please bring the medical ticket issued by the welfare office, or your My Number card.",
  childHeading: "Children's medical expense subsidies (by municipality)",
  childIntro:
    "At medical institutions in Miyazaki Prefecture, please show your municipality's children's medical expense eligibility card together with your insurance card (or My Number insurance card). The amounts below are what you pay at the counter for insured care.",
  labels: { target: "Eligible", outpatient: "Outpatient", inpatient: "Inpatient", pharmacy: "Pharmacy", source: "Municipality page" },
  municipalities: [
    {
      name: "Miyazaki City (from April 2027)",
      target: "Up to high-school age (until 31 March after turning 18)",
      outpatient: "Preschool: free / Elementary: ¥200 per day / Junior high & high-school age: ¥500 per day (up to ¥2,000 per month per institution)",
      inpatient: "Free",
      pharmacy: "Preschool to junior high: free / High-school age: ¥500 per day (up to ¥2,000 per month per pharmacy)",
      note: "For visits until March 2027: up to junior high school (outpatient ¥200 per month per institution for elementary and junior high students).",
      source: "https://www.city.miyazaki.miyazaki.jp/education/childbirth/408972.html",
    },
    {
      name: "Miyakonojo City",
      target: "Until junior high school graduation",
      outpatient: "Free",
      inpatient: "Free",
      pharmacy: "Free",
      source: "https://www.city.miyakonojo.miyazaki.jp/soshiki/66/4186.html",
    },
    {
      name: "Nichinan City",
      target: "Until junior high school graduation",
      outpatient: "Preschool: free / Elementary & junior high: ¥200 per month per institution",
      inpatient: "Free",
      pharmacy: "Free",
      source: "https://www.city.nichinan.lg.jp/iryo_kenko_fukushi/iryo_kenko/4/1/2619.html",
    },
    {
      name: "Mimata Town",
      target: "Until junior high school graduation",
      outpatient: "Preschool: free / Elementary & junior high: up to ¥200 per month per institution",
      inpatient: "Free",
      pharmacy: "Free",
      source: "https://www.town.mimata.lg.jp/contents/42.html",
    },
    {
      name: "Kunitomi Town",
      target: "Until junior high school graduation",
      outpatient: "Free",
      inpatient: "Free",
      pharmacy: "Free",
      source: "http://www.town.kunitomi.miyazaki.jp/main/health/children_welfare/page001044.html",
    },
    {
      name: "Aya Town",
      target: "Until junior high school graduation",
      outpatient: "Free",
      inpatient: "Preschool children: free (for elementary and junior high students, please check with the town)",
      pharmacy: "Free",
      source: "https://www.town.aya.miyazaki.jp/soshiki/hukusihokenka/",
    },
  ],
  childNotes: [
    "Hospital meals, document fees (such as medical certificates), vaccinations and health check-ups are not covered.",
    "The eligibility card cannot be used outside Miyazaki Prefecture; you pay your share first and then apply to your municipality for a refund.",
    "If you are eligible for the single-parent or severe-disability medical subsidy, that subsidy may take priority.",
    "If you live in another municipality, please check with your municipality.",
  ],
  checkedNote: `Compiled from each municipality's official website and the Miyazaki Federation of National Health Insurance Organizations, as of ${CHILD_SUBSIDY_CHECKED.en}. Please check with your municipality for the latest information.`,
  linkLabel: "Out-of-pocket costs for insured care (10–30%, children's subsidies, public assistance)",
};

export const INSURANCE_COPAY = { ja, en };
