/**
 * 症状別ページのコンテンツデータ。
 *
 * 医学的内容は miyazaki-clinic-plan/operation/symptom-pages-clinical-design.md
 * （clinical-advisor 策定）に厳密に基づく。断定回避・レッドフラグサイン・免責文言の
 * 配置ルールを機械的に遵守すること。ここに新しい医学的判断を追加執筆しないこと。
 *
 * 自費診療の料金・リスク説明は app/lib/site.tsx（JA pricing / servicesPage.selfpayItems）
 * と完全一致させている。金額を変更する場合は、まず site.tsx 側を更新すること。
 */

// 型・小さな定数・ヘルパー関数は symptom-shared.ts に分離している
// （クライアントコンポーネントが本ファイルをimportすると、重いSYMPTOMS配列
// ごとバンドルされてしまうため。詳細は symptom-shared.ts のコメントを参照）。
// サーバー側からの既存のimportを壊さないよう、ここで re-export しておく。
export type {
  SymptomCategory,
  EmergencyBox,
  SymptomSelfPay,
  SymptomTranslation,
  SymptomEntry,
} from "./symptom-shared";
export {
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  getSymptomContent,
  SYMPTOM_DISCLAIMER_INTRO,
  SYMPTOM_DISCLAIMER_INTRO_SHORT,
  SYMPTOM_DISCLAIMER_OUTRO,
  CHEST_PAIN_EMERGENCY_BANNER,
} from "./symptom-shared";
import type { SymptomCategory, SymptomEntry } from "./symptom-shared";

/** 当院で実施可能な検査の名称（equipment.ts / careers.ts の記載に準拠） */
export const AVAILABLE_TESTS = {
  blood: "血液検査（採血）",
  urine: "尿検査",
  ecg: "心電図",
  xray: "デジタルX線（レントゲン）",
  ct: "16列CT",
  echo: "腹部エコー（超音波）",
  gastroscopy: "経鼻内視鏡（胃カメラ）",
  feno: "FeNO（呼気中の炎症物質を測定する検査。気管支喘息の診断・管理に用います）",
} as const;

const COMMON_TREATMENT_NOTE =
  "これらの中から症状に応じて医師が判断し、必要な検査・治療方針をご説明します。";

