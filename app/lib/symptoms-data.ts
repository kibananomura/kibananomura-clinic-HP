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

export type SymptomCategory = "internal" | "surgical" | "pediatric" | "selfpay";

export const CATEGORY_LABEL: Record<SymptomCategory, string> = {
  internal: "内科系",
  surgical: "外科系",
  pediatric: "小児科系",
  selfpay: "自費診療系",
};

export type EmergencyBox = {
  /** 見出し（例: 次のような場合は要注意） */
  heading: string;
  points: string[];
  /** 取るべき行動（例: 様子を見ず救急要請・救急外来受診） */
  action: string;
  /** 胸痛・動悸・息切れ、小児の発熱など、特に強い警告表示にするページ */
  strong?: boolean;
};

export type SymptomEntry = {
  slug: string;
  title: string;
  category: SymptomCategory;
  /** 一覧ページ用の短い説明 */
  summary: string;
  emergencyBox?: EmergencyBox;
  possibleCauses: { name: string; note: string }[];
  relatedTests: string[];
  treatmentOverview: string[];
  whenToVisit: string[];
  /** MedicalWebPageJsonLd の lastReviewed に渡す実際のレビュー実施日（YYYY-MM-DD） */
  lastReviewed: string;
  /** 胸痛・冷や汗を伴う場合の救急要請バナーを個別ページ上部にも表示するか */
  showChestPainBanner?: boolean;
  /** 自費診療ページのみ */
  selfPay?: {
    /** 自由診療である旨・標準治療でないことの明記 */
    isSelfPayNote: string;
    priceItems: { name: string; price: string }[];
    risks: string;
    /** 問い合わせ先 */
    contactNote: string;
  };
};

/** 免責文言（共通・ページ冒頭と末尾の2箇所で使用） */
export const SYMPTOM_DISCLAIMER_INTRO =
  "このページは一般的な医学情報の提供を目的としており、診断を行うものではありません。実際の診断・治療には受診が必要です。症状が強い場合や不安な場合は、様子を見ずに受診してください。";

/** 免責文言（短縮版・症状ページ冒頭専用。詳細版は末尾の SYMPTOM_DISCLAIMER_OUTRO を参照） */
export const SYMPTOM_DISCLAIMER_INTRO_SHORT =
  "このページは一般的な医学情報の提供を目的としています。";

export const SYMPTOM_DISCLAIMER_OUTRO =
  "※ 本ページの内容は一般的な医学情報の紹介であり、個々の患者さんの診断・治療方針を示すものではありません。実際の診断・治療方針は、受診のうえ医師が症状・経過・検査結果を踏まえて判断します。症状が強い場合、急に悪化した場合、不安が続く場合は、様子を見ずに受診・ご相談ください。";

/** 胸痛・動悸に関する共通の救急要請バナー（症状一覧ページ・胸やけ/動悸ページで共通利用） */
export const CHEST_PAIN_EMERGENCY_BANNER =
  "胸の痛み・締め付け感・冷や汗を伴う場合は、今すぐ救急要請（119番）してください。";

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
      { name: "感冒（かぜ症候群）", note: "発熱・のどの痛み・鼻水などを伴うことが多いです。" },
      { name: "インフルエンザ", note: "急な高熱・関節痛・全身のだるさを伴うことが多いです。" },
      { name: "肺炎", note: "咳・息苦しさを伴う発熱が続く場合に疑われることがあります。" },
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
      { name: "胆石", note: "食後の右上腹部の痛みとして現れることがあります。" },
      { name: "虫垂炎", note: "みぞおち〜右下腹部に痛みが移動することがあり、注意が必要な疾患のひとつです。" },
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
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.urine, AVAILABLE_TESTS.ecg],
    treatmentOverview: [
      "生活習慣の見直し（食事・運動・睡眠等）を基本としながら、必要に応じて薬物治療を検討することが多いです。",
      "長期的な管理が必要な疾患であるため、定期的な通院・検査での経過観察を行うことが一般的です。",
    ],
    whenToVisit: [
      "健診で数値の異常を指摘された場合は、症状がなくても一度ご相談いただくことをおすすめします。",
    ],
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
      { name: "自律神経の乱れ・ストレス", note: "他の疾患が除外された場合に考えられることがあります。" },
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
      { name: "胆石・胆のう炎", note: "右上腹部の痛みとして現れることがあります。" },
    ],
    relatedTests: [AVAILABLE_TESTS.blood, AVAILABLE_TESTS.echo, AVAILABLE_TESTS.ct],
    treatmentOverview: [
      "CT・エコー等の画像検査で評価したうえで、外科的な処置が必要かどうかを判断することが多いです。",
      "緊急手術が必要と判断した場合は、高次医療機関へ速やかに紹介します。",
    ],
    whenToVisit: [
      "強い痛みが続く、症状が悪化している場合は速やかに受診してください。",
    ],
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
      priceItems: [{ name: "GLP-1ダイエット（低用量開始プラン）", price: "月額19,800円〜" }],
      risks:
        "食欲抑制作用があるとされ、血糖値コントロールのサポートも期待されます。消化器症状（吐き気・下痢など）が現れる場合があるほか、まれに急性膵炎・胆嚢炎等の重篤な副作用が報告されているため、強い腹痛がある場合は速やかに受診してください。効果には個人差があり、医師が継続的な体重管理をサポートします。",
      contactNote: "詳しい費用・リスクは、初回診察時に医師よりご説明します。ご不明な点はLINE・お電話（開院後）でお問い合わせください。",
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
  },
];

export function getSymptom(slug: string): SymptomEntry | undefined {
  return SYMPTOMS.find((s) => s.slug === slug);
}

export function getSymptomsByCategory(category: SymptomCategory): SymptomEntry[] {
  return SYMPTOMS.filter((s) => s.category === category);
}

export const CATEGORY_ORDER: SymptomCategory[] = ["internal", "surgical", "pediatric", "selfpay"];
