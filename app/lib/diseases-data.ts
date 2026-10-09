/**
 * 疾患別ページのコンテンツデータ。
 *
 * 医学的内容は clinical-advisor が設計したもの（2026-10-09策定依頼）に基づく。
 * 断定回避・免責文言の配置ルールは app/lib/symptoms-data.ts と同じ方針を踏襲する。
 * ここに新しい医学的判断を追加執筆しないこと。
 *
 * services.details（app/lib/site.tsx）に記載している疾患名からリンクされる。
 * 新しい疾患を追加する場合は、必ずclinical-advisorの設計を経てから追加すること。
 */

export type DiseaseCategory = "internal" | "surgical";

export const DISEASE_CATEGORY_LABEL: Record<DiseaseCategory, string> = {
  internal: "内科系",
  surgical: "外科系",
};

export type DiseaseSubsection = {
  title: string;
  pathology: string;
  tests: string;
  treatment: string;
  tip: string;
};

export type DiseaseEntry = {
  slug: string;
  title: string;
  category: DiseaseCategory;
  summary: string;
  pathology: string;
  tests: string;
  treatment: string;
  tip: string;
  /** 甲状腺疾患のように、1ページ内に代表的な下位疾患を併記する場合 */
  subsections?: DiseaseSubsection[];
  lastReviewed: string;
};

export const DISEASE_DISCLAIMER_INTRO =
  "このページは一般的な医学情報の提供を目的としており、診断を行うものではありません。実際の診断・治療には受診が必要です。";

export const DISEASE_DISCLAIMER_OUTRO =
  "※ 本ページの内容は一般的な医学情報の紹介であり、個々の患者さんの診断・治療方針を示すものではありません。実際の診断・治療方針は、受診のうえ医師が症状・経過・検査結果を踏まえて判断します。治療の効果や必要な薬剤・処置には個人差があります。";