export const SYMPTOMS: SymptomEntry[] = [
  // ==================== 内科系 ====================
  {
    slug: "fever-cold",
    title: "発熱・かぜ症状",
    category: "internal",
    summary: "発熱・のどの痛み・鼻水などのかぜ症状について",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "こんな場合は様子を見ず早めに受診してください",
      points: [
        "意識がはっきりしない、呼びかけへの反応が悪い",
        "呼吸が苦しい、息切れが強い",
        "39℃以上の発熱が3日以上続いている",
      ],
      action: "上記に当てはまる場合は、様子を見ずに早期受診をおすすめします。",
    },
    possibleCauses: [
      { name: "感冒（かぜ症候群・上気道感染症）", note: "発熱・のどの痛み・鼻水などを伴うことが多く、呼び方は違っても基本的に同じ状態を指します。" },
      { name: "インフルエンザ", note: "急な高熱・関節痛・全身のだるさを伴うことが多いです。" },
      { name: "市中肺炎", note: "咳・息苦しさを伴う発熱が続く場合に疑われ、重症度の評価が必要になることがあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.xray],
    treatmentOverview: [
      "多くは対症療法（解熱剤・咳止め・去痰薬など）で経過をみることが多いです。",
      "肺炎などが疑われる場合は、検査の結果に応じて抗菌薬などの治療を検討することがあります。",
      "症状や経過によっては、より専門的な医療機関への紹介が必要になるケースもあります。",
    ],
    whenToVisit: [
      "高熱が続く、症状が徐々に悪化している場合は受診をご検討ください。",
      "軽い症状で数日以内に改善傾向がある場合は、自宅で様子を見ていただくことも可能です。",
      "ご不安な場合は無理をせず、お早めにご相談ください。",
    ],
    en: {
      title: "Fever & cold symptoms",
      summary: "Fever, sore throat, runny nose, and other cold-like symptoms",
      emergencyBox: {
        heading: "Please don't wait — come in soon if any of these apply",
        points: [
          "You're not fully alert, or responding poorly when spoken to",
          "Breathing is difficult, or you're significantly short of breath",
          "A fever of 39°C or higher has lasted 3 days or more",
        ],
        action: "If any of the above apply, please don't wait and see — come in as soon as you can.",
      },
      possibleCauses: [
        { name: "Common cold (upper respiratory infection)", note: "Often comes with fever, sore throat, and a runny nose. Different names, but essentially the same condition." },
        { name: "Influenza", note: "Often involves a sudden high fever, joint pain, and whole-body fatigue." },
        { name: "Community-acquired pneumonia", note: "Suspected when fever persists along with a cough or difficulty breathing; may need an assessment of severity." },
      ],
      relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.xray],
      treatmentOverview: [
        "Most cases are managed with symptomatic treatment (fever reducers, cough suppressants, expectorants) while you recover.",
        "If pneumonia is suspected, we may consider antibiotics or other treatment depending on test results.",
        "Depending on your symptoms and how they progress, referral to a more specialized institution is sometimes necessary.",
      ],
      whenToVisit: [
        "Please consider coming in if a high fever persists or your symptoms are gradually worsening.",
        "If symptoms are mild and trending toward improvement within a few days, it's also fine to rest and watch at home.",
        "If you're feeling anxious, please don't push through it — come talk to us sooner rather than later.",
      ],
    },
  },
  {
    slug: "persistent-cough",
    title: "咳が続く",
    category: "internal",
    summary: "長引く咳・気になる咳について",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "こんな場合は早めに受診してください",
      points: [
        "呼吸が苦しい、息切れを伴う",
        "血の混じった痰（血痰）が出る",
        "体重減少を伴いながら咳が長く続いている",
      ],
      action: "上記のような場合は、結核などの除外も含めて早期受診をおすすめします。",
    },
    possibleCauses: [
      { name: "感冒（かぜ症候群・上気道感染症）", note: "咳が主体の症状として現れることもあり、通常は1〜2週間程度で軽快します。" },
      { name: "気管支炎", note: "かぜの後などに咳が長引くことが多いです。" },
      { name: "気管支喘息", note: "夜間・早朝に悪化する咳・喘鳴を伴うことがあります。" },
      { name: "後鼻漏（副鼻腔炎など）", note: "鼻水がのどに流れることで咳が続くことがあります。" },
      { name: "長引く咳の背景に感染症が隠れている", note: "長期間続く咳では、結核など他の疾患の除外が必要になることがあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.xray, AVAILABLE_TESTS.feno],
    treatmentOverview: [
      "原因に応じて、去痰薬・気管支拡張薬・吸入薬などを用いることが多いです。",
      "喘息が疑われる場合はFeNO検査（呼気中の炎症物質を測定する検査）などで評価したうえで治療方針を検討することがあります。",
      "長引く咳では、必要に応じて画像検査や専門医への紹介を検討することがあります。",
    ],
    whenToVisit: [
      "2〜3週間以上咳が続く場合は受診をご検討ください。",
      "咳以外の症状（発熱・体重減少など）を伴う場合は早めのご相談をおすすめします。",
    ],
    en: {
      title: "Persistent cough",
      summary: "For a lingering or concerning cough",
      emergencyBox: {
        heading: "Please come in soon if any of these apply",
        points: [
          "Breathing is difficult, or it comes with shortness of breath",
          "You're coughing up blood-streaked sputum",
          "A long-lasting cough is accompanied by weight loss",
        ],
        action: "If any of the above apply, please come in soon — this includes ruling out causes such as tuberculosis.",
      },
      possibleCauses: [
        { name: "Common cold (upper respiratory infection)", note: "A cough can be the main symptom; this usually improves within 1–2 weeks." },
        { name: "Bronchitis", note: "A cough that lingers after a cold is common." },
        { name: "Bronchial asthma", note: "Can involve a cough and wheezing that worsen at night or early morning." },
        { name: "Postnasal drip (e.g. from sinusitis)", note: "Mucus running down the throat from the nose can cause an ongoing cough." },
        { name: "An infection hiding behind a lingering cough", note: "For a cough that continues for a long time, ruling out other conditions such as tuberculosis may be necessary." },
      ],
      relatedTests: ["Blood test", "Digital X-ray", "FeNO test (measures exhaled nitric oxide; used to diagnose/manage asthma)"],
      treatmentOverview: [
        "Depending on the cause, we often use expectorants, bronchodilators, or inhaled medications.",
        "If asthma is suspected, we may evaluate with a FeNO test (which measures inflammatory markers in your exhaled breath) before deciding on a treatment plan.",
        "For a lingering cough, imaging tests or referral to a specialist may be considered as needed.",
      ],
      whenToVisit: [
        "Please consider coming in if your cough lasts more than 2–3 weeks.",
        "We recommend an early visit if the cough is accompanied by other symptoms such as fever or weight loss.",
      ],
    },
  },
  {
    slug: "abdominal-pain",
    title: "腹痛・お腹の不調",
    category: "internal",
    summary: "お腹の痛み・不快感について",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "こんな場合は様子を見ず救急要請・救急外来を受診してください",
      points: [
        "突然発症した激しい痛み",
        "嘔吐が持続する",
        "血便・黒色便（タール便）がある",
        "お腹が板のように硬くなっている（腹膜刺激症状）",
      ],
      action: "上記に当てはまる場合は、様子を見ずに救急要請または救急外来の受診をおすすめします。",
    },
    possibleCauses: [
      { name: "胃炎", note: "みぞおちの痛み・不快感を伴うことが多いです。" },
      { name: "胃腸炎", note: "腹痛に加えて下痢・嘔吐を伴うことが多いです。" },
      { name: "便秘", note: "お腹の張りとともに痛みが出ることがあります。" },
      { name: "胆石症", note: "脂っこい食事の後の右上腹部痛として現れることが多く、発熱を伴う場合は胆嚢炎に進行していることがあります。" },
      { name: "胆嚢炎", note: "胆石症が進行し、胆のうに炎症を起こした状態です。発熱を伴うことが多く、早めの評価が必要です。" },
      { name: "虫垂炎", note: "みぞおち〜右下腹部に痛みが移動することがあり、注意が必要な疾患のひとつです。" },
      { name: "尿管結石症", note: "突然の激しい腰背部〜下腹部の痛みとして現れ、血尿を伴うことがあります。" },
      { name: "回腸末端炎", note: "虫垂炎とよく似た右下腹部の痛みを起こすことがあり、感染性腸炎やクローン病等が背景にあることがあります。" },
      { name: "虚血性腸炎", note: "左側の急な腹痛に続いて下痢・血便が起こることがあり、便秘気味の中高年の方に多いとされています。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.echo, AVAILABLE_TESTS.ct, AVAILABLE_TESTS.gastroscopy],
    treatmentOverview: [
      "原因に応じて、対症療法（胃薬・整腸薬など）で経過をみることが多いです。",
      "胆石・虫垂炎などが疑われる場合は、外科的な処置や高次医療機関への紹介が必要になることがあります。",
      "検査の結果に応じて、原因治療（除菌治療、生活習慣の見直しなど）を検討することがあります。",
    ],
    whenToVisit: [
      "軽い痛みで改善傾向がある場合は、自宅で様子を見ていただくことも可能です。",
      "痛みが強くなる、繰り返す、他の症状を伴う場合は受診をご検討ください。",
    ],
    en: {
      title: "Abdominal pain / stomach trouble",
      summary: "For abdominal pain and discomfort",
      emergencyBox: {
        heading: "Please don't wait — call emergency services or go to the ER if any of these apply",
        points: [
          "Sudden, severe pain",
          "Persistent vomiting",
          "Blood in your stool or black, tarry stool",
          "Your abdomen feels rigid, like a board (a sign of peritoneal irritation)",
        ],
        action: "If any of the above apply, please don't wait — call emergency services or go to the ER.",
      },
      possibleCauses: [
        { name: "Gastritis", note: "Often involves pain or discomfort in the upper abdomen." },
        { name: "Gastroenteritis", note: "Often comes with diarrhea and vomiting in addition to abdominal pain." },
        { name: "Constipation", note: "Pain can occur along with bloating." },
        { name: "Gallstones", note: "Often appears as pain in the upper right abdomen after a fatty meal; if accompanied by fever, it may be progressing to cholecystitis." },
        { name: "Cholecystitis", note: "A state where gallstones have progressed to inflammation of the gallbladder. Often involves fever and needs prompt evaluation." },
        { name: "Appendicitis", note: "Pain that moves from the upper abdomen to the lower right abdomen — a condition that needs careful attention." },
        { name: "Ureteral stones", note: "Appears as sudden, severe pain from the lower back to the lower abdomen, sometimes with blood in the urine." },
        { name: "Terminal ileitis", note: "Can cause lower-right abdominal pain resembling appendicitis; infectious enteritis or Crohn's disease can be underlying causes." },
        { name: "Ischemic colitis", note: "Sudden left-sided abdominal pain followed by diarrhea or bloody stool; more common in middle-aged and older adults prone to constipation." },
      ],
      relatedTests: ["Blood test", "Abdominal ultrasound", "16-row CT", "Transnasal endoscopy (gastroscopy)"],
      treatmentOverview: [
        "Depending on the cause, we often manage symptoms with medication (stomach medicine, medicine to regulate bowel function, etc.) while monitoring your progress.",
        "If gallstones or appendicitis are suspected, surgical treatment or referral to a higher-level institution may be necessary.",
        "Depending on test results, we may consider treating the underlying cause (such as H. pylori eradication or lifestyle changes).",
      ],
      whenToVisit: [
        "If the pain is mild and trending toward improvement, it's also fine to rest and watch at home.",
        "Please consider coming in if the pain intensifies, recurs, or comes with other symptoms.",
      ],
    },
  },
  {
    slug: "heartburn-stomach-discomfort",
    title: "胸やけ・胃の不調",
    category: "internal",
    summary: "胸やけ・みぞおちの不快感について",
  lastReviewed: "2026-09-15",
    showChestPainBanner: true,
    emergencyBox: {
      heading: "胸の痛みを伴う場合は要注意",
      points: [
        "胸の痛みに加えて、冷や汗・左腕への放散痛・呼吸困難を伴う",
        "締め付けられるような強い胸の圧迫感がある",
      ],
      action: "上記は消化器症状ではなく心疾患の可能性があるため、今すぐ救急要請（119番）してください。",
      strong: true,
    },
    possibleCauses: [
      { name: "逆流性食道炎", note: "胃酸が食道に逆流することで胸やけが起こることが多いです。" },
      { name: "胃炎", note: "みぞおちの不快感・胃もたれを伴うことが多いです。" },
      { name: "ピロリ菌関連疾患", note: "慢性的な胃炎・胃潰瘍などの背景にあることがあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.gastroscopy],
    treatmentOverview: [
      "胃酸を抑える薬（酸分泌抑制薬）などによる対症療法が中心になることが多いです。",
      "ピロリ菌感染が確認された場合は、除菌治療を検討することがあります。",
      "症状が続く場合は胃カメラなどによる精査を検討することがあります。",
    ],
    whenToVisit: [
      "市販薬で改善しない、症状が繰り返す場合は受診をご検討ください。",
      "上記の緊急性のある症状（胸痛・冷や汗・放散痛等）がある場合は、様子を見ず直ちに救急要請してください。",
    ],
    en: {
      title: "Heartburn / stomach discomfort",
      summary: "For heartburn and discomfort in the upper abdomen",
      emergencyBox: {
        heading: "Watch out if chest pain is involved",
        points: [
          "Chest pain along with cold sweats, pain radiating to the left arm, or difficulty breathing",
          "A strong, tight, squeezing sensation in the chest",
        ],
        action: "These may signal a heart condition rather than a digestive issue — call emergency services (119) right away.",
        strong: true,
      },
      possibleCauses: [
        { name: "Reflux esophagitis", note: "Often causes heartburn as stomach acid flows back into the esophagus." },
        { name: "Gastritis", note: "Often involves discomfort in the upper abdomen and a heavy stomach feeling." },
        { name: "H. pylori-related conditions", note: "Can be an underlying cause of chronic gastritis or stomach ulcers." },
      ],
      relatedTests: ["Blood test", "Transnasal endoscopy (gastroscopy)"],
      treatmentOverview: [
        "Treatment is often centered on medications that suppress stomach acid.",
        "If H. pylori infection is confirmed, eradication treatment may be considered.",
        "If symptoms persist, a closer look with a gastroscope may be considered.",
      ],
      whenToVisit: [
        "Please consider coming in if over-the-counter medication doesn't help or symptoms keep recurring.",
        "If you have any of the urgent symptoms above (chest pain, cold sweats, radiating pain, etc.), please don't wait — call emergency services right away.",
      ],
    },
  },
  {
    slug: "bowel-changes",
    title: "便通異常（下痢・便秘・血便）",
    category: "internal",
    summary: "下痢・便秘・血便など便通の変化について",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "こんな場合は受診をおすすめします",
      points: [
        "血便がある（「痔だと思っていても」自己判断せず一度ご相談ください）",
        "体重減少を伴う便通の変化がある",
      ],
      action: "大腸疾患などの除外のため、上記に当てはまる場合は受診をご検討ください。",
    },
    possibleCauses: [
      { name: "感染性腸炎", note: "急な下痢・腹痛・発熱を伴うことが多いです。" },
      { name: "過敏性腸症候群", note: "ストレスなどに関連して下痢・便秘を繰り返すことがあります。" },
      { name: "痔", note: "排便時の出血・痛みの原因となることが多いですが、血便がある場合は自己判断せず受診をおすすめします。" },
      { name: "虚血性腸炎", note: "急な腹痛に続く下痢・血便として現れることがあり、便秘気味の中高年の方に多いとされています。" },
      { name: "大腸疾患", note: "便通の変化が続く場合、大腸の疾患が背景にあることがあり、精査が必要になる場合があります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.echo],
    treatmentOverview: [
      "原因に応じて整腸薬・止痢薬などの対症療法を行うことが多いです。",
      "血便や体重減少を伴う場合など、精査が必要と判断した場合は専門医療機関（内視鏡検査可能な施設等）へ紹介することがあります。",
    ],
    whenToVisit: [
      "一時的な下痢・便秘で改善傾向がある場合は、自宅で様子を見ていただくことも可能です。",
      "血便がある場合、体重減少を伴う場合、症状が長引く場合は「痔だと思っていても」自己判断せず受診してください。",
    ],
    en: {
      title: "Changes in bowel habits (diarrhea, constipation, blood in stool)",
      summary: "For diarrhea, constipation, blood in stool, and other changes in bowel movements",
      emergencyBox: {
        heading: "Please consider coming in if any of these apply",
        points: [
          "You have blood in your stool (please don't assume it's hemorrhoids — come talk to us)",
          "A change in bowel habits is accompanied by weight loss",
        ],
        action: "To rule out conditions such as colorectal disease, please consider coming in if any of the above apply.",
      },
      possibleCauses: [
        { name: "Infectious enteritis", note: "Often involves sudden diarrhea, abdominal pain, and fever." },
        { name: "Irritable bowel syndrome", note: "Can cause recurring diarrhea or constipation, often related to stress." },
        { name: "Hemorrhoids", note: "A common cause of bleeding and pain during bowel movements — but if there's blood in your stool, please don't assume it's hemorrhoids and come in instead." },
        { name: "Ischemic colitis", note: "Can present as diarrhea or bloody stool following sudden abdominal pain; more common in middle-aged and older adults prone to constipation." },
        { name: "Colorectal conditions", note: "If a change in bowel habits continues, a colorectal condition may be an underlying cause, and further evaluation may be needed." },
      ],
      relatedTests: ["Blood test", "Abdominal ultrasound"],
      treatmentOverview: [
        "Depending on the cause, we often use medication to regulate bowel function or control diarrhea.",
        "If blood in the stool or weight loss is involved, or we judge closer evaluation is needed, we may refer you to a specialized institution (one capable of endoscopy, etc.).",
      ],
      whenToVisit: [
        "If diarrhea or constipation is temporary and trending toward improvement, it's also fine to rest and watch at home.",
        "If there's blood in your stool, weight loss, or symptoms that drag on, please don't assume it's \"just hemorrhoids\" — come talk to us.",
      ],
    },
  },
  {
    slug: "checkup-lifestyle-disease",
    title: "健診異常・生活習慣病",
    category: "internal",
    summary: "健診での指摘事項、高血圧・脂質異常症・糖尿病について",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "高血圧", note: "自覚症状がないまま健診で指摘されることが多いです。" },
      { name: "脂質異常症", note: "コレステロール・中性脂肪の異常として健診で指摘されることが多いです。" },
      { name: "糖尿病", note: "血糖値・HbA1c（過去1〜2か月間の血糖値の平均を反映する指標）の異常として健診で指摘されることが多いです。" },
      { name: "高尿酸血症", note: "尿酸値の異常として健診で指摘されることが多く、放置すると痛風発作を起こすことがあります。" },
      { name: "脂肪肝（NAFLD/NASH）", note: "肝機能（AST・ALT・γ-GTP）の異常やエコーでの指摘で見つかることが多く、自覚症状はほとんどありません。" },
      { name: "慢性腎臓病（CKD）", note: "尿たんぱくやクレアチニン・eGFRの異常として健診で指摘されることが多く、自覚症状がないまま進行することがあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.urine, AVAILABLE_TESTS.ecg],
    treatmentOverview: [
      "生活習慣の見直し（食事・運動・睡眠等）を基本としながら、必要に応じて薬物治療を検討することが多いです。",
      "長期的な管理が必要な疾患であるため、定期的な通院・検査での経過観察を行うことが一般的です。",
    ],
    whenToVisit: [
      "健診で数値の異常を指摘された場合は、症状がなくても一度ご相談いただくことをおすすめします。",
    ],
    en: {
      title: "Checkup abnormalities / lifestyle-related conditions",
      summary: "For findings flagged at a checkup, and high blood pressure, dyslipidemia, or diabetes",
      possibleCauses: [
        { name: "High blood pressure", note: "Often flagged at a checkup with no noticeable symptoms." },
        { name: "Dyslipidemia", note: "Often flagged at a checkup as abnormal cholesterol or triglyceride levels." },
        { name: "Diabetes", note: "Often flagged at a checkup as abnormal blood sugar or HbA1c (a marker reflecting your average blood sugar over the past 1–2 months)." },
        { name: "Hyperuricemia", note: "Often flagged at a checkup as an abnormal uric acid level; left untreated, it can lead to gout attacks." },
        { name: "Fatty liver disease (NAFLD/NASH)", note: "Often found through abnormal liver function values (AST, ALT, γ-GTP) or on ultrasound, usually with no noticeable symptoms." },
        { name: "Chronic kidney disease (CKD)", note: "Often flagged at a checkup as protein in the urine or abnormal creatinine/eGFR values, and can progress without symptoms." },
      ],
      relatedTests: ["Blood test", "Urine test", "ECG"],
      treatmentOverview: [
        "Treatment is generally built around lifestyle changes (diet, exercise, sleep, etc.), with medication considered as needed.",
        "Since these are conditions that need long-term management, regular visits and testing to monitor your progress are standard.",
      ],
      whenToVisit: [
        "If a checkup flagged an abnormal number, we recommend coming in for a consultation even without symptoms.",
      ],
    },
  },
  {
    slug: "neck-swelling-fatigue",
    title: "首の腫れ・だるさ",
    category: "internal",
    summary: "首の腫れ・全身のだるさについて",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "甲状腺疾患", note: "首の腫れ・だるさ・動悸・体重の変化などを伴うことがある疾患の可能性があります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.echo],
    treatmentOverview: [
      "血液検査・エコー検査の結果に応じて、経過観察または薬物治療を検討することが多いです。",
      "専門的な精査・治療が必要と判断した場合は、専門医療機関へ紹介することがあります。",
    ],
    whenToVisit: [
      "首の腫れに気づいた場合、だるさが長く続く場合は受診をご検討ください。",
    ],
    en: {
      title: "Neck swelling / fatigue",
      summary: "For swelling in the neck and whole-body fatigue",
      possibleCauses: [
        { name: "Thyroid conditions", note: "A possible cause of neck swelling, fatigue, palpitations, and weight changes." },
      ],
      relatedTests: ["Blood test", "Abdominal ultrasound"],
      treatmentOverview: [
        "Depending on blood test and ultrasound results, we often consider monitoring or medication.",
        "If specialized evaluation or treatment is needed, we may refer you to a specialized institution.",
      ],
      whenToVisit: [
        "Please consider coming in if you notice swelling in your neck, or if fatigue continues for a long time.",
      ],
    },
  },
  {
    slug: "allergy-rhinitis-itching",
    title: "鼻炎・くしゃみ・皮膚のかゆみ",
    category: "internal",
    summary: "花粉症・蕁麻疹・アレルギー性鼻炎などについて",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "花粉症（季節性アレルギー性鼻炎）", note: "特定の季節にくしゃみ・鼻水・目のかゆみを伴うことが多いです。" },
      { name: "蕁麻疹", note: "皮膚のかゆみを伴う膨疹（ふくらみ）として現れることが多いです。" },
      { name: "アレルギー性鼻炎", note: "特定の原因物質（ハウスダスト等）に反応して症状が出ることが多いです。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "抗アレルギー薬・点鼻薬・抗ヒスタミン薬などによる対症療法が中心になることが多いです。",
      "花粉症については、保険診療での治療のほか、自費診療（ステロイド注射）を選択肢としてご案内することもあります。",
    ],
    whenToVisit: [
      "症状が生活に支障をきたす場合や、市販薬で改善しない場合は受診をご検討ください。",
    ],
    en: {
      title: "Rhinitis, sneezing, and itchy skin",
      summary: "For hay fever, hives, allergic rhinitis, and similar conditions",
      possibleCauses: [
        { name: "Hay fever (seasonal allergic rhinitis)", note: "Often involves sneezing, a runny nose, and itchy eyes during a particular season." },
        { name: "Hives", note: "Often appears as itchy welts (raised patches) on the skin." },
        { name: "Allergic rhinitis", note: "Symptoms often triggered by a specific allergen, such as house dust." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "Treatment is often centered on medication to manage symptoms — antiallergy drugs, nasal sprays, antihistamines, and the like.",
        "For hay fever, in addition to standard insurance-covered treatment, we may also introduce a self-pay option (a steroid injection).",
      ],
      whenToVisit: [
        "Please consider coming in if symptoms interfere with daily life, or over-the-counter medication isn't helping.",
      ],
    },
  },
  {
    slug: "snoring-daytime-sleepiness",
    title: "いびき・日中の眠気",
    category: "internal",
    summary: "いびき・日中の強い眠気について",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "睡眠時無呼吸症候群", note: "睡眠中の無呼吸・大きないびきに伴い、日中の眠気が強く出ることがある疾患の可能性があります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "検査の結果や重症度に応じて、生活習慣の見直しや専門的な検査・治療（CPAP療法＝就寝時に鼻や口に装着したマスクから空気を送り、気道の閉塞を防ぐ治療、等）が必要と判断されることがあります。",
      "専門的な検査・治療が必要な場合は、睡眠時無呼吸症候群の精査が可能な医療機関へ紹介することがあります。",
    ],
    whenToVisit: [
      "ご家族からいびき・無呼吸を指摘された場合や、日中の眠気で日常生活に支障がある場合は受診をご検討ください。",
    ],
    en: {
      title: "Snoring / daytime sleepiness",
      summary: "For snoring and strong daytime sleepiness",
      possibleCauses: [
        { name: "Sleep apnea syndrome", note: "A possible underlying condition when strong daytime sleepiness comes with pauses in breathing or loud snoring during sleep." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "Depending on test results and severity, we may determine that lifestyle changes or specialized testing and treatment (such as CPAP therapy — sending air through a mask worn over the nose or mouth during sleep to keep the airway open) are needed.",
        "If specialized testing or treatment is needed, we may refer you to an institution that can evaluate sleep apnea in detail.",
      ],
      whenToVisit: [
        "Please consider coming in if family members have pointed out your snoring or breathing pauses, or if daytime sleepiness is interfering with daily life.",
      ],
    },
  },
  {
    slug: "palpitations-shortness-of-breath",
    title: "動悸・息切れ",
    category: "internal",
    summary: "動悸・息切れについて（循環器系の評価が必要となることがある症状です）",
  lastReviewed: "2026-09-15",
    showChestPainBanner: true,
    emergencyBox: {
      heading: "こんな場合は様子を見ず直ちに救急要請してください",
      points: [
        "動悸に加えて、意識が遠くなる・失神を伴う",
        "動悸とともに胸痛を伴う",
        "強い息苦しさを伴う",
      ],
      action: "上記は循環器の救急疾患の可能性があるため、今すぐ救急要請（119番）してください。",
      strong: true,
    },
    possibleCauses: [
      { name: "不整脈など循環器疾患", note: "動悸・息切れの背景に心臓の疾患が隠れていることがあり、内科的な除外が必要になる症状です。" },
      { name: "貧血", note: "血液検査で貧血が確認され、動悸・息切れの原因となっていることがあります。" },
      { name: "甲状腺機能の異常", note: "動悸を伴うことがある疾患のひとつです。" },
      { name: "自律神経の乱れ", note: "ストレスや生活習慣の乱れ等により、他の疾患が除外された場合に考えられることがあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.ecg, AVAILABLE_TESTS.xray],
    treatmentOverview: [
      "まずは心電図・血液検査等で心臓や貧血・甲状腺機能などの評価を行うことが多いです。",
      "専門的な検査・治療（ホルター心電図＝携帯型の機器を装着し、日常生活中の心電図を長時間記録する検査、心臓超音波検査等）が必要と判断した場合は、循環器専門の医療機関へ紹介することがあります。",
    ],
    whenToVisit: [
      "動悸・息切れが繰り返す場合、階段や坂道で強く息切れするようになった場合は受診をご検討ください。",
      "失神・胸痛を伴う場合は様子を見ず直ちに救急要請してください。",
    ],
    en: {
      title: "Palpitations / shortness of breath",
      summary: "For palpitations and shortness of breath (symptoms that may call for a cardiovascular evaluation)",
      emergencyBox: {
        heading: "Please don't wait — call emergency services right away if any of these apply",
        points: [
          "Palpitations along with fainting or feeling faint",
          "Palpitations along with chest pain",
          "Severe shortness of breath",
        ],
        action: "These may signal a cardiovascular emergency — call emergency services (119) right away.",
        strong: true,
      },
      possibleCauses: [
        { name: "Arrhythmia and other cardiovascular conditions", note: "A heart condition may be behind palpitations or shortness of breath, and ruling this out through an internal medicine evaluation is important." },
        { name: "Anemia", note: "Confirmed with a blood test; anemia can be the cause of palpitations and shortness of breath." },
        { name: "Thyroid dysfunction", note: "One of the conditions that can come with palpitations." },
        { name: "Autonomic dysregulation", note: "May be considered once other conditions, such as stress or lifestyle irregularities, have been ruled out." },
      ],
      relatedTests: ["Blood test", "ECG", "Digital X-ray"],
      treatmentOverview: [
        "We usually start by evaluating the heart, anemia, and thyroid function with an ECG, blood tests, and the like.",
        "If specialized testing or treatment is needed (such as Holter ECG monitoring — a portable device that records your heart rhythm over an extended period during daily life — or cardiac ultrasound), we may refer you to a cardiovascular specialist.",
      ],
      whenToVisit: [
        "Please consider coming in if palpitations or shortness of breath recur, or if you've become noticeably short of breath on stairs or slopes.",
        "If fainting or chest pain is involved, please don't wait — call emergency services right away.",
      ],
    },
  },
  {
    slug: "dizziness",
    title: "めまい",
    category: "internal",
    summary: "回転性のめまい・ふらつきについて",
    lastReviewed: "2026-10-12",
    emergencyBox: {
      heading: "こんな場合は様子を見ず直ちに救急要請してください",
      points: [
        "手足の麻痺・しびれ、ろれつが回らない、言葉が出にくい",
        "物が二重に見える、視野が欠ける",
        "歩行時に体が一方向に強く傾く、まっすぐ歩けない",
        "突然の激しい頭痛を伴う",
      ],
      action: "上記は脳卒中等、中枢性めまいの可能性があるため、今すぐ救急要請（119番）してください。",
      strong: true,
    },
    possibleCauses: [
      { name: "良性発作性頭位めまい症（BPPV）", note: "頭の位置を変えたときに数秒〜数十秒の回転性めまいが起こる、めまいの原因の中で最も頻度の高い病気です。" },
      { name: "メニエール病", note: "難聴・耳鳴り・耳閉感を伴う回転性めまいを繰り返す場合に疑われます。" },
      { name: "起立性低血圧", note: "立ち上がったときに血圧が大きく下がり、ふらつきが現れることがあります。" },
      { name: "迷走神経反射（血管迷走神経性失神）", note: "強い痛み・恐怖・長時間の起立等をきっかけに、ふらつきや一時的な意識消失（失神）が起こることがあります。" },
      { name: "自律神経の乱れ", note: "他の原因が除外された場合に、ふらつきの背景として考えられることがあります。" },
      { name: "脳卒中等の中枢性めまい", note: "手足の麻痺やろれつが回らない等を伴う場合に疑われる、緊急性の高い原因です。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.ecg],
    treatmentOverview: [
      "問診・頭位変換検査等で原因を見極め、BPPVが疑われる場合は耳石を戻す理学療法（めまい体操）を行うことが多いです。",
      "メニエール病等が疑われる場合は、聴力検査等を踏まえて薬物治療を検討します。",
      "危険な兆候を伴う場合は、画像検査が可能な医療機関へ速やかにご紹介します。",
    ],
    whenToVisit: [
      "めまいを繰り返す場合、日常生活に支障がある場合は受診をご検討ください。",
      "手足の麻痺・しびれ、ろれつが回らない等を伴う場合は様子を見ず直ちに救急要請してください。",
    ],
    en: {
      title: "Dizziness",
      summary: "For spinning (vertigo-type) dizziness and lightheadedness",
      emergencyBox: {
        heading: "Please don't wait — call emergency services right away if any of these apply",
        points: [
          "Weakness or numbness in a limb, slurred speech, or trouble finding words",
          "Double vision or a loss of part of your visual field",
          "Your body strongly tilts to one side while walking, or you can't walk straight",
          "A sudden, severe headache",
        ],
        action: "These may signal central (brain-related) dizziness such as stroke — call emergency services (119) right away.",
        strong: true,
      },
      possibleCauses: [
        { name: "Benign paroxysmal positional vertigo (BPPV)", note: "The most common cause of dizziness — spinning vertigo lasting seconds to tens of seconds, triggered by a change in head position." },
        { name: "Ménière's disease", note: "Suspected when spinning vertigo recurs along with hearing loss, tinnitus, or a feeling of ear fullness." },
        { name: "Orthostatic hypotension", note: "A sharp drop in blood pressure on standing can cause lightheadedness." },
        { name: "Vasovagal reflex (vasovagal syncope)", note: "Lightheadedness or a brief loss of consciousness (fainting) can be triggered by intense pain, fear, or prolonged standing." },
        { name: "Autonomic dysregulation", note: "May be considered as an underlying factor in lightheadedness once other causes have been ruled out." },
        { name: "Central dizziness from stroke and similar conditions", note: "An urgent cause suspected when accompanied by limb weakness or slurred speech." },
      ],
      relatedTests: ["Blood test", "ECG"],
      treatmentOverview: [
        "We identify the cause through history-taking and positional testing; if BPPV is suspected, physical therapy to reposition the inner-ear crystals (vertigo exercises) is often used.",
        "If Ménière's disease or similar conditions are suspected, we consider medication based on hearing tests and other findings.",
        "If dangerous warning signs are present, we promptly refer you to an institution capable of imaging studies.",
      ],
      whenToVisit: [
        "Please consider coming in if dizziness recurs or interferes with daily life.",
        "If accompanied by limb weakness, numbness, or slurred speech, please don't wait — call emergency services right away.",
      ],
    },
  },
  {
    slug: "numbness",
    title: "手足のしびれ",
    category: "internal",
    summary: "手足のしびれ・感覚の異常について。高齢の方に多く、原因によって対応が大きく異なります。",
    lastReviewed: "2026-10-13",
    emergencyBox: {
      heading: "こんな場合は様子を見ず直ちに救急要請してください",
      points: [
        "片側の手足に急に力が入らなくなった、しびれが出た",
        "顔の片側が下がる、うまく笑えない",
        "ろれつが回らない、言葉が出てこない・理解できない",
        "普段と違う、突然の激しい頭痛を伴う",
      ],
      action: "上記は脳卒中（脳梗塞・脳出血）のサインである可能性があります。症状が一時的に治まっても軽視せず、今すぐ救急要請（119番）してください。症状が始まった時刻（最後に普段通りだった時刻）を覚えておくことも重要です。",
      strong: true,
    },
    possibleCauses: [
      { name: "脳卒中・一過性脳虚血発作（TIA）", note: "片側の手足や顔のしびれ・脱力が急に起こる場合に疑われる、緊急性の高い原因です。症状が短時間で治まっても、将来の脳梗塞のサインであることがあります。" },
      { name: "腰部脊柱管狭窄症", note: "高齢の方に多く、しばらく歩くと足がしびれて、少し休むと楽になる（間欠性跛行）のが特徴的です。" },
      { name: "頸椎症（頸椎の変形による神経の圧迫）", note: "首から肩・腕にかけてのしびれとして現れることがあります。" },
      { name: "糖尿病性神経障害", note: "糖尿病の合併症として、両足の先から左右対称性のしびれ・感覚低下が起こることがあります。" },
      { name: "手根管症候群", note: "手首の神経が圧迫されることで、親指〜薬指にかけてのしびれが起こり、明け方に症状が強いことがあります。" },
      { name: "末梢動脈疾患（閉塞性動脈硬化症）", note: "足の血流が悪くなることで、しびれ・冷感・歩行時の痛みが起こることがあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.ecg],
    treatmentOverview: [
      "まず、脳卒中等の緊急性の高い原因がないかを問診・診察で見極めることを最優先します。",
      "血液検査で糖尿病・ビタミン不足等の全身的な原因を確認し、原因に応じた治療（血糖コントロール等）を検討します。",
      "腰部脊柱管狭窄症・頸椎症等が疑われる場合は、画像検査（MRI等）が可能な整形外科・脊椎専門の医療機関と連携します。",
    ],
    whenToVisit: [
      "しびれが続く場合、徐々に悪化する場合、歩ける距離が短くなってきた場合は受診をご検討ください。",
      "片側の急なしびれ・脱力、顔のゆがみ、ろれつが回らない等がある場合は、様子を見ず直ちに救急要請してください。",
    ],
    en: {
      title: "Numbness in the hands or feet",
      summary: "For numbness and abnormal sensation in the hands or feet. More common in older adults, with very different care depending on the cause.",
      emergencyBox: {
        heading: "Please don't wait — call emergency services right away if any of these apply",
        points: [
          "Sudden weakness or numbness on one side of the body",
          "One side of the face droops, or you can't smile normally",
          "Slurred speech, or trouble speaking or understanding",
          "A sudden, severe headache unlike any you've had before",
        ],
        action: "These may be signs of a stroke (cerebral infarction or hemorrhage). Even if symptoms temporarily ease, don't dismiss them — call emergency services (119) right away. It also helps to note the time symptoms started (the last time you felt normal).",
        strong: true,
      },
      possibleCauses: [
        { name: "Stroke / transient ischemic attack (TIA)", note: "An urgent cause suspected when numbness or weakness suddenly appears on one side of the body or face. Even if it resolves quickly, it can be a warning sign of a future stroke." },
        { name: "Lumbar spinal stenosis", note: "Common in older adults; characterized by numbness in the legs after walking for a while that eases with a short rest (intermittent claudication)." },
        { name: "Cervical spondylosis (nerve compression from changes in the cervical spine)", note: "Can appear as numbness from the neck through the shoulder and arm." },
        { name: "Diabetic neuropathy", note: "A complication of diabetes that can cause symmetric numbness and reduced sensation starting at the tips of both feet." },
        { name: "Carpal tunnel syndrome", note: "Compression of a nerve at the wrist causes numbness from the thumb to the ring finger, often worse in the early morning." },
        { name: "Peripheral artery disease (arteriosclerosis obliterans)", note: "Reduced blood flow to the legs can cause numbness, a cold sensation, and pain while walking." },
      ],
      relatedTests: ["Blood test", "ECG"],
      treatmentOverview: [
        "Our first priority is always ruling out urgent causes like stroke through history-taking and examination.",
        "We check for systemic causes such as diabetes or vitamin deficiency with a blood test, and consider treatment accordingly (blood sugar control, etc.).",
        "If lumbar spinal stenosis or cervical spondylosis is suspected, we coordinate with an orthopedic or spine specialist capable of imaging (MRI, etc.).",
      ],
      whenToVisit: [
        "Please consider coming in if numbness persists, gradually worsens, or the distance you can walk is shrinking.",
        "If you have sudden numbness or weakness on one side, facial drooping, or slurred speech, please don't wait — call emergency services right away.",
      ],
    },
  },
  {
    slug: "headache",
    title: "頭痛",
    category: "internal",
    summary: "繰り返す頭痛・急な激しい頭痛について",
    lastReviewed: "2026-10-12",
    emergencyBox: {
      heading: "こんな場合は様子を見ず直ちに救急要請してください",
      points: [
        "今まで経験したことのない、突然の激しい頭痛",
        "発熱・首の硬さ・意識がはっきりしないことを伴う",
        "手足の麻痺・しびれ、ろれつが回らないことを伴う",
        "頭をぶつけた後に生じた頭痛",
      ],
      action: "上記はくも膜下出血等、緊急性の高い病気の可能性があるため、今すぐ救急要請（119番）してください。",
      strong: true,
    },
    possibleCauses: [
      { name: "片頭痛", note: "ズキンズキンと脈打つような痛みが片側に起こり、吐き気や光・音過敏を伴うことが多い頭痛です。" },
      { name: "緊張型頭痛", note: "頭全体を締め付けられるような痛みが特徴で、頭痛の中で最も頻度の高いもののひとつです。" },
      { name: "群発頭痛", note: "片側の目の奥に激しい痛みが、一定期間（群発期）繰り返し起こる頭痛です。" },
      { name: "くも膜下出血・髄膜炎等", note: "突然の激しい頭痛・発熱・意識障害等を伴う場合に疑われる、緊急性の高い原因です。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "問診で頭痛の性質を詳しく伺い、片頭痛・緊張型頭痛・群発頭痛等のタイプに応じた薬物治療を検討します。",
      "危険な兆候がある場合は、画像検査（CT・MRI等）が可能な医療機関へ速やかにご紹介します。",
    ],
    whenToVisit: [
      "頭痛を繰り返す場合、市販薬が効きにくくなってきた場合は受診をご検討ください。",
      "突然の激しい頭痛、発熱や麻痺を伴う頭痛は様子を見ず直ちに救急要請してください。",
    ],
    en: {
      title: "Headache",
      summary: "For recurring headaches and sudden, severe headaches",
      emergencyBox: {
        heading: "Please don't wait — call emergency services right away if any of these apply",
        points: [
          "A sudden, severe headache unlike anything you've experienced before",
          "Accompanied by fever, neck stiffness, or clouded consciousness",
          "Accompanied by limb weakness, numbness, or slurred speech",
          "A headache that started after hitting your head",
        ],
        action: "These may signal an urgent condition such as subarachnoid hemorrhage — call emergency services (119) right away.",
        strong: true,
      },
      possibleCauses: [
        { name: "Migraine", note: "A throbbing, pulsing headache usually on one side, often with nausea and sensitivity to light or sound." },
        { name: "Tension-type headache", note: "Characterized by a tight, pressing sensation across the whole head — one of the most common types of headache." },
        { name: "Cluster headache", note: "Severe pain behind one eye that recurs repeatedly over a set period (a cluster period)." },
        { name: "Subarachnoid hemorrhage, meningitis, and similar conditions", note: "Urgent causes suspected when a sudden, severe headache comes with fever or altered consciousness." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "We ask in detail about the nature of your headache and consider medication suited to the type — migraine, tension-type, cluster, and so on.",
        "If dangerous warning signs are present, we promptly refer you to an institution capable of imaging (CT, MRI, etc.).",
      ],
      whenToVisit: [
        "Please consider coming in if headaches recur, or over-the-counter medication is becoming less effective.",
        "For a sudden, severe headache, or one with fever or weakness, please don't wait — call emergency services right away.",
      ],
    },
  },

  // ==================== 外科系 ====================
  {
    slug: "wounds-burns",
    title: "きず・やけど",
    category: "surgical",
    summary: "きず・やけどの処置について",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "創傷（切り傷・すり傷等）", note: "程度に応じて洗浄・縫合等の処置が必要になることがあります。" },
      { name: "熱傷（やけど）", note: "範囲・深さによって処置の方法が異なることが多いです。" },
    ],
    relatedTests: [],
    treatmentOverview: [
      "外科専門医（消化器外科専門医）による創傷処置・熱傷処置を行っています。",
      "程度に応じて洗浄・消毒・縫合・被覆材の選択などを行うことが多いです。",
      "重症度によっては、より専門的な医療機関（形成外科等）への紹介を検討することがあります。",
    ],
    whenToVisit: [
      "出血が止まらない、範囲が広い、深いやけどの場合は早めに受診してください。",
      "軽い傷・やけどでも、化膿の兆候（腫れ・熱感・膿）がある場合は受診をご検討ください。",
    ],
    en: {
      title: "Wounds & burns",
      summary: "For treatment of wounds and burns",
      possibleCauses: [
        { name: "Wounds (cuts, scrapes, etc.)", note: "Depending on severity, may require cleaning, suturing, or other treatment." },
        { name: "Burns", note: "The treatment approach often differs depending on the area and depth." },
      ],
      relatedTests: [],
      treatmentOverview: [
        "Wound and burn care is provided by our surgical specialist (board-certified in gastrointestinal surgery).",
        "Depending on severity, we often clean, disinfect, suture, and choose an appropriate dressing.",
        "For more severe cases, we may consider referral to a more specialized institution (such as plastic surgery).",
      ],
      whenToVisit: [
        "Please come in soon if bleeding won't stop, the area is large, or the burn is deep.",
        "Even for a minor wound or burn, please consider coming in if there are signs of infection (swelling, warmth, pus).",
      ],
    },
  },
  {
    slug: "lumps-and-bumps",
    title: "できもの・しこり",
    category: "surgical",
    summary: "できもの・しこりについて",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "こんな場合は早めに受診してください",
      points: [
        "急速に大きくなっている",
        "痛みを伴う",
        "発赤・発熱を伴う",
      ],
      action: "多くは良性ですが、急速な増大・硬さ・皮膚の変化がある場合は精査が必要です。上記に当てはまる場合は早めに受診してください。",
    },
    possibleCauses: [
      { name: "粉瘤", note: "皮膚の下にできる良性のできものであることが多いです。" },
      { name: "脂肪腫", note: "皮下の脂肪組織にできる良性のしこりであることが多いです。" },
    ],
    relatedTests: [AVAILABLE_TESTS.echo],
    treatmentOverview: [
      "多くは良性ですが、必要に応じてエコー検査等で性状を確認することがあります。",
      "外科専門医による日帰りでの小手術（切除）に対応できることが多いです。",
      "急速な増大・硬さ・皮膚の変化を伴う場合など、悪性の可能性が否定できない場合は、より詳しい検査が可能な医療機関へ紹介することがあります。",
    ],
    whenToVisit: [
      "しこり・できものに気づいた場合は、症状がなくても一度ご相談いただくことをおすすめします。",
      "急速な増大・痛み・発赤・発熱を伴う場合は早めに受診してください。",
    ],
    en: {
      title: "Lumps & bumps",
      summary: "For lumps and bumps on or under the skin",
      emergencyBox: {
        heading: "Please come in soon if any of these apply",
        points: [
          "It's growing rapidly",
          "It's painful",
          "There's redness or fever",
        ],
        action: "Most are benign, but a rapidly growing, hard lump, or one with changes in the overlying skin, needs closer evaluation. Please come in soon if any of the above apply.",
      },
      possibleCauses: [
        { name: "Epidermoid cyst (atheroma)", note: "Often a benign growth under the skin." },
        { name: "Lipoma", note: "Often a benign lump in the fatty tissue under the skin." },
      ],
      relatedTests: ["Abdominal ultrasound"],
      treatmentOverview: [
        "Most are benign, but we may check the characteristics with ultrasound or similar tests as needed.",
        "Our surgical specialist can often perform same-day minor surgery (removal).",
        "If a malignancy can't be ruled out — rapid growth, hardness, or changes in the overlying skin — we may refer you to an institution for more detailed testing.",
      ],
      whenToVisit: [
        "If you notice a lump or growth, we recommend a consultation even without symptoms.",
        "Please come in soon if it's growing rapidly, or accompanied by pain, redness, or fever.",
      ],
    },
  },
  {
    slug: "skin-redness-swelling",
    title: "皮膚の赤み・腫れ・熱感",
    category: "surgical",
    summary: "足や手の皮膚が赤く腫れて熱を持ち、範囲が広がってきた場合について",
    lastReviewed: "2026-10-14",
    emergencyBox: {
      heading: "こんな場合は様子を見ず早めに受診してください",
      points: [
        "赤み・腫れの範囲がじわじわ広がっている",
        "発熱や倦怠感を伴う",
        "糖尿病等の持病がある",
      ],
      action: "範囲が急速に広がる、発熱を伴う等の場合は、蜂窩織炎等の感染症の可能性があり、様子を見過ぎずに早めにご相談ください。",
    },
    possibleCauses: [
      { name: "蕁麻疹", note: "強いかゆみを伴う赤み・膨らみが突然現れ、多くは数時間〜1日程度で跡を残さず消えるのが特徴です。熱感や発熱を伴わないことが多く、感染症とは区別されます。" },
      { name: "蜂窩織炎", note: "皮膚の傷や水虫（足白癬）等から細菌が入り、赤み・腫れ・熱感が広がる感染症です。" },
      { name: "とびひ（伝染性膿痂疹）", note: "虫刺され等をかいた傷から細菌感染が広がることがあります。主にお子さんに多い病気です。" },
      { name: "帯状疱疹", note: "体の片側に帯状の赤み・水疱と神経の痛みを伴う場合に考えられます。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "皮疹の広がり方・範囲を診察で評価し、必要に応じて血液検査で炎症反応を確認します。",
      "原因に応じた抗菌薬治療・抗ウイルス薬治療を行います。",
      "範囲が広い、発熱が強い等の場合は、点滴治療や入院治療が可能な医療機関と連携することがあります。",
    ],
    whenToVisit: [
      "赤み・腫れの範囲が急速に広がる、発熱を伴う場合は早めに受診してください。",
      "軽い症状でも、繰り返す・なかなか治らない場合はご相談ください。",
    ],
    en: {
      title: "Skin redness, swelling, and warmth",
      summary: "For red, swollen, warm skin on the hands or feet that's spreading",
      emergencyBox: {
        heading: "Please come in soon — don't wait if any of these apply",
        points: [
          "The redness or swelling is gradually spreading",
          "Accompanied by fever or fatigue",
          "You have an underlying condition such as diabetes",
        ],
        action: "Rapid spreading or fever may indicate an infection such as cellulitis — please don't wait too long, and come talk to us soon.",
      },
      possibleCauses: [
        { name: "Hives", note: "Sudden, intensely itchy redness or welts that usually disappear within hours to a day, leaving no mark. Usually not accompanied by warmth or fever, which distinguishes it from an infection." },
        { name: "Cellulitis", note: "A bacterial infection, often entering through a skin wound or athlete's foot, that causes spreading redness, swelling, and warmth." },
        { name: "Impetigo", note: "A bacterial infection that can spread from a scratched insect bite or similar wound, mainly affecting children." },
        { name: "Shingles", note: "Suspected with a band of redness and blisters on one side of the body, along with nerve pain." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "We assess how the rash is spreading and its extent on examination, and check inflammatory markers with a blood test as needed.",
        "We provide antibacterial or antiviral treatment depending on the cause.",
        "For widespread involvement or significant fever, we may coordinate with an institution capable of IV treatment or hospitalization.",
      ],
      whenToVisit: [
        "Please come in soon if redness or swelling is spreading rapidly, or accompanied by fever.",
        "Even for mild symptoms, please talk to us if they recur or won't heal.",
      ],
    },
  },
  {
    slug: "itchy-feet-skin-peeling",
    title: "足のかゆみ・皮むけ",
    category: "surgical",
    summary: "足の指の間や裏のかゆみ・皮むけ・水ぶくれについて",
    lastReviewed: "2026-10-14",
    possibleCauses: [
      { name: "足白癬（水虫）", note: "白癬菌というカビの感染で、指の間のじゅくじゅく・皮むけ、足裏の水ぶくれ等を起こします。" },
      { name: "汗疱・接触皮膚炎等", note: "水虫によく似た見た目になることがあり、検査での鑑別が有用です。" },
    ],
    relatedTests: [],
    treatmentOverview: [
      "皮膚の一部を採取し、顕微鏡で白癬菌の有無を確認する検査（直接鏡検）で診断します。",
      "水虫と確認できた場合は、外用抗真菌薬による治療を行います。症状が消えた後も一定期間塗り続けることが重要です。",
      "爪白癬を合併している場合は、内服の抗真菌薬を検討することがあります。",
    ],
    whenToVisit: [
      "市販薬を使ってもかゆみ・皮むけが続く、繰り返す場合はご相談ください。",
      "見た目だけでは湿疹等と区別がつきにくいため、自己判断を続ける前に一度ご相談ください。",
    ],
    en: {
      title: "Itchy feet & skin peeling",
      summary: "For itching, peeling, and blisters between the toes or on the soles",
      possibleCauses: [
        { name: "Athlete's foot (tinea pedis)", note: "A fungal infection causing soggy, peeling skin between the toes and blisters on the soles." },
        { name: "Dyshidrotic eczema, contact dermatitis, and similar conditions", note: "Can closely resemble athlete's foot in appearance; testing is useful to tell them apart." },
      ],
      relatedTests: [],
      treatmentOverview: [
        "We diagnose by taking a skin sample and checking for fungus under a microscope (direct microscopy).",
        "If athlete's foot is confirmed, we treat with a topical antifungal. It's important to keep applying it for a while even after symptoms clear.",
        "If a nail fungal infection is also present, we may consider an oral antifungal medication.",
      ],
      whenToVisit: [
        "Please talk to us if itching or peeling continues or recurs despite over-the-counter treatment.",
        "Since it can be hard to tell apart from eczema and similar conditions by appearance alone, please come in rather than continuing to self-diagnose.",
      ],
    },
  },
  {
    slug: "nail-trouble",
    title: "爪のトラブル",
    category: "surgical",
    summary: "巻き爪・陥入爪などについて",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "巻き爪・陥入爪", note: "爪の変形や食い込みにより、痛み・腫れ・炎症を伴うことが多いです。" },
    ],
    relatedTests: [],
    treatmentOverview: [
      "外科専門医による処置（テーピング、部分抜爪、矯正処置等）を状態に応じて検討することが多いです。",
      "感染を伴う場合は、抗菌薬による治療を併用することがあります。",
    ],
    whenToVisit: [
      "痛みが強い、腫れ・膿がある場合は早めに受診してください。",
    ],
    en: {
      title: "Nail trouble",
      summary: "For ingrown toenails and similar nail conditions",
      possibleCauses: [
        { name: "Ingrown/curved toenails", note: "Deformation or digging-in of the nail often causes pain, swelling, and inflammation." },
      ],
      relatedTests: [],
      treatmentOverview: [
        "Our surgical specialist often considers treatment (taping, partial nail removal, correction, etc.) suited to your condition.",
        "If infection is present, we may add antibacterial treatment.",
      ],
      whenToVisit: [
        "Please come in soon if pain is severe, or there's swelling or pus.",
      ],
    },
  },
  {
    slug: "hemorrhoids",
    title: "お尻の痛み・出血",
    category: "surgical",
    summary: "痔などお尻の痛み・出血について",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "自己判断せずご相談ください",
      points: ["血便・出血がある場合、「痔だと思っていても」自己判断せず一度受診してください"],
      action: "大腸疾患などの可能性を除外するため、出血がある場合は受診をご検討ください。",
    },
    possibleCauses: [
      { name: "痔（いぼ痔・切れ痔等）", note: "排便時の痛み・出血の原因として多いですが、他の疾患の可能性もあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "外用薬・内服薬による対症療法や生活習慣の見直しを行うことが多いです。",
      "症状が強い場合や、痔以外の疾患が疑われる場合は、専門的な検査が可能な医療機関へ紹介することがあります。",
    ],
    whenToVisit: [
      "出血を繰り返す場合、痛みが強い場合は受診をご検討ください。",
      "「痔だと思っていても」自己判断せず、出血がある場合は一度ご相談ください。",
    ],
    en: {
      title: "Pain or bleeding around the anus",
      summary: "For hemorrhoids and other pain or bleeding around the anus",
      emergencyBox: {
        heading: "Please don't self-diagnose — come talk to us",
        points: ["If you have blood in your stool or bleeding, please don't assume it's \"just hemorrhoids\" — come in for a visit"],
        action: "To rule out colorectal conditions, please consider coming in if you have any bleeding.",
      },
      possibleCauses: [
        { name: "Hemorrhoids (external/internal piles, anal fissure, etc.)", note: "A common cause of pain and bleeding during bowel movements, but other conditions are also possible." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "We often manage symptoms with topical or oral medication, along with lifestyle adjustments.",
        "If symptoms are severe, or a condition other than hemorrhoids is suspected, we may refer you to an institution capable of specialized testing.",
      ],
      whenToVisit: [
        "Please consider coming in if bleeding recurs or pain is severe.",
        "Please don't assume it's \"just hemorrhoids\" — if you have any bleeding, come talk to us.",
      ],
    },
  },
  {
    slug: "abdominal-distension-surgical",
    title: "お腹の張り・痛み（外科的な評価が必要な場合）",
    category: "surgical",
    summary: "外科的な判断が必要となることがあるお腹の張り・痛みについて",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "こんな場合は様子を見ず救急要請・救急外来を受診してください",
      points: [
        "突然発症した激しい痛み",
        "持続する嘔吐",
        "血便・黒色便がある",
        "お腹が板のように硬い（腹膜刺激症状）",
      ],
      action: "上記に当てはまる場合は、様子を見ずに救急要請または救急外来の受診をおすすめします。",
    },
    possibleCauses: [
      { name: "虫垂炎", note: "外科的な処置が必要になることがある疾患の可能性があります。" },
      { name: "腸閉塞など腸の疾患", note: "お腹の張り・痛み・嘔吐を伴うことがあります。" },
      { name: "胆石症", note: "右上腹部の痛みとして現れることがあります。" },
      { name: "胆嚢炎", note: "胆石症が進行し、胆のうに炎症を起こした状態です。発熱を伴うことがあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.echo, AVAILABLE_TESTS.ct],
    treatmentOverview: [
      "CT・エコー等の画像検査で評価したうえで、外科的な処置が必要かどうかを判断することが多いです。",
      "緊急手術が必要と判断した場合は、高次医療機関へ速やかに紹介します。",
    ],
    whenToVisit: [
      "強い痛みが続く、症状が悪化している場合は速やかに受診してください。",
    ],
    en: {
      title: "Abdominal bloating/pain (when a surgical evaluation may be needed)",
      summary: "For abdominal bloating or pain that may require a surgical judgment call",
      emergencyBox: {
        heading: "Please don't wait — call emergency services or go to the ER if any of these apply",
        points: [
          "Sudden, severe pain",
          "Persistent vomiting",
          "Blood in your stool or black, tarry stool",
          "Your abdomen is rigid, like a board (a sign of peritoneal irritation)",
        ],
        action: "If any of the above apply, please don't wait — call emergency services or go to the ER.",
      },
      possibleCauses: [
        { name: "Appendicitis", note: "A possible condition that may require surgical treatment." },
        { name: "Bowel obstruction and other intestinal conditions", note: "Can involve bloating, pain, and vomiting." },
        { name: "Gallstones", note: "Can appear as upper-right abdominal pain." },
        { name: "Cholecystitis", note: "A state where gallstones have progressed to inflammation of the gallbladder, often with fever." },
      ],
      relatedTests: ["Blood test", "Abdominal ultrasound", "16-row CT"],
      treatmentOverview: [
        "We evaluate with imaging (CT, ultrasound, etc.) and determine whether surgical treatment is needed.",
        "If emergency surgery is judged necessary, we promptly refer you to a higher-level institution.",
      ],
      whenToVisit: [
        "Please come in promptly if severe pain continues or symptoms are worsening.",
      ],
    },
  },
  {
    slug: "bruises-sprains-injuries",
    title: "打撲・捻挫・ケガ",
    category: "surgical",
    summary: "打撲・捻挫などのケガについて",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "打撲", note: "腫れ・内出血を伴うことが多いです。" },
      { name: "捻挫", note: "関節の腫れ・痛みを伴うことが多いです。" },
    ],
    relatedTests: [AVAILABLE_TESTS.xray],
    treatmentOverview: [
      "安静・冷却・圧迫・挙上（RICE処置）などの応急処置に加え、必要に応じてX線検査で骨折の有無を確認することが多いです。",
      "骨折が疑われる場合や、専門的な治療が必要な場合は整形外科への紹介を検討することがあります。",
    ],
    whenToVisit: [
      "強い痛みで体重をかけられない、変形がある場合は早めに受診してください。",
    ],
    en: {
      title: "Bruises, sprains & injuries",
      summary: "For bruises, sprains, and similar injuries",
      possibleCauses: [
        { name: "Bruise", note: "Often involves swelling and internal bleeding (bruising)." },
        { name: "Sprain", note: "Often involves swelling and pain in a joint." },
      ],
      relatedTests: ["Digital X-ray"],
      treatmentOverview: [
        "First aid such as rest, icing, compression, and elevation (RICE), along with an X-ray as needed to check for a fracture.",
        "If a fracture is suspected or specialized treatment is needed, we may consider referral to orthopedics.",
      ],
      whenToVisit: [
        "Please come in soon if the pain is too severe to bear weight, or there's visible deformity.",
      ],
    },
  },

  // ==================== 小児科系 ====================
  {
    slug: "child-fever-cold",
    title: "子どもの急な発熱・かぜ",
    category: "pediatric",
    summary: "お子さんの急な発熱・かぜ症状について",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "こんな場合は様子を見ず救急要請してください",
      points: [
        "生後3ヶ月未満の発熱",
        "けいれんを起こした",
        "ぐったりしていて反応が悪い",
        "水分が摂れない、おしっこが出ない",
      ],
      action: "上記のいずれかに当てはまる場合は、様子を見ずに救急要請してください。",
      strong: true,
    },
    possibleCauses: [
      { name: "かぜ症候群", note: "発熱・鼻水・咳を伴うことが多く、多くは数日で軽快することが多いです。" },
      { name: "インフルエンザなどのウイルス感染症", note: "急な高熱を伴うことが多いです。" },
      { name: "その他の感染症", note: "発熱の原因は多岐にわたるため、経過をみながら判断することが多いです。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "当院は地域のかかりつけとして、日常的な発熱・かぜ症状に対応します。専門的な入院診療・新生児医療は行っていません。",
      "多くは対症療法（解熱剤等）で経過をみることが多いですが、必要時は高次医療機関・小児専門医へ紹介します。",
    ],
    whenToVisit: [
      "軽い発熱で、お子さんの機嫌・水分摂取が保たれている場合は、自宅で様子を見ていただくことも可能です。",
      "上記のレッドフラグサインに当てはまる場合は、様子を見ず救急要請してください。",
      "判断に迷う場合は、遠慮なくご相談ください。",
    ],
    en: {
      title: "A child's sudden fever or cold",
      summary: "For a child's sudden fever or cold symptoms",
      emergencyBox: {
        heading: "Please don't wait — call emergency services if any of these apply",
        points: [
          "A fever in an infant under 3 months old",
          "A seizure occurred",
          "Limp and poorly responsive",
          "Unable to take fluids, or no urination",
        ],
        action: "If any of the above apply, please don't wait — call emergency services.",
        strong: true,
      },
      possibleCauses: [
        { name: "Common cold", note: "Often involves fever, a runny nose, and a cough, and usually improves within a few days." },
        { name: "Influenza and other viral infections", note: "Often involves a sudden high fever." },
        { name: "Other infections", note: "Fever has many possible causes, so we often judge based on how it develops." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "As your family's local clinic, we handle everyday fever and cold symptoms. We don't provide specialized inpatient or newborn care.",
        "We often manage symptoms with medication (fever reducers, etc.), and refer to a higher-level institution or pediatric specialist when needed.",
      ],
      whenToVisit: [
        "If the fever is mild and your child's mood and fluid intake are holding up, it's also fine to rest and watch at home.",
        "If any of the red-flag signs above apply, please don't wait — call emergency services.",
        "If you're unsure, please don't hesitate to reach out.",
      ],
    },
  },
  {
    slug: "child-runny-nose",
    title: "子どもの鼻水・鼻づまり",
    category: "pediatric",
    summary: "発熱を伴わない、お子さんの鼻水・鼻づまりについて",
    lastReviewed: "2026-10-14",
    emergencyBox: {
      heading: "こんな場合は様子を見ず受診してください",
      points: [
        "呼吸が苦しそう、ゼーゼー・ヒューヒューという音がする",
        "哺乳・食事が十分にとれない",
        "鼻水が長引き、黄色や緑色の粘り気のある鼻水が続く",
      ],
      action: "上記に当てはまる場合は、様子を見ずに受診してください。",
    },
    possibleCauses: [
      { name: "かぜ症候群", note: "発熱を伴わないこともあり、鼻水・鼻づまりが主な症状として続くことがあります。" },
      { name: "アレルギー性鼻炎", note: "透明でさらさらした鼻水やくしゃみを繰り返す場合に考えられます。" },
      { name: "副鼻腔炎への移行", note: "鼻水が長引き、黄色や緑色の粘り気のある鼻水が続く場合に考えられます。" },
    ],
    relatedTests: [],
    treatmentOverview: [
      "当院は地域のかかりつけとして、お子さんの日常的な鼻水・鼻づまりに対応します。",
      "鼻の吸引や去痰薬、原因に応じた内服薬・点鼻薬等で症状を和らげます。",
      "長引く場合や副鼻腔炎が疑われる場合は、院内のレントゲン（ウォーターズ法）で副鼻腔の状態を確認することがあります。",
    ],
    whenToVisit: [
      "機嫌や哺乳・食事が保たれている軽い鼻水は、自宅で様子を見ていただくことも可能です。",
      "鼻水が2週間以上続く、呼吸が苦しそう等の場合は受診をご検討ください。",
    ],
    en: {
      title: "A child's runny or stuffy nose",
      summary: "For a child's runny or stuffy nose without fever",
      emergencyBox: {
        heading: "Please come in — don't wait if any of these apply",
        points: [
          "Breathing looks difficult, or you hear a wheezing sound",
          "Not feeding or eating enough",
          "A runny nose that drags on, with thick yellow or green mucus",
        ],
        action: "If any of the above apply, please come in rather than waiting.",
      },
      possibleCauses: [
        { name: "Common cold", note: "May occur without fever, with a runny or stuffy nose as the main ongoing symptom." },
        { name: "Allergic rhinitis", note: "Possible when there's clear, watery nasal discharge or repeated sneezing." },
        { name: "Progression to sinusitis", note: "Possible when nasal discharge drags on and turns thick, yellow, or green." },
      ],
      relatedTests: [],
      treatmentOverview: [
        "As your family's local clinic, we handle your child's everyday runny or stuffy nose.",
        "We ease symptoms with nasal suction, expectorants, and oral medication or nasal sprays suited to the cause.",
        "For symptoms that drag on or when sinusitis is suspected, we may check the sinuses with an in-house X-ray (Waters' view).",
      ],
      whenToVisit: [
        "A mild runny nose, with mood, feeding, and eating holding up, can also be watched at home.",
        "Please consider coming in if nasal discharge continues for more than 2 weeks, or breathing looks difficult.",
      ],
    },
  },
  {
    slug: "child-vomiting-diarrhea",
    title: "子どもの嘔吐・下痢（胃腸炎）",
    category: "pediatric",
    summary: "お子さんの嘔吐・下痢について",
  lastReviewed: "2026-09-15",
    emergencyBox: {
      heading: "こんな場合は様子を見ず受診・救急要請してください",
      points: [
        "ぐったりしていて反応が悪い",
        "水分が摂れず、おしっこが半日以上出ていない",
        "嘔吐・下痢が激しく続く",
        "血便がある",
      ],
      action: "上記に当てはまる場合は、脱水などの可能性があるため様子を見ずに受診・救急要請してください。",
      strong: true,
    },
    possibleCauses: [
      { name: "感染性胃腸炎（ウイルス性・細菌性）", note: "嘔吐・下痢・発熱を伴うことが多く、多くは数日で軽快することが多いです。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "当院は地域のかかりつけとして、日常的な胃腸炎に対応します。専門的な入院診療・新生児医療は行っていません。",
      "水分・電解質補給を中心とした対症療法が基本になることが多く、必要時は高次医療機関・小児専門医へ紹介します。",
    ],
    whenToVisit: [
      "水分が摂れており、機嫌が保たれている場合は自宅で様子を見ていただくことも可能です。",
      "脱水症状（おしっこが出ない、ぐったりしている等）がみられる場合は、様子を見ず受診してください。",
    ],
    en: {
      title: "A child's vomiting & diarrhea (gastroenteritis)",
      summary: "For a child's vomiting and diarrhea",
      emergencyBox: {
        heading: "Please come in or call emergency services — don't wait if any of these apply",
        points: [
          "Limp and poorly responsive",
          "Unable to take fluids, with no urination for half a day or more",
          "Severe, continuing vomiting or diarrhea",
          "Blood in the stool",
        ],
        action: "These may indicate dehydration — please don't wait, come in or call emergency services.",
        strong: true,
      },
      possibleCauses: [
        { name: "Infectious gastroenteritis (viral or bacterial)", note: "Often involves vomiting, diarrhea, and fever, and usually improves within a few days." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "As your family's local clinic, we handle everyday gastroenteritis. We don't provide specialized inpatient or newborn care.",
        "Treatment is usually centered on fluid and electrolyte replacement, and we refer to a higher-level institution or pediatric specialist when needed.",
      ],
      whenToVisit: [
        "If your child is taking fluids and in good spirits, it's also fine to watch at home.",
        "If signs of dehydration appear (no urination, limpness, etc.), please don't wait — come in.",
      ],
    },
  },

  // ==================== 自費診療系 ====================
  {
    slug: "weight-glp1",
    title: "体重が減らない・肥満（GLP-1治療）",
    category: "selfpay",
    summary: "肥満治療（GLP-1受容体作動薬）の自費診療について",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      {
        name: "生活習慣に関連する体重増加",
        note: "食事・運動・睡眠など生活習慣が背景にあることが多いです。GLP-1治療は肥満症・2型糖尿病等の適応を医師が判断したうえで検討する治療であり、単なる痩身目的の治療ではありません。",
      },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "まずは保険診療の範囲で、生活習慣の見直しや、必要に応じた検査（血液検査等）による評価を行います。",
      "その上で選択肢の一つとして、自費診療のGLP-1受容体作動薬による治療をご案内することがあります。",
    ],
    whenToVisit: [
      "健診等で体重・血糖値の異常を指摘された場合は、まず保険診療でのご相談をおすすめします。",
    ],
    selfPay: {
      isSelfPayNote:
        "GLP-1受容体作動薬による治療は自由診療（公的医療保険の適用外・全額自己負担）であり、標準治療として保険診療に代わるものではありません。",
      priceItems: [{ name: "GLP-1受容体作動薬による肥満治療（少量から開始）", price: "月額19,800円〜" }],
      risks:
        "食欲抑制作用があるとされ、血糖値コントロールのサポートも期待されます。消化器症状（吐き気・下痢など）が現れる場合があるほか、まれに急性膵炎・胆嚢炎等の重篤な副作用が報告されているため、強い腹痛がある場合は速やかに受診してください。効果には個人差があり、医師が継続的な体重管理をサポートします。",
      contactNote: "詳しい費用・リスクは、初回診察時に医師よりご説明します。ご不明な点はLINE・お電話（開院後）でお問い合わせください。",
    },
    en: {
      title: "Not losing weight / obesity (GLP-1 treatment)",
      summary: "Self-pay obesity treatment with GLP-1 receptor agonists",
      possibleCauses: [
        {
          name: "Weight gain related to lifestyle",
          note: "Diet, exercise, and sleep habits are often behind it. GLP-1 treatment is something a doctor considers only after judging it's indicated for obesity or type 2 diabetes — it isn't offered simply for cosmetic weight loss.",
        },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "We start within insurance-covered care — reviewing lifestyle habits and evaluating with tests (blood work, etc.) as needed.",
        "From there, self-pay treatment with a GLP-1 receptor agonist may be introduced as one option.",
      ],
      whenToVisit: [
        "If a checkup has flagged abnormal weight or blood sugar, we recommend starting with an insurance-covered consultation.",
      ],
      selfPay: {
        isSelfPayNote:
          "Treatment with a GLP-1 receptor agonist is self-pay care (not covered by public health insurance — paid entirely out of pocket) and is not a substitute for standard insurance-covered treatment.",
        priceItems: [{ name: "GLP-1 weight loss plan (low-dose starter)", price: "From ¥19,800/month" }],
        risks:
          "Thought to suppress appetite, with hoped-for support for blood sugar control as well. Digestive symptoms (nausea, diarrhea, etc.) can occur, and rare but serious side effects such as acute pancreatitis or cholecystitis have been reported — please come in promptly if you have severe abdominal pain. Results vary from person to person, and your doctor will support you with ongoing weight management.",
        contactNote: "We'll explain the detailed costs and risks at your first visit. For questions, please reach out via LINE or by phone (once we're open).",
      },
    },
  },
  {
    slug: "hair-loss-aga",
    title: "薄毛が気になる（AGA治療）",
    category: "selfpay",
    summary: "AGA（男性型脱毛症）の自費診療について",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "男性型脱毛症（AGA）", note: "加齢やホルモンの影響などが背景にあることが多いです。" },
    ],
    relatedTests: [],
    treatmentOverview: [
      "エビデンスに基づく治療として、ミノキシジル外用薬・フィナステリド内服薬などを用いることが多いです。",
      "定期的な経過観察を行いながら治療を継続することが一般的です。効果には個人差があります。",
    ],
    whenToVisit: [
      "薄毛が気になる場合は、まず医師との相談（初回診察）からご案内します。",
    ],
    selfPay: {
      isSelfPayNote:
        "AGA治療は自由診療（公的医療保険の適用外・全額自己負担）であり、標準治療として保険診療に代わるものではありません。継続的な処方が前提となり、効果には個人差があります。",
      priceItems: [
        { name: "AGA治療（フィナステリド）", price: "月額6,200円" },
        { name: "AGA治療（デュタステリド系）", price: "月額10,000円台〜" },
      ],
      risks:
        "ミノキシジル外用薬・フィナステリド内服薬など、エビデンスに基づく薄毛治療です。フィナステリドでは性機能への影響が報告されています。定期的な経過観察を行います。",
      contactNote: "詳しい費用・リスクは、初回診察時に医師よりご説明します。ご不明な点はLINE・お電話（開院後）でお問い合わせください。",
    },
    en: {
      title: "Concerned about thinning hair (AGA treatment)",
      summary: "Self-pay treatment for AGA (male pattern hair loss)",
      possibleCauses: [
        { name: "Male pattern hair loss (AGA)", note: "Often related to aging and hormonal factors." },
      ],
      relatedTests: [],
      treatmentOverview: [
        "Evidence-based treatment typically involves topical minoxidil and oral finasteride.",
        "Treatment is usually continued with regular follow-up. Results vary from person to person.",
      ],
      whenToVisit: [
        "If thinning hair is a concern, we start with a consultation with the doctor (your first visit).",
      ],
      selfPay: {
        isSelfPayNote:
          "AGA treatment is self-pay care (not covered by public health insurance — paid entirely out of pocket) and is not a substitute for standard insurance-covered treatment. It requires ongoing prescriptions, and results vary from person to person.",
        priceItems: [
          { name: "AGA treatment (finasteride)", price: "¥6,200/month" },
          { name: "AGA treatment (dutasteride-based)", price: "From around ¥10,000+/month" },
        ],
        risks:
          "Evidence-based hair loss treatments such as topical minoxidil and oral finasteride. Finasteride has been reported to affect sexual function in some cases. We monitor your progress regularly.",
        contactNote: "We'll explain the detailed costs and risks at your first visit. For questions, please reach out via LINE or by phone (once we're open).",
      },
    },
  },
  {
    slug: "ed-treatment",
    title: "ED（勃起不全）治療",
    category: "selfpay",
    summary: "ED治療薬の自費診療について",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "加齢・生活習慣・血流に関連する要因", note: "背景に生活習慣病等が隠れていることもあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "医師の診察のうえで、内服薬（シルデナフィル・タダラフィル等）を処方することが多いです。",
      "背景に生活習慣病等がある場合は、あわせて評価・治療を検討することがあります。",
    ],
    whenToVisit: [
      "ED治療についても、まず医師との相談（初回診察）からご案内します。",
    ],
    selfPay: {
      isSelfPayNote:
        "ED治療薬の処方は自由診療（公的医療保険の適用外・全額自己負担）であり、標準治療として保険診療に代わるものではありません。継続的な処方が前提となり、効果には個人差があります。",
      priceItems: [
        { name: "ED治療薬（バイアグラ）", price: "1錠2,400円" },
        { name: "ED治療薬（シアリス）", price: "1錠1,700円" },
      ],
      risks: "シルデナフィル・タダラフィルなど、医師の診察のうえで処方します。頭痛・顔面紅潮・血圧低下などの副作用が出る場合があります。",
      contactNote: "詳しい費用・リスクは、初回診察時に医師よりご説明します。ご不明な点はLINE・お電話（開院後）でお問い合わせください。",
    },
    en: {
      title: "ED (erectile dysfunction) treatment",
      summary: "Self-pay treatment with ED medications",
      possibleCauses: [
        { name: "Factors related to aging, lifestyle, and blood flow", note: "An underlying lifestyle-related condition can sometimes be involved." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "After a doctor's consultation, we often prescribe oral medication (sildenafil, tadalafil, etc.).",
        "If an underlying lifestyle-related condition is present, we may evaluate and treat that as well.",
      ],
      whenToVisit: [
        "For ED treatment too, we start with a consultation with the doctor (your first visit).",
      ],
      selfPay: {
        isSelfPayNote:
          "Prescribing ED medication is self-pay care (not covered by public health insurance — paid entirely out of pocket) and is not a substitute for standard insurance-covered treatment. It requires ongoing prescriptions, and results vary from person to person.",
        priceItems: [
          { name: "ED medication (Viagra)", price: "¥2,400/tablet" },
          { name: "ED medication (Cialis)", price: "¥1,700/tablet" },
        ],
        risks: "Sildenafil, tadalafil, and similar medications, prescribed after a doctor's consultation. Side effects such as headache, facial flushing, or low blood pressure can occur.",
        contactNote: "We'll explain the detailed costs and risks at your first visit. For questions, please reach out via LINE or by phone (once we're open).",
      },
    },
  },
  {
    slug: "hayfever-steroid-injection",
    title: "花粉症（自費のステロイド注射）",
    category: "selfpay",
    summary: "花粉症に対する自費のステロイド注射について",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "花粉症（季節性アレルギー性鼻炎）", note: "特定の季節にくしゃみ・鼻水・目のかゆみを伴うことが多いです。" },
    ],
    relatedTests: [],
    treatmentOverview: [
      "まずは保険診療での内服薬・点鼻薬による治療をご案内することが基本です。",
      "選択肢の一つとして、シーズン前に行う自費のステロイド注射をご案内することがあります。頻回の使用はおすすめできません。",
    ],
    whenToVisit: [
      "毎年症状が強く生活に支障がある場合は、シーズン前に一度ご相談ください。",
    ],
    selfPay: {
      isSelfPayNote:
        "花粉症ステロイド注射は自由診療（公的医療保険の適用外・全額自己負担）であり、標準治療として保険診療に代わるものではありません。",
      priceItems: [{ name: "花粉症ステロイド注射", price: "1回4,000円（診察料別途）" }],
      risks:
        "季節性アレルギー性鼻炎のシーズン前に行うステロイド（トリアムシノロンアセトニド）注射です。注射部位反応・血糖値上昇のほか、繰り返しの使用では月経異常・免疫力低下・注射部位の皮膚萎縮などのリスクがあり、頻回の使用はおすすめできません。",
      contactNote: "詳しい費用・リスクは、診察時に医師よりご説明します。ご不明な点はLINE・お電話（開院後）でお問い合わせください。",
    },
    en: {
      title: "Hay fever (self-pay steroid injection)",
      summary: "A self-pay steroid injection for hay fever",
      possibleCauses: [
        { name: "Hay fever (seasonal allergic rhinitis)", note: "Often involves sneezing, a runny nose, and itchy eyes during a particular season." },
      ],
      relatedTests: [],
      treatmentOverview: [
        "We start by introducing insurance-covered oral medication and nasal sprays as the basic treatment.",
        "As one option, we may offer a self-pay steroid injection given before the season starts. We don't recommend using it frequently.",
      ],
      whenToVisit: [
        "If symptoms are severe every year and interfere with daily life, please talk to us once before the season starts.",
      ],
      selfPay: {
        isSelfPayNote:
          "The hay fever steroid injection is self-pay care (not covered by public health insurance — paid entirely out of pocket) and is not a substitute for standard insurance-covered treatment.",
        priceItems: [{ name: "Hay fever steroid injection", price: "¥4,000/session (consultation fee separate)" }],
        risks:
          "A steroid (triamcinolone acetonide) injection given before the seasonal allergic rhinitis season. Besides injection-site reactions and a rise in blood sugar, repeated use carries risks such as menstrual irregularity, lowered immunity, and skin thinning at the injection site — we don't recommend frequent use.",
        contactNote: "We'll explain the detailed costs and risks at your visit. For questions, please reach out via LINE or by phone (once we're open).",
      },
    },
  },
  {
    slug: "fatigue-vitamin-injection",
    title: "倦怠感（にんにく注射）",
    category: "selfpay",
    summary: "倦怠感に対する自費のビタミン注射（にんにく注射）について",
  lastReviewed: "2026-09-15",
    possibleCauses: [
      { name: "生活習慣・睡眠不足等に伴う倦怠感", note: "背景に他の疾患（貧血・甲状腺機能異常等）が隠れていることもあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood],
    treatmentOverview: [
      "倦怠感が続く場合は、まず血液検査等で背景に疾患がないかを確認することが多いです。",
      "選択肢の一つとして、ビタミンB1等を含む注射（いわゆる「にんにく注射」）をご案内することがあります。効果には個人差があります。",
    ],
    whenToVisit: [
      "倦怠感が長く続く場合は、自己判断せず一度ご相談ください。",
    ],
    selfPay: {
      isSelfPayNote:
        "ビタミン注射（にんにく注射）は自由診療（公的医療保険の適用外・全額自己負担）であり、疾患の治療そのものではなく、標準治療として保険診療に代わるものではありません。",
      priceItems: [{ name: "にんにく注射", price: "1回1,500円" }],
      risks:
        "ビタミンB1等を含む注射で、疲労感・倦怠感の軽減を目的として行われることがあります。効果には個人差があり、まれに注射部位の痛み・アレルギー反応等が起こることがあります。",
      contactNote: "詳しい費用・リスクは、診察時に医師よりご説明します。ご不明な点はLINE・お電話（開院後）でお問い合わせください。",
    },
    en: {
      title: "Fatigue (vitamin \"garlic\" injection)",
      summary: "A self-pay vitamin injection (\"garlic injection\") for fatigue",
      possibleCauses: [
        { name: "Fatigue related to lifestyle, lack of sleep, etc.", note: "Another condition (anemia, thyroid dysfunction, etc.) can sometimes be an underlying cause." },
      ],
      relatedTests: ["Blood test"],
      treatmentOverview: [
        "If fatigue persists, we usually start by checking for an underlying condition with a blood test or similar.",
        "As one option, we may offer an injection containing vitamin B1 and similar nutrients (a so-called \"garlic injection\"). Results vary from person to person.",
      ],
      whenToVisit: [
        "If fatigue continues for a long time, please come talk to us rather than self-diagnosing.",
      ],
      selfPay: {
        isSelfPayNote:
          "The vitamin injection (\"garlic injection\") is self-pay care (not covered by public health insurance — paid entirely out of pocket). It doesn't treat an underlying condition itself, and is not a substitute for standard insurance-covered treatment.",
        priceItems: [{ name: "Garlic injection", price: "¥1,500/session" }],
        risks:
          "An injection containing vitamin B1 and similar nutrients, given with the aim of easing fatigue. Results vary from person to person, and rarely, injection-site pain or an allergic reaction can occur.",
        contactNote: "We'll explain the detailed costs and risks at your visit. For questions, please reach out via LINE or by phone (once we're open).",
      },
    },
  },
];

export function getSymptom(slug: string): SymptomEntry | undefined {
  return SYMPTOMS.find((s) => s.slug === slug);
}

export function getSymptomsByCategory(category: SymptomCategory): SymptomEntry[] {
  return SYMPTOMS.filter((s) => s.category === category);
}

export const CATEGORY_ORDER: SymptomCategory[] = ["internal", "surgical", "pediatric", "selfpay"];