export const DISEASES: DiseaseEntry[] = [
  {
    slug: "hypertension",
    title: "高血圧",
    category: "internal",
    summary: "血圧が慢性的に高い状態が続く、自覚症状の出にくい生活習慣病です。",
    pathology:
      "血圧が慢性的に高い状態が続くこと。多くは自覚症状がなく、放置すると脳卒中・心疾患・腎疾患のリスクが高まります。",
    tests: "血液検査、尿検査、心電図、必要に応じてデジタルX線・腹部エコーで合併症・二次性高血圧の評価を行います。",
    treatment:
      "生活習慣の見直し（減塩・運動・体重管理）が基本となることが多く、必要に応じて降圧薬による治療を検討します。効果や必要な薬剤は症状・検査結果により個人差があります。",
    tip: "家庭での血圧測定（朝晩）は診察室血圧より実態に近いと言われています。測定習慣をつけることが治療の助けになることがあります。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "dyslipidemia",
    title: "脂質異常症",
    category: "internal",
    summary: "LDLコレステロール・中性脂肪などの血液中の脂質バランスが乱れた状態です。",
    pathology: "LDLコレステロール・中性脂肪などの血液中の脂質バランスが乱れた状態。動脈硬化の進行に関わります。",
    tests: "血液検査（脂質プロファイル）。",
    treatment:
      "食事・運動などの生活習慣改善を基本とし、必要に応じて薬物治療を検討します。治療方針は年齢・既往歴・他の危険因子により個人差があります。",
    tip: "コレステロールは完全に悪者ではなく、細胞膜やホルモンの材料でもあります。バランスが重要です。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "diabetes",
    title: "糖尿病",
    category: "internal",
    summary: "インスリンの働きが低下し、血糖値が慢性的に高くなる状態です。",
    pathology: "インスリンの働きが低下し血糖値が慢性的に高くなる状態。初期は無症状のことが多いです。",
    tests: "血液検査（血糖・HbA1c等）、尿検査。",
    treatment:
      "食事療法・運動療法が基本となることが多く、必要に応じて内服薬や注射製剤による治療を検討します。治療内容は病状により個人差があります。",
    tip: "HbA1cは過去1〜2か月の血糖の平均的な状態を反映する指標で、その日の食事の影響を受けにくいとされています。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "thyroid",
    title: "甲状腺疾患",
    category: "internal",
    summary: "甲状腺の働きが過剰または不足することで、全身にさまざまな症状が出ることがあります。",
    pathology:
      "甲状腺の働きが過剰（機能亢進）または不足（機能低下）することで、全身にさまざまな症状が出ることがあります。バセドウ病・橋本病が代表的ですが、他の原因もあり、血液検査による鑑別が必要です。",
    tests:
      "血液検査（甲状腺ホルモン・甲状腺自己抗体等）、頸部の視診・触診を中心に評価します。詳細な頸部エコーが必要な場合は専門医へご紹介することがあります。",
    treatment: "原因に応じて内服治療（抗甲状腺薬・甲状腺ホルモン補充等）を検討します。専門的な管理が必要な場合は専門医と連携します。",
    tip: "倦怠感・体重の変化・動悸などは甲状腺以外の原因でも起こるため、血液検査での確認が診断の第一歩になることが多いです。",
    subsections: [
      {
        title: "バセドウ病（甲状腺機能亢進症の代表例）",
        pathology: "甲状腺が過剰にホルモンを分泌し、頻脈・体重減少・多汗・手の震え等が起こりやすくなります。",
        tests: "血液検査（甲状腺ホルモン・TRAb等）、心電図（頻脈の評価）。",
        treatment:
          "抗甲状腺薬による内服治療が中心となることが多く、治療反応や副作用に応じて専門医と連携した管理を行うことがあります。",
        tip: "症状が「ストレス」や「更年期」と見分けにくいことがあり、血液検査ではじめて気づかれる場合もあります。",
      },
      {
        title: "橋本病（慢性甲状腺炎・甲状腺機能低下の代表例）",
        pathology: "甲状腺への慢性的な自己免疫性の炎症により、機能が低下することがあります。むくみ・体重増加・倦怠感・徐脈等が起こりやすくなります。",
        tests: "血液検査（甲状腺ホルモン・抗TPO抗体等）。",
        treatment: "機能低下がある場合は甲状腺ホルモン補充療法を検討することが多いです。機能が保たれている場合は経過観察となることもあります。",
        tip: "橋本病という診断自体が必ずしも治療を要するわけではなく、ホルモン値次第で経過観察のこともあります。",
      },
    ],
    lastReviewed: "2026-10-09",
  },
  {
    slug: "h-pylori",
    title: "ピロリ菌感染（胃炎・胃潰瘍との関連）",
    category: "internal",
    summary: "ヘリコバクター・ピロリという細菌の胃への感染で、慢性胃炎・胃潰瘍等のリスク要因として知られています。",
    pathology: "ヘリコバクター・ピロリという細菌の胃への感染で、慢性胃炎・胃潰瘍・胃がんのリスク要因として知られています。",
    tests: "血液検査（抗体）、経鼻内視鏡（胃カメラ）での観察・組織採取。",
    treatment: "感染が確認された場合、除菌治療（内服薬の組み合わせ）を検討することが多いです。除菌成功率には個人差があります。",
    tip: "除菌治療が成功しても胃がんのリスクがゼロになるわけではないため、除菌後も定期的な胃カメラ検査が勧められることがあります。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "hay-fever",
    title: "花粉症",
    category: "internal",
    summary: "花粉に対するアレルギー反応で、くしゃみ・鼻水・鼻づまり・目のかゆみ等が起こります。",
    pathology: "花粉に対するアレルギー反応で、くしゃみ・鼻水・鼻づまり・目のかゆみ等が起こります。",
    tests: "血液検査（アレルギー検査）。",
    treatment: "抗アレルギー薬の内服・点鼻薬・点眼薬などを症状に応じて検討します。効果や必要な薬剤には個人差があります。",
    tip: "花粉症の症状は飛散が始まる前からの「初期治療」で軽減できる場合があるとされています。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "allergic-rhinitis",
    title: "アレルギー性鼻炎",
    category: "internal",
    summary: "花粉以外の原因（ハウスダスト・ダニ等）も含めた、鼻粘膜のアレルギー反応による症状です。",
    pathology: "花粉以外の原因（ハウスダスト・ダニ等）も含めた、鼻粘膜のアレルギー反応による症状。",
    tests: "血液検査（アレルギー検査）。",
    treatment: "原因物質の除去・回避に加え、内服薬・点鼻薬などの薬物治療を症状に応じて検討します。",
    tip: "寝具やカーペットのダニ対策など、環境調整が症状軽減に役立つことがあります。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "urticaria",
    title: "蕁麻疹",
    category: "internal",
    summary: "皮膚にかゆみを伴う膨疹（みみず腫れ状の盛り上がり）が出没する状態です。",
    pathology: "皮膚にかゆみを伴う膨疹（みみず腫れ状の盛り上がり）が出没する状態。多くは原因不明の特発性とされます。",
    tests: "血液検査（アレルギー検査・炎症反応等、必要に応じて）。",
    treatment: "抗ヒスタミン薬の内服が基本となることが多いです。症状が強い・長引く場合は原因検索や専門医への相談を検討します。",
    tip: "多くの蕁麻疹は特定の食物アレルギーが原因ではなく、ストレスや疲労でも誘発されることがあります。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "asthma",
    title: "気管支喘息",
    category: "internal",
    summary: "気道の慢性的な炎症により、咳・喘鳴・呼吸困難が繰り返し起こる状態です。",
    pathology: "気道の慢性的な炎症により、咳・喘鳴・呼吸困難が繰り返し起こる状態。",
    tests: "FeNO（呼気中の炎症物質を測定する検査）、血液検査、デジタルX線。",
    treatment:
      "吸入薬（気道の炎症を抑える薬・気管支を広げる薬等）による長期管理が基本となることが多いです。症状の程度により治療内容は個人差があります。",
    tip: "症状が落ち着いていても気道の炎症が続いていることがあるため、自己判断で治療を中断しないことが大切とされています。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "sas",
    title: "睡眠時無呼吸症候群（SAS）",
    category: "internal",
    summary: "睡眠中に呼吸が止まる・浅くなることを繰り返す状態です。",
    pathology: "睡眠中に呼吸が止まる・浅くなることを繰り返す状態。いびき・日中の眠気・起床時の頭痛等を伴うことがあります。",
    tests:
      "問診・血液検査に加え、簡易検査（当院の対応範囲内）での評価を行います。精密検査（終夜睡眠ポリグラフ検査等）が必要な場合は専門医療機関と連携します。",
    treatment:
      "生活習慣の改善（体重管理・飲酒制限等）に加え、重症度に応じてCPAP（経鼻的持続陽圧呼吸療法）等を検討することがあります。当院では呼吸器内科・内科の診療の範囲内で評価・対応を行います。",
    tip: "いびきを指摘された家族の声が受診のきっかけになることが多い疾患です。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "atheroma",
    title: "粉瘤",
    category: "surgical",
    summary: "皮膚の下にできる良性のできもので、袋状の構造に老廃物が溜まった状態です。",
    pathology: "皮膚の下にできる良性のできもので、袋状の構造に老廃物が溜まった状態。感染すると赤く腫れて痛みを伴うことがあります。",
    tests: "視診・触診、必要に応じて体表超音波での評価。",
    treatment: "日帰り手術による摘出を検討することが多いです。感染している場合は、まず炎症を抑える処置を先行することがあります。",
    tip: "自然に治ることは少なく、繰り返し感染を起こす前の摘出が勧められることがあります。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "lipoma",
    title: "脂肪腫",
    category: "surgical",
    summary: "皮下脂肪組織からできる良性の腫瘤で、ゆっくり大きくなることが多いです。",
    pathology: "皮下脂肪組織からできる良性の腫瘤。ゆっくり大きくなることが多く、痛みを伴わないことが多いです。",
    tests: "視診・触診、体表超音波での評価。",
    treatment: "経過観察、または希望・サイズ・部位に応じて日帰り手術での摘出を検討します。",
    tip: "良性であることが多いですが、急に大きくなる・硬いなど気になる変化があれば受診が勧められます。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "ingrown-nail",
    title: "巻き爪・陥入爪",
    category: "surgical",
    summary: "爪が周囲の皮膚に食い込み、痛み・炎症・化膿を起こすことがある状態です。",
    pathology: "爪が周囲の皮膚に食い込み、痛み・炎症・化膿を起こすことがある状態。",
    tests: "視診。",
    treatment: "保存的処置（テーピング・爪の矯正処置等）や、症状に応じた外科的処置（部分抜爪等）を検討します。",
    tip: "深爪や合わない靴が誘因となることが多く、日常の爪の切り方・靴選びの見直しも予防に役立つことがあります。",
    lastReviewed: "2026-10-09",
  },
  {
    slug: "hemorrhoids",
    title: "痔核（いぼ痔）・裂肛等の痔疾患",
    category: "surgical",
    summary: "肛門周囲の静脈叢がうっ血して腫れる、または肛門の皮膚が切れる等の状態です。",
    pathology: "肛門周囲の静脈叢がうっ血して腫れる（痔核）、肛門の皮膚が切れる（裂肛）等の状態。排便時の出血・痛みを伴うことがあります。",
    tests: "視診・触診（直腸診）。下部消化管のより詳しい評価が必要な場合は専門医へご紹介することがあります。",
    treatment:
      "生活習慣の改善（食物繊維・水分摂取、排便習慣の見直し）や外用薬が基本となることが多く、症状に応じて日帰り処置・手術を検討することがあります。",
    tip: "出血があると「痔だろう」と自己判断しがちですが、大腸の病気が隠れていることもあるため、一度の受診での確認が勧められます。",
    lastReviewed: "2026-10-09",
  },
];

export function getDisease(slug: string): DiseaseEntry | undefined {
  return DISEASES.find((d) => d.slug === slug);
}

export function getDiseasesByCategory(category: DiseaseCategory): DiseaseEntry[] {
  return DISEASES.filter((d) => d.category === category);
}

export const DISEASE_CATEGORY_ORDER: DiseaseCategory[] = ["internal", "surgical"];

/** services.detailsの箇条書き文字列中に含まれる疾患名を自動リンクするための辞書。
 *  キーが長い順にマッチさせることで「糖尿病」と「2型糖尿病」のような重複を避ける。 */
export const DISEASE_LINK_LABELS: { label: string; slug: string }[] = DISEASES
  .map((d) => ({ label: d.title.replace(/（.*）/, ""), slug: d.slug }))
  .concat([
    { label: "高血圧", slug: "hypertension" },
    { label: "脂質異常症", slug: "dyslipidemia" },
    { label: "糖尿病", slug: "diabetes" },
    { label: "花粉症", slug: "hay-fever" },
    { label: "鼻炎", slug: "allergic-rhinitis" },
    { label: "蕁麻疹", slug: "urticaria" },
    { label: "気管支喘息", slug: "asthma" },
    { label: "睡眠時無呼吸症候群", slug: "sas" },
    { label: "粉瘤", slug: "atheroma" },
    { label: "脂肪腫", slug: "lipoma" },
    { label: "巻き爪", slug: "ingrown-nail" },
    { label: "陥入爪", slug: "ingrown-nail" },
    { label: "痔", slug: "hemorrhoids" },
    { label: "ピロリ菌", slug: "h-pylori" },
    { label: "甲状腺疾患", slug: "thyroid" },
  ])
  .filter((v, i, arr) => arr.findIndex((x) => x.label === v.label) === i)
  .sort((a, b) => b.label.length - a.label.length);
