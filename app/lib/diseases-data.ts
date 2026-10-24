/**
 * 疾患別ページのコンテンツデータ。
 *
 * 医学的内容は clinical-advisor が設計したもの（2026-10-09策定依頼）に基づく。
 * 断定回避・免責文言の配置ルールは app/lib/symptoms-data.ts と同じ方針を踏襲する。
 * ここに新しい医学的判断を追加執筆しないこと。
 *
 * services.details（app/lib/site.tsx）に記載している疾患名からリンクされる。
 * 新しい疾患を追加する場合は、必ずclinical-advisorの設計を経てから追加すること。
 *
 * 本文中の **強調文字** は太字、__強調文字__ は下線として表示される
 * （app/components/InlineRichText.tsx を参照）。要点（診断基準の数値・
 * 治療目標値・受診を促す注意点等）に適宜使用すること。
 */

// 型・小さな定数・ヘルパー関数は disease-shared.ts に分離している
// （クライアントコンポーネントが本ファイルをimportすると、重いDISEASES配列
// ごとバンドルされてしまうため。詳細は disease-shared.ts のコメントを参照）。
// サーバー側からの既存のimportを壊さないよう、ここで re-export しておく。
export type {
  DiseaseCategory,
  DiseaseSource,
  DiseaseSubsection,
  DiseaseTranslation,
  DiseaseEntry,
} from "./disease-shared";
export {
  DISEASE_CATEGORY_LABEL,
  DISEASE_CATEGORY_LABEL_EN,
  DISEASE_DISCLAIMER_INTRO,
  DISEASE_DISCLAIMER_OUTRO,
  getDiseaseContent,
} from "./disease-shared";
import type { DiseaseCategory, DiseaseEntry } from "./disease-shared";

export const DISEASES: DiseaseEntry[] = [
  {
    slug: "hypertension",
    title: "高血圧",
    category: "internal",
    summary: "血圧が慢性的に高い状態が続く、自覚症状の出にくい生活習慣病です。",
    pathology:
      "血圧が慢性的に高い状態が続くこと。多くは自覚症状がなく、放置すると脳卒中・心疾患・腎疾患のリスクが高まります。日本高血圧学会「高血圧管理・治療ガイドライン2025（JSH2025）」では、診察室で測定した血圧が**収縮期140mmHg以上または拡張期90mmHg以上**の場合を高血圧と定義しています。一方、ご自宅で測定する家庭血圧は、診察室血圧よりも日常の血圧実態を反映しやすいとされ、同ガイドラインでは**収縮期135mmHg以上または拡張期85mmHg以上**を高血圧の基準としています。診察室では正常でもご自宅では高めに出る「仮面高血圧」などもあるため、__両方の数値を踏まえた評価__が重要とされています。",
    tests:
      "血液検査、尿検査、心電図、必要に応じてデジタルX線・腹部エコーで合併症・二次性高血圧の評価を行います。また、診察室での測定に加えて、__ご自宅での家庭血圧の記録をお持ちいただく__ことも診断・評価の重要な手がかりとなります。家庭血圧は、朝（起床後1時間以内・排尿後・服薬前・食前）と晩（就床前）に、1〜2分程度座って安静にした後、それぞれ1〜2回測定し記録していただくのが一般的な方法です。数日〜1週間程度の記録をもとに平均値で評価することが多く、**1回だけの数値で判断しないこと**が大切です。",
    treatment:
      "生活習慣の見直し（減塩・運動・体重管理）が基本となることが多く、改善が不十分な場合は比較的早い段階（目安として1か月程度）で降圧薬による治療も検討します。JSH2025では、原則として年齢によらず**診察室血圧130/80mmHg未満（家庭血圧では125/75mmHg未満）**を降圧目標とすることが示されており、従来のガイドライン（JSH2019）で緩やかだった75歳以上の方の目標値も、多くの場合これに合わせて引き下げられています。一方で、外来への通院に介助が必要な方や、日常生活動作が大きく低下している方など、ご高齢で心身の状態がデリケートな場合は、目標をやや緩やかに設定したり（収縮期140〜150mmHg程度を目安とすることもあります）、下げすぎ（特に収縮期120mmHg未満）を避けたりするなど、個別に調整します。効果や必要な薬剤・目標値は個人差が大きく、実際の目標は診察のうえで担当医とご相談しながら決めていきます。",
    tip: "家庭での血圧測定（朝晩）は診察室血圧より実態に近いと言われています。測定習慣をつけることが治療の助けになることがあります。__ご自宅での血圧がなかなか目標の数値まで下がらない、あるいは数値が安定しないという場合__は、ご自身の判断だけで様子を見続けず、記録した血圧をお持ちのうえ主治医の先生にご相談いただくことをお勧めします。",
    sources: [{ label: "日本高血圧学会「高血圧管理・治療ガイドライン2025（JSH2025）」" }],
    lastReviewed: "2026-10-10",
    en: {
      title: "High blood pressure (hypertension)",
      summary: "A lifestyle-related condition where blood pressure stays chronically elevated, often with no noticeable symptoms.",
      pathology:
        "Chronically elevated blood pressure. It usually causes no symptoms, but left untreated it raises the risk of stroke, heart disease, and kidney disease. The Japanese Society of Hypertension's 2025 guideline (JSH2025) defines hypertension as a clinic blood pressure reading of **140/90mmHg or higher (systolic/diastolic)**. Blood pressure measured at home tends to better reflect your everyday reality than a clinic reading, so the same guideline sets the threshold for home readings at **135/85mmHg or higher**. Because some people have normal readings at the clinic but higher readings at home (\"masked hypertension\"), __evaluating both sets of numbers together__ is considered important.",
      tests:
        "We evaluate for complications and secondary hypertension with blood tests, a urine test, an ECG, and digital X-ray or abdominal ultrasound as needed. Beyond the clinic measurement, __bringing in a record of your home blood pressure readings__ is also an important clue for diagnosis and evaluation. The typical approach is to measure once or twice in the morning (within an hour of waking, after using the bathroom, before medication or breakfast) and once or twice in the evening (before bed), each time after sitting calmly for 1–2 minutes. We usually evaluate the average over several days to a week — **a single reading alone isn't enough to go on.**",
      treatment:
        "Treatment generally starts with lifestyle changes (reducing salt, exercise, weight management), and if improvement isn't enough, we consider adding blood pressure medication relatively early, typically within about a month. JSH2025 generally recommends a target of **below 130/80mmHg at the clinic (below 125/75mmHg at home)** regardless of age, which is lower than the more lenient target previously set for patients 75 and older under the older JSH2019 guideline. That said, for older patients who need assistance getting to appointments or whose daily functioning has declined significantly, we adjust individually — sometimes setting a somewhat more lenient target (around 140–150mmHg systolic) or being careful not to lower it too far (particularly below 120mmHg systolic). The right target and medication vary a great deal from person to person, and we work it out together with you during your visits.",
      tip: "Measuring your blood pressure at home, morning and evening, tends to reflect reality more closely than a single clinic reading. Building that habit can genuinely help with treatment. __If your home readings won't come down to target, or keep fluctuating,__ please don't just keep watching and waiting on your own — bring your recorded readings in and talk it over with your doctor.",
    },
  },
  {
    slug: "dyslipidemia",
    title: "脂質異常症",
    category: "internal",
    summary:
      "LDLコレステロール・中性脂肪などの血液中の脂質バランスが乱れた状態です。自覚症状がないまま動脈硬化が進むため、**健診での早期発見と継続的な管理**が大切です。",
    pathology:
      "LDLコレステロール・中性脂肪（TG）・HDLコレステロールなど、血液中の脂質のバランスが乱れた状態です。代表的な診断の目安は、**LDLコレステロール140mg/dl以上、中性脂肪150mg/dl以上（空腹時）、HDLコレステロール40mg/dl未満**のいずれかに当てはまる場合です。痛みなどの自覚症状がほとんどないまま、__血管の壁に脂質が溜まり動脈硬化が進行する__ことが最大の問題で、進行すると心筋梗塞や脳卒中のリスクが高まります。閉経後の女性はホルモンの変化でコレステロールが上がりやすくなるなど、年齢・性別によって注意すべき時期が異なります。",
    tests:
      "血液検査でLDLコレステロール・HDLコレステロール・中性脂肪・non-HDLコレステロール（総コレステロールからHDLを引いた値）を確認します。中性脂肪は食事の影響を受けやすいため、**空腹時の採血**で評価するのが基本です。あわせて、血糖・血圧・肝機能なども含めて、**動脈硬化に関わる他の危険因子**（糖尿病・高血圧・喫煙・家族歴など）を一緒に確認し、総合的にリスクを判断します。",
    treatment:
      "治療方針は数値だけでなく、__年齢・他の病気の有無・動脈硬化性疾患の既往など、その方全体のリスク__を踏まえて個別に決めます。心筋梗塞や脳卒中の既往がない方（一次予防）では、リスクに応じてLDLコレステロール120〜160mg/dl未満を目安とすることが多く、既往がある方（二次予防）ではより厳格に**LDLコレステロール100mg/dl未満**（場合によっては70mg/dl未満）を目指します。いずれの場合も食事療法（脂質・糖質のとり過ぎに注意し、野菜・魚を意識する）と運動療法が土台となり、生活習慣の改善だけで目標に届かない場合や、LDLコレステロールが180mg/dl以上と高い場合には、**リスクの程度に関わらず薬物治療**を検討します。高齢の方では薬の効果とともに体への負担・持病との飲み合わせにも配慮しながら、無理のない範囲で管理していきます。",
    tip: "コレステロールは血管の壁を傷めるだけでなく、__細胞膜やホルモンの材料__としても欠かせないものです。大切なのは「ゼロにする」ことではなく、ご自身のリスクに合った**適正なバランス**を保つことです。数値が高いと言われたら、まずは一度ご相談ください。症状がなくても定期的に調べておくことが、将来の安心につながります。",
    sources: [{ label: "日本動脈硬化学会「動脈硬化性疾患予防ガイドライン2022年版」" }],
    lastReviewed: "2026-10-10",
    en: {
      title: "Dyslipidemia",
      summary: "An imbalance in blood lipids such as LDL cholesterol and triglycerides. Since it has no symptoms while atherosclerosis quietly progresses, **early detection at a checkup and ongoing management** are important.",
      pathology:
        "An imbalance among blood lipids such as LDL cholesterol, triglycerides (TG), and HDL cholesterol. The typical diagnostic thresholds are **LDL cholesterol 140mg/dl or higher, fasting triglycerides 150mg/dl or higher, or HDL cholesterol below 40mg/dl** (any one of these). The main problem is that __lipids build up in the artery walls and atherosclerosis progresses__ with almost no pain or other symptoms; if it advances, the risk of heart attack and stroke rises. The periods that call for extra attention differ by age and sex — for example, cholesterol tends to rise after menopause due to hormonal changes.",
      tests:
        "Blood tests check LDL cholesterol, HDL cholesterol, triglycerides, and non-HDL cholesterol (total cholesterol minus HDL). Because triglycerides are easily affected by food, they're generally evaluated with a **fasting blood draw**. We also check blood sugar, blood pressure, and liver function alongside **other risk factors related to atherosclerosis** (diabetes, hypertension, smoking, family history, etc.) to judge your overall risk.",
      treatment:
        "Treatment isn't based on the numbers alone — it's decided individually based on __your overall risk, including age, other conditions, and any history of atherosclerotic disease__. For those with no history of heart attack or stroke (primary prevention), the target is often an LDL cholesterol below roughly 120–160mg/dl depending on risk; for those with a history (secondary prevention), the goal is stricter — **below 100mg/dl** (sometimes below 70mg/dl). In both cases, diet (watching fat and carbohydrate intake, favoring vegetables and fish) and exercise form the foundation. If lifestyle changes alone aren't enough to reach target, or if LDL cholesterol is 180mg/dl or higher, **medication is considered regardless of overall risk level**. For older patients, we manage things at a comfortable pace, weighing the medication's benefit against physical burden and interactions with other medications.",
      tip: "Cholesterol doesn't just damage artery walls — it's also __an essential building block for cell membranes and hormones__. The goal isn't to eliminate it, but to maintain **the right balance** for your own risk level. If you've been told your numbers are high, please come talk to us. Checking periodically even without symptoms is an investment in your future peace of mind.",
    },
  },
  {
    slug: "diabetes",
    title: "糖尿病",
    category: "internal",
    summary: "インスリンの働きが低下し、血糖値が慢性的に高くなる状態です。",
    pathology:
      "インスリンの働きが低下し、血糖値が慢性的に高くなる状態です。初期は自覚症状がほとんどなく、健診で指摘されて気づく方も多い病気です。放置すると、網膜症・腎症・神経障害といった細い血管の合併症や、心筋梗塞・脳卒中など太い血管の合併症につながることがあります。診断には、**①早朝空腹時血糖126mg/dl以上、②75gブドウ糖負荷試験の2時間値200mg/dl以上、③随時血糖値200mg/dl以上、④HbA1c 6.5%以上**、のうち①〜③のいずれかと④がそろうことなどが用いられます（__1回の数値だけで判断しない__ことが基本です）。",
    tests:
      "血液検査（血糖・HbA1c・脂質・腎機能・肝機能等）、尿検査（糖・蛋白・ケトン体）に加え、体重・血圧の確認を行います。また、__合併症の有無を確認する__ため、眼科での眼底検査（網膜症）、尿中アルブミンの測定（腎症）、神経の診察（しびれ・感覚の確認等）、心電図などを定期的に行うことが大切です。",
    treatment:
      "食事療法・運動療法（ウォーキングなど、できれば1日8,000〜9,000歩程度を目安に）が基本となることが多く、改善が不十分な場合は内服薬や注射製剤による治療を検討します。一般的な血糖コントロールの目標は**HbA1c 7.0%未満**とされていますが、年齢・低血糖のリスク・他の持病の有無などによって個人差が大きく、より緩やかな目標（8.0%未満など）が適切な場合もあります。あわせて、血圧（診察室130/80mmHg未満・家庭125/75mmHg未満が目安）やLDLコレステロールなど、**他の生活習慣病の管理**も合併症予防のために重要です。薬の種類や治療の強さは、腎機能や心臓・血管の状態などを踏まえて個別に判断し、必要に応じて専門医療機関と連携しながら進めていきます。",
    tip: "HbA1cは過去1〜2か月の血糖の平均的な状態を反映する指標で、その日の食事の影響を受けにくいとされています。糖尿病は自覚症状が乏しいまま進行することがあるため、__治療中の方は数値が落ち着いていても自己判断で通院や内服を中断せず__、定期的な受診と合併症チェックを継続することをお勧めします。",
    sources: [
      {
        label: "日本糖尿病学会「糖尿病診療ガイドライン2024」",
        url: "https://minds.jcqhc.or.jp/summary/c00864/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Diabetes",
      summary: "A condition where insulin function declines and blood sugar stays chronically elevated.",
      pathology:
        "A condition where insulin function declines and blood sugar stays chronically elevated. In the early stages there are almost no symptoms, and many people first learn of it through a checkup. Left untreated, it can lead to small-vessel complications (retinopathy, kidney disease, nerve damage) and large-vessel complications (heart attack, stroke). Diagnosis typically uses **① fasting blood glucose 126mg/dl or higher, ② a 2-hour value of 200mg/dl or higher on a 75g oral glucose tolerance test, ③ a random blood glucose of 200mg/dl or higher, and ④ HbA1c 6.5% or higher** — generally requiring one of ①–③ together with ④ (__never judging from a single reading alone__).",
      tests:
        "Blood tests (blood glucose, HbA1c, lipids, kidney and liver function, etc.) and urine tests (glucose, protein, ketones), along with checking weight and blood pressure. It's also important to periodically check __for complications__ — an eye exam for retinopathy, a urine albumin test for kidney disease, a neurological exam (numbness, sensation checks), and an ECG.",
      treatment:
        "Diet and exercise therapy (walking, ideally aiming for around 8,000–9,000 steps a day) usually forms the foundation; if that isn't enough, we consider oral medications or injectable treatments. The general target for blood sugar control is **HbA1c below 7.0%**, though this varies considerably based on age, hypoglycemia risk, and other conditions — a more lenient target (such as below 8.0%) may be appropriate for some. Managing **other lifestyle-related conditions** — blood pressure (target below 130/80mmHg at the clinic, below 125/75mmHg at home) and LDL cholesterol — is also important for preventing complications. The type and intensity of medication is judged individually based on kidney function and cardiovascular status, working with specialist institutions as needed.",
      tip: "HbA1c reflects your average blood sugar over the past 1–2 months and is less affected by what you ate that day. Because diabetes can progress with few symptoms, __even if your numbers look stable, please don't stop your visits or medication on your own judgment__ — continuing regular check-ups and complication screening is recommended.",
    },
  },
  {
    slug: "gallstones",
    title: "胆石症",
    category: "internal",
    summary: "胆のう等にできる石（結石）により、腹痛等の症状を起こすことがある病気です。無症状のまま経過することも少なくありません。",
    pathology:
      "胆のうや胆管の中にできる結石（胆石）による病気の総称です。__コレステロールを主成分とするものが最も多く__、脂肪分の多い食事、肥満、女性、妊娠、急激な体重減少等がリスクとされています。胆石があっても症状が出ない「無症状胆石」も多く見つかりますが、__石が胆のうの出口等に詰まると、食後（特に脂っこい食事の後）に右上腹部〜みぞおちにかけての痛み（疝痛発作）__が起こることがあります。",
    tests:
      "__腹部エコー（超音波）検査__が胆石の診断に有用で、当院でも行うことができます。必要に応じて血液検査（肝機能・炎症反応等）やCT検査を組み合わせ、胆のう炎・胆管炎等の合併症がないかを確認します。",
    treatment:
      "__無症状の胆石は、多くの場合経過観察__で問題ありません。症状（疝痛発作）を繰り返す場合や、胆のう炎等の合併症を起こした場合には、**腹腔鏡下胆のう摘出術**が標準的な治療として検討されます。手術が必要と判断した場合は、連携医療機関へご紹介します。",
    tip: "__「脂っこい食事の後に右上腹部が痛む」__というパターンに心当たりがある場合は、胆石が関係していることがあります。症状を繰り返す場合、発熱や黄疸（皮膚や白目が黄色くなる）を伴う場合は、合併症の可能性があるため早めのご相談をお勧めします。",
    sources: [
      {
        label: "急性胆管炎・胆嚢炎診療ガイドライン改訂出版委員会「急性胆管炎・胆嚢炎診療ガイドライン2018（TG18新基準）」",
        url: "https://minds.jcqhc.or.jp/summary/c00467/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Gallstones",
      summary: "Stones that form in the gallbladder and can cause abdominal pain and other symptoms, though many people have no symptoms at all.",
      pathology:
        "A general term for conditions caused by stones (gallstones) forming in the gallbladder or bile ducts. __Cholesterol stones are by far the most common type__, with risk factors including a high-fat diet, obesity, being female, pregnancy, and rapid weight loss. Many gallstones are found incidentally and cause no symptoms (\"silent gallstones\"), but __if a stone blocks the outlet of the gallbladder, it can cause pain in the upper right abdomen to the pit of the stomach__ (biliary colic), typically after eating — especially a fatty meal.",
      tests:
        "__Abdominal ultrasound__ is useful for diagnosing gallstones and is available at our clinic. We combine this with blood tests (liver function, inflammation markers) and CT as needed to check for complications such as cholecystitis or cholangitis.",
      treatment:
        "__Silent, symptom-free gallstones are usually simply monitored over time__. If colic episodes recur, or if a complication like cholecystitis develops, **laparoscopic gallbladder removal** is considered the standard treatment. If surgery is needed, we refer you to a partner institution.",
      tip: "If you recognize the pattern of __\"upper right abdominal pain after a fatty meal,\"__ gallstones may be involved. If symptoms recur, or if you develop fever or jaundice (yellowing of the skin or whites of the eyes), please come in soon, as these can signal a complication.",
    },
  },
  {
    slug: "cholecystitis",
    title: "胆嚢炎（急性胆嚢炎）",
    category: "surgical",
    summary: "多くは胆石が原因となって胆のうに炎症が起こる病気で、進行すると緊急手術が必要になることがあります。",
    pathology:
      "胆のうの出口を胆石がふさぐ等の原因で、胆のう内に炎症が起こった状態です。__持続する右上腹部〜みぞおちの痛みに加え、発熱を伴う__ことが特徴で、胆石による疝痛発作が治まらず悪化した状態と考えると分かりやすいです。進行すると__胆のうが壊死したり、周囲に膿が広がったりする__重篤な状態（重症胆嚢炎）に至ることがあります。",
    tests:
      "__腹部エコー（胆のう壁の肥厚等を確認）__に加え、血液検査（炎症反応・肝機能）、CT検査で重症度や周囲への炎症の広がりを評価します。__Murphy徴候（エコーのプローブで右上腹部を押さえながら深呼吸してもらうと痛みで息が止まる所見）__も診断の参考になります。",
    treatment:
      "診断がつけば、**絶食・補液・抗菌薬治療**を開始しつつ、__早期の腹腔鏡下胆のう摘出術__が標準的な治療として推奨されています。全身状態等により早期手術が難しい場合は、__胆のうに管を入れて排膿するドレナージ処置__を先行し、炎症が落ち着いてから手術を行うこともあります。診断がつき次第、入院治療・手術が可能な連携医療機関へ速やかにご紹介します。",
    tip: "__胆石をお持ちの方で、強い右上腹部痛に発熱が加わった__場合は、胆嚢炎に進行している可能性があります。自己判断で痛み止めだけで様子を見ず、早めの受診をお勧めします。",
    sources: [
      {
        label: "急性胆管炎・胆嚢炎診療ガイドライン改訂出版委員会「急性胆管炎・胆嚢炎診療ガイドライン2018（TG18新基準）」",
        url: "https://minds.jcqhc.or.jp/summary/c00467/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Cholecystitis (acute cholecystitis)",
      summary: "Usually caused by a gallstone, this is inflammation of the gallbladder, which can progress to needing emergency surgery.",
      pathology:
        "A state of inflammation inside the gallbladder, typically caused by a gallstone blocking its outlet. __Persistent pain in the upper right abdomen to the pit of the stomach, together with fever,__ is characteristic — think of it as biliary colic that hasn't settled and has worsened. If it progresses, it can lead to a serious condition (severe cholecystitis) where __the gallbladder becomes necrotic or pus spreads to surrounding tissue__.",
      tests:
        "__Abdominal ultrasound__ (checking for thickening of the gallbladder wall, etc.), along with blood tests (inflammation markers, liver function) and CT to assess severity and how far the inflammation has spread. __Murphy's sign__ (pain that stops your breath when the right upper abdomen is pressed with the ultrasound probe during a deep breath) is also a useful diagnostic clue.",
      treatment:
        "Once diagnosed, we start **fasting, IV fluids, and antibiotic treatment**, while __early laparoscopic gallbladder removal__ is recommended as the standard treatment. If early surgery isn't feasible due to overall condition, __a drainage procedure to insert a tube into the gallbladder to remove the pus__ may be done first, with surgery once the inflammation has settled. As soon as a diagnosis is made, we promptly refer you to a partner institution capable of inpatient treatment and surgery.",
      tip: "If you have known gallstones and develop __strong upper right abdominal pain plus fever__, this may indicate progression to cholecystitis. Please don't just manage it with painkillers on your own — come in soon.",
    },
  },
  {
    slug: "ureteral-stone",
    title: "尿管結石症（尿路結石）",
    category: "internal",
    summary: "腎臓でできた結石が尿管に詰まることで、突然の激しい腹痛・腰背部痛を起こす病気です。",
    pathology:
      "腎臓でできた結石（尿路結石）が尿管に入り込み、詰まることで起こります。__結石が尿の通り道をふさぐと、腎臓に尿がたまって圧がかかり（水腎症）、突然の激しい腰背部〜下腹部の痛み（疝痛発作）__が起こるのが特徴です。痛みは__じっとしていられないほど強く、波があるように__現れることが多く、血尿を伴うこともあります。__男性にやや多く、生涯で再発を繰り返しやすい__病気としても知られています。",
    tests:
      "問診・診察、尿検査（血尿の確認）に加え、__腹部エコー・CT検査__で結石の有無・部位・大きさを確認します。__CT検査は結石の発見に最も有用__とされています。",
    treatment:
      "__結石の大きさが小さい場合は、水分摂取や鎮痛薬、排石を促す薬（α1遮断薬等）を用いながら自然排石を待つ__ことが基本です。結石が大きい、痛みが強い、感染や腎機能の低下を伴う等の場合には、__体外衝撃波結石破砕術（ESWL）や内視鏡的な治療__が必要となることがあり、専門的な治療が可能な医療機関へご紹介します。",
    tip: "__一度尿路結石を経験した方は、再発しやすい__ことが分かっています。水分摂取量を増やすことや、食事内容（塩分・動物性タンパク質の摂り過ぎに注意等）の見直しが、再発予防に役立つことがあります。突然の激しい腰背部痛がある場合は、早めにご相談ください。",
    sources: [
      {
        label: "尿路結石症診療ガイドライン改訂委員会「尿路結石症診療ガイドライン 第3版」",
        url: "https://minds.jcqhc.or.jp/summary/c00807/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Ureteral stones (urinary tract stones)",
      summary: "A stone that forms in the kidney and gets lodged in the ureter, causing sudden severe abdominal and lower-back pain.",
      pathology:
        "This occurs when a stone that formed in the kidney (a urinary tract stone) moves into the ureter and becomes lodged. __When the stone blocks the flow of urine, pressure builds up in the kidney (hydronephrosis), causing sudden, severe pain in the lower back to lower abdomen__ (renal colic). The pain is often __so intense you can't stay still, and comes in waves__, sometimes with blood in the urine. __It's somewhat more common in men and known for recurring throughout a person's life.__",
      tests:
        "In addition to history-taking, a physical exam, and a urine test (checking for blood), __abdominal ultrasound and CT__ confirm the presence, location, and size of the stone. __CT is considered the most useful test for finding stones.__",
      treatment:
        "__For small stones, the usual approach is to wait for natural passage__ while encouraging fluid intake and using pain relievers and medications that help the stone pass (such as alpha-1 blockers). If the stone is large, pain is severe, or there's infection or declining kidney function, __extracorporeal shock wave lithotripsy (ESWL) or endoscopic treatment__ may be needed, and we refer you to an institution capable of specialized treatment.",
      tip: "__Anyone who has had a urinary stone once is known to be more likely to get another.__ Drinking more water and reviewing your diet (watching excess salt and animal protein) can help prevent recurrence. If you have sudden, severe lower back pain, please come in soon.",
    },
  },
  {
    slug: "acute-cystitis",
    title: "急性膀胱炎",
    category: "internal",
    summary: "細菌感染により膀胱に炎症が起こる病気で、頻尿・排尿時痛等を起こします。女性に多くみられます。",
    pathology:
      "多くは__大腸菌等の細菌が尿道から膀胱に入り込み感染する__ことで起こります。女性は尿道が短いため男性より感染しやすいとされ、__頻尿、排尿時痛（特に排尿の終わり頃に痛む）、残尿感、尿の濁り__等の症状が特徴的です。__発熱や腰背部痛を伴う場合は、腎盂腎炎（腎臓まで感染が広がった状態）__に進行している可能性があり、注意が必要です。",
    tests: "尿検査（尿中の白血球・細菌の確認）が基本の検査です。必要に応じて尿培養検査で原因菌を特定し、治療薬の選択に役立てます。",
    treatment:
      "__抗菌薬の内服__が基本の治療で、多くは数日以内に症状が改善します。__水分摂取を増やす__ことも排泄を促し回復を助けます。症状が改善しても指示された期間はきちんと内服を続けることが、再発予防の観点からも大切です。",
    tip: "__「我慢していれば治る」と放置すると、腎盂腎炎に進行し発熱等の全身症状を起こすことがあります__。頻尿・排尿時痛等の症状があれば、早めにご相談ください。",
    sources: [
      {
        label: "JAID/JSC感染症治療ガイド・ガイドライン作成委員会「JAID/JSC感染症治療ガイド2019（尿路感染症・男性性器感染症）」",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Acute cystitis",
      summary: "A bladder infection caused by bacteria, causing frequent urination, pain on urination, and similar symptoms. It's more common in women.",
      pathology:
        "Usually caused by __bacteria such as E. coli entering the bladder through the urethra__. Women are more prone to infection than men because of a shorter urethra. Characteristic symptoms include __frequent urination, pain on urination (especially toward the end), a feeling of incomplete emptying, and cloudy urine__. __If fever or lower-back pain develops, this may indicate progression to pyelonephritis__ (infection spreading up to the kidney), which needs attention.",
      tests: "A urine test (checking for white blood cells and bacteria) is the basic test. A urine culture may be done as needed to identify the causative bacteria and guide treatment.",
      treatment:
        "__Oral antibiotics__ are the standard treatment, and symptoms usually improve within a few days. __Increasing fluid intake__ also helps by promoting urination and supporting recovery. Even once symptoms improve, finishing the full prescribed course is important for preventing recurrence.",
      tip: "__\"Just toughing it out\" and leaving it untreated can allow it to progress to pyelonephritis, with fever and other whole-body symptoms.__ If you have frequent urination or pain on urination, please come in soon.",
    },
  },
  {
    slug: "chronic-cystitis",
    title: "慢性膀胱炎（膀胱炎の再発・長引く症状）",
    category: "internal",
    summary: "膀胱炎を繰り返す、または症状が長引く状態です。閉経後の女性や男性では、背景の見極めがより重要になります。",
    pathology:
      "急性膀胱炎を__繰り返す、または症状が完全には改善せず長引く状態__を指します。閉経後の女性は__女性ホルモンの低下により粘膜の抵抗力が落ち、再発しやすくなる__ことが知られています。男性の膀胱炎は、前立腺肥大等の背景疾患を伴う「複雑性膀胱炎」として扱われることが多く、__基礎疾患の検索__が重要です。__膀胱炎症状があるのに細菌が検出されない「間質性膀胱炎」という別の病気__が隠れていることもあります。",
    tests: "尿検査・尿培養検査に加え、__繰り返す場合は背景疾患の評価（エコーでの残尿測定、前立腺の評価等）__を行います。",
    treatment:
      "原因菌に応じた__抗菌薬治療__を基本としつつ、__背景疾患（前立腺肥大等）があればその治療__もあわせて行います。__抗菌薬で検査上は改善しても症状が残る場合に、漢方薬（猪苓湯等）を併用する__ことが選択肢として用いられることもあります。間質性膀胱炎等、特殊な病態が疑われる場合には専門医療機関へのご紹介を検討します。",
    tip: "男性の膀胱炎や、閉経後に繰り返す膀胱炎は、__単純な感染症ではなく背景に別の病気が隠れていることがある__ため、「いつもの膀胱炎」と自己判断せず、一度しっかり評価を受けることをお勧めします。",
    sources: [
      {
        label: "JAID/JSC感染症治療ガイド・ガイドライン作成委員会「JAID/JSC感染症治療ガイド2019（尿路感染症・男性性器感染症）」",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Chronic cystitis (recurring or persistent bladder infection)",
      summary: "Bladder infections that keep recurring, or symptoms that drag on. In postmenopausal women and in men, understanding the underlying cause matters even more.",
      pathology:
        "This refers to acute cystitis that __keeps recurring, or doesn't fully resolve and drags on__. Postmenopausal women are known to be __more prone to recurrence because declining estrogen weakens the mucosal lining's resistance__. Cystitis in men is often treated as \"complicated cystitis\" involving an underlying condition such as enlarged prostate, so __searching for an underlying cause__ is important. __A separate condition called \"interstitial cystitis,\" where bladder symptoms occur without any detectable bacteria,__ can sometimes be the real issue.",
      tests: "A urine test and urine culture, plus, __for recurring cases, an evaluation of underlying conditions__ (ultrasound measurement of residual urine, prostate assessment, etc.).",
      treatment:
        "__Antibiotic treatment__ targeted to the causative bacteria is the basis, alongside __treating any underlying condition__ (such as enlarged prostate) if present. __When symptoms persist despite the infection clearing on tests, adding a kampo (traditional Japanese herbal) medicine such as choreito__ is sometimes used as an option. If a distinct condition like interstitial cystitis is suspected, we consider referral to a specialist institution.",
      tip: "Cystitis in men, or cystitis that keeps recurring after menopause, __may not be a simple infection — something else may be behind it__. Rather than assuming it's \"the usual cystitis,\" it's worth getting a thorough evaluation.",
    },
  },
  {
    slug: "bph",
    title: "前立腺肥大症",
    category: "internal",
    summary:
      "夜間のトイレが増えた、尿の勢いが弱くなった…。中高年男性の多くが経験する、治療の選択肢が豊富な病気です。",
    pathology:
      "加齢に伴い、__膀胱の出口近くにある前立腺が大きくなる__ことで、__尿の通り道が狭くなり、排尿にまつわるさまざまな症状（下部尿路症状）__が起こる病気です。__夜間に何度もトイレに起きる（夜間頻尿）、尿の勢いが弱い、尿が出きるまでに時間がかかる、排尿後も残尿感がある__等の症状が代表的で、__60歳以上の男性の多くに何らかの症状がみられる__、非常に頻度の高い病気です。__進行すると、尿が完全に出なくなる「尿閉」を起こす__こともあります。",
    tests:
      "__国際前立腺症状スコア（IPSS）という問診票__で症状の重症度を評価し、__腹部エコーで前立腺の大きさ・残尿量__を確認します。__前立腺がんとの鑑別のため、血液検査（PSA）__もあわせて行うことが一般的です。",
    treatment:
      "**内服薬治療（α1遮断薬、5α還元酵素阻害薬等）**が基本で、__多くの方は薬物治療で症状がコントロールできます__。__前立腺の過活動膀胱症状を伴う場合は、過活動膀胱の治療薬を併用する__こともあります。__薬物治療で改善が乏しい場合や、尿閉を繰り返す場合__には、__手術治療（内視鏡的前立腺切除術等）が可能な専門医療機関__へご紹介します。",
    tip: "__「年のせいだから仕方がない」と夜間のトイレの回数の増加を我慢している__方が多い病気ですが、__放置して進行すると尿閉等のトラブルにつながる__ことがあります。__IPSSという問診票だけでも、ご自身の症状の重症度がある程度分かる__ので、__「夜中に2回以上トイレに起きる」「尿の勢いが弱くなった」と感じたら、一度ご相談ください__。__治療の選択肢が豊富にある病気__なので、我慢せず相談いただくことが、生活の質の向上につながります。",
    sources: [
      {
        label: "日本泌尿器科学会「男性下部尿路症状・前立腺肥大症診療ガイドライン」",
        url: "https://minds.jcqhc.or.jp/?p=2161",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Benign prostatic hyperplasia (enlarged prostate)",
      summary: "More trips to the bathroom at night, a weaker urine stream... A condition many middle-aged and older men experience, with plenty of treatment options.",
      pathology:
        "With age, __the prostate, located near the bladder outlet, enlarges__, __narrowing the urinary passage and causing a range of urinary symptoms__ (lower urinary tract symptoms). Typical symptoms include __needing to urinate multiple times at night (nocturia), a weak stream, taking a while for urine to start, and a feeling of incomplete emptying__. It's extremely common — __most men over 60 have some degree of symptoms__. __In advanced cases, it can cause \"urinary retention,\" a complete inability to urinate.__",
      tests:
        "We assess severity using __the International Prostate Symptom Score (IPSS), a standard questionnaire__, and check __prostate size and residual urine with abdominal ultrasound__. __A blood test (PSA) to distinguish from prostate cancer__ is also typically done.",
      treatment:
        "**Oral medication (alpha-1 blockers, 5-alpha reductase inhibitors, etc.)** is the mainstay, and __most people's symptoms can be controlled with medication__. If overactive bladder symptoms are also present, __an overactive bladder medication may be added__. __If medication isn't effective enough, or urinary retention keeps recurring__, we refer you to __a specialist institution capable of surgical treatment__ (such as endoscopic prostate resection).",
      tip: "__Many people simply put up with more frequent nighttime bathroom trips, assuming it's \"just age,\"__ but __left untreated, it can progress to problems like urinary retention__. __The IPSS questionnaire alone can give you a rough sense of how severe your symptoms are__, so if you notice __\"waking to urinate twice or more a night\" or \"a weaker stream than before,\"__ please come talk to us. __With plenty of treatment options available,__ there's no need to simply endure it — getting help can genuinely improve your quality of life.",
    },
  },
  {
    slug: "community-acquired-pneumonia",
    title: "市中肺炎",
    category: "internal",
    summary: "普段の生活の中でかかる肺炎です。発熱・咳・痰等のかぜに似た症状で始まることもあり、重症度の見極めが大切です。",
    pathology:
      "病院や施設以外の普段の生活の中で感染して発症する肺炎を__市中肺炎__と呼びます。__肺炎球菌、インフルエンザ菌、マイコプラズマ等__の細菌・微生物が原因となることが多く、__発熱・咳・痰・倦怠感__等、かぜとよく似た症状で始まることもありますが、__息苦しさを伴う、症状が急速に悪化する__等の違いがみられます。高齢者や基礎疾患のある方は重症化しやすいとされています。",
    tests:
      "__胸部X線検査__で肺炎の有無・広がりを確認し、血液検査で炎症反応や全身状態を評価します。原因菌を調べるため、必要に応じて迅速抗原検査（肺炎球菌・マイコプラズマ等）を行うこともあります。",
    treatment:
      "__重症度を評価したうえで治療方針を決める__ことが重要です。軽症〜中等症で全身状態が保たれていれば、__外来での抗菌薬治療と経過観察__が可能なことが多いですが、__重症度が高い場合や呼吸状態が不安定な場合は入院治療__が必要となるため、連携医療機関へご紹介します。",
    tip: "「ただのかぜ」と自己判断して様子を見ているうちに悪化するケースもあります。__高熱が続く、息苦しさがある、症状が急に悪化した__等の場合は、早めにご相談ください。",
    sources: [
      {
        label: "日本呼吸器学会「成人肺炎診療ガイドライン2024」",
        url: "https://minds.jcqhc.or.jp/summary/c00846/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Community-acquired pneumonia",
      summary: "Pneumonia caught in the course of everyday life. It can start with cold-like symptoms such as fever, cough, and phlegm, so assessing severity matters.",
      pathology:
        "Pneumonia that develops from infection acquired in everyday life, outside hospitals or care facilities, is called __community-acquired pneumonia__. It's often caused by bacteria or other organisms such as __Streptococcus pneumoniae, Haemophilus influenzae, and Mycoplasma__, and can start with cold-like symptoms — __fever, cough, phlegm, fatigue__ — but differs in that it may __involve shortness of breath or worsen rapidly__. Older adults and those with underlying conditions are more prone to severe disease.",
      tests:
        "__Chest X-ray__ checks for the presence and extent of pneumonia, and blood tests assess inflammation and overall condition. Rapid antigen tests (for pneumococcus, mycoplasma, etc.) may be used as needed to identify the cause.",
      treatment:
        "__Deciding on treatment starts with assessing severity.__ For mild to moderate cases where overall condition is stable, __outpatient antibiotic treatment with monitoring__ is often possible, but __if severity is high or breathing is unstable, inpatient treatment is needed__, and we refer you to a partner institution.",
      tip: "Some cases worsen while being dismissed as \"just a cold.\" If you have __a persistent high fever, shortness of breath, or symptoms that suddenly worsen__, please come in soon.",
    },
  },
  {
    slug: "aspiration-pneumonia",
    title: "誤嚥性肺炎",
    category: "internal",
    summary: "食べ物や唾液等が誤って気管に入り込む（誤嚥）ことで起こる肺炎で、高齢の方に多くみられます。",
    pathology:
      "食べ物・飲み物・唾液等が、本来通るべき食道ではなく__誤って気管・肺に入り込む（誤嚥）__ことで起こる肺炎です。加齢や脳卒中の後遺症等により__飲み込む力（嚥下機能）が低下している方__に多く、__はっきりとした発熱・咳がなく、「なんとなく元気がない」「食欲がない」__等の非典型的な症状で見つかることもあります。__繰り返しやすい__ことも特徴です。",
    tests: "胸部X線検査・血液検査で肺炎の有無・重症度を評価します。__嚥下機能の評価（水を飲んでもらう検査等）__を行い、誤嚥のリスクを確認することもあります。",
    treatment:
      "__抗菌薬治療__に加えて、__口腔ケア（口の中を清潔に保つこと）や、食事の形態の工夫（とろみをつける等）、嚥下リハビリテーション__等、__誤嚥を防ぐための対策__をあわせて行うことが重要です。重症の場合は入院治療が必要となり、連携医療機関へご紹介します。",
    tip: "__食事中にむせることが増えた、食べるのに時間がかかるようになった__等の変化は、嚥下機能低下のサインであることがあります。誤嚥性肺炎は__繰り返しやすい__ため、普段からの口腔ケアや食事の工夫が予防に役立ちます。気になる変化があれば、早めにご相談ください。",
    sources: [
      {
        label: "日本呼吸器学会「成人肺炎診療ガイドライン2024」",
        url: "https://minds.jcqhc.or.jp/summary/c00846/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Aspiration pneumonia",
      summary: "Pneumonia caused by food, saliva, or other material accidentally entering the airway (aspiration), seen most often in older adults.",
      pathology:
        "Pneumonia that occurs when food, drink, or saliva __accidentally enters the windpipe and lungs instead of the esophagus__ (aspiration). It's common in people whose __swallowing function has declined__ due to age or after a stroke, and can sometimes show up as vague, non-specific symptoms — __\"seeming a bit off\" or loss of appetite__ — rather than a clear fever or cough. __It's also prone to recurring.__",
      tests: "Chest X-ray and blood tests assess the presence and severity of pneumonia. __An assessment of swallowing function__ (such as a water-swallowing test) may also be done to check aspiration risk.",
      treatment:
        "Alongside __antibiotic treatment__, it's important to combine measures to __prevent aspiration__ — __oral care (keeping the mouth clean), adjusting food texture (such as thickening liquids), and swallowing rehabilitation__. Severe cases require inpatient treatment, and we refer you to a partner institution.",
      tip: "__Coughing more often while eating, or taking longer to eat__ can be signs of declining swallowing function. Because aspiration pneumonia __tends to recur__, regular oral care and adjustments to meals help prevent it. If you notice concerning changes, please come in soon.",
    },
  },
  {
    slug: "overactive-bladder",
    title: "過活動膀胱（OAB）",
    category: "internal",
    summary: "急に強い尿意をもよおし、我慢が難しくなる状態です。加齢とともに頻度が増えますが、治療で改善が期待できます。",
    pathology:
      "__急に強い尿意（尿意切迫感）が起こり、我慢することが難しくなる__状態で、__頻尿や、間に合わず漏れてしまう（切迫性尿失禁）__を伴うこともあります。加齢に伴う膀胱機能の変化のほか、__男性では前立腺肥大症、女性では骨盤底の緩み__等が背景にあることもあります。__命に関わる病気ではありませんが、生活の質（QOL）に大きく影響する__ことが知られています。",
    tests: "問診（症状の頻度・程度の確認）に加え、尿検査で感染症等の他の原因を除外します。__腹部エコーで残尿量を測定__し、排尿の状態を評価することもあります。",
    treatment:
      "__膀胱訓練（尿意を感じても少し我慢する練習）や骨盤底筋体操__等の行動療法がまず基本となります。効果が不十分な場合は、__抗コリン薬やβ3受容体刺激薬__等の内服薬による治療を検討します。男性で前立腺肥大症が背景にある場合は、その治療もあわせて行います。",
    tip: "__「年のせい」と諦めてしまう方も多い__症状ですが、__治療によって改善が期待できる__ことが分かっています。トイレの場所が気になって外出を控える等、__生活に支障が出ている場合は、一度ご相談ください__。",
    sources: [
      {
        label: "日本排尿機能学会・日本泌尿器科学会「過活動膀胱診療ガイドライン 第3版」",
        url: "https://minds.jcqhc.or.jp/summary/c00740/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Overactive bladder (OAB)",
      summary: "A sudden, strong urge to urinate that's hard to hold. It becomes more common with age, but treatment can genuinely help.",
      pathology:
        "A condition involving __a sudden, strong urge to urinate (urgency) that's hard to hold__, sometimes with __frequent urination or leakage before reaching the bathroom (urge incontinence)__. Besides age-related changes in bladder function, underlying causes can include __enlarged prostate in men or a weakened pelvic floor in women__. __It isn't life-threatening, but it's known to significantly affect quality of life.__",
      tests: "History-taking (checking frequency and severity of symptoms), plus a urine test to rule out infection and other causes. __Abdominal ultrasound to measure residual urine__ may also be used to assess urination.",
      treatment:
        "__Behavioral therapy — bladder training (practicing holding slightly longer when you feel the urge) and pelvic floor exercises__ — is typically the first step. If that isn't enough, we consider medication such as __anticholinergics or beta-3 agonists__. If enlarged prostate is an underlying factor in men, we treat that as well.",
      tip: "__Many people simply write this off as \"just age,\"__ but __treatment can genuinely help__. If it's affecting your life — for instance, avoiding going out because you're worried about finding a bathroom — please come talk to us.",
    },
  },
  {
    slug: "insomnia",
    title: "不眠症",
    category: "internal",
    summary: "寝つきが悪い・夜中に目が覚める等の症状が続き、日中の生活に支障が出る状態です。背景によって対応が異なります。",
    pathology:
      "__寝つきが悪い（入眠困難）、夜中に何度も目が覚める（中途覚醒）、朝早くに目が覚めてしまう（早朝覚醒）、眠った感じがしない（熟眠障害）__等の症状が続き、__それにより日中の眠気・集中力低下等、生活に支障が出ている状態__を不眠症といいます。__ストレス、生活リズムの乱れ、加齢、他の病気（睡眠時無呼吸症候群、うつ病、痛みを伴う病気等）やお薬の影響__等、様々な背景があります。",
    tests:
      "問診で__不眠のパターン・経過・生活習慣__を詳しく確認することが診断の基本です。__睡眠時無呼吸症候群や他の病気が背景に疑われる場合__は、必要な検査（血液検査等）を行い、原因疾患の治療を優先することもあります。",
    treatment:
      "__まず睡眠衛生指導（生活リズム、寝室環境、カフェイン・アルコールの摂り方等の見直し）__を行うことが基本とされています。改善が乏しい場合は、__睡眠薬による薬物治療__を検討しますが、__漫然とした長期使用は避け、症状が改善すれば減量・休薬を見据えて治療を進める__ことが推奨されています。__高齢の方は薬の副作用（ふらつき・転倒等）のリスクが高い__ため、特に慎重な薬剤選択が必要です。",
    tip: "__「眠れない」の背景には、生活習慣の問題だけでなく、他の病気が隠れていることもあります__。市販の睡眠改善薬を自己判断で使い続ける前に、一度ご相談いただくことで、根本的な原因に応じた対応につながることがあります。",
    sources: [
      {
        label: "厚生労働科学研究班・日本睡眠学会「睡眠薬の適正な使用と休薬のための診療ガイドライン」",
        url: "https://www.jssr.jp/data/pdf/suiminyaku-guideline.pdf",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Insomnia",
      summary: "Trouble falling asleep, waking in the night, and similar symptoms that persist and interfere with daytime life. The right approach depends on what's behind it.",
      pathology:
        "Insomnia refers to persistent __difficulty falling asleep, waking repeatedly during the night, waking too early in the morning, or not feeling rested even after sleeping__, __to the point that it interferes with daytime life__ — daytime sleepiness, poor concentration, and so on. It has many possible backgrounds, including __stress, disrupted daily rhythms, aging, other conditions (sleep apnea, depression, painful conditions, etc.), or medication side effects__.",
      tests:
        "Detailed history-taking about __the pattern of insomnia, its course, and lifestyle habits__ is the basis of diagnosis. __If sleep apnea or another underlying condition is suspected__, we run the necessary tests (blood work, etc.) and may prioritize treating that underlying cause.",
      treatment:
        "__Sleep hygiene guidance__ (reviewing daily rhythm, bedroom environment, caffeine and alcohol habits, etc.) is the usual starting point. If that isn't enough, we consider __medication (sleep aids)__, but __prolonged, open-ended use is avoided — treatment is planned with eventual dose reduction or discontinuation in mind once symptoms improve__. __Older patients face a higher risk of medication side effects (unsteadiness, falls, etc.),__ so medication choice requires particular care.",
      tip: "__\"Can't sleep\" isn't always just a lifestyle issue — another condition can sometimes be behind it.__ Before continuing to rely on over-the-counter sleep aids on your own, talking it over with us can help identify and address the underlying cause.",
    },
  },
  {
    slug: "stomatitis",
    title: "口内炎（アフタ性口内炎）",
    category: "internal",
    summary: "口の中にできる痛みを伴う潰瘍です。ステロイド軟膏等の一般的な治療のほかに、漢方薬のうがいという選択肢もあります。",
    pathology:
      "口内炎は、口の中の粘膜にできる炎症性の潰瘍の総称です。最も多いのは__アフタ性口内炎__で、円形〜類円形の境界明瞭な浅い潰瘍が、頬の内側や唇の裏、舌の縁等にできます。外傷（頬を噛む等）、過労・ストレス、睡眠不足、ビタミン・鉄分等の栄養不足、免疫の変化等が誘因となるとされていますが、__はっきりした原因が分からないまま繰り返すことも多く__、「慢性再発性アフタ」と呼ばれます。多くは1〜2週間程度で自然に治りますが、**2週間以上治らない・同じような潰瘍を繰り返す・大きく深い潰瘍**等の場合は、他の病気（口腔がん、ベーチェット病、炎症性腸疾患等）との鑑別が必要になることがあります。",
    tests:
      "多くは視診で診断できます。__治りが悪い・繰り返す・大きい等の場合__には、他の病気との鑑別のため血液検査（鉄・ビタミンB群・亜鉛等の欠乏や全身疾患の評価）を行うことがあります。",
    treatment:
      "一般的には、__ステロイド含有の口腔用軟膏・貼付剤__を患部に塗布して炎症を抑えることが基本となり、痛みが強い場合はうがい薬（含嗽剤）や鎮痛薬を併用することもあります。実は、こうした一般的な治療法以外にも、**漢方薬「半夏瀉心湯（はんげしゃしんとう）」を使う方法**が知られています。半夏瀉心湯は添付文書上も口内炎が適応として認められている漢方薬で、__内服するだけでなく、お湯に溶かして「うがい（含嗽）」として直接患部に効かせる__という独特の使い方があります。大腸がんの化学療法に伴う口内炎を対象とした国内の比較試験では、半夏瀉心湯を使った群でGrade2以上の口内炎の持続期間がプラセボと比べて短縮したとの報告もあり、__一般的な口内炎に対しても選択肢のひとつとして取り入れられることがあります__。ただし、通常のアフタ性口内炎そのものを対象とした大規模な比較試験は限られているため、あくまで__通常の治療と組み合わせる選択肢__として捉えていただくのがよいでしょう。",
    tip: "__2週間以上治らない・繰り返す場所が一定しない・潰瘍が大きく深い・体重減少や下痢等の全身症状を伴う__等の場合は、他の病気が隠れていないか確認が必要です。半夏瀉心湯は体質によって合わない場合（むくみ・血圧上昇等）もあるため、__ご興味のある方は自己判断で市販薬を使う前に、一度ご相談ください__。",
    sources: [
      {
        label: "日本歯科医学会「レーザー応用による再発性アフタ性口内炎治療に関する基本的な考え方」（2018年）",
        url: "https://www.jads.jp/assets/pdf/basic/before_h30/document_04.pdf",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Mouth ulcers (aphthous stomatitis)",
      summary: "Painful ulcers in the mouth. Besides standard treatments like steroid ointment, a kampo (herbal) mouth rinse is also an option.",
      pathology:
        "Stomatitis is a general term for inflammatory ulcers on the oral mucosa. The most common type is __aphthous stomatitis__ — shallow, round to oval ulcers with clear borders, usually on the inner cheek, inside of the lip, or edge of the tongue. Triggers are thought to include trauma (biting the cheek), fatigue or stress, lack of sleep, nutritional deficiencies (vitamins, iron, etc.), and immune changes, but __many cases recur without a clear identifiable cause__, known as \"chronic recurrent aphthae.\" Most heal on their own within one to two weeks, but if an ulcer **doesn't heal within two weeks, keeps recurring in the same way, or is unusually large and deep**, we may need to rule out other conditions (oral cancer, Behçet's disease, inflammatory bowel disease, etc.).",
      tests:
        "Most cases can be diagnosed by visual examination. __If healing is poor, recurrence is frequent, or the ulcer is large,__ blood tests may be done to check for deficiencies (iron, B vitamins, zinc, etc.) or an underlying systemic condition.",
      treatment:
        "The standard approach is applying a __steroid oral ointment or patch__ to reduce inflammation, with a mouth rinse or pain reliever added if pain is significant. There's also a lesser-known option beyond standard treatment: **the kampo medicine hangeshashinto**. It's officially indicated for stomatitis and has a distinctive use — __not just taken orally, but dissolved in hot water and used as a mouth rinse (gargle) directly on the affected area__. In a Japanese comparative trial involving stomatitis caused by chemotherapy for colorectal cancer, the group using hangeshashinto had a shorter duration of Grade 2+ stomatitis compared to placebo, and __it's sometimes used as one option for ordinary stomatitis as well__. That said, large comparative trials specifically on typical aphthous stomatitis are limited, so it's best thought of as __an option to combine with standard treatment__.",
      tip: "__If an ulcer doesn't heal within two weeks, keeps appearing in different spots, is large and deep, or comes with whole-body symptoms like weight loss or diarrhea,__ it's worth checking for another underlying condition. Hangeshashinto doesn't suit everyone's constitution (it can cause swelling, raised blood pressure, etc. in some people), so __if you're interested, please talk to us before trying an over-the-counter version on your own.__",
    },
  },
  {
    slug: "appendicitis",
    title: "虫垂炎（急性虫垂炎）",
    category: "surgical",
    summary: "盲腸の近くにある虫垂という小さな臓器に炎症が起こる病気で、進行すると緊急手術が必要になることがあります。",
    pathology:
      "**虫垂**は盲腸から伸びる細い袋状の臓器で、ここに炎症が起こった状態が__虫垂炎（いわゆる「盲腸」）__です。虫垂の入り口が便の塊（糞石）やリンパ組織の腫れ等でふさがれ、中で細菌が増殖することが主な原因と考えられています。典型的には__みぞおち〜おへそ周囲の痛みで始まり、時間とともに右下腹部に痛みが移動する__という経過をたどりますが、__子ども・高齢者・妊婦等では典型的な経過をたどらないこともある__ため注意が必要です。進行すると虫垂が破裂し、腹膜炎という重篤な状態に至ることがあります。",
    tests:
      "問診・診察（右下腹部の圧痛等の確認）に加え、__血液検査（炎症反応の確認）、腹部エコー、CT__を組み合わせて評価します。超音波検査を第一選択としつつ、所見がはっきりしない場合や穿孔が疑われる場合にはCT検査を追加することが推奨されています。",
    treatment:
      "炎症の程度に応じて、__抗菌薬による保存的治療__で軽快する軽症例もありますが、**手術（虫垂切除術）**が標準的な治療となることが多く、近年は__腹腔鏡下手術__が広く行われています。膿瘍を形成している場合は、まず抗菌薬で炎症を落ち着かせ、後日改めて虫垂を切除する「待機的虫垂切除」が選択されることもあります。__保存的治療のみで経過をみた場合は再発のリスクがある__ことも知られています。手術が必要と判断した場合は、速やかに連携医療機関へご紹介します。",
    tip: "__右下腹部の痛みが強くなる、発熱を伴う、痛みが移動してきた__等の症状がある場合は、自己判断で様子を見ず早めの受診をお勧めします。進行すると緊急手術が必要になることがあるため、「様子を見てから」ではなく__早めの受診が安全につながります__。",
    sources: [
      {
        label: "日本腹部救急医学会ほか「急性腹症診療ガイドライン2015」",
        url: "https://minds.jcqhc.or.jp/guidelines_kind/%E6%80%A5%E6%80%A7%E8%85%B9%E7%97%87/",
      },
      {
        label: "日本小児救急医学会「エビデンスに基づいた子どもの腹部救急診療ガイドライン2017（小児急性虫垂炎診療ガイドライン）」",
        url: "https://minds.jcqhc.or.jp/summary/c00575/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Appendicitis (acute appendicitis)",
      summary: "Inflammation of the appendix, a small organ near the cecum, which can progress to needing emergency surgery.",
      pathology:
        "The **appendix** is a thin, pouch-like organ extending from the cecum; __appendicitis (commonly called \"having your appendix\")__ is inflammation there. It's thought to mainly occur when the appendix opening is blocked by a hardened piece of stool (a fecalith) or swollen lymphatic tissue, allowing bacteria to multiply inside. The classic course is __pain starting around the pit of the stomach or navel, then migrating to the lower right abdomen over time__, though __children, older adults, and pregnant women may not follow this typical pattern__, so care is needed. If it progresses, the appendix can rupture, leading to the serious condition of peritonitis.",
      tests:
        "History-taking and examination (checking for tenderness in the lower right abdomen), combined with __blood tests (checking inflammation markers), abdominal ultrasound, and CT__. Ultrasound is typically used first, with CT added if findings are unclear or perforation is suspected.",
      treatment:
        "Depending on severity, __conservative treatment with antibiotics__ can resolve mild cases, but **surgery (appendectomy)** is the standard treatment in most cases, with __laparoscopic surgery__ now widely used. If an abscess has formed, antibiotics may be used first to calm the inflammation, with the appendix removed later (\"interval appendectomy\"). __Conservative treatment alone carries a risk of recurrence.__ If surgery is needed, we promptly refer you to a partner institution.",
      tip: "If you have __worsening lower right abdominal pain, fever, or pain that has shifted location,__ please don't wait and see — come in soon. Because it can progress to needing emergency surgery, __coming in early is the safer choice__ rather than waiting to see how things develop.",
    },
  },
  {
    slug: "terminal-ileitis",
    title: "回腸末端炎",
    category: "internal",
    summary: "小腸の末端（回腸末端）に炎症が見つかった状態を指す言葉で、虫垂炎とよく似た症状を起こすことがあり、原因の見極めが重要です。",
    pathology:
      "「回腸末端炎」は__特定の病気の名前ではなく、小腸の末端（回腸末端）に炎症の所見が見られる状態を指す言葉__です。__虫垂炎とよく似た右下腹部の痛みや発熱__を起こすことがあり、画像検査や内視鏡検査で初めて見つかることも少なくありません。原因としては、__エルシニア菌等の細菌感染（感染性腸炎）、クローン病（炎症性腸疾患）、腸結核、腸管ベーチェット病__等、様々な病気が隠れている可能性があり、**どの病気が原因かを見極めることが治療方針を決めるうえで重要**です。",
    tests:
      "問診（海外渡航歴、生肉・加熱不十分な食品の摂取歴、症状の経過等）に加え、__血液検査、便培養検査、腹部エコー・CT__で評価します。リンパ節の腫れ方や病変の分布等が、原因を推測する手がかりになります。必要に応じて__大腸内視鏡検査（下部消化管内視鏡）での観察・生検__を行い、炎症性腸疾患等との鑑別を進めます。",
    treatment:
      "__感染性腸炎（エルシニア腸炎等）が原因の場合は、多くは対症療法や抗菌薬で軽快__します。一方、__クローン病等の炎症性腸疾患が原因と判明した場合は、長期的な治療方針が必要__となるため、専門的な評価・治療が可能な医療機関と連携します。症状が強く虫垂炎との鑑別が難しい場合には、緊急手術が必要と判断されることもあります。",
    tip: "__右下腹部の痛みは虫垂炎だけが原因とは限りません__。症状が似ていても、原因によって治療方針は大きく異なります。自己判断せず、丁寧な検査で原因を調べることが、適切な治療への近道です。",
    sources: [
      {
        label: "厚生労働科学研究費補助金難治性疾患政策研究事業「難治性炎症性腸管障害に関する調査研究」クローン病診断基準・治療指針",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Terminal ileitis",
      summary: "A term describing inflammation found at the end of the small intestine (terminal ileum). It can cause symptoms similar to appendicitis, so identifying the underlying cause matters.",
      pathology:
        "\"Terminal ileitis\" __isn't the name of one specific disease — it's a term describing inflammation seen at the end of the small intestine (the terminal ileum)__. It can cause __lower right abdominal pain and fever similar to appendicitis__, and is often first discovered through imaging or endoscopy. Possible underlying causes include __bacterial infections such as Yersinia (infectious enteritis), Crohn's disease (an inflammatory bowel disease), intestinal tuberculosis, and intestinal Behçet's disease__ — **identifying which condition is responsible is key to deciding treatment.**",
      tests:
        "History-taking (overseas travel, eating raw or undercooked meat, course of symptoms) plus __blood tests, stool culture, abdominal ultrasound, and CT__. The pattern of lymph node swelling and distribution of the lesion offer clues to the cause. __Colonoscopy with biopsy__ may be used as needed to help distinguish inflammatory bowel disease from other causes.",
      treatment:
        "__When infectious enteritis (such as Yersinia infection) is the cause, symptomatic treatment or antibiotics usually lead to improvement.__ On the other hand, __if an inflammatory bowel disease like Crohn's disease turns out to be the cause, a long-term treatment plan is needed__, so we work with institutions capable of specialized evaluation and treatment. If symptoms are severe and hard to distinguish from appendicitis, emergency surgery may sometimes be necessary.",
      tip: "__Lower right abdominal pain isn't always due to appendicitis.__ Even with similar symptoms, treatment differs greatly depending on the cause. Rather than guessing, a careful workup to find the actual cause is the shortest path to the right treatment.",
    },
  },
  {
    slug: "ischemic-colitis",
    title: "虚血性腸炎",
    category: "internal",
    summary: "大腸の血流が一時的に不足することで炎症や潰瘍が起こる病気で、便秘がちな中高年の方に起こりやすいとされています。",
    pathology:
      "大腸の血流が何らかの原因で一時的に不足（虚血）することで、粘膜に炎症や潰瘍が生じる病気です。動脈硬化等による血管側の要因に加え、__便秘・下剤の使用・強いいきみ等による腸管内圧の上昇__が誘因となることが知られています。__左側の腹痛（左下腹部〜左側腹部）に続いて、下痢や血便が起こる__という経過が典型的です。経過により、__一過性型（多くはこのタイプで自然に軽快）・狭窄型・壊疽型__の3つに分類され、壊疽型は腸管が壊死し緊急手術が必要となる重篤なタイプです。",
    tests:
      "問診・診察に加え、__CT検査__が初期診断に重要で、左側大腸の区域性の炎症として特徴的な所見が見られます。必要に応じて大腸内視鏡検査で病変を直接観察することもあります。",
    treatment:
      "多くを占める__一過性型では、腸管を休める（絶食・点滴）保存的治療__で自然に軽快することがほとんどで、症状の改善を確認しながら段階的に食事を再開していきます。__狭窄型__では、症状に応じて内視鏡治療や待機的な手術を検討することがあり、**壊疽型（腸管の壊死を伴うタイプ）は緊急手術が必要な重篤な状態**です。再発率は一定程度あるとされ、__便秘の管理__が再発予防の観点からも重要です。",
    tip: "__中高年の方で便秘気味の方に起こりやすい__病気です。急な左側の腹痛に下痢や血便が続く場合は、痔からの出血等と自己判断せず、早めにご相談ください。多くは保存的治療で軽快しますが、__まれに緊急手術が必要な重症型__もあるため、早期の評価が大切です。",
    sources: [
      {
        label: "日本腹部救急医学会ほか「急性腹症診療ガイドライン2015」",
        url: "https://minds.jcqhc.or.jp/guidelines_kind/%E6%80%A5%E6%80%A7%E8%85%B9%E7%97%87/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Ischemic colitis",
      summary: "A condition where temporarily reduced blood flow to the colon causes inflammation or ulcers, more common in constipation-prone, middle-aged and older people.",
      pathology:
        "A condition where blood flow to the colon temporarily drops (ischemia) for some reason, causing inflammation or ulcers in the lining. Alongside vascular factors like atherosclerosis, __increased pressure within the bowel from constipation, laxative use, or heavy straining__ is a known trigger. The typical course is __pain on the left side of the abdomen, followed by diarrhea and bloody stool__. Based on how it progresses, it's classified into three types — __transient (the most common, usually resolving on its own), stenotic, and gangrenous__ — with the gangrenous type being a serious condition where the bowel tissue dies and emergency surgery is needed.",
      tests:
        "History-taking and examination, plus __CT, which is important for initial diagnosis__ and shows characteristic segmental inflammation on the left side of the colon. A colonoscopy may also be used to directly observe the affected area as needed.",
      treatment:
        "The __transient type, which accounts for most cases, usually resolves on its own with conservative treatment that rests the bowel__ (fasting, IV fluids), with food reintroduced gradually as symptoms improve. For the __stenotic type__, endoscopic treatment or elective surgery may be considered depending on symptoms, and the **gangrenous type (where bowel tissue has died) is a serious condition requiring emergency surgery**. Recurrence happens at a certain rate, making __management of constipation__ important for prevention as well.",
      tip: "This condition tends to occur in __middle-aged and older people who are prone to constipation.__ If you have sudden left-sided abdominal pain followed by diarrhea or bloody stool, please don't assume it's bleeding from hemorrhoids — come in soon. Most cases resolve with conservative treatment, but because __the severe type rarely needs emergency surgery,__ early evaluation matters.",
    },
  },
  {
    slug: "common-cold",
    title: "風邪症候群（感冒・上気道感染症）",
    category: "internal",
    summary: "「風邪」「感冒」「上気道感染症」はほぼ同じ状態を指す呼び方です。主にウイルス感染によって起こり、症状の出方は人によって多彩です。",
    pathology:
      "__風邪症候群（かぜ症候群）・感冒・上気道感染症（急性上気道炎）は、呼び方は違ってもほぼ同じ状態を指しています__。「感冒」が医学的な正式名称、「かぜ・風邪」が日常的な呼び方、「上気道感染症（急性上気道炎）」は鼻からのどにかけて（上気道）の感染症全般を指す臨床的な分類名です。多くは__ライノウイルス・コロナウイルス・RSウイルス等__のウイルス感染が原因で、鼻〜のどの粘膜に炎症が起こります。厚生労働省「抗微生物薬適正使用の手引き」では、急性気道感染症を**感冒・急性副鼻腔炎・急性咽頭炎・急性気管支炎**の4つに分類しており、このうち最も頻度が高く範囲の広いものが感冒（いわゆる風邪）にあたります。症状は__鼻水・鼻づまりが主体の方、のどの痛みが主体の方、咳が主体の方、発熱や倦怠感等の全身症状が主体の方__等、ウイルスの種類や個人差によって実に多彩です。",
    tests:
      "典型的な経過・所見があれば検査なしで診断することが多いですが、__重症の感染症（肺炎、インフルエンザ、新型コロナウイルス感染症等）との鑑別__が必要な場合は、血液検査・迅速抗原検査・胸部X線等を行うことがあります。",
    treatment:
      "**ウイルス感染が原因のため抗菌薬（抗生物質）は効果がなく、基本的には使用しません**。治療の中心は、安静・水分摂取・栄養摂取等の全身管理と、__症状を和らげるための対症療法__（解熱鎮痛薬・去痰薬・鼻症状を和らげる薬等）です。多くは__1週間前後で自然に軽快__しますが、症状が長引く場合や悪化する場合は、副鼻腔炎・気管支炎・肺炎等の合併症や、インフルエンザ・新型コロナウイルス感染症等の他の病気を疑って再評価することがあります。",
    tip: "「ただの風邪」と自己判断して様子を見がちですが、__39℃以上の発熱が3日以上続く、呼吸が苦しい、症状が急に悪化した__等の場合は、肺炎等の合併症が隠れていないか確認が必要です。また、**抗菌薬は風邪そのものには効果がなく**、自己判断での要求や中途半端な服用は耐性菌のリスクを高めることにもつながります。ご心配な症状がある場合は、遠慮なくご相談ください。",
    sources: [
      {
        label: "厚生労働省「抗微生物薬適正使用の手引き 第二版」",
        url: "https://www.mhlw.go.jp/content/10900000/000573655.pdf",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Common cold syndrome (cold / upper respiratory infection)",
      summary: "\"Cold,\" \"common cold,\" and \"upper respiratory infection\" all refer to essentially the same condition. It's mainly caused by viruses, and symptoms vary widely from person to person.",
      pathology:
        "__Cold syndrome, the common cold, and upper respiratory infection (acute upper respiratory tract infection) all refer to essentially the same condition, just with different names.__ \"Common cold\" is the formal medical term, \"cold\" is the everyday name, and \"upper respiratory infection\" is the clinical classification covering infections anywhere from the nose to the throat (the upper airway). Most cases are caused by viral infections — __rhinovirus, coronavirus, RSV, and others__ — causing inflammation of the nasal and throat lining. Japan's Ministry of Health, Labour and Welfare's guide to appropriate antimicrobial use classifies acute respiratory infections into **four types: the common cold, acute sinusitis, acute pharyngitis, and acute bronchitis**, of which the common cold is the most frequent and broadest. Symptoms are genuinely varied — __some people mainly get a runny or stuffy nose, others mainly a sore throat, others mainly a cough, and others mainly whole-body symptoms like fever and fatigue__ — depending on the virus and the individual.",
      tests:
        "Diagnosis is often made without testing when the course and findings are typical, but __when distinguishing from a more serious infection (pneumonia, influenza, COVID-19, etc.) is necessary,__ we may run blood tests, rapid antigen tests, or a chest X-ray.",
      treatment:
        "**Because the cause is viral, antibiotics aren't effective and aren't generally used.** Treatment centers on rest, fluids, nutrition, and __symptomatic treatment to ease symptoms__ (fever/pain relievers, expectorants, medication for nasal symptoms, etc.). Most cases __resolve naturally within about a week__, but if symptoms drag on or worsen, we reassess for complications (sinusitis, bronchitis, pneumonia) or other conditions like influenza or COVID-19.",
      tip: "People often assume it's \"just a cold\" and wait it out, but if you have __a fever of 39°C or higher lasting 3 days or more, difficulty breathing, or symptoms that suddenly worsen,__ it's worth checking for a hidden complication like pneumonia. Also, **antibiotics have no effect on a cold itself**, and requesting them or taking them incompletely on your own judgment can increase the risk of antibiotic-resistant bacteria. If you have symptoms that concern you, please don't hesitate to ask.",
    },
  },
  {
    slug: "thyroid",
    title: "甲状腺疾患",
    category: "internal",
    summary: "甲状腺の働きが過剰または不足することで、全身にさまざまな症状が出ることがあります。",
    pathology:
      "甲状腺の働きが過剰（機能亢進）または不足（機能低下）することで、全身にさまざまな症状が出ることがあります。**バセドウ病・橋本病**が代表的ですが、他の原因もあり、血液検査による鑑別が必要です。",
    tests:
      "血液検査（甲状腺ホルモン・甲状腺自己抗体等）、頸部の視診・触診に加え、**頸部エコーも院内で行います**。",
    treatment:
      "**良性の甲状腺疾患（バセドウ病・橋本病等）**については、原因に応じた内服治療（抗甲状腺薬・甲状腺ホルモン補充等）により、__当院でしっかりと経過をコントロール__していきます。**悪性（甲状腺がん）が疑われる所見がある場合**には、精密検査・治療のため専門医療機関へご紹介します。",
    tip: "倦怠感・体重の変化・動悸などは甲状腺以外の原因でも起こるため、血液検査での確認が診断の第一歩になることが多いです。",
    subsections: [
      {
        title: "バセドウ病（甲状腺機能亢進症の代表例）",
        pathology:
          "甲状腺が過剰にホルモンを分泌し、**頻脈・体重減少・多汗・手の震え**等が起こりやすくなります。",
        tests: "血液検査（甲状腺ホルモン・TRAb等）、心電図（頻脈の評価）。",
        treatment:
          "代表的な治療選択肢として、**抗甲状腺薬（MMI〔チアマゾール〕・PTU〔プロピルチオウラシル〕）**による内服治療、**ヨウ化カリウム**（無機ヨード製剤）による治療、**手術（甲状腺亜全摘）**などがあります。どの治療法が適しているかは、重症度・副作用の有無・挙児希望の有無・ライフスタイル等によって個人差があり、当院で経過を見ながら選択・調整していきます。",
        tip: "症状が「ストレス」や「更年期」と見分けにくいことがあり、血液検査ではじめて気づかれる場合もあります。",
      },
      {
        title: "橋本病（慢性甲状腺炎・甲状腺機能低下の代表例）",
        pathology:
          "甲状腺への慢性的な自己免疫性の炎症により、機能が低下することがあります。**むくみ・体重増加・倦怠感・徐脈**等が起こりやすくなります。",
        tests: "血液検査（甲状腺ホルモン・抗TPO抗体等）。",
        treatment:
          "機能低下がある場合は**甲状腺ホルモン補充療法**を検討することが多いです。機能が保たれている場合は経過観察となることもあります。",
        tip: "橋本病という診断自体が必ずしも治療を要するわけではなく、ホルモン値次第で経過観察のこともあります。",
      },
    ],
    sources: [
      {
        label: "日本甲状腺学会「バセドウ病治療ガイドライン2019」",
        url: "https://minds.jcqhc.or.jp/summary/c00502/",
      },
    ],
    lastReviewed: "2026-10-09",
    en: {
      title: "Thyroid conditions",
      summary: "When the thyroid is overactive or underactive, it can cause a range of symptoms throughout the body.",
      pathology:
        "When the thyroid becomes overactive (hyperthyroidism) or underactive (hypothyroidism), it can cause a range of symptoms throughout the body. **Graves' disease and Hashimoto's disease** are the two most common causes, but there are others, and blood tests are needed to tell them apart.",
      tests:
        "Blood tests (thyroid hormones, thyroid autoantibodies, etc.), visual and physical examination of the neck, and **neck ultrasound, which we also perform in-house**.",
      treatment:
        "For **benign thyroid conditions (Graves' disease, Hashimoto's disease, etc.)**, we manage your care directly with oral medication suited to the cause (anti-thyroid drugs, thyroid hormone replacement, etc.) and __follow your progress closely here at the clinic__. **If findings raise suspicion of malignancy (thyroid cancer),** we refer you to a specialist institution for further testing and treatment.",
      tip: "Fatigue, weight changes, and heart palpitations can have causes other than the thyroid, so a blood test is often the first step toward a diagnosis.",
      subsections: [
        {
          title: "Graves' disease (the leading cause of hyperthyroidism)",
          pathology:
            "The thyroid releases excess hormone, which tends to cause **a fast heart rate, weight loss, heavy sweating, and hand tremors.**",
          tests: "Blood tests (thyroid hormones, TRAb, etc.) and an ECG to assess the fast heart rate.",
          treatment:
            "Standard treatment options include oral **anti-thyroid medication (MMI [thiamazole] or PTU [propylthiouracil])**, treatment with **potassium iodide** (an inorganic iodine preparation), and **surgery (subtotal thyroidectomy)**. Which approach suits you best varies by severity, side effects, whether you're hoping to become pregnant, and lifestyle — we select and adjust this together with you as we follow your progress.",
          tip: "Symptoms can be hard to tell apart from \"stress\" or menopause, and are sometimes first noticed through a blood test.",
        },
        {
          title: "Hashimoto's disease (chronic thyroiditis, the leading cause of hypothyroidism)",
          pathology:
            "Chronic autoimmune inflammation of the thyroid can cause its function to decline, tending to produce **swelling, weight gain, fatigue, and a slow heart rate.**",
          tests: "Blood tests (thyroid hormones, anti-TPO antibodies, etc.).",
          treatment:
            "If thyroid function has declined, we typically consider **thyroid hormone replacement therapy**. If function is still preserved, monitoring may be all that's needed.",
          tip: "A diagnosis of Hashimoto's disease doesn't necessarily mean treatment is needed right away — depending on your hormone levels, simply monitoring may be appropriate.",
        },
      ],
    },
  },
  {
    slug: "fatty-liver-disease",
    title: "脂肪肝（NAFLD/NASH）",
    category: "internal",
    summary:
      "健診の「肝機能異常」「脂肪肝」の指摘、実は放っておくと肝硬変・肝がんにまで進むことがある病気です。",
    pathology:
      "肝臓に脂肪が過剰に蓄積した状態を脂肪肝といい、__お酒をあまり飲まない方に起こる「非アルコール性脂肪性肝疾患（NAFLD）」__が代表的です。__肥満・糖尿病・脂質異常症等の生活習慣病を背景に持つ方に多く__、__健診の肝機能（AST・ALT・γ-GTP）異常やエコーでの脂肪肝の指摘__をきっかけに見つかることがほとんどで、__自覚症状はほとんどありません__。__多くは経過が穏やかですが、一部は「非アルコール性脂肪肝炎（NASH）」という、肝臓に炎症・線維化が進むタイプに移行し__、放置すると__肝硬変・肝がんにまで進行する__ことがある点が重要です。",
    tests:
      "__血液検査（肝機能・血糖・脂質等）、腹部エコー__で評価します。__線維化（肝臓の硬さ）の進行度を推定するための血液検査の指標（FIB-4インデックス等）__を組み合わせることで、__精密検査が必要かどうかを院内である程度絞り込む__ことができます。",
    treatment:
      "__治療の基本は生活習慣の改善__で、__体重の7%以上の減量__が肝臓の状態の改善に有効とされています。__食事内容の見直し・運動習慣・糖尿病や脂質異常症等の併存疾患のコントロール__を並行して行います。__線維化が進んでいる、NASHが疑われる__等の場合は、専門的な評価（肝生検等）が可能な医療機関へご紹介することがあります。",
    tip: "__「脂肪肝は痛くも痒くもないから」と健診結果を放置してしまう__方は少なくありませんが、__自覚症状がないまま静かに進行する__のがこの病気の怖さです。__健診で生活習慣病を指摘された__という方は、脂肪肝もあわせて確認すると、生活改善のモチベーションにもつながります。__体重管理は、高血圧・糖尿病・脂質異常症・高尿酸血症にも共通して効果がある__ため、当院の食事指導もあわせてご活用ください。",
    sources: [
      {
        label: "日本消化器病学会・日本肝臓学会「NAFLD/NASH診療ガイドライン2020（改訂第2版）」",
        url: "https://minds.jcqhc.or.jp/summary/c00611/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Fatty liver (NAFLD/NASH)",
      summary: "Being flagged for \"abnormal liver function\" or \"fatty liver\" at a checkup can, if ignored, actually progress all the way to cirrhosis or liver cancer.",
      pathology:
        "Fatty liver refers to excess fat buildup in the liver, with __\"non-alcoholic fatty liver disease\" (NAFLD), which occurs in people who drink little alcohol,__ being the most representative type. It's __common in people with underlying lifestyle-related conditions like obesity, diabetes, or dyslipidemia__, and is usually found through __abnormal liver function values (AST, ALT, gamma-GTP) at a checkup or fatty liver noted on ultrasound__ — __there are almost no symptoms__. __Most cases follow a mild course, but some progress to \"non-alcoholic steatohepatitis\" (NASH),__ a type involving inflammation and fibrosis of the liver, and if left untreated, __it can progress all the way to cirrhosis and liver cancer__ — this is the key point.",
      tests:
        "We evaluate with __blood tests (liver function, blood sugar, lipids, etc.) and abdominal ultrasound__. Combining these with __a blood-based index for estimating the degree of liver fibrosis/stiffness (such as the FIB-4 index)__ lets us __narrow down in-house whether more detailed testing is needed__.",
      treatment:
        "__The foundation of treatment is lifestyle improvement__, and __losing 7% or more of body weight__ is known to be effective for improving the condition of the liver. We work on __diet, an exercise habit, and controlling any coexisting conditions like diabetes or dyslipidemia__ together. __If fibrosis appears advanced or NASH is suspected,__ we may refer you to an institution for specialized evaluation (such as a liver biopsy).",
      tip: "__Many people leave checkup results unaddressed, thinking \"fatty liver doesn't hurt or itch,\"__ but the frightening part of this condition is that __it progresses quietly with no symptoms__. __If you've been flagged for a lifestyle-related condition at a checkup,__ it's worth checking for fatty liver too, which can also motivate lifestyle changes. __Weight management helps across the board with high blood pressure, diabetes, dyslipidemia, and high uric acid as well,__ so please also make use of our dietary guidance.",
    },
  },
  {
    slug: "chronic-kidney-disease",
    title: "慢性腎臓病（CKD）",
    category: "internal",
    summary:
      "健診の「eGFR」「クレアチニン」の数値、見逃していませんか。自覚症状がないまま進行し、透析や心血管疾患のリスクを高める病気です。",
    pathology:
      "腎臓の機能が慢性的に低下した状態、または__尿にたんぱくが漏れ出る状態が3か月以上続く状態__を慢性腎臓病（CKD）といいます。__高血圧・糖尿病・加齢__が主な原因で、__初期にはほとんど自覚症状がなく__、__健診の尿たんぱくや、血液検査のクレアチニン・eGFR（推算糸球体濾過量）の数値__で初めて指摘されることがほとんどです。__CKDは腎機能がさらに悪化して透析が必要になるリスクだけでなく、心筋梗塞・脳卒中等の心血管疾患のリスクも高める__ことが知られており、__「腎臓だけの問題」ではない__点が重要です。",
    tests:
      "__血液検査（クレアチニン・eGFR）、尿検査（尿たんぱく・尿潜血）__を定期的に確認します。__eGFRと尿たんぱくの程度を組み合わせた重症度分類（ステージG1〜G5、A1〜A3）__に基づいて、進行リスクを評価します。",
    treatment:
      "**原因疾患（高血圧・糖尿病）の管理**が治療の土台となり、__血圧を目標値にコントロールすること、たんぱく尿がある場合はACE阻害薬・ARB等でたんぱく尿を減らすこと__が、腎機能の低下を遅らせるために重要です。__減塩・たんぱく質量の見直し等の食事療法__もあわせて行います。__腎機能の低下が進んだ場合（目安としてeGFR45未満等）__には、専門的な治療・将来の透析準備のため、腎臓内科へご紹介します。",
    tip: "__「数値が少し悪いだけ」と健診結果を気にせず放置してしまう__ことが、CKDでは特に起こりがちです。__症状が出た時には、すでにかなり進行していることが多い__ため、__高血圧・糖尿病で通院中の方は、定期的な腎機能チェックそのものが治療の一部__と考えてください。当院では__貧血（腎性貧血）の評価__もあわせて行い、CKDを総合的に管理します。",
    sources: [
      {
        label: "日本腎臓学会「エビデンスに基づくCKD診療ガイドライン2023」",
        url: "https://minds.jcqhc.or.jp/summary/c00779/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Chronic kidney disease (CKD)",
      summary: "Have you been overlooking your \"eGFR\" or \"creatinine\" numbers on a checkup? This condition progresses with no symptoms and raises the risk of dialysis and cardiovascular disease.",
      pathology:
        "Chronic kidney disease (CKD) refers to chronically reduced kidney function, or __protein leaking into the urine persisting for 3 months or more__. __High blood pressure, diabetes, and aging__ are the main causes, and __there are almost no symptoms in the early stages__ — __it's usually first flagged through protein in the urine at a checkup, or creatinine/eGFR (estimated glomerular filtration rate) on a blood test__. __CKD doesn't just raise the risk of needing dialysis as kidney function worsens further — it also raises the risk of cardiovascular disease like heart attack and stroke__, which is why it's important to understand it's __not \"just a kidney problem.\"__",
      tests:
        "We regularly check __blood tests (creatinine, eGFR) and urine tests (protein, occult blood)__. We assess progression risk using __a severity classification combining eGFR and the degree of proteinuria (stages G1–G5, A1–A3)__.",
      treatment:
        "**Managing the underlying conditions (high blood pressure, diabetes)** forms the foundation of treatment, and __keeping blood pressure at target, and reducing protein in the urine with ACE inhibitors or ARBs if present,__ are important for slowing the decline in kidney function. We also work on __dietary measures such as reducing salt and reviewing protein intake__. __If kidney function has declined significantly (roughly eGFR below 45, for example),__ we refer you to a nephrologist for specialized treatment and to prepare for possible future dialysis.",
      tip: "__Dismissing checkup results because \"the numbers are only slightly off\" is especially common with CKD.__ __By the time symptoms appear, it's often already fairly advanced,__ so __if you're being followed for high blood pressure or diabetes, regular kidney function checks should be considered part of your treatment itself.__ We also assess for __anemia related to kidney disease (renal anemia)__ here, managing CKD comprehensively.",
    },
  },
  {
    slug: "hyperuricemia-gout",
    title: "高尿酸血症・痛風",
    category: "internal",
    summary:
      "血液中の尿酸値が高い状態（高尿酸血症）が続くと、ある日突然激痛を伴う痛風発作を起こすことがあります。",
    pathology:
      "血液中の尿酸値が**7.0mg/dl超**の状態を高尿酸血症といいます。尿酸値が高い状態が続くと関節内に尿酸の結晶が溜まり、ある日突然__足の親指の付け根等に激痛・腫れ・熱感を伴う「痛風発作」__を引き起こすことがあります。__プリン体の多い食品（レバー・魚卵等）の摂り過ぎ、肥満、アルコール、果糖の多い飲料__等が尿酸値を上げる要因として知られています。高尿酸血症は痛風だけでなく、__腎機能障害や尿路結石__のリスクにも関わります。",
    tests:
      "血液検査で尿酸値を確認します。腎機能（クレアチニン等）や、痛風の既往・合併症の評価もあわせて行います。",
    treatment:
      "痛風発作の急性期には、__消炎鎮痛薬（NSAIDs）やコルヒチン、ステロイド__等で痛み・炎症を抑えることを優先し、__発作中は尿酸降下薬の開始・変更を行わない__のが原則です（尿酸値を急に変動させると、かえって発作が悪化・遷延することがあるため）。発作が落ち着いた後は、__尿酸値を6.0mg/dl未満に維持することを目標__に、生活習慣の改善（食事・飲酒量の見直し、体重管理）を基本としながら、必要に応じて尿酸降下薬による長期管理を行います。",
    tip: "__「痛みが引いたから治った」と自己判断で通院・内服をやめてしまう__と、高尿酸血症自体は続いているため発作を繰り返しやすくなります。高血圧・糖尿病・脂質異常症等と合併しやすいため、__他の生活習慣病とあわせた総合的な管理__が大切です。食事の工夫については、当院の食事指導ページもあわせてご覧ください。",
    sources: [
      {
        label: "日本痛風・尿酸核酸学会「高尿酸血症・痛風の治療ガイドライン第3版」",
        url: "https://minds.jcqhc.or.jp/summary/c00476/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Hyperuricemia and gout",
      summary: "If uric acid in the blood stays elevated (hyperuricemia), it can lead one day to a sudden, intensely painful gout attack.",
      pathology:
        "A blood uric acid level **above 7.0mg/dl** is called hyperuricemia. If it stays elevated, uric acid crystals can build up in the joints, and one day trigger a __\"gout attack\" — sudden, severe pain, swelling, and warmth, typically at the base of the big toe__. Known factors that raise uric acid include __eating a lot of purine-rich food (liver, fish roe, etc.), obesity, alcohol, and fructose-heavy drinks__. Hyperuricemia is also linked to risks beyond gout, including __kidney impairment and urinary stones__.",
      tests:
        "A blood test checks uric acid levels. We also assess kidney function (creatinine, etc.) and any history of gout or complications.",
      treatment:
        "During an acute gout attack, the priority is easing pain and inflammation with __anti-inflammatory painkillers (NSAIDs), colchicine, or steroids__, and as a rule, __we don't start or change uric-acid-lowering medication during an attack__ (because a sudden change in uric acid levels can actually worsen or prolong the attack). Once the attack settles, the goal is to __keep uric acid below 6.0mg/dl__, generally through lifestyle changes (diet, reducing alcohol, weight management), with uric-acid-lowering medication for long-term management as needed.",
      tip: "__Stopping your visits or medication on your own judgment just because \"the pain is gone\" can lead to repeated attacks,__ since the underlying hyperuricemia is still there. It often coexists with high blood pressure, diabetes, and dyslipidemia, so __comprehensive management alongside these other conditions__ matters. Please also see our dietary guidance page for tips on eating.",
    },
  },
  {
    slug: "herpes-labialis",
    title: "口唇ヘルペス（単純ヘルペス）",
    category: "internal",
    summary:
      "唇や口の周りに水ぶくれを繰り返す、単純ヘルペスウイルスの感染症です。早めの治療開始が症状の軽減につながります。",
    pathology:
      "**単純ヘルペスウイルス（HSV-1）**の感染によって、唇やその周囲に__小さな水ぶくれ（水疱）がまとまって出現し、ピリピリ・チクチクした違和感__を伴うことが多い病気です。一度感染すると、ウイルスは症状が治まった後も神経の中に潜み続け、__疲労・発熱・紫外線・ストレス等をきっかけに再発を繰り返す__ことが知られています。再発前には、水疱が出る前に__ピリピリ感等の前兆（予兆）__を感じる方が多く、この段階での対応が重要です。",
    tests:
      "多くは視診で診断できます。診断が難しい場合や繰り返す場合には、病変からのウイルス検査を検討することもあります。",
    treatment:
      "**抗ウイルス薬（内服・外用）**による治療が基本です。重要なのは__治療を開始するタイミング__で、__水疱が出てからではなく、ピリピリ感等の前兆を感じた時点でできるだけ早く治療を開始する__ことで、症状の程度や期間を抑えられることが分かっています。繰り返す方には、__あらかじめ処方された薬を前兆の時点でご自身の判断で飲み始める治療法__を選択肢としてご案内することもあります。",
    tip: "__「またいつもの口唇ヘルペスだから」と我慢して様子を見ていると、治療の効果が得にくくなる__ことがあります。前兆を感じた段階ですぐに使えるよう、__あらかじめ薬を用意しておく__ことが、症状を軽く早く終わらせるコツです。繰り返す頻度が高い方は、一度ご相談ください。",
    sources: [
      {
        label:
          "日本皮膚科学会の単純疱疹診療方針（予兆期からの早期治療開始＝PIT療法等）に基づく",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Cold sores (herpes labialis / HSV)",
      summary: "Recurring blisters on and around the lips caused by the herpes simplex virus. Starting treatment early makes a real difference in how mild the episode is.",
      pathology:
        "**Herpes simplex virus (HSV-1)** infection causes __small blisters clustered on or around the lips__, often with a tingling or prickling sensation. Once infected, the virus continues to lie dormant in nerve tissue even after symptoms clear, and __tends to reactivate repeatedly, triggered by fatigue, fever, UV exposure, or stress__. Many people notice __a tingling warning sign before the blisters actually appear__, and how you respond at this stage matters.",
      tests: "Most cases are diagnosed by visual examination. If diagnosis is difficult or recurrence is frequent, a viral test on the lesion may be considered.",
      treatment:
        "**Antiviral medication (oral or topical)** is the standard treatment. __Timing is key__ — starting treatment as early as possible, right when you feel the tingling warning sign rather than waiting for the blister to appear, is known to reduce both the severity and duration. For people with frequent recurrences, we sometimes offer __a treatment where you start a pre-prescribed medication yourself as soon as you notice the warning sign__.",
      tip: "__Telling yourself \"it's just my usual cold sore\" and waiting it out can make treatment less effective.__ Keeping medication on hand so you can use it the moment you notice the warning sign is the key to a milder, shorter episode. If you get these frequently, please come talk to us.",
    },
  },
  {
    slug: "herpes-zoster",
    title: "帯状疱疹",
    category: "internal",
    summary:
      "体の片側に帯状に広がる、痛みを伴う発疹です。水ぼうそうのウイルスが再活性化して起こり、ワクチンで予防できます。",
    pathology:
      "子どもの頃にかかった__水ぼうそう（水痘）のウイルスが、治った後も神経節に潜み続け、加齢や疲労、免疫力の低下等をきっかけに再活性化する__ことで起こります。__体の片側（左右どちらか一方）__に沿って、__ピリピリ・ズキズキとした神経の痛みに続いて、帯状に赤い発疹・水疱__が現れるのが特徴です。50歳以上で発症率が高まり、__加齢とともに免疫力が低下する__ことが主な誘因と考えられています。治療が遅れると、__発疹が治った後も痛みだけが長く続く「帯状疱疹後神経痛」__を残すことがあります。",
    tests: "特徴的な皮疹の分布（体の片側・神経の走行に沿う）から視診で診断することが多いです。",
    treatment:
      "**抗ウイルス薬**を__できるだけ早期（発症後72時間以内が目安）に開始__することが、症状の軽減や帯状疱疹後神経痛の予防につながるとされています。痛みが強い場合は鎮痛薬を併用します。顔面（特に目・耳の周囲）に発疹が出た場合は、視力・聴力等への影響がないか慎重な評価が必要です。",
    tip: "__50歳以上の方には、帯状疱疹ワクチン（予防接種）__が選択肢としてあり、発症の予防や、仮に発症した場合の重症化予防が期待されます。また、発疹が出てからの治療開始が早いほど神経痛を残しにくいため、__「様子を見ているうちに」と自己判断で放置せず、ピリピリした痛みに発疹が伴ってきたら早めにご相談ください__。",
    sources: [
      {
        label:
          "日本皮膚科学会の帯状疱疹診療方針（早期抗ウイルス薬投与・ワクチンによる発症予防）に基づく",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Shingles (herpes zoster)",
      summary: "A painful rash that spreads in a band on one side of the body. It's caused by reactivation of the chickenpox virus, and it's preventable with a vaccine.",
      pathology:
        "This occurs when __the virus from chickenpox caught in childhood, which remains dormant in nerve tissue even after recovery, reactivates__, often triggered by aging, fatigue, or a weakened immune system. It's characterized by __nerve pain — tingling or throbbing — followed by a band of red rash and blisters, along one side of the body (left or right only)__. The rate of occurrence rises after age 50, and __declining immune function with age__ is thought to be the main trigger. If treatment is delayed, it can leave behind __\"post-herpetic neuralgia,\" pain that persists long after the rash has healed__.",
      tests: "Usually diagnosed visually, based on the characteristic distribution of the rash (one side of the body, following a nerve pathway).",
      treatment:
        "**Antiviral medication**, started __as early as possible (ideally within 72 hours of onset)__, helps reduce symptoms and prevent post-herpetic neuralgia. Pain relievers are added if pain is significant. If the rash appears on the face (especially around the eyes or ears), careful evaluation is needed to check for effects on vision or hearing.",
      tip: "__For those 50 and older, a shingles vaccine__ is an option that can help prevent the condition, or reduce its severity if it does occur. Also, the earlier treatment starts after the rash appears, the less likely nerve pain is to linger — __please don't wait and see on your own judgment; come in soon if tingling pain is accompanied by a rash.__",
    },
  },
  {
    slug: "rsv-infection",
    title: "RSウイルス感染症",
    category: "internal",
    summary:
      "乳幼児の咳・鼻水・発熱の原因としてニュースでもよく取り上げられるウイルス感染症です。特に乳児は重症化することがあります。",
    pathology:
      "**RSウイルス（RSV）**の感染によって起こる、__鼻水・咳・発熱__等、かぜに似た症状から始まる呼吸器感染症です。__ほぼ全ての子どもが2歳までに一度は感染する__とされるほどありふれたウイルスですが、__特に生後数か月の乳児や、早産児・心肺に基礎疾患がある子どもでは、「細気管支炎」という下気道の炎症を起こして重症化し、呼吸が苦しくなる（ゼーゼー、呼吸が速い、陥没呼吸等）ことがある__点が重要です。秋〜冬にかけて流行しやすい傾向があります。",
    tests:
      "**迅速抗原検査（鼻に綿棒を入れて行う検査）**で診断できることが多く、当院でも実施可能です。重症度の評価のため、必要に応じて胸部の診察・酸素飽和度の確認等を行います。",
    treatment:
      "特効薬（ウイルスそのものを退治する薬）はなく、__水分摂取・安静等の対症療法が基本__です。鼻水の吸引や去痰薬等で呼吸を楽にする対応を行います。__呼吸が苦しそう、水分が十分摂れない、顔色が悪い__等、重症化のサインがある場合は、入院での酸素投与・点滴等が必要になることがあり、速やかに小児の入院治療が可能な医療機関へご紹介します。",
    tip: "__「ただの鼻かぜ」と思っていたら、乳児が急に呼吸が苦しそうになった__というケースもあるため、小さなお子さんの咳・鼻水が続く場合は注意が必要です。__呼吸の仕方（肩で息をする、小鼻がぴくぴく動く、肋骨の間がへこむ等）__がいつもと違うと感じたら、様子を見ず早めにご相談ください。",
    sources: [
      {
        label: "日本小児呼吸器学会・日本小児感染症学会「小児呼吸器感染症診療ガイドライン2022」",
        url: "https://minds.jcqhc.or.jp/summary/c00758/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "RSV infection",
      summary: "A viral infection often covered in the news as a cause of cough, runny nose, and fever in young children. Infants in particular can become severely ill.",
      pathology:
        "A respiratory infection caused by **RSV (respiratory syncytial virus)**, starting with cold-like symptoms such as __runny nose, cough, and fever__. It's an extremely common virus — __nearly every child is infected at least once by age 2__ — but the key point is that __especially in infants just a few months old, or children born premature or with underlying heart or lung conditions, it can cause \"bronchiolitis,\" inflammation of the small airways, leading to severe disease with breathing difficulty (wheezing, rapid breathing, chest retractions, etc.)__. It tends to be more common in fall through winter.",
      tests:
        "**A rapid antigen test (using a nasal swab)** often allows diagnosis, and we can perform this at our clinic. We assess severity through a chest exam and checking oxygen saturation as needed.",
      treatment:
        "There's no specific antiviral medication, so __symptomatic care — fluids and rest — is the basis__. We help make breathing easier with nasal suction or expectorants. If there are signs of severe illness — __labored breathing, inadequate fluid intake, poor color__ — hospitalization for oxygen or IV fluids may be needed, and we promptly refer you to an institution capable of pediatric inpatient care.",
      tip: "There are cases where __what seemed like \"just a runny nose\" turns into an infant suddenly struggling to breathe__, so persistent cough or runny nose in a young child deserves attention. If you notice __unusual breathing (breathing with the shoulders, flaring nostrils, the skin between the ribs pulling in, etc.),__ please don't wait and see — come in soon.",
    },
  },
  {
    slug: "human-metapneumovirus-infection",
    title: "ヒトメタニューモウイルス感染症",
    category: "internal",
    summary: "RSウイルスとよく似た症状を起こす、春先に流行しやすいウイルス感染症です。",
    pathology:
      "**ヒトメタニューモウイルス（hMPV）**による呼吸器感染症で、__発熱・咳・鼻水__等、RSウイルス感染症と非常によく似た症状を起こします。__3〜6歳頃の子どもに感染のピークがあり、春（3〜6月頃）に流行しやすい__ことが知られています。多くは数日〜1週間程度で軽快しますが、__乳幼児や高齢者では気管支炎・肺炎等を合併し重症化する__ことがあります。",
    tests: "**迅速抗原検査**で診断できることが多く、当院でも実施可能です（検査には年齢等の条件があります）。",
    treatment:
      "RSウイルス感染症と同様に特効薬はなく、__水分摂取・安静等の対症療法が基本__です。症状が強い場合や呼吸状態に不安がある場合は、必要な検査・処置を行い、重症度に応じて医療機関と連携します。",
    tip: "RSウイルスとの__見分けは症状だけでは難しく、流行状況や検査で判断__することになります。小さなお子さんや高齢の方で、咳・発熱が長引く、呼吸が苦しそう等の場合は、早めにご相談ください。",
    sources: [
      {
        label: "日本小児呼吸器学会・日本小児感染症学会「小児呼吸器感染症診療ガイドライン2022」",
        url: "https://minds.jcqhc.or.jp/summary/c00758/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Human metapneumovirus infection",
      summary: "A viral infection with symptoms very similar to RSV, tending to spread in early spring.",
      pathology:
        "A respiratory infection caused by **human metapneumovirus (hMPV)**, causing __fever, cough, and runny nose__ — symptoms very similar to RSV infection. It's known to __peak in children around ages 3–6, and tends to spread in spring (around March–June)__. Most cases resolve within a few days to a week, but __infants and older adults can develop complications like bronchitis or pneumonia and become severely ill.__",
      tests: "**A rapid antigen test** often allows diagnosis and is available at our clinic (testing has some age-related conditions).",
      treatment:
        "As with RSV, there's no specific antiviral medication, so __symptomatic care — fluids and rest — is the basis__. If symptoms are severe or breathing is a concern, we run the needed tests and procedures and coordinate with other institutions based on severity.",
      tip: "__Telling it apart from RSV by symptoms alone is difficult — it comes down to what's going around and testing.__ If a young child or older adult has a prolonged cough or fever, or seems to be struggling to breathe, please come in soon.",
    },
  },
  {
    slug: "streptococcal-pharyngitis",
    title: "溶連菌感染症（A群溶血性レンサ球菌咽頭炎）",
    category: "internal",
    summary:
      "強いのどの痛みと発熱を起こす細菌感染症です。抗菌薬での治療が必要で、きちんと治療すれば合併症を予防できます。",
    pathology:
      "**A群溶血性レンサ球菌（溶連菌）**という細菌の感染により、__急な発熱・強いのどの痛み__を起こす病気です。__学童期（5〜15歳頃）の子どもに多い__ですが、大人にもみられます。__イチゴ舌（舌の表面がイチゴのようにブツブツする）や、かゆみを伴う発疹__を伴うことがあり、__咳や鼻水が目立たない__のもかぜとの違いのひとつです。3歳以下の乳幼児では、典型的なのどの痛みより__鼻炎症状・不機嫌・食欲不振__として現れることもあります。",
    tests: "__迅速抗原検査（のどを綿棒でこすって調べる検査）__で診断でき、当院でも実施可能です。",
    treatment:
      "**抗菌薬（ペニシリン系が第一選択）**による治療を行います。__症状が良くなっても、指示された日数（通常10日間程度）はきちんと飲み切る__ことが重要です。__治療が不十分だと、数週間後に急性糸球体腎炎やリウマチ熱といった合併症__を起こすリスクがあるためです。",
    tip: "__「熱が下がったから」と自己判断で薬をやめてしまう__と、合併症の予防効果が十分に得られないことがあります。きょうだい・ご家族内でうつりやすい感染症でもあるため、__家庭内での感染対策__もあわせて心がけていただくと安心です。",
    sources: [
      {
        label: "JAID/JSC感染症治療ガイド・ガイドライン作成委員会「JAID/JSC感染症治療ガイド2019」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Strep throat (group A streptococcal pharyngitis)",
      summary: "A bacterial infection causing a strong sore throat and fever. Antibiotic treatment is needed, and completing it properly prevents complications.",
      pathology:
        "An infection with **group A streptococcus (strep)** causing __sudden fever and a strong sore throat__. It's __common in school-age children (around 5–15)__, but adults can get it too. It can come with __a \"strawberry tongue\" (a bumpy, strawberry-like surface) or an itchy rash__, and __a relative lack of cough or runny nose__ is one way it differs from a cold. In children under 3, it may show up as __nasal symptoms, irritability, or poor appetite__ rather than a typical sore throat.",
      tests: "__A rapid antigen test (swabbing the throat)__ allows diagnosis and is available at our clinic.",
      treatment:
        "We treat with **antibiotics (penicillin-type drugs are first choice)**. __Even once symptoms improve, finishing the full prescribed course (usually around 10 days) is important__, because __incomplete treatment carries a risk of complications weeks later, such as acute glomerulonephritis or rheumatic fever__.",
      tip: "__Stopping medication on your own judgment just because \"the fever is gone\" may not give you full protection against complications.__ Because this infection spreads easily among siblings and family members, __taking precautions at home__ as well brings extra peace of mind.",
    },
  },
  {
    slug: "mycoplasma-pneumonia",
    title: "マイコプラズマ肺炎",
    category: "internal",
    summary:
      "しつこい乾いた咳が長引くことが特徴の肺炎です。数年おきに流行し、学童期の子どもから若い世代に多くみられます。",
    pathology:
      "**マイコプラズマ**という、細菌とウイルスの中間的な性質を持つ病原体による肺炎です。__学童期〜若い世代に多く__、__発熱に続いて、しつこい乾いた咳が長期間（数週間に及ぶことも）続く__のが特徴です。__聴診や胸部X線所見の割には本人の症状が比較的軽いことがある__（「歩く肺炎」と呼ばれることもある）のも特徴的ですが、重症化することもあります。__数年おきに流行する__ことが知られています。",
    tests:
      "問診・診察に加え、__胸部X線検査__で肺炎の有無を確認します。__迅速抗原検査や血液検査（抗体価）__で原因病原体を確認することもあります。",
    treatment:
      "マイコプラズマには__一般的な肺炎で使われるペニシリン系抗菌薬が効かない__という特徴があり、__マクロライド系等の専用の抗菌薬__を使用します。__一部のマイコプラズマは薬剤耐性（効きにくい菌）が増えている__ことも知られており、治療開始後の経過を見ながら薬剤を調整することがあります。",
    tip: "__「咳止めを飲んでも長引く乾いた咳」が続く場合__は、マイコプラズマ肺炎の可能性があります。一般的なかぜ薬や通常の抗菌薬では改善しにくいため、__咳が2週間以上続く、周囲で流行している__等の場合は、一度ご相談ください。",
    sources: [
      {
        label: "日本小児呼吸器学会・日本小児感染症学会「小児呼吸器感染症診療ガイドライン2022」",
        url: "https://minds.jcqhc.or.jp/summary/c00758/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Mycoplasma pneumonia",
      summary: "A pneumonia characterized by a persistent, stubborn dry cough. It comes in waves every few years and is most common from school-age children to young adults.",
      pathology:
        "A pneumonia caused by **mycoplasma**, an organism with properties somewhere between a bacterium and a virus. It's __common from school age through young adulthood__, and is characterized by __fever followed by a stubborn, dry cough that can persist for a long time (sometimes several weeks)__. It's also notable that __symptoms can feel relatively mild compared to what's heard on exam or seen on chest X-ray__ (sometimes called \"walking pneumonia\"), though it can still become severe. It's known to __spread in waves every few years.__",
      tests:
        "History-taking and examination, plus a __chest X-ray__ to check for pneumonia. __A rapid antigen test or blood antibody test__ may also be used to confirm the causative organism.",
      treatment:
        "Mycoplasma has the distinctive trait that __the penicillin-type antibiotics typically used for pneumonia don't work against it__, so __specific antibiotics such as macrolides__ are used instead. __Resistance to these drugs has become more common in some mycoplasma strains,__ so we may adjust medication based on how things progress after starting treatment.",
      tip: "__If a dry cough drags on despite taking cough medicine,__ mycoplasma pneumonia may be the cause. Because it doesn't respond well to typical cold medicine or standard antibiotics, __if a cough lasts more than two weeks, or it's going around in your community,__ please come talk to us.",
    },
  },
  {
    slug: "influenza",
    title: "インフルエンザ",
    category: "internal",
    summary:
      "急な高熱と全身のだるさが特徴の、冬を中心に流行するウイルス感染症です。発症から時間がたっていなくても、その日のうちに検査で判定できます。",
    pathology:
      "**インフルエンザウイルス**の感染によって起こる、__かぜ症候群よりも急激な発症__が特徴の感染症です。__38℃以上の急な発熱、関節痛・筋肉痛、強い倦怠感__が、鼻水・のどの痛み等の症状に先行して現れることが多く、__「朝は元気だったのに、昼には高熱でぐったりしている」__というような急な経過をたどります。例年__12月〜3月頃に流行__しますが、時期がずれることもあります。__高齢者・乳幼児・基礎疾患のある方では、肺炎等を合併して重症化する__ことがあります。",
    tests:
      "__迅速抗原検査（鼻に綿棒を入れて行う検査）__で、院内で短時間のうちに診断できます。__発症直後（数時間以内）は、ウイルス量が少なく検査で陰性になることがある__ため、__症状が出てから少し時間をおいての再検査__が必要になることもあります。",
    treatment:
      "**抗インフルエンザ薬（内服・吸入・点滴等）**による治療を行います。__発症から48時間以内に治療を開始すると、発熱期間の短縮効果が期待できる__とされています。__健康な方の軽症例では、抗インフルエンザ薬を使わず、解熱鎮痛薬等の対症療法と十分な休養で経過をみる__ことも選択肢になります。__重症化リスクが高い方（高齢者・基礎疾患のある方・乳幼児等）__には、積極的な薬物治療をお勧めすることが多いです。",
    tip: "__「ただの高熱だろう」と様子を見ているうちに、ご家族や周囲に感染を広げてしまう__ことがあります。__学校や会社から「陰性証明」を求められる__こともあるため、気になる場合は早めの受診・検査をお勧めします。__解熱後も体内にウイルスが残っていることがあり、学校保健安全法では「発症後5日かつ解熱後2日（幼児は3日）」を出席停止の目安__としています（詳しくは学校感染症のページもご覧ください）。",
    sources: [
      {
        label: "日本感染症学会「抗インフルエンザ薬の使用に関する提言」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Influenza",
      summary: "A winter-peaking viral infection characterized by a sudden high fever and whole-body fatigue. Even shortly after symptoms start, we can often test and get a result the same day.",
      pathology:
        "An infection caused by the **influenza virus**, characterized by __a much more sudden onset than the common cold__. __A sudden fever of 38°C or higher, joint and muscle aches, and strong fatigue__ often appear before nasal or throat symptoms, following a course like __\"fine in the morning, suddenly down with a high fever by midday.\"__ It typically __spreads from around December through March__, though timing can shift. __Older adults, young children, and people with underlying conditions__ can develop complications like pneumonia and become severely ill.",
      tests:
        "__A rapid antigen test (using a nasal swab)__ gives a diagnosis quickly, in-house. __Right after onset (within a few hours), the amount of virus may still be too low and give a false negative,__ so __retesting a bit later after symptoms start__ is sometimes needed.",
      treatment:
        "We treat with **anti-influenza medication (oral, inhaled, or IV)**. __Starting treatment within 48 hours of onset__ is associated with a shorter fever duration. For __healthy people with mild illness, managing without anti-influenza medication — using fever/pain relievers and getting plenty of rest — is also a reasonable option.__ For __those at higher risk of severe illness (older adults, people with underlying conditions, young children, etc.),__ we more often recommend active medication.",
      tip: "__Telling yourself \"it's probably just a high fever\" and waiting it out can end up spreading the infection to family and others around you.__ Since __schools and workplaces sometimes ask for a \"negative certificate,\"__ it's worth testing early if you're concerned. __The virus can remain in your body even after the fever breaks, and Japan's School Health and Safety Act sets the guideline for returning to school at \"5 days after onset and 2 days after the fever breaks\" (3 days for young children)__ (see our school infections page for details).",
    },
  },
  {
    slug: "covid-19",
    title: "新型コロナウイルス感染症（COVID-19）",
    category: "internal",
    summary:
      "発熱・のどの痛み・咳等、かぜに似た症状を起こすウイルス感染症です。重症化リスクに応じた治療薬の選択肢があります。",
    pathology:
      "**新型コロナウイルス（SARS-CoV-2）**の感染によって起こる、__発熱・のどの痛み・咳・倦怠感__等、かぜに似た症状を中心とする感染症です。__感染症法上は5類感染症に位置づけられており__、多くは__軽症のまま数日〜1週間程度で軽快__しますが、__高齢者・基礎疾患のある方（糖尿病・慢性腎臓病・心不全等）では、肺炎等を合併し重症化する__ことがあります。__変異を繰り返しながら、季節を問わず流行を繰り返している__のが特徴です。",
    tests: "__迅速抗原検査__で、院内で短時間のうちに診断できます。",
    treatment:
      "__軽症の場合は、解熱鎮痛薬等による対症療法と十分な休養__が基本です。__重症化リスクが高い方には、発症早期（多くは5日以内）に開始する抗ウイルス薬（経口薬等）__が選択肢となり、__基礎疾患・併用薬・腎機能等を踏まえて適応を判断__します。__呼吸が苦しい、酸素飽和度が低下している等の場合__は、入院治療が可能な医療機関と連携します。",
    tip: "__「もうただのかぜと同じ」と考えがちです__が、__高齢の方やご家族に基礎疾患がある方と同居されている場合は、重症化リスクを踏まえた早めの受診__が有用です。__学校保健安全法では「発症後5日かつ症状軽快後1日」を出席停止の目安__としています（学校感染症のページもご参照ください）。__ワクチン接種によって重症化リスクを下げられる__ことも分かっており、当院でも接種に対応しています。",
    sources: [
      {
        label: "厚生労働省「新型コロナウイルス感染症診療の手引き 第10.1版」（2024年4月）",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "COVID-19 (novel coronavirus infection)",
      summary: "A viral infection causing cold-like symptoms such as fever, sore throat, and cough. There are medication options tailored to your risk of severe illness.",
      pathology:
        "An infection caused by **the novel coronavirus (SARS-CoV-2)**, centered on cold-like symptoms — __fever, sore throat, cough, and fatigue__. __It's classified as a Category 5 infectious disease under Japan's Infectious Disease Control Law,__ and most cases are __mild, resolving within a few days to about a week__, but __older adults and people with underlying conditions (diabetes, chronic kidney disease, heart failure, etc.) can develop complications like pneumonia and become severely ill__. It's characterized by __continuing to spread year-round through repeated mutations.__",
      tests: "__A rapid antigen test__ gives a diagnosis quickly, in-house.",
      treatment:
        "__For mild cases, symptomatic treatment with fever/pain relievers and plenty of rest__ is the basis. __For those at higher risk of severe illness, antiviral medication (oral, etc.) started early (usually within 5 days of onset)__ is an option, and __we judge suitability based on underlying conditions, other medications, kidney function, and more.__ __If breathing is difficult or oxygen saturation is low,__ we coordinate with institutions capable of inpatient treatment.",
      tip: "__It's easy to think \"it's basically just a cold now,\"__ but __if you're older, or living with family members who have underlying conditions, coming in early with severe-illness risk in mind is worthwhile.__ __Japan's School Health and Safety Act sets the guideline for returning to school at \"5 days after onset and 1 day after symptoms ease\"__ (see our school infections page). __Vaccination is known to lower the risk of severe illness,__ and we offer vaccination here as well.",
    },
  },
  {
    slug: "bacterial-food-poisoning",
    title: "細菌性食中毒（カンピロバクター・サルモネラ・腸管出血性大腸菌等）",
    category: "internal",
    summary:
      "鶏肉の生焼け、加熱不十分な卵料理…。ウイルス性とは原因も症状の出方も異なる、食事が原因の感染症です。",
    pathology:
      "**カンピロバクター・サルモネラ・腸管出血性大腸菌（O157等）**等の細菌による胃腸炎で、__加熱不十分な鶏肉・卵・牛肉等を介して感染する__ことが多く、__ウイルス性胃腸炎（ノロ・ロタウイルス）とは原因も症状の出方も異なります__。__カンピロバクターは鶏肉の生食・加熱不十分が主な原因で、潜伏期間が2〜7日とやや長い__のが特徴です。__サルモネラは加熱不十分な卵・食肉が原因となりやすく、腸管出血性大腸菌（O157等）は、水様便に続いて血便を伴う激しい腹痛__を起こすことがあります。__まれに、カンピロバクター感染の数週間後に手足の麻痺を来す「ギラン・バレー症候群」、腸管出血性大腸菌感染後に「溶血性尿毒症症候群（HUS）」__という重い合併症を起こすことがあります。",
    tests:
      "__便培養検査__で原因菌を確認することがあります。__血便や高熱を伴う場合__は、重症度評価のため血液検査を行います。",
    treatment:
      "__多くは、水分補給を中心とした対症療法で自然に軽快__します。__腸管出血性大腸菌感染症では、下痢止めの使用がかえって症状を悪化させる（毒素の排出を妨げる）ことがあるため使用を避ける__等、__原因菌によって対応が異なる__点が重要です。__重症例や血便を伴う場合、合併症が疑われる場合__には、入院治療が可能な医療機関と連携します。",
    tip: "__「お腹の風邪」とまとめて考えがちですが、原因が細菌かウイルスかで注意点が異なる__ため、__血便がある、高熱が続く、症状が重い__場合は自己判断で様子を見ず受診してください。__予防の基本は、お肉の中心までしっかり加熱すること（中心温度75℃で1分以上）、生肉を扱った後の手洗い、調理器具の使い分け__です。バーベキューや焼肉の季節は特にご注意ください。",
    sources: [
      {
        label: "厚生労働省・自治体衛生部門による食中毒予防啓発情報（カンピロバクター・サルモネラ・腸管出血性大腸菌等）",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Bacterial food poisoning (Campylobacter, Salmonella, enterohemorrhagic E. coli, etc.)",
      summary: "Undercooked chicken, insufficiently cooked eggs... An infection caused by food, with a different cause and symptom pattern from viral gastroenteritis.",
      pathology:
        "Gastroenteritis caused by bacteria such as **Campylobacter, Salmonella, and enterohemorrhagic E. coli (such as O157)**, often transmitted through __undercooked chicken, eggs, or beef__, with __a different cause and symptom pattern from viral gastroenteritis (norovirus, rotavirus)__. __Campylobacter is mainly caused by raw or undercooked chicken and has a somewhat longer incubation period of 2–7 days.__ __Salmonella is often linked to undercooked eggs or meat, while enterohemorrhagic E. coli (O157, etc.) can cause watery diarrhea followed by severe abdominal pain with bloody stool.__ __Rarely, Campylobacter infection can lead to Guillain-Barré syndrome (limb paralysis) weeks later, and enterohemorrhagic E. coli infection can lead to hemolytic uremic syndrome (HUS)__ — serious complications.",
      tests:
        "__A stool culture__ may be done to identify the causative bacteria. __If there's bloody stool or a high fever,__ we run blood tests to assess severity.",
      treatment:
        "__Most cases resolve naturally with symptomatic treatment centered on fluid replacement.__ __For enterohemorrhagic E. coli infection, anti-diarrheal medication is avoided because it can worsen symptoms by delaying toxin elimination__ — __the right approach differs depending on the causative bacteria,__ which matters. __For severe cases, bloody stool, or suspected complications,__ we coordinate with institutions capable of inpatient treatment.",
      tip: "__People tend to lump this together as \"a stomach bug,\" but the precautions differ depending on whether the cause is bacterial or viral.__ If you have __bloody stool, a persistent high fever, or severe symptoms,__ please don't wait and see — come in. __The basics of prevention are thoroughly cooking meat through to the center (75°C core temperature for at least 1 minute), washing hands after handling raw meat, and using separate utensils for raw and cooked food.__ Please take extra care during barbecue and grilling season.",
    },
  },
  {
    slug: "croup",
    title: "クループ症候群（急性喉頭気管支炎）",
    category: "internal",
    summary:
      "特徴的な犬が吠えるような咳と、息を吸うときのゼーゼー音が特徴の、乳幼児に多いウイルス性の喉の炎症です。",
    pathology:
      "**パラインフルエンザウイルス**等のウイルス感染により、喉頭（のどぼとけの周辺）から気管にかけて炎症が起こり、__気道が狭くなる__ことで症状が出ます。__生後6か月〜3歳頃の乳幼児に多く__、__「ケンケン」「オットセイの鳴き声」に例えられる特徴的な咳__と、__息を吸うときにヒューヒュー・ゼーゼーという音（吸気性喘鳴）__が特徴です。__夜間〜明け方に症状が強くなりやすい__傾向があり、発熱を伴うこともあります。多くは数日で軽快しますが、__まれに気道が強く狭くなり呼吸困難に至る__ことがあります。",
    tests:
      "特徴的な咳・吸気性喘鳴等の所見から診察で診断することが多いです。重症度評価のため、呼吸状態・酸素飽和度等を確認します。",
    treatment:
      "**ステロイド薬（内服・吸入）**の投与が、気道の炎症・腫れを抑え症状の改善を早めるとされています。重症の場合は、__アドレナリン吸入__等で一時的に気道の狭窄を和らげる処置を行うこともあります。__呼吸困難が強い、顔色が悪い、ぐったりしている__等の場合は、入院での厳重な管理が必要なことがあり、速やかに小児の入院治療が可能な医療機関へご紹介します。",
    tip: "__「ただの咳」と様子を見ているうちに、夜間に急に症状が悪化する__ことがあるクループ症候群は、保護者の方にとって不安の大きい病気のひとつです。__「ケンケン」という特徴的な咳や、息を吸う時のゼーゼー音__に気づいたら、軽症のうちに一度ご相談いただくと安心です。似た症状でより緊急性の高い「急性喉頭蓋炎」との鑑別も重要で、__高熱・よだれが多い・声がこもる等__を伴う場合は特に注意が必要です。",
    sources: [
      {
        label:
          "コクランレビュー（クループに対するステロイドの有効性）等、国際的な知見に基づく一般的な治療方針",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Croup (acute laryngotracheobronchitis)",
      summary: "A viral throat inflammation common in young children, characterized by a distinctive barking cough and a wheezing sound when breathing in.",
      pathology:
        "Viral infection, often with **parainfluenza virus**, causes inflammation from the larynx (around the voice box) down to the trachea, __narrowing the airway__ and producing symptoms. It's __common in infants and young children from about 6 months to 3 years old__, and is characterized by __a distinctive cough,__ often described as sounding like a bark or a seal, along with __a wheezing, whistling sound when breathing in (inspiratory stridor)__. Symptoms tend to __worsen at night and toward early morning__, and fever can occur. Most cases improve within a few days, but __rarely, the airway narrows severely enough to cause real difficulty breathing.__",
      tests:
        "Usually diagnosed based on the characteristic cough and inspiratory stridor observed during examination. Breathing status and oxygen saturation are checked to assess severity.",
      treatment:
        "**Steroid medication (oral or inhaled)** is thought to reduce airway inflammation and swelling and speed symptom improvement. In severe cases, __inhaled adrenaline__ may be used to temporarily ease airway narrowing. If __breathing difficulty is severe, color is poor, or the child seems listless,__ close inpatient monitoring may be needed, and we promptly refer you to an institution capable of pediatric inpatient care.",
      tip: "Croup, where __what looks like \"just a cough\" can suddenly worsen at night,__ is one of the more anxiety-inducing conditions for parents. If you notice __the distinctive barking cough or wheezing sound when breathing in,__ coming in while it's still mild can bring peace of mind. Distinguishing it from the more urgent \"acute epiglottitis,\" which has similar symptoms, also matters — __particularly if there's a high fever, excessive drooling, or a muffled voice,__ extra caution is needed.",
    },
  },
  {
    slug: "impetigo",
    title: "とびひ（伝染性膿痂疹）",
    category: "internal",
    summary:
      "虫刺されや湿疹をかいた傷から細菌が入り、あっという間に全身へ広がる「とびひ」。夏場に子どもに多い皮膚の感染症です。",
    pathology:
      "虫刺され・あせも・湿疹等を__かきむしった傷から黄色ブドウ球菌や溶連菌（連鎖球菌）__が入り込んで起こる皮膚の感染症です。水ぶくれ（水疱）ができてすぐ破れ、じゅくじゅくした浸出液を伴う**水疱性膿痂疹**（主に黄色ブドウ球菌、乳幼児に多い）と、__厚いかさぶた（痂皮）__ができる**痂皮性膿痂疹**（主に溶連菌）の2タイプがあります。__かいた手で他の部位を触ることで、火が飛び火するように次々と病変が広がる__ことから「とびひ」と呼ばれ、高温多湿の夏場に子どもに多く見られます。",
    tests:
      "特徴的な皮疹（水疱・びらん・痂皮の分布と広がり方）から視診で診断することが多いです。治りが悪い場合や繰り返す場合には、__原因菌を調べる培養検査__を行うことがあります。",
    treatment:
      "**抗菌薬（外用・内服）**による治療が基本です。__病変が小さく限られている場合は抗菌薬の塗り薬__、__範囲が広い場合や塗り薬で改善しない場合は内服の抗菌薬__を使用します。かきむしりを防ぐため、__患部を清潔なガーゼ等で覆う__ことも有効です。**治療開始後3日たっても改善しない場合**は、通常の抗菌薬が効きにくい耐性菌（MRSA等）の関与を考え、治療薬の見直しを検討します。",
    tip: "__「虫刺されがひどくなっただけ」と自己判断で市販薬だけで様子を見ている__うちに、__入浴やタオルの共用、きょうだい間の接触等で次々と広がってしまう__ことがよくあります。__プール・保育園・幼稚園では、治るまで水疱やびらんを覆う等の対応が必要になる__ことが多いため、早めの受診で原因に合った治療を受けることが、本人にとってもご家族にとっても安心です。",
    sources: [
      {
        label:
          "日本皮膚科学会専門医による治療指針（原因菌に応じた抗菌薬選択・MRSA鑑別の考え方）に基づく",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Impetigo (contagious)",
      summary: "Bacteria entering through a scratched insect bite or rash, spreading over the body in no time — impetigo is a skin infection common in children during summer.",
      pathology:
        "A skin infection that occurs when __Staphylococcus aureus or strep bacteria__ enter through a scratched insect bite, heat rash, or eczema. There are two types: **bullous impetigo** (mainly Staph, common in young children), where blisters form and quickly burst, leaving a moist, oozing surface; and **crusted impetigo** (mainly strep), which forms __thick scabs (crusts).__ It's called \"impetigo\" (literally \"flying fire\" in Japanese) because __touching other areas with the hand used to scratch spreads lesions one after another, like sparks jumping__, and it's common in children during the hot, humid summer.",
      tests:
        "Usually diagnosed by visual examination of the characteristic rash (the distribution and spread of blisters, erosions, and crusts). __A culture to identify the causative bacteria__ may be done if healing is poor or it keeps recurring.",
      treatment:
        "**Antibiotics (topical or oral)** are the mainstay of treatment. __If the lesion is small and limited, a topical antibiotic is used; if it's widespread or not improving with topical treatment, oral antibiotics are used.__ __Covering the affected area with clean gauze__ to prevent scratching also helps. **If there's no improvement after 3 days of treatment,** we consider that a resistant bacterium (such as MRSA) may be involved and review the medication.",
      tip: "__While treating it on your own with over-the-counter medication, assuming it's \"just a worse insect bite,\"__ it can __spread repeatedly through bathing, shared towels, or contact between siblings.__ __Pools, nurseries, and kindergartens often require covering blisters and erosions until healed,__ so coming in early for the right treatment brings peace of mind for both the child and the family.",
    },
  },
  {
    slug: "viral-gastroenteritis",
    title: "感染性胃腸炎（ノロウイルス・ロタウイルス）",
    category: "internal",
    summary:
      "嘔吐・下痢を引き起こすウイルス性の胃腸炎です。治療の中心は脱水を防ぐことで、ご家庭でのケアの仕方が回復を左右します。",
    pathology:
      "**ノロウイルス・ロタウイルス**等のウイルス感染によって起こる胃腸炎で、__嘔吐から始まり、続いて水のような下痢__が数日間続くのが典型的な経過です。__ノロウイルスは年間を通じて、特に冬場に全年齢層で流行__しやすく、__ロタウイルスは白っぽく激しい水様便__が特徴とされ、乳幼児に多く見られます。__感染力が非常に強く、吐物・便はもちろん、わずかなウイルス量でも手指や物の表面を介して次々と感染が広がる__ため、家庭内や保育園・幼稚園で集団発生しやすい点が特徴です。",
    tests:
      "症状の経過から診断することが多く、__必要に応じて迅速抗原検査（便を用いた検査）__で原因ウイルスを確認することがあります。重症度評価のため、__脱水の程度（口の渇き、尿の回数、活気の有無等）__を診察で確認します。",
    treatment:
      "__ウイルスそのものに効く薬はなく、治療の中心は脱水を防ぐこと__です。**経口補水液（OS-1等の低浸透圧タイプ）を少量ずつ、こまめに飲ませる**ことで、多くは自宅でのケアで乗り切ることができます。母乳は中止せずに続け、__離乳食や普段の食事も、吐き気が落ち着けば早めに再開する__ことが勧められています。__嘔吐が激しく水分がまったく摂れない、ぐったりして元気がない、尿が半日以上出ない__等、脱水が疑われる場合は、点滴による治療が必要になることがあり、速やかにご相談ください。",
    tip: "__「下痢止めを使えば早く治る」と考えがちですが、小児のウイルス性胃腸炎では下痢止めの使用はむしろ推奨されていません__（ウイルスの排出を遅らせる可能性があるため）。__水分を少しずつ、頻回に与えること__が回復への一番の近道です。また、__嘔吐物・便の処理時の手洗い・消毒（アルコールでは効きにくく、塩素系消毒薬が有効）__を徹底することが、家庭内や集団での感染拡大を防ぐ鍵になります。",
    sources: [
      {
        label:
          "日本小児救急医学会「エビデンスに基づいた子どもの腹部救急診療ガイドライン2017 第Ⅰ部 小児急性胃腸炎診療ガイドライン」",
        url: "https://minds.jcqhc.or.jp/summary/c00577/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Viral gastroenteritis (norovirus, rotavirus)",
      summary: "Viral gastroenteritis causing vomiting and diarrhea. Treatment centers on preventing dehydration, and how you care for it at home strongly affects recovery.",
      pathology:
        "Gastroenteritis caused by viruses such as **norovirus and rotavirus**, typically __starting with vomiting, followed by several days of watery diarrhea.__ __Norovirus circulates year-round, especially in winter, affecting all ages,__ while __rotavirus is known for pale, forceful, watery stools__ and is more common in young children. __It's highly contagious — even a tiny amount of virus spreads easily via vomit, stool, hands, and surfaces,__ which is why outbreaks often occur within families or at nurseries and kindergartens.",
      tests:
        "Usually diagnosed from the course of symptoms; __a rapid antigen test (using a stool sample)__ may confirm the causative virus as needed. We assess severity by checking __the degree of dehydration (dry mouth, urine frequency, activity level, etc.)__ during examination.",
      treatment:
        "__There's no medication that targets the virus itself, so treatment centers on preventing dehydration.__ **Giving small, frequent sips of an oral rehydration solution (a low-osmolarity type like OS-1)** allows most cases to be managed at home. Breastfeeding should continue without interruption, and __reintroducing baby food or regular meals early, once nausea settles,__ is recommended. If __vomiting is severe and no fluids are staying down, the child is listless, or there's no urine for half a day or more,__ dehydration may be significant and IV treatment may be needed — please contact us promptly in that case.",
      tip: "__People often assume \"anti-diarrheal medicine speeds recovery,\" but for viral gastroenteritis in children, anti-diarrheal medication is actually not recommended__ (it may delay clearing the virus). __Giving fluids in small, frequent amounts__ is the real shortest path to recovery. Also, __thorough handwashing and disinfection when handling vomit or stool (alcohol is less effective — chlorine-based disinfectant works better)__ is key to preventing spread within the household or a group setting.",
    },
  },
  {
    slug: "iron-deficiency-anemia",
    title: "鉄欠乏性貧血",
    category: "internal",
    summary:
      "立ちくらみ・疲れやすさ等から「貧血では」と来院される方の中で最も頻度が高いのがこのタイプです。原因を突き止めることが治療の近道です。",
    pathology:
      "貧血の中で__最も頻度が高い__のが鉄欠乏性貧血です。体内の鉄が不足すると、酸素を運ぶ**ヘモグロビン**が十分に作れなくなり、__顔色の悪さ・疲れやすさ・動悸・息切れ・立ちくらみ__等の症状が出ます。__女性では月経による慢性的な出血__が代表的な原因ですが、__消化管からの出血（胃潰瘍・大腸ポリープ・大腸がん等）、偏った食事、妊娠中の需要増加__等、原因は人によってさまざまです。__「疲れやすい＝貧血」と自己判断__される方が多いのですが、__実際に血液検査をすると貧血ではなかった、あるいは別のタイプの貧血だった__ということも少なくありません。",
    tests:
      "**院内の血球計算装置（血算）でヘモグロビン値・MCV（赤血球の大きさ）をその場で測定でき、貧血かどうか・どのタイプかの簡易的な判断がすぐにできます**。あわせて__血清フェリチン（体内の貯蔵鉄）__を確認します。フェリチンはヘモグロビンが下がるより先に低下するため、__隠れた鉄欠乏の早期発見__に役立ちます。__原因を調べるため、月経の状況の確認や、必要に応じて胃カメラ・大腸カメラ等の消化管精査__を行うこともあります。",
    treatment:
      "**経口鉄剤**による治療が基本です。__ヘモグロビン値が正常化した後も、体内に鉄を貯金する（貯蔵鉄を回復させる）ため、数か月間は内服を継続する__ことが推奨されています。経口鉄剤で消化器症状（吐き気・便秘等）が強く内服が難しい場合は、__注射用鉄剤__を検討することもあります。__最も重要なのは、鉄が足りなくなった原因を見つけて対処すること__で、原因を放置したまま鉄剤だけを続けても再発を繰り返します。",
    tip: "__「貧血気味だから鉄分のサプリを飲んでいる」という方__も多いですが、__自己判断でのサプリ摂取では、本当に鉄欠乏なのか、どの程度不足しているのかが分からない__ため、改善の実感が得られなかったり、逆に原因検索が遅れてしまったりすることがあります。__特に、男性や閉経後の女性の鉄欠乏性貧血では、消化管からの出血が隠れていないかの確認が重要__です。__当院では院内の血算機でMCVまでその場で測定できるため、「本当に貧血かどうか」「鉄欠乏タイプかどうか」の目安をその日のうちにお伝えできます__。まずは一度、採血で現状を正しく把握することが、安心への一番の近道です。",
    sources: [
      {
        label: "日本鉄バイオサイエンス学会「鉄欠乏性貧血の診療指針」（2024年改訂）",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Iron deficiency anemia",
      summary: "Among people who come in with lightheadedness, fatigue, or a feeling of \"maybe it's anemia,\" this is by far the most common type. Finding the underlying cause is the fastest path to treatment.",
      pathology:
        "Iron deficiency anemia is __the most common type of anemia.__ When the body runs short on iron, it can't make enough **hemoglobin** to carry oxygen, causing __pallor, fatigue, palpitations, shortness of breath, and lightheadedness.__ __Chronic blood loss from menstruation__ is a leading cause in women, but causes vary — __bleeding from the digestive tract (stomach ulcer, colon polyps, colon cancer, etc.), an unbalanced diet, and increased demand during pregnancy,__ among others. Many people __assume \"tired = anemia\" on their own,__ but it's common to find, __once tested, that it isn't anemia at all, or it's a different type of anemia.__",
      tests:
        "**Our in-house blood cell counter can measure hemoglobin and MCV (red blood cell size) on the spot, giving a quick sense of whether it's anemia and, if so, what type.** We also check __serum ferritin (the body's stored iron)__, since ferritin drops before hemoglobin does, helping us __catch hidden iron deficiency early.__ __To find the cause, we may check your menstrual history and, as needed, examine the digestive tract with endoscopy (gastroscopy/colonoscopy).__",
      treatment:
        "**Oral iron supplements** are the standard treatment. __Even after hemoglobin normalizes, continuing treatment for several months is recommended to rebuild the body's iron stores.__ If digestive side effects (nausea, constipation, etc.) make oral iron difficult, __injectable iron__ may be considered. __Most important is finding and addressing the reason iron became deficient in the first place__ — continuing iron supplements alone without addressing the cause leads to recurrence.",
      tip: "__Many people take an iron supplement on their own, thinking \"I'm a bit anemic,\"__ but __without testing, you can't know whether you're actually iron-deficient, or how deficient you are__ — which can mean not noticing any real improvement, or delaying the search for the actual cause. __In men and postmenopausal women with iron deficiency anemia in particular, it's important to check for hidden bleeding from the digestive tract.__ __Since our in-house blood counter can measure MCV on the spot, we can tell you the same day whether it's truly anemia and whether it looks like the iron-deficient type.__ Starting with a simple blood test to get an accurate picture is the fastest path to peace of mind.",
    },
  },
  {
    slug: "megaloblastic-anemia",
    title: "巨赤芽球性貧血（ビタミンB12欠乏性貧血・葉酸欠乏性貧血）",
    category: "internal",
    summary:
      "ビタミンB12や葉酸の不足で起こる貧血で、放置すると手足のしびれ等の神経症状を残すことがあります。鉄剤では改善しないタイプの貧血です。",
    pathology:
      "**ビタミンB12・葉酸**は、体内で血液（赤血球）を新しく作る際に欠かせない栄養素です。これらが不足すると、骨髄で作られる赤血球が異常に大きくなり（巨赤芽球）、__正常に機能しないまま壊れてしまう__ため貧血が起こります。__ビタミンB12欠乏の代表的な原因は、胃から分泌される「内因子」という物質の不足による吸収障害（悪性貧血）__で、__胃の手術歴がある方や、長期間の厳格な菜食__等でも起こり得ます。__葉酸欠乏は、偏った食事や大量の飲酒、一部の薬剤の影響__等で起こります。__鉄欠乏性貧血とは原因も治療法もまったく異なる__ため、同じ「貧血」でも__鉄剤を飲んでも改善しません__。",
    tests:
      "**院内の血球計算装置（血算）でヘモグロビン値に加えMCV（赤血球の大きさ）をその場で確認でき、このタイプの貧血では赤血球が大きくなる特徴があるため、来院当日のうちに「鉄欠乏とは違うタイプかもしれない」という見当をつけることができます**。確定のため__血清ビタミンB12・葉酸__を測定し、__ビタミンB12欠乏が疑われる場合は、原因検索のため胃カメラ等の検査__を検討することもあります。",
    treatment:
      "**ビタミンB12または葉酸の補充**が治療の基本です。__吸収障害がある場合はビタミンB12の注射での補充__が必要になることが多く、__原因によっては生涯にわたる定期的な補充__が必要になることもあります。__ビタミンB12欠乏を見逃したまま葉酸だけを補充すると、貧血の数値は改善しても神経症状（手足のしびれ等）がかえって進行することがある__ため、__どちらが不足しているのかを正確に見極めてから治療を開始する__ことが重要です。",
    tip: "__「貧血＝鉄分不足」と思い込み、市販の鉄剤やサプリだけで様子を見ている__方の中に、実はこのタイプの貧血が隠れていることがあります。__手足のしびれ・ふらつき・舌の違和感・物忘れの悪化__等、貧血の症状に加えて神経症状がある場合は、特に注意が必要です。__進行した神経症状は治療をしても完全には戻らないことがある__ため、__「疲れやすいだけ」と様子を見過ぎず__、早めのご相談をお勧めします。__当院では院内の血算機でMCVまでその場で測定できるため、鉄欠乏性貧血との見分けの第一歩をその日のうちにお手伝いできます__。",
    sources: [
      {
        label:
          "日本血液学会専門医による診療知見（ビタミンB12・葉酸欠乏性貧血の鑑別と治療）に基づく",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Megaloblastic anemia (vitamin B12 or folate deficiency anemia)",
      summary: "Anemia caused by a shortage of vitamin B12 or folate, which, if left untreated, can leave behind lasting nerve symptoms like numbness in the hands and feet. This type doesn't respond to iron supplements.",
      pathology:
        "**Vitamin B12 and folate** are essential nutrients for making new red blood cells. When they're deficient, the red blood cells produced in the bone marrow become abnormally large (megaloblasts) and __break down before they can function properly__, causing anemia. __A leading cause of B12 deficiency is impaired absorption due to a lack of \"intrinsic factor,\" a substance secreted by the stomach (pernicious anemia)__, which can also occur in people with a history of stomach surgery or long-term strict vegetarian/vegan diets. __Folate deficiency can result from an unbalanced diet, heavy alcohol use, or certain medications.__ Because __the cause and treatment are completely different from iron deficiency anemia,__ this type of \"anemia\" __won't improve with iron supplements.__",
      tests:
        "**Our in-house blood cell counter checks hemoglobin along with MCV (red blood cell size) on the spot; because red blood cells are enlarged in this type of anemia, we can get a sense the same day that \"this might be a different type than iron deficiency.\"** We confirm with __serum vitamin B12 and folate levels,__ and __if B12 deficiency is suspected, we may consider tests such as gastroscopy to investigate the cause.__",
      treatment:
        "**Replacing vitamin B12 or folate** is the basis of treatment. __If there's an absorption problem, B12 injections are often needed,__ and __depending on the cause, lifelong periodic replacement may be necessary.__ Because __missing a B12 deficiency and replacing only folate can actually worsen nerve symptoms (numbness, etc.) even as the anemia numbers improve,__ __correctly identifying which one is deficient before starting treatment__ matters.",
      tip: "__Some people simply assume \"anemia = low iron\" and manage with over-the-counter iron supplements or vitamins,__ but this type of anemia can be hiding underneath. __If you have numbness or unsteadiness in your hands and feet, a strange sensation on the tongue, or worsening forgetfulness, along with anemia symptoms,__ extra caution is warranted. __Advanced nerve symptoms sometimes don't fully recover even with treatment,__ so __rather than writing it off as \"just being tired,\" please come talk to us sooner rather than later.__ __Since our in-house blood counter can measure MCV on the spot, we can help with the first step of distinguishing this from iron deficiency anemia the same day.__",
    },
  },
  {
    slug: "heart-failure",
    title: "心不全",
    category: "internal",
    summary:
      "息切れ・むくみ・体重増加などが見られたら要注意。心不全は「進行を遅らせ、よい状態を長く保つ」ことを目指して治療する病気です。",
    pathology:
      "心不全とは、__心臓のポンプ機能が低下し、全身に十分な血液を送れなくなる、または血液をスムーズに受け入れられなくなった状態__の総称です。**高血圧・虚血性心疾患（狭心症・心筋梗塞）・心房細動・弁膜症・糖尿病**等、さまざまな病気の行き着く先として起こります。__階段や坂道での息切れ、横になると苦しい、足のむくみ、体重の急な増加（数日で2kg以上等）__は代表的なサインです。心不全は__「一度よくなったら治る」病気ではなく、良い状態を保ちながら進行を遅らせる、慢性的な付き合い方が必要な病気__です。__増悪（急に悪化すること）を繰り返すたびに心臓の機能が段階的に低下していく__ため、__早期からの治療介入と、増悪の予防__が非常に重要です。",
    tests:
      "**血液検査（BNP・NT-proBNPという心不全の指標）、心電図、胸部X線、心エコー検査**を組み合わせて、心不全の有無・原因・重症度を評価します。__当院では血液検査・心電図・胸部X線・心エコーをすべて院内で実施__でき、__息切れやむくみの原因が心臓によるものかどうかを、その日のうちに評価__することができます。",
    treatment:
      "**原因疾患の治療**（高血圧・虚血性心疾患・不整脈等のコントロール）とあわせて、__心臓の負担を軽減する薬物治療（ACE阻害薬／ARB、β遮断薬、MRA、SGLT2阻害薬等の「心不全の4本柱」と呼ばれる治療薬）__を、症状や腎機能等を見ながら段階的に調整していきます。**塩分制限・適切な水分管理・体重の毎日の記録**等の生活管理も、増悪予防の重要な柱です。__弁膜症の手術やカテーテル治療、重症の不整脈治療等、専門的な処置が必要と判断した場合__には、速やかに専門医療機関へご紹介し、__その後の日常的な経過観察は当院で継続して担う__という連携体制を取ります。",
    tip: "__「年のせいで息切れしやすくなった」「むくみは疲れのせい」__と見過ごされがちですが、__体重が数日で急に増える、夜間に咳や息苦しさで目が覚める__等は、心不全が悪化しているサインであることがあります。__早期に気づいて治療を調整できれば、入院を防ぎ、よい状態を長く保てる__可能性が高まります。__毎日の体重測定__は、ご自宅でできる最も簡単な心不全のセルフチェックです。気になる変化があれば、様子を見ずにご相談ください。",
    sources: [
      {
        label:
          "日本循環器学会・日本心不全学会「2021年 JCS/JHFSガイドラインフォーカスアップデート版 急性・慢性心不全診療」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Heart failure",
      summary: "Shortness of breath, swelling, and weight gain are warning signs. Heart failure is treated with the goal of slowing progression and maintaining a good quality of life for as long as possible.",
      pathology:
        "Heart failure is a general term for __the heart's pumping function declining to the point it can no longer send enough blood around the body, or can't smoothly receive blood returning to it.__ It's the endpoint of many different conditions, including **high blood pressure, ischemic heart disease (angina/heart attack), atrial fibrillation, valve disease, and diabetes.** Representative warning signs include __shortness of breath on stairs or slopes, difficulty breathing when lying down, swelling in the legs, and sudden weight gain (such as 2kg or more over a few days).__ Heart failure __isn't a condition that \"gets better once and is cured\" — it requires an ongoing, chronic approach of maintaining a good state while slowing progression.__ __Each time it flares up suddenly (an exacerbation), heart function tends to decline a notch further,__ so __early treatment and preventing exacerbations are very important.__",
      tests:
        "We combine **blood tests (BNP/NT-proBNP, markers of heart failure), an ECG, a chest X-ray, and echocardiography** to assess the presence, cause, and severity of heart failure. __All of these — blood tests, ECG, chest X-ray, and echocardiography — can be done in-house,__ letting us __assess the same day whether shortness of breath or swelling is coming from the heart.__",
      treatment:
        "Alongside **treating the underlying condition** (controlling high blood pressure, ischemic heart disease, arrhythmia, etc.), we gradually adjust __medication that reduces the heart's workload (what's often called the \"four pillars\" of heart failure treatment: ACE inhibitors/ARBs, beta blockers, MRAs, and SGLT2 inhibitors),__ taking symptoms and kidney function into account. **Salt restriction, careful fluid management, and daily weight tracking** are also key pillars for preventing exacerbations. __If specialized procedures are needed — valve surgery, catheter treatment, or treatment for serious arrhythmia —__ we promptly refer you to a specialist institution, and __continue your ongoing day-to-day follow-up here__ afterward.",
      tip: "__\"I get short of breath more easily because of age\" or \"the swelling is from being tired\" are easy to dismiss,__ but __a sudden weight gain over a few days, or waking at night from coughing or breathlessness,__ can be signs that heart failure is worsening. __Catching it early and adjusting treatment can help prevent hospitalization and maintain a good state for longer.__ __Daily weight tracking__ is the simplest self-check you can do at home for heart failure. If you notice a concerning change, please don't wait and see — come talk to us.",
    },
  },
  {
    slug: "atrial-fibrillation",
    title: "心房細動",
    category: "internal",
    summary:
      "「脈がたまに飛ぶ」「ドキドキする」と感じたら、心房細動のサインかもしれません。放置すると脳梗塞のリスクが高まる不整脈です。",
    pathology:
      "心房細動は、__心臓の上側の部屋（心房）が小刻みに不規則に震えるように動き、脈が乱れる__不整脈です。__動悸・息切れ・だるさ__等の自覚症状がある方もいれば、__まったく症状がなく、健診の心電図で偶然見つかる__方も少なくありません。__加齢とともに頻度が増え、高血圧・糖尿病・睡眠時無呼吸症候群・心臓の病気等が誘因__となります。心房細動の最大の問題は、__心房内で血液がよどみ、血栓（血のかたまり）ができやすくなること__で、__この血栓が脳に飛ぶと、重症化しやすい心原性脳梗塞を引き起こす__ことがあります。",
    tests:
      "**心電図**で診断します。__発作的に出たり消えたりする心房細動（発作性心房細動）は、受診時にたまたま脈が整っていると見逃されることがある__ため、__症状がある時の心電図記録や、必要に応じて長時間の心電図検査（ホルター心電図）__を行うことがあります。あわせて__心エコー検査で心臓の構造的な評価__も行います。",
    treatment:
      "治療の柱は2つあります。__ひとつは、脳梗塞を予防するための抗凝固薬（DOAC＝直接作用型経口抗凝固薬等）__で、__CHADS2スコア等を用いて脳梗塞のリスクを評価し、必要な方には内服を提案__します。__もうひとつは、脈拍数やリズムをコントロールする治療（薬物治療、場合によってはカテーテルアブレーション）__です。__症状が強い場合や、薬物治療で十分な効果が得られない場合には、根治を目指すカテーテルアブレーション治療が可能な専門医療機関へご紹介__し、__その後の内服管理・経過観察は当院で継続__します。",
    tip: "__「年のせいで動悸がする」「疲れのせいだろう」と様子を見ているうちに、気づかないまま心房細動が続いている__ことは珍しくありません。__無症状のまま脳梗塞のリスクだけが進行している__ケースもあるため、__健診で指摘されたことがある方、脈の乱れを感じたことがある方__は、一度心電図で確認されることをお勧めします。__適切な抗凝固薬の内服によって、脳梗塞のリスクを大きく下げられる__ことが分かっており、早期発見・早期治療の意義が大きい病気です。",
    sources: [
      {
        label: "日本循環器学会・日本不整脈心電学会「不整脈薬物治療に関するガイドライン（2020年改訂版）」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Atrial fibrillation",
      summary: "\"My pulse sometimes skips\" or \"my heart races\" — these could be signs of atrial fibrillation. Left untreated, this irregular heartbeat raises the risk of stroke.",
      pathology:
        "Atrial fibrillation is an irregular heartbeat where __the upper chambers of the heart (the atria) quiver rapidly and irregularly instead of beating normally, causing an uneven pulse.__ Some people notice symptoms like __palpitations, shortness of breath, or fatigue,__ while others have __no symptoms at all and it's found incidentally on an ECG during a checkup.__ It __becomes more common with age, and is triggered by factors such as high blood pressure, diabetes, sleep apnea, and heart disease.__ The biggest concern with atrial fibrillation is that __blood can pool and stagnate in the atria, making blood clots more likely to form__ — __if such a clot travels to the brain, it can cause a cardiogenic stroke, which tends to be particularly severe.__",
      tests:
        "Diagnosed with an **ECG**. __Because atrial fibrillation can come and go (paroxysmal atrial fibrillation), it can be missed if your pulse happens to be regular at the time of your visit,__ so __we may record an ECG while you have symptoms, or use extended ECG monitoring (a Holter monitor) as needed.__ We also do an __echocardiogram to assess the heart's structure.__",
      treatment:
        "There are two pillars of treatment. __One is anticoagulant medication to prevent stroke (such as DOACs — direct oral anticoagulants)__ — __we assess stroke risk using tools like the CHADS2 score and recommend medication for those who need it.__ __The other is controlling heart rate and rhythm (medication, and in some cases catheter ablation).__ __If symptoms are significant, or medication isn't effective enough,__ we refer you to a specialist institution capable of catheter ablation aimed at a cure, and __continue ongoing medication management and follow-up here afterward.__",
      tip: "__It's not uncommon for atrial fibrillation to continue unnoticed, dismissed as \"palpitations from age\" or \"probably just tiredness.\"__ Because __stroke risk can build up silently with no symptoms at all,__ __if you've been flagged at a checkup, or have ever noticed an irregular pulse,__ it's worth having it checked with an ECG. __Taking the right anticoagulant medication can significantly lower stroke risk,__ which is why early detection and early treatment matter so much with this condition.",
    },
  },
  {
    slug: "angina-ischemic-heart-disease",
    title: "狭心症・虚血性心疾患",
    category: "internal",
    summary:
      "「階段や坂道で胸が締め付けられる」。動いた時だけの胸の違和感、心臓の血管が原因かもしれません。",
    pathology:
      "心臓を栄養する血管（冠動脈）が__動脈硬化等によって狭くなり、心臓の筋肉に十分な血液が届かなくなる__ことで起こる病気の総称です。__坂道や階段等、体を動かした時に、胸の中央が締め付けられる・圧迫されるような痛みや違和感が数分間続き、安静にすると治まる__のが「狭心症」の典型的な症状です。__高血圧・脂質異常症・糖尿病・喫煙・肥満__等が主な危険因子で、__これらの生活習慣病を複数お持ちの方は特にリスクが高い__とされています。__症状が安静時にも起こる、持続時間が長い、冷や汗を伴う__場合は、__心筋梗塞（血管が完全に詰まった状態）__の可能性があり、緊急性が高くなります。",
    tests:
      "__心電図、血液検査__に加え、__運動や階段昇降後の心電図の変化を見る負荷心電図等__で評価することがあります。__より詳しい評価（心臓カテーテル検査・冠動脈CT等）__が必要と判断した場合は、専門の循環器内科へご紹介します。",
    treatment:
      "**生活習慣病の管理（高血圧・脂質異常症・糖尿病のコントロール、禁煙）**が治療の土台となり、__症状を抑える薬（硝酸薬・β遮断薬等）や、血栓を予防する薬（抗血小板薬）__による内服治療を行います。__狭窄が強い、薬物治療で症状がコントロールできない場合__には、__カテーテル治療（ステント留置等）やバイパス手術が可能な専門医療機関__へご紹介します。",
    tip: "__「年のせいで坂道がきつくなった」と見過ごされがちです__が、__動いた時だけ胸が苦しくなり、休むと治まる__という特徴に心当たりがあれば、一度ご相談ください。__突然の激しい胸の痛み・締め付け感・冷や汗を伴う場合は、様子を見ず今すぐ救急要請（119番）__してください。__高血圧・糖尿病・脂質異常症の治療を続けること自体が、この病気の予防__につながります。",
    sources: [
      {
        label: "日本循環器学会「2022年 JCSガイドラインフォーカスアップデート版 安定冠動脈疾患の診断と治療」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Angina and ischemic heart disease",
      summary: "\"My chest tightens on stairs or slopes.\" Chest discomfort that only happens with exertion could be coming from the heart's own blood vessels.",
      pathology:
        "A general term for conditions where __the blood vessels that nourish the heart (the coronary arteries) narrow, often due to atherosclerosis, so the heart muscle doesn't get enough blood.__ The classic symptom of \"angina\" is __a squeezing or pressing pain or discomfort in the center of the chest that lasts a few minutes during exertion — climbing a slope or stairs — and eases with rest.__ Main risk factors include __high blood pressure, dyslipidemia, diabetes, smoking, and obesity,__ and __having several of these lifestyle-related conditions at once raises risk further.__ __If symptoms occur even at rest, last longer, or come with cold sweats,__ this may indicate __a heart attack (where a vessel is completely blocked),__ which is more urgent.",
      tests:
        "__An ECG and blood tests,__ sometimes combined with __an exercise or stress ECG that looks for changes after activity like climbing stairs.__ If __more detailed evaluation (cardiac catheterization, coronary CT, etc.)__ is needed, we refer you to a cardiology specialist.",
      treatment:
        "**Managing lifestyle-related conditions (controlling high blood pressure, dyslipidemia, diabetes, and quitting smoking)** forms the foundation of treatment, alongside oral medication such as __drugs to ease symptoms (nitrates, beta blockers, etc.) and drugs to prevent blood clots (antiplatelet agents).__ __If narrowing is significant, or medication doesn't control symptoms well enough,__ we refer you to a specialist institution capable of __catheter treatment (such as stent placement) or bypass surgery.__",
      tip: "__It's easy to dismiss as \"slopes have just gotten harder because of age,\"__ but if the pattern of __chest discomfort only during activity, easing with rest__ sounds familiar, please come talk to us. __If you have sudden, severe chest pain, tightness, or cold sweats, don't wait — call emergency services (119) right away.__ Continuing treatment for high blood pressure, diabetes, and dyslipidemia is itself a way of preventing this condition.",
    },
  },
  {
    slug: "renal-anemia",
    title: "腎性貧血",
    category: "internal",
    summary:
      "慢性腎臓病が進むと起こる特有の貧血です。鉄剤だけでは改善せず、腎臓の働きに応じた専用の治療が必要です。",
    pathology:
      "腎臓は、__血液を作るよう骨髄に指令を出すホルモン「エリスロポエチン」__を分泌しています。**慢性腎臓病（CKD）が進行すると、このエリスロポエチンの分泌が低下**し、__鉄が十分にあっても赤血球が作られにくくなる「腎性貧血」__が起こります。__疲れやすさ・息切れ・めまい等__、他の貧血と似た症状が出ますが、__原因が腎機能の低下にあるため、鉄剤だけを補充しても十分には改善しません__。__CKDの進行とともに頻度が高まる__ため、__腎機能が低下している方では定期的な貧血のチェックが重要__です。",
    tests:
      "血液検査で__ヘモグロビン値に加え、腎機能（eGFR・クレアチニン）、鉄関連の指標（フェリチン・TSAT）__を確認し、__他の原因による貧血（鉄欠乏性貧血等）が隠れていないか__もあわせて評価します。",
    treatment:
      "**ESA（赤血球造血刺激因子製剤）またはHIF-PH阻害薬（内服薬）**によって、低下したエリスロポエチンの働きを補う治療が中心です。__鉄が不足している場合は鉄剤を併用__します。__治療の目標ヘモグロビン値は、年齢や心血管疾患の有無等を踏まえて個別に設定__し、__過剰な補正はかえって心血管イベントのリスクを高める__ことが知られているため、__定期的な採血でモニタリングしながら慎重に調整__します。腎機能の低下自体が進行し、__透析導入を要する段階__になった場合には、専門の腎臓内科・透析医療機関と連携して治療を継続します。",
    tip: "__「疲れやすいのは歳のせい」「貧血は鉄分不足だろう」と自己判断__していると、背景に慢性腎臓病が隠れていることに気づかれないまま時間が過ぎてしまうことがあります。__高血圧・糖尿病等で腎機能が心配な方、健診で腎機能の数値を指摘されたことがある方__は、貧血の症状がなくても一度腎機能と貧血をあわせて確認されることをお勧めします。__早期から治療を開始することで、生活の質を保ちながら腎臓病とうまく付き合っていく__ことができます。",
    sources: [
      {
        label: "日本透析医学会「2015年版 日本透析医学会 慢性腎臓病患者における腎性貧血治療のガイドライン」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Renal anemia",
      summary: "A distinctive type of anemia that develops as chronic kidney disease progresses. Iron supplements alone won't improve it — treatment needs to match how well the kidneys are working.",
      pathology:
        "The kidneys secrete __a hormone called erythropoietin, which signals the bone marrow to make blood__. **As chronic kidney disease (CKD) progresses, erythropoietin secretion declines**, leading to __\"renal anemia,\" where red blood cells aren't made efficiently even when iron is plentiful__. It causes symptoms similar to other types of anemia — __fatigue, shortness of breath, dizziness__ — but __because the cause lies in reduced kidney function, iron supplements alone won't adequately improve it__. __It becomes more common as CKD progresses__, so __regular anemia checks matter for anyone with reduced kidney function__.",
      tests:
        "Blood tests check __hemoglobin levels along with kidney function (eGFR, creatinine) and iron-related markers (ferritin, TSAT)__, while also evaluating __whether anemia from another cause (such as iron-deficiency anemia) might be present as well__.",
      treatment:
        "Treatment centers on **ESAs (erythropoiesis-stimulating agents) or HIF-PH inhibitors (oral medication)**, which make up for the reduced erythropoietin activity. __If iron is also low, iron supplements are added__. __The target hemoglobin level is set individually, based on age and the presence of cardiovascular disease__, and because __over-correction is known to actually raise the risk of cardiovascular events__, we __adjust carefully while monitoring with regular blood tests__. If kidney function itself continues to decline to __the point where dialysis is needed__, we continue treatment in partnership with a specialized nephrology/dialysis institution.",
      tip: "__Assuming \"I'm just tired because I'm getting older\" or \"anemia must just mean low iron\"__ can let underlying chronic kidney disease go unnoticed for a long time. __If you have high blood pressure, diabetes, or any concern about your kidney function, or you've been flagged for kidney numbers at a checkup__, we'd recommend checking both kidney function and anemia together even without anemia symptoms. __Starting treatment early helps you maintain your quality of life while managing kidney disease well__.",
    },
  },
  {
    slug: "osteoporosis",
    title: "骨粗鬆症",
    category: "internal",
    summary:
      "骨が弱くなり骨折しやすくなる、痛みのないまま進行する病気です。「背が縮んだ」「ちょっと転んだだけで骨折した」は要注意のサインです。",
    pathology:
      "骨粗鬆症は、__骨の量（骨密度）が減り、骨の中の構造がもろくなることで、骨折しやすくなる病気__です。__加齢・閉経後の女性ホルモン（エストロゲン）の減少__が代表的な原因で、__女性に多い__病気ですが、__男性やステロイド薬を長期に使用している方__にも起こります。__骨粗鬆症そのものには痛みがなく、自覚症状がほとんどない__ため、__骨折して初めて気づく__ことが非常に多いのが特徴です。__背骨の圧迫骨折（知らないうちに背が縮む、腰が曲がる）や、転倒による大腿骨近位部骨折（足の付け根の骨折）__は、__寝たきりや要介護状態につながる__ことがあり、__「骨折の連鎖」を防ぐことが治療の大きな目標__です。",
    tests:
      "**骨密度検査**で骨の強さを評価します。あわせて__血液検査でカルシウム・ビタミンD等の骨代謝マーカーを確認__し、__背骨のX線検査で、気づかないうちに起きている圧迫骨折（いつのまにか骨折）がないか__を評価します。",
    treatment:
      "**生活習慣の改善**（__カルシウム・ビタミンD・ビタミンKを意識した食事、適度な運動（ウォーキング等の荷重運動）、日光浴__）を基本としながら、__骨密度や骨折リスクに応じて薬物治療__を検討します。薬物治療には、__骨の破壊を抑える薬（ビスホスホネート製剤、デノスマブ等）や、骨を作る働きを強める薬（テリパラチド等）__があり、__リスクの程度に応じて使い分け__ます。__一度骨折を起こした方は、再骨折のリスクが非常に高い__ため、__骨折後できるだけ早期に治療を開始する__ことを大切にしています。__手術が必要な骨折が生じた場合__は、整形外科と連携して治療を進めます。",
    tip: "__「年を取れば骨が弱くなるのは仕方がない」と治療を先延ばしにしがち__ですが、__骨粗鬆症は検査で早期に見つけ、治療を始めれば骨折を防げる病気__です。__閉経後の女性、ご家族に大腿骨近位部骨折の既往がある方、ステロイド薬を長期に使用している方__は、症状がなくても一度骨密度を確認されることをお勧めします。__「身長が以前より2cm以上縮んだ」「背中や腰が丸くなってきた」__と感じたら、気づかないうちに圧迫骨折が起きているサインかもしれません。",
    sources: [
      {
        label: "日本骨粗鬆症学会・日本骨代謝学会・骨粗鬆症財団「骨粗鬆症の予防と治療ガイドライン2025年版」",
        url: "https://minds.jcqhc.or.jp/summary/c00798/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Osteoporosis",
      summary: "A painless, progressive condition where bones weaken and fracture more easily. \"I've gotten shorter\" or \"I fractured a bone from a minor fall\" are signs worth paying attention to.",
      pathology:
        "Osteoporosis is __a condition where bone mass (bone density) decreases and the internal structure of bone becomes more fragile, making fractures more likely__. __Aging and the decline in the female hormone estrogen after menopause__ are the leading causes, making it __more common in women__, though it also occurs in __men and anyone on long-term steroid medication__. Because __osteoporosis itself is painless and causes almost no noticeable symptoms__, it's very often __only discovered after a fracture occurs__. __Compression fractures of the spine (getting shorter without realizing it, a stooped posture) and hip fractures from a fall__ can lead to __becoming bedridden or needing long-term care__, so __preventing this \"chain of fractures\" is a major goal of treatment__.",
      tests:
        "**Bone density testing** evaluates bone strength. We also __check calcium, vitamin D, and other bone metabolism markers with a blood test__, and __evaluate the spine with an X-ray for compression fractures that may have gone unnoticed (\"silent fractures\")__.",
      treatment:
        "Treatment is built around **lifestyle improvements** (__a diet mindful of calcium, vitamin D, and vitamin K; moderate weight-bearing exercise such as walking; and sunlight exposure__), with __medication considered based on bone density and fracture risk__. Medications include __drugs that suppress bone breakdown (bisphosphonates, denosumab, etc.) and drugs that strengthen bone formation (teriparatide, etc.)__, chosen __according to the degree of risk__. __Anyone who has already had one fracture has a substantially higher risk of a second__, so we place importance on __starting treatment as early as possible after a fracture__. If __a fracture requiring surgery occurs__, we coordinate treatment with orthopedics.",
      tip: "__It's easy to put off treatment, assuming \"bones getting weaker is just part of aging,\"__ but __osteoporosis is a condition where early detection through testing and treatment can prevent fractures__. __Postmenopausal women, anyone with a family history of hip fracture, and anyone on long-term steroid medication__ would benefit from a bone density check even without symptoms. __\"I've gotten more than 2cm shorter than before\" or \"my back or lower back has started to curve\"__ can be signs that a compression fracture has already occurred without your noticing.",
    },
  },
  {
    slug: "insect-bites",
    title: "虫刺され",
    category: "internal",
    summary:
      "「ただの虫刺され」と思っていても、種類によっては強い症状やアナフィラキシーを起こすことがあります。見極めが大切です。",
    pathology:
      "蚊・ブユ（ブヨ）・ダニ・毛虫・ハチ等、__刺す（咬む）虫の種類によって症状の出方が大きく異なる__のが虫刺されの特徴です。__蚊は刺されてすぐかゆみが出ることが多い一方、ブユは半日〜1日後に強いかゆみ・腫れが遅れて出る__等、原因と症状のタイミングがずれることもあります。多くは__虫の唾液や毒成分に対するアレルギー反応__としての赤み・腫れ・かゆみですが、__ハチ（スズメバチ・アシナガバチ等）に刺された場合は、局所の症状だけでなく、全身にじんましん・呼吸困難・血圧低下等を起こす「アナフィラキシー」__に進むことがあり、__命に関わる緊急事態__となり得ます。__過去にハチに刺されたことがある方は、次に刺された際にアナフィラキシーを起こすリスクが高まる__ことが知られています。",
    tests:
      "多くは__皮疹の見た目や刺された状況（場所・時間帯・虫の心当たり）__から診断します。__全身症状（じんましんの広がり、呼吸困難、めまい等）がある場合は、アナフィラキシーとして緊急の対応__が必要かどうかをまず評価します。",
    treatment:
      "局所の症状には、__ステロイド外用薬__を早めにしっかり塗ることで、かゆみ・腫れを抑えられます。かゆみが強い場合は__抗ヒスタミン薬の内服__を併用することもあります。__ハチ刺傷等でアナフィラキシーの既往がある方には、緊急時に自己注射できるアドレナリン自己注射薬（エピペン）__が処方されることがあり、__刺された後に、じんましん・息苦しさ・めまい等の全身症状が出た場合は、ためらわずアドレナリンを使用したうえで、速やかに救急要請__することが推奨されています。",
    tip: "__「虫刺されくらいで病院に行くのは大げさ」と思われがちです__が、__かきむしって「とびひ」等の皮膚感染症を併発する__ことや、__ハチの場合は次に刺された時に重いアレルギー反応が出ることがある__ため、__症状が強い場合や、ハチに刺された経験がある方__は一度ご相談ください。__屋外での作業・草むらでの活動の後に、原因不明の皮疹・体調不良がある場合は、マダニ等による感染症が隠れていないかの確認も重要__です（マダニについては別ページもご参照ください）。",
    sources: [
      {
        label: "日本アレルギー学会（監修）Anaphylaxis対策委員会「アナフィラキシーガイドライン2022」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Insect bites and stings",
      summary: "Even what seems like \"just a bug bite\" can sometimes cause a severe reaction or anaphylaxis, depending on the insect. Telling the difference matters.",
      pathology:
        "A defining feature of insect bites and stings is that __symptoms vary widely depending on the type of insect__ — mosquitoes, blackflies (buyu), mites, caterpillars, bees, and more. __Mosquito bites often itch right away, while blackfly bites can bring on strong itching and swelling half a day to a day later__, so the cause and symptom timing don't always line up. Most cases are __an allergic reaction to the insect's saliva or venom__, causing redness, swelling, and itching, but __bee stings (from hornets, paper wasps, etc.) can progress beyond local symptoms to \"anaphylaxis\" — hives, difficulty breathing, and a drop in blood pressure throughout the body__, which can become a __life-threatening emergency__. __Anyone who has been stung by a bee before has a higher risk of anaphylaxis if stung again__.",
      tests:
        "Diagnosis is usually based on __the appearance of the skin reaction and the circumstances of the bite or sting (location, time of day, any insect you recall)__. If __whole-body symptoms are present (spreading hives, difficulty breathing, dizziness, etc.)__, we first assess whether emergency treatment for anaphylaxis is needed.",
      treatment:
        "For local symptoms, applying a __topical steroid__ promptly and thoroughly can control itching and swelling. If itching is severe, an __oral antihistamine__ may be added. __For anyone with a history of anaphylaxis from a bee sting, an adrenaline auto-injector (EpiPen) that can be self-administered in an emergency__ may be prescribed, and __if whole-body symptoms such as hives, difficulty breathing, or dizziness appear after a sting, using adrenaline without hesitation and calling emergency services right away__ is recommended.",
      tip: "__It's easy to think \"it's just a bug bite, going to the doctor feels excessive,\"__ but __scratching can lead to a skin infection such as impetigo__, and __with bees, a future sting can bring on a much more severe allergic reaction__, so __if symptoms are severe, or you've been stung by a bee before__, please come talk to it over with us. __If an unexplained rash or feeling unwell follows outdoor work or time in tall grass, it's also worth checking for a tick-borne infection__ (please see our separate page on tick bites as well).",
    },
  },
  {
    slug: "tick-bite-sfts",
    title: "マダニ刺咬症・重症熱性血小板減少症候群（SFTS）",
    category: "internal",
    summary:
      "草むらでのマダニ刺されがきっかけで、まれに命に関わる感染症（SFTS）を起こすことがあります。宮崎県を含む九州は発生の多い地域のひとつです。",
    pathology:
      "__マダニ__は、草むら・藪・畑仕事・農作業・キャンプ等の際に皮膚に取り付き、__気づかないうちに長時間吸血する__ことがあります。マダニに刺されること自体による局所の症状（赤み・しこり）に加えて、__一部のマダニがウイルスや細菌を保有しており、それが刺咬を通じて感染する__ことがあります。中でも__重症熱性血小板減少症候群（SFTS）__は、__SFTSウイルスを持つマダニに刺されることで感染し、6〜14日の潜伏期間の後、発熱・嘔吐・下痢等の消化器症状で発症__します。__重症化すると、血小板や白血球の減少、出血傾向、意識障害等を来し、__報告によって幅はあるものの__致死率は6〜30%程度__とされる、__決して軽視できない感染症__です。__西日本を中心に報告が多く、__近年は全国的に報告数・報告地域が拡大傾向__にあります。__感染したペット（猫・犬）の体液との接触でも感染しうる__ことが分かっています。",
    tests:
      "__マダニに刺された痕やマダニそのものの付着の有無__を確認します。SFTSが疑われる場合は、__血液検査（血小板減少・白血球減少・肝酵素上昇等）__で特徴的な所見を確認し、__確定診断のための検査が可能な保健所・専門医療機関と連携__します。",
    treatment:
      "__マダニを見つけた場合、自己判断で無理に引き抜こうとすると、口器が皮膚内に残って感染リスクが高まる__ことがあるため、__皮膚科・医療機関での適切な除去__が推奨されます。SFTSに対する__特効的な治療薬はこれまで限られていましたが、2024年6月に国内で抗ウイルス薬（ファビピラビル）が承認__され、__病状の進行が見込まれる場合の治療選択肢__となっています。基本的には__全身管理を含む対症療法__が中心で、重症例は入院治療が可能な医療機関と連携して対応します。",
    tip: "__「虫に刺されただけ」と様子を見ているうちに、数日後に高熱や消化器症状が出て初めてマダニに刺されていたことに気づく__ケースも少なくありません。__現時点でSFTSに有効なワクチンはなく、「刺されないこと」が最大の予防策__です。__草むら・畑・山林に入る際は、長袖・長ズボンを着用し、忌避剤（DEET・イカリジン等）を活用し、屋外活動の後は体を確認する__ことを習慣にしましょう。__マダニに刺されているのを見つけた場合や、刺された後に原因不明の発熱・体調不良が出た場合__は、様子を見過ぎずに早めにご相談ください。",
    sources: [
      {
        label: "国立健康危機管理研究機構（旧国立感染症研究所）「重症熱性血小板減少症候群（SFTS）」",
        url: "https://www.niid.go.jp/niid/ja/diseases/sa/sfts.html",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Tick bites & Severe Fever with Thrombocytopenia Syndrome (SFTS)",
      summary: "A tick bite in tall grass can, rarely, lead to a life-threatening infection (SFTS). Miyazaki, along with the rest of Kyushu, is one of the areas where it occurs more often.",
      pathology:
        "__Ticks__ attach to the skin during time in tall grass, brush, farm work, or camping, and can __feed on blood for a long time without you noticing__. Beyond the local reaction to the bite itself (redness, a firm lump), __some ticks carry viruses or bacteria that can be transmitted through the bite__. Among these, __Severe Fever with Thrombocytopenia Syndrome (SFTS)__ is caused by a bite from a tick carrying the SFTS virus, and after an incubation period of 6–14 days, __it begins with digestive symptoms such as fever, vomiting, and diarrhea__. __In severe cases, it can cause a drop in platelets and white blood cells, a tendency to bleed, and impaired consciousness__, with __a reported fatality rate of around 6–30%__ — __a genuinely serious infection, not one to take lightly__. __Reports are concentrated in western Japan__, and __in recent years the number of reports and the areas affected have been expanding nationwide__. __It can also be transmitted through contact with bodily fluids from an infected pet (cat or dog)__.",
      tests:
        "We check for __a tick bite mark or an actual tick still attached__. If SFTS is suspected, __blood tests (checking for low platelets, low white blood cells, elevated liver enzymes, and other characteristic findings)__ are used, and we coordinate with __the public health center or a specialized institution capable of confirmatory testing__.",
      treatment:
        "__If you find a tick attached, trying to pull it out forcefully on your own can leave its mouthparts embedded in the skin and raise infection risk__, so __proper removal at a dermatology clinic or medical institution__ is recommended. __Specific treatment for SFTS had long been limited, but an antiviral drug (favipiravir) was approved in Japan in June 2024__, giving __a treatment option when the condition is expected to progress__. Care otherwise centers on __supportive treatment including whole-body management__, and severe cases are managed in coordination with an institution capable of inpatient care.",
      tip: "__It's common to simply watch and wait, thinking \"it's just a bug bite,\" only to realize days later — once a high fever or digestive symptoms appear — that a tick bite was the cause__. __There is currently no effective vaccine for SFTS, so avoiding bites in the first place is the best prevention__. Make it a habit to __wear long sleeves and long pants when entering tall grass, fields, or forested areas, use an insect repellent (DEET, icaridin, etc.), and check your body after outdoor activity__. __If you find a tick attached, or develop unexplained fever or feel unwell after a bite__, please don't wait too long — come talk to us sooner rather than later.",
    },
  },
  {
    slug: "cat-scratch-disease",
    title: "猫ひっかき病",
    category: "internal",
    summary:
      "猫に引っかかれたり咬まれたりした後に、リンパ節が腫れて長引くことがある感染症です。猫を飼っているご家庭では知っておきたい病気です。",
    pathology:
      "**バルトネラ・ヘンセレ（Bartonella henselae）**という細菌による感染症で、__猫にひっかかれる・咬まれる、あるいは猫についたノミに刺される__ことで感染します。__猫自身はほとんど症状を示さないまま菌を保有している__ことが多く、__特に子猫からの感染が報告されています__。__受傷部位に小さな発疹やかさぶたができた後、1〜数週間してから、受傷部位に近いリンパ節（脇の下・首・肘等）が腫れて痛みを伴う__のが典型的な経過です。__微熱や倦怠感を伴う__こともあり、多くは__数週間〜数か月かけて自然に軽快__しますが、__原因不明のリンパ節の腫れとして長引き、他の病気との鑑別が必要になる__こともあります。",
    tests:
      "__猫との接触歴（ひっかき傷・咬み傷の有無）__の問診が診断の大きな手がかりになります。__リンパ節の腫れの原因を調べるため、血液検査や、必要に応じて画像検査__を行い、__他の原因（悪性リンパ腫等）が隠れていないか__を確認することも重要です。確定診断のための特殊な血清検査は、実施できる施設が限られています。",
    treatment:
      "__軽症の場合は、特別な治療をしなくても数週間〜数か月で自然に軽快する__ことが多い病気です。__症状が強い場合や治りを早めたい場合には、抗菌薬治療（ドキシサイクリン等）__を行うことがあります。__リンパ節が大きく腫れて痛みが強い場合は、穿刺（針を刺して中の液を抜く）等の処置__を検討することもあります。",
    tip: "__「猫に引っかかれただけ」と軽く考えがちです__が、__受傷から数週間後にリンパ節の腫れが出てくるため、原因に気づかれにくい__病気です。__猫を新しく迎えた、野良猫と接触した後にリンパ節の腫れが続く__場合は、受診の際に__猫との接触歴をお伝えいただく__ことが、早期の診断につながります。__予防としては、猫に引っかかれた・咬まれた傷をすぐに流水と石けんでよく洗う、猫のノミ対策をしっかり行う__ことが有効です。",
    sources: [
      {
        label: "大阪府「猫ひっかき病」感染症情報",
        url: "https://www.pref.osaka.lg.jp/o100050/iryo/osakakansensho/nekohikkakibyo.html",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Cat scratch disease",
      summary: "An infection that can cause lingering, swollen lymph nodes after a cat scratch or bite. Worth knowing about if you have a cat at home.",
      pathology:
        "This is an infection caused by the bacterium **Bartonella henselae**, transmitted by __a cat's scratch or bite, or by a flea that has been on a cat__. __Cats themselves usually carry the bacteria with little or no symptoms of their own__, and __infection from kittens in particular has been reported__. The typical course is: __a small rash or scab forms at the site of injury, and then, one to several weeks later, a nearby lymph node (under the arm, in the neck, at the elbow, etc.) becomes swollen and painful__. __A mild fever or fatigue may accompany it__, and in most cases __it resolves on its own over weeks to months__, though it can also __linger as unexplained swollen lymph nodes, requiring differentiation from other conditions__.",
      tests:
        "__Asking about contact with a cat (any scratch or bite)__ is a major clue for diagnosis. __Blood tests, and imaging if needed, help investigate the cause of swollen lymph nodes__, and it's also important to __rule out other causes (such as lymphoma)__. Specialized serologic testing for a definitive diagnosis is only available at limited facilities.",
      treatment:
        "__In mild cases, it often resolves on its own over weeks to months without specific treatment__. __If symptoms are more pronounced, or you'd like to recover faster, antibiotic treatment (such as doxycycline) may be used__. __If a lymph node is markedly swollen and painful, a procedure such as needle aspiration (draining fluid with a needle) may be considered__.",
      tip: "__It's easy to think lightly of \"just a scratch from the cat,\"__ but because __the lymph node swelling appears weeks after the actual injury, the connection is often missed__. __If you've recently gotten a new cat, had contact with a stray cat, and now have persistent swollen lymph nodes__, mentioning __your contact with a cat__ when you come in helps us reach an earlier diagnosis. __Washing any scratch or bite promptly and thoroughly with running water and soap, and keeping on top of flea prevention for your cat__, are both effective preventive measures.",
    },
  },
  {
    slug: "heat-stroke",
    title: "熱中症",
    category: "internal",
    summary:
      "宮崎の夏は特に要注意。「ただの疲れ」と思っているうちに、重症化することがある季節性の病気です。",
    pathology:
      "高温多湿な環境下で、__体温の調節機能が追いつかなくなり、体内に熱がこもる__ことで起こります。__めまい・立ちくらみ・筋肉のこむら返り（軽症）から、頭痛・嘔吐・倦怠感（中等症）、意識障害・高体温（重症）__まで、__症状の重さによって4段階（I度〜IV度）__に分類されます。__高齢者は暑さやのどの渇きを感じにくく、気づかないうちに重症化しやすい__ことが知られており、__屋内で、動いていない時にも発症する__ことがあります。__宮崎県を含む九州は夏季の気温・湿度が高く__、発症リスクの高い地域のひとつです。",
    tests:
      "__問診（発症状況・体温）、血液検査（腎機能・肝機能・電解質等の臓器障害の評価）__を行い、重症度を評価します。",
    treatment:
      "__軽症であれば、涼しい場所への移動・衣服を緩める・水分と塩分の補給等の応急処置__で改善することが多いです。__中等症以上では、点滴による補液__を行い、__重症（意識障害を伴う等）の場合は、体を冷やす処置や集中治療が可能な医療機関への搬送__が必要になります。",
    tip: "__「少し疲れただけ」「冷房が嫌いだから」と我慢しているうちに、症状が進行してしまう__ことがよくあります。__「のどが渇いてから飲む」のではなく、暑い時期はこまめに水分・塩分を補給する__ことが予防の基本です。__高齢者・小児・屋外作業や部活動をする方は特にリスクが高い__ため、ご家族で声をかけ合うことも大切です。__めまい・倦怠感等の症状が続く、意識がぼんやりする__場合は、様子を見ずに涼しい場所へ移動し、受診をご検討ください。",
    sources: [
      {
        label: "日本救急医学会「熱中症診療ガイドライン2024」",
        url: "https://minds.jcqhc.or.jp/summary/c00897/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Heat stroke",
      summary: "Especially important in Miyazaki summers. What feels like \"just being tired\" can progress to a serious condition — it's a seasonal illness worth taking seriously.",
      pathology:
        "This occurs in hot, humid conditions when __the body's temperature-regulation system can't keep up, and heat builds up inside the body__. __Symptoms range from dizziness, lightheadedness, and muscle cramps (mild) to headache, vomiting, and fatigue (moderate), up to impaired consciousness and a very high body temperature (severe)__, and are __classified into four grades (I–IV) by severity__. __Older adults often have a reduced ability to sense heat or thirst, so it can progress to a severe stage without their noticing__, and it __can even occur indoors, while at rest__. __Miyazaki, along with the rest of Kyushu, has high summer temperatures and humidity__, making it one of the higher-risk areas.",
      tests:
        "We assess severity through __a history (the circumstances of onset, body temperature) and blood tests (evaluating organ function — kidney function, liver function, electrolytes, and more)__.",
      treatment:
        "__In mild cases, moving to a cool place, loosening clothing, and replenishing water and salt__ as first aid is often enough to improve things. __For moderate cases and above, IV fluids are given__, and __severe cases (with impaired consciousness, etc.) require active cooling and transfer to a facility capable of intensive care__.",
      tip: "__It's common for symptoms to progress while telling yourself \"I'm just a little tired\" or \"I don't like air conditioning,\" and pushing through__. __Rather than \"drinking once you're thirsty,\" the basic principle of prevention during hot weather is replenishing water and salt regularly, before thirst sets in__. __Older adults, children, and anyone doing outdoor work or sports are at particularly high risk__, so it also helps for family members to check in on each other. __If dizziness or fatigue persists, or consciousness becomes hazy__, please don't wait it out — move to somewhere cool right away and consider coming in.",
    },
  },
  {
    slug: "cellulitis",
    title: "蜂窩織炎",
    category: "internal",
    summary:
      "足や手の皮膚が赤く腫れて熱を持ち、範囲がじわじわ広がっていく感染症です。放置すると重症化することがあり、早めの治療が重要です。",
    pathology:
      "皮膚の小さな傷・虫刺され・水虫（足白癬）による皮膚のひび割れ等から__細菌（主に溶血性レンサ球菌・黄色ブドウ球菌）が皮膚の深い層（真皮・皮下組織）に入り込んで起こる感染症__です。__足のすね・甲、手等__に起こりやすく、__赤み・腫れ・熱感・痛みが、境目がはっきりしないまま周囲にじわじわ広がっていく__のが特徴です。__発熱や倦怠感等の全身症状を伴う__ことも多く、__糖尿病や血流障害（むくみやすい・リンパの流れが悪い等）がある方は重症化しやすい__とされています。__放置すると、感染が血液に及ぶ（敗血症）等、全身に影響が広がる__ことがあり、早期の治療開始が重要です。",
    tests:
      "__皮疹の広がり方・範囲・熱感__等を診察で評価し、__血液検査で炎症反応（白血球数・CRP等）__を確認します。重症度や広がりの評価のため、__患部にペンで印をつけて範囲の変化を記録する__こともあります。",
    treatment:
      "**抗菌薬治療**が基本で、__原因菌（溶血性レンサ球菌・黄色ブドウ球菌）に効果のある抗菌薬を、内服または点滴で投与__します。__軽症〜中等症は外来での内服治療・経過観察が可能__なことが多いですが、__範囲が広い、発熱が強い、糖尿病等の基礎疾患がある、治療を始めても改善しない__等の場合は、__点滴治療や入院治療が可能な医療機関と連携__します。__患部を心臓より高い位置に上げて安静にする__ことも、腫れを引かせるために有効です。",
    tip: "__「虫刺されがひどくなっただけ」「ただのむくみ」と様子を見ているうちに、範囲がどんどん広がってしまう__ことがよくあります。__赤みの範囲を写真に撮っておくと、広がっているかどうかの判断に役立ちます__。__足の水虫（足白癬）を治療せずに放置していると、そこから細菌が入り蜂窩織炎を繰り返す__ことがあるため、__水虫の治療も蜂窩織炎の予防として大切__です。発熱を伴う、範囲が急速に広がる場合は、様子を見過ぎずに早めにご相談ください。",
    sources: [
      {
        label: "日本感染症学会・日本化学療法学会「JAID/JSC感染症治療ガイド2019」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Cellulitis",
      summary: "A skin infection where the skin of the foot or hand becomes red, swollen, and hot, gradually spreading outward. Left untreated it can become serious, so early treatment matters.",
      pathology:
        "This is an infection where __bacteria (mainly streptococcus or staphylococcus) enter the deeper layers of the skin (the dermis and subcutaneous tissue)__ through a small skin injury, insect bite, or cracked skin from athlete's foot. __It tends to occur on the shin, top of the foot, or hand__, and is characterized by __redness, swelling, warmth, and pain that gradually spread outward with no clear border__. It's often accompanied by __whole-body symptoms such as fever and fatigue__, and __people with diabetes or circulation problems (prone to swelling, poor lymphatic flow, etc.) tend to develop more severe cases__. __Left untreated, the infection can spread into the bloodstream (sepsis) and affect the whole body__, so starting treatment early matters.",
      tests:
        "We evaluate __how far the rash has spread and its warmth__ on exam, and check __inflammatory markers on a blood test (white blood cell count, CRP, etc.)__. To track severity and spread, we sometimes __mark the edge of the affected area with a pen to record changes over time__.",
      treatment:
        "**Antibiotic treatment** is the foundation, using __an antibiotic effective against the likely bacteria (streptococcus, staphylococcus), given orally or by IV__. __Mild to moderate cases can often be managed with oral treatment and outpatient follow-up__, but if __the area is extensive, fever is significant, there's an underlying condition like diabetes, or there's no improvement after starting treatment__, we coordinate with __a facility capable of IV treatment or hospitalization__. __Keeping the affected area elevated above the heart and resting it__ also helps bring the swelling down.",
      tip: "__It's common for the area to keep spreading while you tell yourself \"the bug bite just got worse\" or \"it's just swelling.\"__ __Taking a photo of how far the redness extends can help you judge whether it's spreading.__ __Leaving athlete's foot untreated can let bacteria in and cause recurring cellulitis__, so __treating athlete's foot is also an important way to prevent cellulitis__. If fever develops or the area spreads quickly, please don't wait too long — come talk to us sooner rather than later.",
    },
  },
  {
    slug: "tinea-pedis",
    title: "足白癬（水虫）",
    category: "internal",
    summary:
      "「ただの水虫」と思って市販薬だけで様子を見ていませんか。きちんと治療しないと蜂窩織炎等の引き金にもなる、治し方にコツのある病気です。",
    pathology:
      "**白癬菌（はくせんきん）というカビ（真菌）**が足の皮膚に感染することで起こる病気です。__足の指の間がじゅくじゅく・皮がむける「趾間型」、足の裏に小さな水ぶくれができる「小水疱型」、かかと等の皮膚が厚く硬くなる「角質増殖型」__等、タイプによって見た目が異なります。__高温多湿の環境（靴の中、ジム・温泉等の共有スペース）で感染しやすく、__家族内でタオルや足ふきマットの共用によってもうつる__ことがあります。__爪に感染すると「爪白癬」となり、爪が白く濁って厚くなる__ことがあり、__足白癬を治療せずに放置していると、ひび割れた皮膚から細菌が入り、蜂窩織炎を引き起こす__こともあります。",
    tests:
      "__皮膚の一部を採取し、顕微鏡で白癬菌の有無を確認する検査（直接鏡検）__で診断します。__見た目だけでは、湿疹やかぶれ等の他の皮膚病と区別がつきにくい__ため、__自己判断で市販の水虫薬を使い続ける前に、まず本当に水虫かどうかを確認する__ことが大切です。",
    treatment:
      "**外用抗真菌薬**による治療が基本です。__かゆみ・見た目が良くなったように見えても、白癬菌は皮膚の奥に残っていることが多い__ため、__症状が消えた後も1〜3か月程度は根気よく塗り続ける__ことが推奨されています。__目に見える病変部だけでなく、足の裏全体・指の間まで広めに塗る__ことも重要です。__爪白癬を合併している場合は、外用薬だけでは効果が不十分なことが多く、内服の抗真菌薬__が第一選択となります。",
    tip: "__「市販の水虫薬を少し使って、かゆみが治まったらやめる」を繰り返している__方は少なくありませんが、__これでは白癬菌が完全に退治されず、再発を繰り返す__ことになります。__見た目では水虫か湿疹か自己判断が難しく、違う薬を使い続けて悪化させてしまう__こともあるため、__一度きちんと検査で確認してから、正しい期間しっかり治療する__ことが、結局は一番の近道です。__蜂窩織炎の予防という意味でも、水虫は「たかが水虫」と侮らず治療する__ことをお勧めします。",
    sources: [
      {
        label: "日本皮膚科学会「皮膚真菌症診療ガイドライン2019」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Athlete's foot (tinea pedis)",
      summary: "Are you treating it as \"just athlete's foot\" and relying on an over-the-counter cream alone? If not treated properly it can trigger cellulitis — there's a real knack to curing it.",
      pathology:
        "This condition is caused by **a fungus called dermatophyte (white fungus)** infecting the skin of the foot. Appearance varies by type: __\"interdigital type,\" with soggy, peeling skin between the toes; \"vesicular type,\" with small blisters on the sole; and \"hyperkeratotic type,\" with thickened, hardened skin on the heel and elsewhere__. __It spreads easily in hot, humid environments (inside shoes, shared spaces like gyms and bathhouses)__, and __can also be passed within a household by sharing towels or bath mats__. __If it infects the nails, it becomes \"tinea unguium,\" where the nail turns white, cloudy, and thick__, and __leaving athlete's foot untreated can let bacteria in through cracked skin and trigger cellulitis__.",
      tests:
        "Diagnosis is made by __taking a small skin sample and checking it under a microscope for the fungus (direct microscopy)__. Because __it can be hard to distinguish from other skin conditions like eczema or contact dermatitis by appearance alone__, it's important to __confirm it's actually athlete's foot before continuing to self-treat with an over-the-counter antifungal__.",
      treatment:
        "**Topical antifungal medication** is the mainstay of treatment. __Even once itching and appearance improve, the fungus often remains deeper in the skin__, so it's recommended to __keep applying it patiently for another 1–3 months after symptoms clear__. It's also important to __apply it broadly — not just to the visibly affected area, but across the entire sole and between the toes__. __If the nails are also affected, topical treatment alone is often not enough, and oral antifungal medication__ becomes the first-line option.",
      tip: "__Many people repeat a cycle of using an over-the-counter cream for a while and stopping once the itching settles,__ but __this doesn't fully eliminate the fungus and leads to repeated recurrence__. __Because it's genuinely hard to tell athlete's foot from eczema by appearance alone, using the wrong cream can make things worse__, so __confirming it properly with a test first, then treating thoroughly for the correct length of time__, is ultimately the fastest path. __From the standpoint of preventing cellulitis too, athlete's foot is worth treating seriously rather than dismissing as trivial.__",
    },
  },
  {
    slug: "sinusitis",
    title: "副鼻腔炎（急性・慢性）",
    category: "internal",
    summary:
      "「かぜが治ったのに、鼻づまりと顔の重だるさだけ残る」。それ、副鼻腔炎かもしれません。レントゲンでその場で確認できます。",
    pathology:
      "鼻の奥から頬・額にかけて広がる空洞（副鼻腔）に炎症が起こる病気です。__かぜ（ウイルス性の鼻炎）に続いて細菌感染が加わることで発症する「急性副鼻腔炎」__と、__3か月以上炎症が続く「慢性副鼻腔炎」（いわゆる蓄膿症）__に分けられます。__黄色や緑色の粘り気のある鼻水、鼻づまり、頬や額・目の奥の重だるい痛み、嗅覚の低下__等が代表的な症状です。__「かぜは治ったはずなのに、鼻づまりと顔の重さだけ長引いている」__という方は、副鼻腔炎に移行している可能性があります。",
    tests:
      "問診・鼻の中の診察に加え、__院内のデジタルX線（レントゲン）で「ウォーターズ法」という、副鼻腔の状態を映し出す特殊な撮影方法__を用いることで、__副鼻腔に膿や分泌物が溜まっていないかを、その場で画像として確認__できます。__正常では黒く映るはずの副鼻腔が、炎症があると白くもやがかかったように写る__ため、__ご自身の画像を見ながら、炎症の有無や程度をその場でご説明__できるのが特徴です。症状が長引く場合や治りが悪い場合には、より詳細な評価のためCT検査を検討することもあります。",
    treatment:
      "__急性副鼻腔炎は、軽症であれば抗菌薬を使わず、去痰薬や鼻の処置等で経過を見る__ことも多く、__中等症以上や症状が強い場合には抗菌薬治療__を行います。__慢性副鼻腔炎（蓄膿症）に対しては、少量の抗菌薬（マクロライド系）を長期間内服する「少量長期療法」__が標準的な治療として行われ、__数か月単位でじっくり改善を目指す__治療になります。__鼻の通りを良くするための点鼻薬や、鼻洗浄（鼻うがい）__も症状の緩和に有効です。__保存的な治療で改善が乏しい場合__は、専門的な手術治療が可能な耳鼻咽喉科へご紹介することがあります。",
    tip: "__「かぜが長引いているだけ」と市販の風邪薬で様子を見続けている__うちに、__慢性副鼻腔炎に移行して治療が長引いてしまう__ことがあります。__レントゲンでその場で副鼻腔の状態を確認できる__ので、__「鼻づまりと顔の重さが2週間以上続いている」という場合は、一度画像で確認してみる__ことをお勧めします。見た目では分かりにくい副鼻腔の中の状態を、__ご自身の目で画像として確認いただける__ことも、当院で検査を受けるメリットのひとつです。",
    sources: [
      {
        label: "日本鼻科学会「急性鼻副鼻腔炎診療ガイドライン2010年版」（2013年追補版）",
        url: "https://minds.jcqhc.or.jp/summary/c00181/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Sinusitis (acute & chronic)",
      summary: "\"My cold is gone, but the stuffy nose and heavy feeling in my face haven't gone away.\" That could be sinusitis. We can check it on the spot with an X-ray.",
      pathology:
        "This is inflammation of the sinuses — the air-filled spaces that extend from behind the nose into the cheeks and forehead. It's divided into __\"acute sinusitis,\" which develops when a bacterial infection follows a cold (viral rhinitis)__, and __\"chronic sinusitis\" (sometimes called a chronic sinus infection), where inflammation continues for 3 months or more__. Typical symptoms include __thick yellow or green nasal discharge, nasal congestion, a heavy ache in the cheeks, forehead, or behind the eyes, and a reduced sense of smell__. __If you feel your cold should be over, but the stuffiness and heaviness in your face are dragging on__, that may mean it has progressed into sinusitis.",
      tests:
        "Beyond a history and an examination inside the nose, we use __our in-house digital X-ray with a special technique called the \"Waters' view,\" which images the condition of the sinuses__, so we can __check on the spot, as an actual image, whether fluid or discharge has built up in the sinuses__. __Sinuses that would normally appear dark show up hazy and white when inflamed__, which means __we can show you your own image and explain whether — and how much — inflammation is present, right then and there__. If symptoms drag on or don't respond well to treatment, a CT scan may be considered for a more detailed evaluation.",
      treatment:
        "__For mild acute sinusitis, we often skip antibiotics and manage it with expectorants, nasal treatments, and watchful waiting__, while __moderate or more severe cases are treated with antibiotics__. __For chronic sinusitis, a standard approach is \"low-dose, long-term therapy\" — taking a low dose of a macrolide antibiotic over an extended period__, aiming for __steady improvement over a timeframe of several months__. __Nasal sprays to improve airflow, and nasal irrigation (saline rinses),__ also help relieve symptoms. __If conservative treatment doesn't bring enough improvement__, we may refer you to an ENT specialist capable of surgical treatment.",
      tip: "__Continuing to manage things with over-the-counter cold medicine, assuming \"my cold is just dragging on,\" can let it progress into chronic sinusitis and make treatment take longer.__ __Because we can check the state of your sinuses on the spot with an X-ray__, we'd recommend getting imaging done if __nasal congestion and facial heaviness have lasted more than 2 weeks__. Being able to __see the inside of your sinuses for yourself, as an image__ — something that's hard to judge just from how you feel — is one of the benefits of getting tested here.",
    },
  },
  {
    slug: "ear-infection",
    title: "中耳炎・外耳炎",
    category: "internal",
    summary:
      "耳の痛みの原因は、鼓膜の内側（中耳炎）か、耳の入り口側（外耳炎）かで、原因も治療も異なります。特にお子さんに多い中耳炎は要注意です。",
    pathology:
      "耳の痛みは、__鼓膜の内側（中耳）に炎症が起こる「中耳炎」__と、__耳の入り口から鼓膜までの耳道（外耳）に炎症が起こる「外耳炎」__のどちらかで起こることが多く、__原因も治療もまったく異なります__。__中耳炎はかぜに続いてお子さんに多く起こり__、__外耳炎は耳かきのし過ぎや水泳後等、耳の入り口の皮膚のトラブルがきっかけで大人にも多く起こります__。__自己判断での耳かき・綿棒の使い過ぎがどちらのきっかけにもなり得る__ため注意が必要です。",
    tests:
      "__耳鏡（耳の中を観察する器具）による診察__で、鼓膜の状態（赤み・腫れ・膿の有無）や外耳道の状態を確認し、中耳炎と外耳炎を鑑別します。",
    treatment: "原因に応じた治療を行います（詳細は下記）。",
    tip: "__「耳が痛い」という症状だけでは、どちらの病気か自己判断が難しい__ため、__市販の点耳薬を自己判断で使う前に、一度診察を受ける__ことをお勧めします。",
    subsections: [
      {
        title: "急性中耳炎（主にお子さんに多い）",
        pathology:
          "__かぜ等で鼻や喉に感染したウイルス・細菌が、耳管（鼻の奥と耳をつなぐ管）を通って中耳に入り込む__ことで起こります。__耳管が未発達で太く水平に近い乳幼児に特に多い__病気です。__耳の痛み、発熱、機嫌が悪い（乳幼児で耳を触る・引っ張る仕草）__等が代表的な症状です。",
          tests: "耳鏡で鼓膜の赤み・腫れ・膿の有無を確認します。",
          treatment:
            "__軽症であれば、痛み止めを使いながら数日間経過をみる__ことも選択肢ですが、__症状が強い場合や乳幼児では抗菌薬治療__を行うことが多いです。__鼓膜の腫れが強く、膿がたまっている場合には、鼓膜切開__を検討することもあります。",
          tip: "__「痛みが治まったから治った」と自己判断で通院をやめてしまう__と、__滲出性中耳炎（鼓膜の内側に液体がたまった状態）に移行し、聞こえにくさが残る__ことがあるため、医師の指示通り治療を終えることが大切です。",
      },
      {
        title: "外耳炎（耳かきのし過ぎ・水泳後等）",
        pathology:
          "__耳かきのし過ぎや、耳に水が入ったままの状態（水泳・入浴後）__等で、__外耳道の皮膚が傷つき、そこに細菌やカビが感染する__ことで起こります。__耳のかゆみ・痛み、耳を触ると痛い、耳だれ__等が代表的な症状です。",
          tests: "耳鏡で外耳道の腫れ・耳だれ・真菌の有無等を確認します。",
          treatment:
            "**点耳薬（抗菌薬・ステロイド配合等）による局所治療**が基本です。__耳の中を清潔に保つための処置（耳垢・分泌物の除去）__もあわせて行います。__感染が周囲の皮膚や深部に広がっている場合__には、内服の抗菌薬を併用することがあります。",
          tip: "__「耳がかゆいから」と綿棒で頻繁に耳かきをする習慣そのものが、外耳炎の原因になっている__ことが少なくありません。__耳垢は自然に外に出てくるため、過度な耳掃除は不要__とされており、__治療中も耳をいじり過ぎない__ことが早く治すコツです。",
      },
    ],
    sources: [
      {
        label:
          "日本耳科学会・日本小児耳鼻咽喉科学会・日本耳鼻咽喉科感染症エアロゾル学会「小児急性中耳炎診療ガイドライン2018年版」",
        url: "https://minds.jcqhc.or.jp/summary/c00478/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Ear infections (otitis media & otitis externa)",
      summary: "Ear pain can come from inside the eardrum (middle ear infection) or near the ear opening (outer ear infection) — the cause and treatment differ. Middle ear infections, especially common in children, deserve attention.",
      pathology:
        "Ear pain most often comes from one of two conditions — __\"otitis media,\" inflammation inside the eardrum (the middle ear)__, or __\"otitis externa,\" inflammation of the ear canal from the opening of the ear to the eardrum__ — and __the cause and treatment for each are completely different__. __Otitis media commonly follows a cold and is especially common in children__, while __otitis externa is common in adults too, often triggered by skin trouble at the ear opening from overcleaning with a cotton swab or from swimming__. __Excessive self-directed ear cleaning with cotton swabs or similar tools can trigger either condition__, so care is needed.",
      tests:
        "An __examination with an otoscope (a tool for viewing inside the ear)__ lets us check the condition of the eardrum (redness, swelling, any pus) and the ear canal, to distinguish between otitis media and otitis externa.",
      treatment: "Treatment depends on the cause (see below for details).",
      tip: "__Because \"ear pain\" alone makes it hard to tell which condition you have,__ we'd recommend __having it examined before self-treating with an over-the-counter ear drop.__",
      subsections: [
        {
          title: "Acute otitis media (mainly in children)",
          pathology:
            "This occurs when __a virus or bacteria infecting the nose or throat during a cold travels through the Eustachian tube (which connects the back of the nose to the ear) and into the middle ear__. __It's especially common in infants and young children, whose Eustachian tubes are underdeveloped, wider, and closer to horizontal__. Typical symptoms include __ear pain, fever, and fussiness (in infants, touching or tugging at the ear)__.",
          tests: "We check the eardrum with an otoscope for redness, swelling, and any pus.",
          treatment:
            "__For mild cases, using pain relief and watching for a few days__ is one option, but __antibiotic treatment is more often used for more severe symptoms or in infants__. __If the eardrum is significantly swollen with pus built up, a myringotomy (a small incision in the eardrum) may be considered__.",
          tip: "__Stopping follow-up visits on your own judgment just because the pain has settled__ can let it progress to __otitis media with effusion (fluid remaining behind the eardrum), which can leave lasting hearing difficulty__, so it's important to complete treatment exactly as your doctor advises.",
        },
        {
          title: "Otitis externa (from overcleaning or after swimming)",
          pathology:
            "This occurs when __the skin of the ear canal is injured__ — from overcleaning with a cotton swab, or water remaining in the ear (after swimming or bathing) — __and bacteria or fungus then infect the area__. Typical symptoms include __itching and pain in the ear, pain when touching the ear, and ear discharge__.",
          tests: "We check the ear canal with an otoscope for swelling, discharge, and any fungus.",
          treatment:
            "**Local treatment with ear drops (combination antibiotic/steroid, etc.)** is the mainstay. We also __clean the ear to keep it hygienic (removing earwax and discharge)__. __If the infection has spread to the surrounding skin or deeper tissue__, oral antibiotics may be added.",
          tip: "__The very habit of frequently cleaning the ear with a cotton swab because \"it's itchy\" is itself a common cause of otitis externa.__ __Earwax naturally works its way out on its own, so excessive ear cleaning isn't needed__, and __not over-handling the ear during treatment__ is the key to healing quickly.",
        },
      ],
    },
  },
  {
    slug: "bppv",
    title: "良性発作性頭位めまい症（BPPV）",
    category: "internal",
    summary: "特定の頭の動きをしたときに数秒〜数十秒の回転性めまいが起こる、めまいの原因の中で最も頻度の高い病気です。",
    pathology:
      "耳の奥（内耳）にある耳石（カルシウムの結晶）が本来の場所からはがれ、三半規管に入り込むことで、頭の位置を変えた際に異常な刺激が生じてめまいが起こると考えられています。__寝返りや起き上がり、上を向く動作__がきっかけになりやすく、**めまいの原因の中で最も頻度が高い**とされています。多くは数秒〜1分以内に治まる一過性の回転性めまいで、難聴や耳鳴りを伴わないことが特徴です。",
    tests:
      "問診に加え、__頭位・頭位変換検査（頭の向きを変えて眼の動き＝眼振を観察する検査）__で特徴的な眼振を確認することで診断します。他の病気（脳卒中等の中枢性めまい）との鑑別が重要で、__手足の麻痺やしびれ、ろれつが回らない、物が二重に見える等の症状を伴う場合__は、画像検査が可能な医療機関と連携して評価します。",
    treatment:
      "診断がつけば、**耳石を本来の位置に戻す理学療法（頭位治療・めまい体操）**が有効とされており、Epley法等の手技をその場で行うことで症状が改善することが多いです。症状が強い急性期には、めまい止めの薬を併用することもあります。__自然に軽快することも多い病気__ですが、再発を繰り返すこともあります。",
    tip: "「ただの立ちくらみ」と自己判断しがちですが、__頭の位置で誘発される短時間の回転性めまいはBPPVの可能性__があります。一方で、めまいに手足の動かしにくさや言葉のもつれ等を伴う場合は、様子を見ずに早めのご相談をお勧めします。",
    sources: [
      {
        label: "日本めまい平衡医学会「良性発作性頭位めまい症（BPPV）診療ガイドライン2023年版」",
        url: "https://minds.jcqhc.or.jp/guidelines_kind/%E8%89%AF%E6%80%A7%E7%99%BA%E4%BD%9C%E6%80%A7%E9%A0%AD%E4%BD%8D%E3%82%81%E3%81%BE%E3%81%84%E7%97%87%EF%BC%88bppv%EF%BC%89/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Benign Paroxysmal Positional Vertigo (BPPV)",
      summary: "Spinning vertigo lasting seconds to tens of seconds, triggered by a specific head movement — the most common cause of vertigo.",
      pathology:
        "This is thought to occur when tiny calcium crystals (otoliths) in the inner ear become dislodged from their normal position and enter the semicircular canals, causing abnormal signals and vertigo when you move your head. It's often triggered by __rolling over in bed, sitting up, or looking upward__, and is considered **the most common cause of vertigo**. Most episodes are a brief, spinning vertigo that resolves within seconds to a minute, and it's characterized by the absence of hearing loss or tinnitus.",
      tests:
        "Diagnosis is based on a history plus __positional testing (observing eye movements, or nystagmus, as the head is moved into different positions)__ to confirm the characteristic pattern. Distinguishing it from other conditions (such as central vertigo from a stroke) is important, and __if it's accompanied by limb weakness or numbness, slurred speech, or double vision__, we coordinate with an institution capable of imaging for evaluation.",
      treatment:
        "Once diagnosed, **physical therapy to reposition the otoliths (repositioning maneuvers, vertigo exercises)** is considered effective, and techniques such as the Epley maneuver performed on the spot often improve symptoms. Anti-vertigo medication may be added during a severe acute episode. __It often resolves on its own__, though it can also recur.",
      tip: "It's easy to dismiss it as \"just lightheadedness,\" but __brief, spinning vertigo triggered by a specific head position may well be BPPV__. That said, if the vertigo comes with difficulty moving your limbs or slurred speech, please don't wait and see — come talk to us sooner rather than later.",
    },
  },
  {
    slug: "meniere-disease",
    title: "メニエール病",
    category: "internal",
    summary: "回転性めまいと難聴・耳鳴り・耳閉感を繰り返す、内耳のむくみ（内リンパ水腫）が原因の病気です。",
    pathology:
      "内耳を満たす「内リンパ液」が過剰に溜まってむくんだ状態（内リンパ水腫）になることで起こると考えられています。__数十分〜数時間続く回転性めまいと、難聴・耳鳴り・耳が詰まった感じ（耳閉感）が同時に、繰り返し起こる__のが特徴で、**発作を繰り返すうちに難聴が進行する**ことがあります。ストレスや睡眠不足、過労が発作の誘因となることが知られています。",
    tests:
      "問診に加え、__聴力検査__で難聴の有無・程度を確認します。発作を繰り返す経過や聴力検査の結果を踏まえて診断基準に沿って判断し、他の原因（中枢性の病気等）が疑われる場合は画像検査が可能な医療機関と連携します。",
    treatment:
      "急性期にはめまい止め・吐き気止めで症状を緩和し、間欠期（発作のない時期）には**内リンパ水腫を軽減するための利尿薬**や、__生活指導（睡眠・ストレス管理、水分摂取等）__を基本とした治療を行います。保存的な治療で発作が十分にコントロールできない場合は、中耳加圧治療や手術的治療等のより専門的な治療を行っている医療機関へのご紹介を検討します。",
    tip: "__めまいだけでなく難聴や耳鳴りを伴う発作を繰り返す__場合はメニエール病の可能性があります。繰り返すたびに聴力が低下していくことがあるため、症状のパターンに心当たりがある場合は早めのご相談をお勧めします。",
    sources: [
      {
        label: "日本めまい平衡医学会「メニエール病・遅発性内リンパ水腫診療ガイドライン2020年版」",
        url: "https://minds.jcqhc.or.jp/summary/c00590/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Ménière's disease",
      summary: "A condition caused by fluid buildup in the inner ear (endolymphatic hydrops), bringing repeated episodes of spinning vertigo along with hearing loss, tinnitus, and ear fullness.",
      pathology:
        "This is thought to occur when the \"endolymph\" fluid that fills the inner ear builds up excessively, causing swelling (endolymphatic hydrops). It's characterized by __repeated episodes, lasting tens of minutes to hours, of spinning vertigo occurring together with hearing loss, tinnitus, and a plugged-up feeling in the ear (aural fullness)__, and **hearing loss can progress as episodes recur**. Stress, lack of sleep, and overexertion are known triggers for episodes.",
      tests:
        "Beyond a history, a __hearing test__ confirms whether hearing loss is present and to what degree. We make a judgment against diagnostic criteria based on the pattern of recurring episodes and hearing test results, and coordinate with an institution capable of imaging if another cause (such as a central nervous system condition) is suspected.",
      treatment:
        "During an acute episode, anti-vertigo and anti-nausea medication relieves symptoms, and during the interval between episodes, treatment centers on **a diuretic to reduce the fluid buildup** along with __lifestyle guidance (sleep, stress management, fluid intake, etc.)__. If episodes aren't adequately controlled with conservative treatment, we consider referral to an institution offering more specialized treatment such as middle ear pressure therapy or surgery.",
      tip: "__If you're having repeated episodes that involve not just vertigo but also hearing loss or tinnitus__, Ménière's disease may be the cause. Because hearing can decline a little more with each episode, if this symptom pattern sounds familiar, we'd recommend coming in sooner rather than later.",
    },
  },
  {
    slug: "dysautonomia",
    title: "自律神経の乱れ（自律神経失調症）",
    category: "internal",
    summary:
      "めまい・動悸・倦怠感・頭痛等、多彩な症状の背景に自律神経のバランスの乱れが疑われる状態です。特定の病気の名前ではなく、他の病気を除外したうえで用いられる言葉です。",
    pathology:
      "「自律神経失調症」は__医学的に正式な病名ではなく__、交感神経と副交感神経のバランスが乱れることで生じるとされる、__めまい・動悸・頭痛・倦怠感・発汗異常・胃腸の不調等、多彩な症状の総称__として使われている言葉です。ストレス・睡眠不足・不規則な生活習慣・ホルモンバランスの変化等が関与すると考えられていますが、**検査で明らかな異常が見つからず、他の病気も否定された場合に、暫定的に用いられることが多い**のが実情です。症状の背景に、後述する起立性低血圧や甲状腺機能異常、貧血、うつ病等、__治療法の異なる他の病気が隠れている場合がある__ため、安易にこの診断で片付けないことが重要です。",
    tests:
      "問診で症状の経過・生活状況・ストレス要因等を詳しく伺ったうえで、__血液検査（貧血・甲状腺機能・血糖等）、心電図__等により、症状の原因となりうる他の病気（貧血、甲状腺疾患、不整脈、起立性低血圧等）がないかを確認します。症状が強い場合や原因検索が難航する場合は、専門的な検査が可能な医療機関と連携することもあります。",
    treatment:
      "他の病気が否定された場合は、__生活習慣の見直し（睡眠・食事・適度な運動）とストレス管理__を基本とし、症状に応じて対症療法（胃腸薬、鎮痛薬、睡眠導入薬等）を併用します。__症状の背景に強い不安やうつ症状が疑われる場合__は、心療内科・精神科と連携した治療を検討することもあります。",
    tip: "__「自律神経の乱れ」という言葉で片付けず、背景に他の病気が隠れていないかを確認すること__が大切です。症状が長引く、悪化する、他の症状（体重減少・発熱等）を伴う場合は、自己判断せず早めにご相談ください。",
    sources: [
      {
        label: "MSDマニュアル プロフェッショナル版「自律神経系の概要」",
        url: "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/自律神経系/自律神経系の概要",
      },
    ],
    lastReviewed: "2026-10-23",
    en: {
      title: "Autonomic imbalance (\"dysautonomia\")",
      summary: "A state where vertigo, palpitations, fatigue, headache, and other varied symptoms are suspected to stem from an imbalance in the autonomic nervous system. It isn't the name of a specific disease — it's a term used once other conditions have been ruled out.",
      pathology:
        "\"Dysautonomia\" (jiritsu-shinkei shitchōshō) __isn't an official, formally recognized diagnosis__ — it's a term used as an __umbrella label for a wide range of symptoms__, such as vertigo, palpitations, headache, fatigue, abnormal sweating, and digestive upset, thought to arise from an imbalance between the sympathetic and parasympathetic nervous systems. Stress, lack of sleep, an irregular lifestyle, and hormonal changes are all thought to play a role, but in reality **it's most often used provisionally, once testing finds nothing clearly abnormal and other conditions have been ruled out**. Because __other conditions with different treatments — such as orthostatic hypotension, thyroid dysfunction, anemia, or depression, discussed elsewhere — can sometimes hide behind these symptoms__, it's important not to settle for this label too readily.",
      tests:
        "After asking in detail about the course of your symptoms, your daily life, and sources of stress, we check for other conditions that could explain your symptoms — such as anemia, thyroid disease, arrhythmia, or orthostatic hypotension — using __blood tests (anemia, thyroid function, blood sugar, etc.) and an ECG__. If symptoms are severe or the cause is hard to pin down, we may coordinate with an institution capable of more specialized testing.",
      treatment:
        "Once other conditions have been ruled out, treatment centers on __reviewing your lifestyle (sleep, diet, moderate exercise) and managing stress__, combined with symptomatic treatment as needed (stomach medication, pain relief, sleep aids, etc.). __If strong anxiety or depressive symptoms seem to underlie your symptoms__, we may also consider treatment in coordination with psychosomatic medicine or psychiatry.",
      tip: "__Rather than settling for the label \"autonomic imbalance,\" it's important to check whether another condition is hiding behind it__. If your symptoms drag on, worsen, or come with other symptoms (such as weight loss or fever), please don't make that judgment yourself — come talk to us sooner rather than later.",
    },
  },
  {
    slug: "orthostatic-hypotension",
    title: "起立性低血圧",
    category: "internal",
    summary:
      "立ち上がったときに血圧が大きく下がり、めまい・ふらつき・失神を起こす状態です。高齢の方の転倒の原因としても知られています。",
    pathology:
      "__立位をとってから3分以内に、収縮期血圧が20mmHg以上、または拡張期血圧が10mmHg以上低下する__状態を指します。急に立ち上がった際や、長時間立ち続けた際に、__めまい・ふらつき・意識が遠のく感じ・目の前が暗くなる（霧視）__等が起こり、**横になると速やかに改善する**のが特徴です。原因は、__脱水や出血等による循環血液量の減少、降圧薬等の薬剤の影響、長期臥床__といった急性のものから、__加齢に伴う血圧調節機能の低下、糖尿病等による自律神経障害、パーキンソン病等の神経の病気__による慢性的なものまで様々です。高齢の方の__15〜20%程度__（基礎疾患や測定条件により幅があります）にみられるとされ、転倒の背景に隠れていることも少なくありません。",
    tests:
      "__仰臥位で5分安静にした後、立位で1分後・3分後の血圧と心拍数を測定する起立試験__が基本的な検査です。心拍数の増加が乏しい場合は自律神経の障害、著明な増加がある場合は循環血液量の減少が疑われます。あわせて__心電図、血液検査（電解質・血糖等）__で原因を確認し、必要に応じてティルト試験（傾斜台を用いた検査）が可能な医療機関と連携します。",
    treatment:
      "**急に起き上がらない、水分・塩分を十分にとる、飲酒を控える、適度な運動を行う、就寝時に頭側を高くする**等の生活指導が基本です。__弾性ストッキング等の物理的な対策__も有効とされています。原因となる薬剤がある場合は調整を検討し、__生活指導で改善が乏しい場合__には、フルドロコルチゾンやミドドリン等の薬物療法を検討することもあります。",
    tip: "__「年のせいの立ちくらみ」と見過ごされがちですが、転倒やけがにつながることがある__ため注意が必要な状態です。特に高齢の方で、立ち上がった際のふらつきを繰り返す場合は、一度ご相談ください。なお、思春期のお子さんに多い同様の症状は「起立性調節障害」と呼ばれ、不登校との関連等、別の観点での対応が必要になることがあります。",
    sources: [
      {
        label: "MSDマニュアル プロフェッショナル版「起立性低血圧」",
        url: "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/心血管疾患の症状/起立性低血圧",
      },
    ],
    lastReviewed: "2026-10-23",
    en: {
      title: "Orthostatic hypotension",
      summary: "A condition where blood pressure drops significantly on standing, causing dizziness, lightheadedness, or fainting. It's also a known cause of falls in older adults.",
      pathology:
        "This refers to __a drop in systolic blood pressure of 20mmHg or more, or diastolic blood pressure of 10mmHg or more, within 3 minutes of standing__. When you stand up quickly, or after standing for a long time, it causes __dizziness, lightheadedness, a feeling of fading consciousness, or dimming/blurring vision__, and is characterized by **rapid improvement on lying down**. Causes range from acute ones — __reduced blood volume from dehydration or bleeding, the effects of medications such as blood pressure drugs, or prolonged bed rest__ — to chronic ones, such as __age-related decline in blood pressure regulation, autonomic nerve damage from diabetes or other conditions, and neurological diseases like Parkinson's disease__. It's seen in roughly __15–20%__ of older adults (this varies with underlying conditions and how it's measured), and is often an underlying factor behind falls.",
      tests:
        "The basic test is a __standing test: measuring blood pressure and heart rate after 5 minutes lying down, and then at 1 and 3 minutes after standing__. A poor increase in heart rate suggests an autonomic nerve problem, while a marked increase suggests reduced blood volume. We also check for a cause with an __ECG and blood tests (electrolytes, blood sugar, etc.)__, and coordinate with an institution capable of tilt-table testing if needed.",
      treatment:
        "The basics are lifestyle guidance: **don't stand up suddenly, drink enough fluids and get enough salt, limit alcohol, exercise moderately, and raise the head of the bed while sleeping**. __Physical measures such as compression stockings__ are also considered effective. If a medication is contributing, we consider adjusting it, and __if lifestyle guidance brings little improvement__, medications such as fludrocortisone or midodrine may be considered.",
      tip: "__It's easy to dismiss it as \"just lightheadedness that comes with age,\" but it deserves attention because it can lead to falls and injury.__ If you're an older adult experiencing repeated lightheadedness on standing, please come talk to it over with us. A related condition common in adolescents, called \"orthostatic dysregulation,\" is called by a different name and sometimes needs a different approach — for example, its connection to school avoidance.",
    },
  },
  {
    slug: "vasovagal-syncope",
    title: "迷走神経反射（血管迷走神経性失神）",
    category: "internal",
    summary:
      "強い痛み・恐怖・長時間の起立等をきっかけに、血管迷走神経反射が起こり、一時的に脳への血流が低下して意識を失う状態です。失神の原因として最も多いとされています。",
    pathology:
      "強い感情（痛み・恐怖・採血や注射を見る等）や、せき・排便・排尿時のいきみ、長時間の起立、急な立ち上がりなどをきっかけに__迷走神経が刺激され、血管が広がって心臓に戻る血液が減り、同時に心拍数も低下する__ことで、一時的に脳への血流が不足し意識を失う状態です。**失神の原因の中で最も頻度が高い**とされています。多くは__ふらつき・めまい・吐き気・発汗・顔面蒼白・かすみ目等の前兆__を伴い、数秒〜数十秒で自然に回復します。",
    tests:
      "**詳しい問診（誘因・前兆の有無・回復までの時間等）が診断の中心**です。__心電図等で心臓の病気による失神（不整脈、心臓弁膜症等）を除外する__ことが重要で、__運動中の失神、前兆のない突然の失神、胸痛・動悸を伴う失神、原因不明の突然死の家族歴がある場合__等は、より詳しい検査が可能な医療機関と連携して評価します。",
    treatment:
      "**誘因を避けること、前兆を感じたらすぐに座る・横になることについての患者教育・生活指導**が基本です。__水分・塩分を十分にとる、長時間の起立を避ける__ことに加え、前兆を感じた際に__足を交差させる・腕に力を入れる等の対処法（起立調節訓練）__が有効とされています。生活指導で改善が乏しい__頻回な発作__に対しては、薬物療法や、徐脈が強い場合にはペースメーカー治療を専門的な医療機関と連携して検討することもあります。",
    tip: "__明らかなきっかけと前兆があり、数分で回復する失神は血管迷走神経性失神の可能性が高く、一般的に危険性は低い__とされています。ただし、__運動中に起こった、前兆なく突然起こった、胸痛や動悸を伴う、横になっている状態で起こった__等の場合は、心臓の病気等より注意が必要な原因が隠れている可能性があるため、様子を見ずに早めのご相談をお勧めします。",
    sources: [
      {
        label: "MSDマニュアル家庭版「失神」",
        url: "https://www.msdmanuals.com/ja-jp/home/心臓と血管の病気/心臓と血管の病気の症状/失神",
      },
    ],
    lastReviewed: "2026-10-23",
    en: {
      title: "Vasovagal syncope (reflex fainting)",
      summary: "Triggered by intense pain, fear, standing for a long time, and similar factors, a vagal reflex causes blood flow to the brain to drop briefly, leading to loss of consciousness. It's considered the most common cause of fainting.",
      pathology:
        "Triggered by a strong emotion (pain, fear, seeing blood drawn or an injection), straining with coughing, bowel movements or urination, prolonged standing, or standing up suddenly, __the vagus nerve is stimulated, blood vessels widen, less blood returns to the heart, and the heart rate drops at the same time__, causing a brief shortage of blood flow to the brain and loss of consciousness. **It's considered the most common cause of fainting.** It's usually preceded by __warning signs such as lightheadedness, dizziness, nausea, sweating, pale skin, or blurred vision__, and recovery happens on its own within seconds to tens of seconds.",
      tests:
        "**A detailed history — the trigger, whether there were warning signs, how long recovery took — is central to diagnosis.** __Ruling out fainting caused by a heart condition (arrhythmia, valve disease, etc.) with an ECG and similar tests__ is important, and in cases of __fainting during exercise, sudden fainting with no warning signs, fainting accompanied by chest pain or palpitations, or a family history of unexplained sudden death__, we coordinate with an institution capable of more detailed testing for evaluation.",
      treatment:
        "**Patient education and lifestyle guidance about avoiding triggers, and sitting or lying down right away when you sense a warning sign,** form the basis of treatment. Beyond __drinking enough fluids and getting enough salt, and avoiding prolonged standing__, techniques such as __crossing your legs or tensing your arm muscles when you sense a warning sign (standing training)__ are considered effective. For __frequent episodes__ that don't improve enough with lifestyle guidance, medication, or — if the heart rate drops significantly — a pacemaker, may be considered in coordination with a specialized institution.",
      tip: "__Fainting with a clear trigger and warning signs, that resolves within a few minutes, is likely vasovagal syncope and generally carries low risk.__ That said, if it __happened during exercise, happened suddenly with no warning, came with chest pain or palpitations, or happened while lying down__, a cause requiring more caution — such as a heart condition — may be present, so please don't wait and see; come talk to us sooner rather than later.",
    },
  },
  {
    slug: "headache",
    title: "頭痛（片頭痛・緊張型頭痛・群発頭痛）",
    category: "internal",
    summary: "頭痛にはありふれた一次性のものから、緊急の対応が必要な二次性のものまであります。タイプを見極めたうえでの治療が大切です。",
    pathology:
      "頭痛は、片頭痛・緊張型頭痛・群発頭痛のように__頭痛そのものが病気である「一次性頭痛」__と、くも膜下出血や髄膜炎等__他の病気が原因で起こる「二次性頭痛」__に大別されます。多くの頭痛は命に関わらない一次性頭痛ですが、**「今まで経験したことのない激しい頭痛」「突然の頭痛」「発熱や意識障害・麻痺を伴う頭痛」**等は、二次性頭痛を疑って緊急の評価が必要です。",
    tests:
      "問診で頭痛の性質（部位・持続時間・随伴症状・誘因）を詳しく伺い、一次性か二次性かを見極めることが診断の第一歩です。__危険な兆候（レッドフラグ）がある場合__は、画像検査（CT・MRI等）が可能な医療機関と連携して迅速に評価します。",
    treatment:
      "一次性頭痛と診断された場合は、__タイプに応じた治療__を行います（下記参照）。危険な兆候がある二次性頭痛が疑われる場合は、速やかに高次医療機関へご紹介します。",
    tip: "「頭痛くらいで」と我慢してしまう方も多いですが、__頭痛のタイプを正しく見極めることで、適切な治療につながります__。特にこれまでと違う頭痛、急に悪化した頭痛は様子を見ずにご相談ください。",
    subsections: [
      {
        title: "片頭痛",
        pathology:
          "脈打つようなズキンズキンとした痛みが__片側（時に両側）__に起こり、体を動かすと悪化するのが特徴です。吐き気・嘔吐を伴ったり、光や音に敏感になったりすることが多く、発作前に視野の一部がギザギザ光って見える「前兆」を伴うこともあります。4時間〜72時間程度持続することが一般的です。",
        tests: "問診による診断が基本です（画像検査で異常が見つかるわけではありません）。",
        treatment:
          "発作時には**アセトアミノフェンやNSAIDs（消炎鎮痛薬）**に加え、効果不十分な場合は__トリプタン系薬剤__を用いることがあります。発作が月に数回以上と頻回な場合や、日常生活に支障が大きい場合は、**予防薬**（カルシウム拮抗薬・抗てんかん薬・抗CGRP関連製剤等）による治療を検討します。",
        tip: "__鎮痛薬を飲みすぎる（目安として月に10日以上）と、かえって頭痛が悪化する「薬物乱用頭痛」__を招くことがあるため、使用頻度にも注意が必要です。",
      },
      {
        title: "緊張型頭痛",
        pathology:
          "頭全体を締め付けられるような__圧迫感のある痛み__が特徴で、片頭痛のように吐き気を伴うことは少なく、体を動かしても悪化しにくい頭痛です。首や肩の筋肉の緊張、長時間同じ姿勢での作業、ストレス等が関与するとされ、**頭痛の中で最も頻度が高い**とされています。",
        tests: "問診による診断が基本です。",
        treatment:
          "急性期にはアセトアミノフェンやNSAIDsを用います。頻度が高い場合（慢性緊張型頭痛）には、__生活習慣の見直し（姿勢・ストレス管理・適度な運動）__に加えて、予防的な薬物療法を検討することがあります。",
        tip: "肩こり・首こりとセットで起こることが多く、__マッサージやストレッチ、姿勢の改善__が症状の軽減に役立つことがあります。",
      },
      {
        title: "群発頭痛",
        pathology:
          "__片側の目の奥がえぐられるような激しい痛み__が、1〜2か月程度の期間（群発期）に毎日のように、しかも__決まった時間帯__に起こりやすいのが特徴です。発作中は涙や鼻水、まぶたの腫れ等、痛む側の目や鼻の症状を伴うことが多く、男性にやや多いとされています。",
        tests: "問診による診断が基本です。",
        treatment:
          "発作時には__純酸素吸入やトリプタン系薬剤（注射・点鼻）__が有効とされ、群発期には再発予防のための薬物治療（カルシウム拮抗薬等）を行います。",
        tip: "__あまりの痛みの激しさからじっとしていられず、落ち着きなく動き回る__のも群発頭痛の特徴のひとつとされています。他のタイプの頭痛と治療法が大きく異なるため、正確な診断が重要です。",
      },
    ],
    sources: [
      {
        label: "日本神経学会・日本頭痛学会・日本神経治療学会「頭痛の診療ガイドライン2021」",
        url: "https://minds.jcqhc.or.jp/summary/c00689/",
      },
    ],
    lastReviewed: "2026-10-12",
    en: {
      title: "Headache (migraine, tension-type, cluster)",
      summary: "Headaches range from common \"primary\" types to \"secondary\" types that need urgent attention. Identifying which type you have matters for proper treatment.",
      pathology:
        "Headaches fall broadly into two categories: __\"primary headaches,\" where the headache itself is the condition__ (migraine, tension-type headache, cluster headache), and __\"secondary headaches,\" caused by another underlying condition__ such as a subarachnoid hemorrhage or meningitis. Most headaches are primary and not life-threatening, but **\"the worst headache you've ever had,\" \"a sudden-onset headache,\" or \"a headache with fever, impaired consciousness, or weakness\"** should raise suspicion of a secondary headache and call for urgent evaluation.",
      tests:
        "Taking a detailed history of the headache's character (location, duration, accompanying symptoms, triggers) is the first step in determining whether it's primary or secondary. __If any dangerous warning signs (red flags) are present__, we coordinate quickly with an institution capable of imaging (CT, MRI, etc.) for evaluation.",
      treatment:
        "If diagnosed as a primary headache, we treat __according to the type__ (see below). If a secondary headache with warning signs is suspected, we promptly refer you to a higher-level institution.",
      tip: "Many people simply tolerate it, thinking \"it's just a headache,\" but __correctly identifying the type of headache leads to the right treatment__. Please don't wait and see, especially for a headache that's different from your usual pattern or has suddenly gotten worse.",
      subsections: [
        {
          title: "Migraine",
          pathology:
            "A throbbing, pulsating pain occurs on one side (sometimes both) of the head, and is characterized by worsening with physical movement. It often comes with nausea, vomiting, and sensitivity to light or sound, and some people experience an \"aura\" beforehand — jagged, shimmering spots in part of their vision. It typically lasts about 4 to 72 hours.",
          tests: "Diagnosis is based primarily on a history (imaging won't show an abnormality).",
          treatment:
            "During an attack, **acetaminophen or NSAIDs (anti-inflammatory pain relievers)** are used, and __triptan medications__ may be added if those aren't enough. For frequent attacks (several times a month or more) or significant disruption to daily life, we consider **preventive medication** (calcium channel blockers, anti-seizure medications, anti-CGRP agents, etc.).",
          tip: "__Taking pain relievers too often (roughly 10 or more days a month) can actually make headaches worse — a condition called \"medication overuse headache\"__ — so it's also important to watch how frequently you're using them.",
        },
        {
          title: "Tension-type headache",
          pathology:
            "Characterized by a __pressing, tightening pain__ across the whole head. Unlike migraine, it rarely comes with nausea and doesn't typically worsen with movement. Tension in the neck and shoulder muscles, long periods in the same posture, and stress are all thought to play a role, and it's **considered the most common type of headache**.",
          tests: "Diagnosis is based primarily on a history.",
          treatment:
            "Acetaminophen or NSAIDs are used during an acute episode. For frequent episodes (chronic tension-type headache), we may consider __reviewing lifestyle factors (posture, stress management, moderate exercise)__ along with preventive medication.",
          tip: "It often occurs together with shoulder and neck stiffness, and __massage, stretching, and posture improvement__ can help reduce symptoms.",
        },
        {
          title: "Cluster headache",
          pathology:
            "Characterized by __severe, boring pain behind one eye__, occurring almost daily — often __at the same time of day__ — over a period of about 1 to 2 months (a \"cluster period\"). During an attack, it's often accompanied by tearing, a runny nose, or eyelid swelling on the affected side, and it's somewhat more common in men.",
          tests: "Diagnosis is based primarily on a history.",
          treatment:
            "During an attack, __pure oxygen inhalation or triptan medication (injection or nasal spray)__ is considered effective, and during a cluster period, preventive medication (such as calcium channel blockers) is used to prevent recurrence.",
          tip: "__Being unable to stay still from the sheer intensity of the pain, and pacing restlessly,__ is also considered a characteristic feature of cluster headache. Because treatment differs greatly from other headache types, an accurate diagnosis matters.",
        },
      ],
    },
  },
  {
    slug: "lumbar-spinal-stenosis",
    title: "腰部脊柱管狭窄症",
    category: "internal",
    summary: "加齢に伴い背骨の神経の通り道が狭くなることで、歩いていると足がしびれて休むと楽になる、高齢の方に多い病気です。",
    pathology:
      "加齢等により、背骨（腰椎）の中を通る神経の通り道（脊柱管）が狭くなり、中を通る神経が圧迫されることで起こります。最大の特徴は__「間欠性跛行」__と呼ばれる症状で、__しばらく歩くと足のしびれ・痛み・だるさが強くなり、少し前かがみになって休むと症状が軽くなり、また歩けるようになる__というパターンを繰り返します。前かがみの姿勢をとる自転車では症状が出にくいのも特徴的です。__高齢の方に多く__、進行すると排尿・排便のコントロールに影響が出ることもあります。",
    tests:
      "問診（歩ける距離、前かがみで楽になるか等）と診察が診断の手がかりになります。確定診断や重症度の評価には__MRI等の画像検査__が重要とされており、必要に応じて画像検査が可能な医療機関と連携して評価します。",
    treatment:
      "多くの場合、__まずは保存的治療__（内服薬、神経ブロック注射、運動療法等）から開始し、経過を見ながら治療方針を調整します。__保存的治療で改善が乏しい場合や、日常生活に支障が大きい場合、排尿・排便の障害が出た場合__には、手術（神経の圧迫を取り除く手術）が選択肢となり、専門的な治療が可能な医療機関へご紹介します。",
    tip: "__「年のせいだから仕方ない」と諦めてしまう方も多い__症状ですが、歩ける距離が徐々に短くなっている、休み休みでないと歩けない等でお困りの場合は、治療によって改善が期待できることがあります。一度ご相談ください。",
    sources: [
      {
        label: "日本整形外科学会・日本脊椎脊髄病学会「腰部脊柱管狭窄症診療ガイドライン2021（改訂第2版）」",
        url: "https://minds.jcqhc.or.jp/summary/c00646/",
      },
    ],
    lastReviewed: "2026-10-13",
    en: {
      title: "Lumbar spinal stenosis",
      summary: "As the nerve pathway through the spine narrows with age, walking brings on numbness in the legs that eases with rest — a condition common in older adults.",
      pathology:
        "This occurs when the spinal canal — the nerve pathway running through the lower back (lumbar spine) — narrows with age and other factors, compressing the nerves inside. Its hallmark symptom is called __\"intermittent claudication\"__: __after walking for a while, numbness, pain, or heaviness in the legs intensifies; bending forward slightly and resting eases it, and you can walk again__ — a pattern that repeats. Symptoms are also notably less likely to appear while cycling, where you naturally lean forward. __It's common in older adults__, and as it progresses it can also affect bladder and bowel control.",
      tests:
        "A history (how far you can walk, whether bending forward brings relief, etc.) and a physical exam provide clues for diagnosis. __Imaging such as MRI__ is considered important for a definitive diagnosis and assessing severity, and we coordinate with an institution capable of imaging as needed.",
      treatment:
        "In most cases, we __start with conservative treatment__ (oral medication, nerve block injections, exercise therapy, etc.) and adjust the approach based on how things progress. __If conservative treatment brings little improvement, daily life is significantly affected, or bladder/bowel problems appear__, surgery (to relieve the nerve compression) becomes an option, and we refer you to an institution capable of specialized treatment.",
      tip: "__Many people resign themselves to it, thinking \"it's just part of getting older,\"__ but if you're troubled by a walking distance that's gradually getting shorter, or needing to stop and rest to keep walking, treatment can sometimes bring real improvement. Please come talk it over with us.",
    },
  },
  {
    slug: "knee-osteoarthritis",
    title: "変形性膝関節症",
    category: "internal",
    summary:
      "「階段の上り下りで膝が痛む」「正座がつらい」。加齢とともに増える膝の痛みは、早期の対策で進行を遅らせられます。",
    pathology:
      "__膝関節のクッションの役割をする軟骨が、加齢や使い過ぎ等によってすり減る__ことで、__関節の変形・炎症を起こし、痛みや動かしにくさが生じる__病気です。__立ち上がりや歩き始め、階段の上り下りで痛む__ことが多く、__進行すると安静時にも痛む、正座ができない、O脚に変形する__等の症状が強くなります。__女性・肥満の方・O脚傾向のある方に多い__とされ、__加齢とともに頻度が高まる、非常にありふれた病気__です。",
    tests: "__X線（レントゲン）検査__で、__関節の隙間の狭さ・骨の変形の程度__を評価し、進行度を確認します。",
    treatment:
      "__体重管理・大腿四頭筋等を鍛える運動療法__が治療の土台となり、__痛みが強い場合は消炎鎮痛薬（内服・外用）やヒアルロン酸等の関節内注射__を併用します。__サポーターや杖等の装具__で膝への負担を減らすことも有効です。__保存的治療で改善が乏しい、生活への支障が大きい場合__には、__人工関節手術等の専門的な治療が可能な整形外科__へご紹介します。",
    tip: "__「年だから仕方がない」と痛みを我慢して動かさずにいると、筋力がさらに落ちて悪循環になる__ことがあります。__体重を1kg減らすと、歩行時に膝にかかる負担は数kg分軽減される__とされており、__体重管理そのものが有効な治療__です。__痛みがあるからと全く動かないのではなく、痛みに応じた適度な運動を続けることが、進行を遅らせるコツ__です。",
    sources: [
      {
        label: "日本整形外科学会「変形性膝関節症診療ガイドライン2023」",
        url: "https://minds.jcqhc.or.jp/summary/c00793/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Knee osteoarthritis",
      summary: "\"My knee hurts going up and down stairs\"; \"sitting on my heels is painful.\" Knee pain that increases with age can have its progression slowed with early action.",
      pathology:
        "This condition occurs when __the cartilage that cushions the knee joint wears down with age and overuse__, leading to __joint deformity and inflammation that cause pain and reduced mobility__. It often __hurts when standing up, starting to walk, or going up and down stairs__, and __as it progresses, pain can occur even at rest, kneeling becomes difficult, and the legs can bow outward__. It's __more common in women, those who are overweight, and those with a tendency toward bowed legs__, and is a __very common condition that becomes more frequent with age__.",
      tests: "An __X-ray__ evaluates __how narrow the joint space has become and the degree of bone deformity__, confirming how far it has progressed.",
      treatment:
        "__Weight management and exercise therapy to strengthen the quadriceps and other muscles__ form the foundation of treatment, with __anti-inflammatory pain relievers (oral or topical) or joint injections such as hyaluronic acid__ added if pain is significant. __A knee brace or a cane__ can also help by reducing the load on the knee. __If conservative treatment brings little improvement and daily life is significantly affected__, we refer you to __an orthopedic specialist capable of advanced treatment such as joint replacement surgery__.",
      tip: "__Resigning yourself to the pain and avoiding movement because \"it's just age\" can lead to further muscle loss and a worsening cycle.__ __Losing 1kg of body weight is said to reduce the load on the knee during walking by several kilograms__, so __weight management itself is an effective treatment__. __Rather than avoiding movement entirely because of pain, continuing moderate exercise suited to your pain level is the key to slowing progression.__",
    },
  },
  {
    slug: "acute-low-back-pain",
    title: "ぎっくり腰（急性腰痛症）",
    category: "internal",
    summary:
      "重い物を持ち上げた瞬間、急に腰が抜けるように痛む「ぎっくり腰」。多くは数日〜数週間で改善する、過度に心配しなくてよい痛みです。",
    pathology:
      "__重い物を持ち上げた瞬間や、急に体をひねった時等__に、__腰に急激な痛みが走る状態__を指し、医学的には「急性腰痛症」と呼ばれます。__いわゆる「ぎっくり腰」は欧米では「魔女の一撃」とも呼ばれる__ほど、__突然で強い痛み__が特徴です。__原因の多くは、腰の筋肉や靱帯の軽い損傷等で、画像検査をしても特定の異常が見つからないことがほとんど__です。__発症後4週間以内の腰痛を急性腰痛、3か月以上続くものを慢性腰痛__と区別します。",
    tests:
      "__問診・診察で、足のしびれ・排尿排便の障害・発熱・体重減少等の「危険なサイン」の有無__を確認します。__多くの急性腰痛では、これらのサインがなければ、画像検査（X線・CT等）を急いで行う必要はない__とされています。危険なサインがある場合や、痛みが長引く場合には画像検査を検討します。",
    treatment:
      "__痛み止め（内服・湿布等）で痛みを和らげながら、「安静にし過ぎず、できる範囲で普段通りの生活を続ける」__ことが、回復を早めることが分かっています。__コルセット等で一時的に腰を保護する__ことも選択肢になります。__多くは数日〜数週間で自然に改善__します。__下肢のしびれ・脱力、排尿排便の障害を伴う場合__には、神経の圧迫（腰部脊柱管狭窄症・椎間板ヘルニア等）が疑われ、専門的な評価を行います。",
    tip: "__「ぎっくり腰になったら絶対安静」というイメージを持たれがちです__が、__実際には安静にし過ぎるとかえって回復が遅れる__ことが分かっており、__痛みに応じて早期から普段の生活に戻ること__が推奨されています。__足のしびれ・力が入らない、おしっこ・便の調子がおかしい__等を伴う場合は、通常のぎっくり腰とは異なる可能性があるため、早めにご相談ください。",
    sources: [
      {
        label: "日本整形外科学会・日本腰痛学会「腰痛診療ガイドライン2019（改訂第2版）」",
        url: "https://minds.jcqhc.or.jp/summary/c00498/",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Acute low back pain (\"thrown-out back\")",
      summary: "A sudden, severe pain in the lower back at the moment of lifting something heavy — what's often called \"throwing out your back.\" In most cases it improves within days to weeks and isn't something to worry about excessively.",
      pathology:
        "This refers to __a sudden, sharp pain in the lower back__, typically at __the moment of lifting something heavy or suddenly twisting the body__, and is medically called \"acute low back pain.\" What's commonly called \"throwing out your back\" is known in the West as being hit by \"the witch's stroke,\" reflecting just how __sudden and intense__ the pain can be. __In most cases, the cause is minor strain to the back muscles or ligaments, and imaging usually finds no specific abnormality.__ Back pain lasting __up to 4 weeks after onset is classified as acute, while pain lasting 3 months or more is classified as chronic__.",
      tests:
        "A history and exam check for __\"warning signs\" such as leg numbness, bladder or bowel problems, fever, or weight loss__. __For most cases of acute low back pain, if none of these warning signs are present, urgent imaging (X-ray, CT, etc.) isn't considered necessary.__ Imaging is considered if warning signs are present or the pain drags on.",
      treatment:
        "It's known that __easing the pain with medication (oral or a topical patch) while \"not resting excessively, and continuing your usual daily activities as much as you reasonably can\"__ speeds recovery. __Temporarily supporting the lower back with a brace__ is also an option. __Most cases improve naturally within days to weeks.__ __If numbness or weakness in the legs, or bladder/bowel problems, are present__, nerve compression (such as spinal stenosis or a herniated disc) is suspected, and we carry out a specialized evaluation.",
      tip: "__People often picture \"strict bed rest\" as the response to throwing out your back,__ but __we now know that resting too much can actually slow recovery__, and __returning to your usual activities early, as your pain allows, is recommended.__ __If it comes with leg numbness, weakness, or bladder/bowel changes__, it may be something other than a typical thrown-out back, so please come talk to us sooner rather than later.",
    },
  },
  {
    slug: "h-pylori",
    title: "ピロリ菌感染（胃炎・胃潰瘍との関連）",
    category: "internal",
    summary: "ヘリコバクター・ピロリという細菌の胃への感染で、慢性胃炎・胃潰瘍等のリスク要因として知られています。",
    pathology:
      "ヘリコバクター・ピロリという細菌の胃への感染で、**慢性胃炎・胃潰瘍・胃がんのリスク要因**として知られています。",
    tests: "血液検査（抗体）、経鼻内視鏡（胃カメラ）での観察・組織採取。",
    treatment:
      "感染が確認された場合、**除菌治療**（内服薬の組み合わせ）を検討することが多いです。__1回目（一次除菌）・2回目（二次除菌）までは保険診療で受けていただけます__が、一次・二次とも不成功だった場合に行う**3回目（三次除菌）は自費診療**となります。除菌成功率には個人差があります。",
    tip: "__除菌治療が成功しても胃がんのリスクがゼロになるわけではない__ため、除菌後も定期的な胃カメラ検査が勧められることがあります。",
    pricingLinkNote: "3次除菌は自費診療です。料金の詳細は料金ページをご覧ください。",
    sources: [
      {
        label: "日本ヘリコバクター学会「H. pylori感染の診断と治療のガイドライン」",
        url: "https://minds.jcqhc.or.jp/guidelines_kind/h-pylori%E6%84%9F%E6%9F%93/",
      },
    ],
    lastReviewed: "2026-10-09",
    en: {
      title: "H. pylori infection (and its link to gastritis & stomach ulcers)",
      summary: "Infection of the stomach with a bacterium called Helicobacter pylori, known as a risk factor for chronic gastritis, stomach ulcers, and more.",
      pathology:
        "Infection of the stomach with a bacterium called Helicobacter pylori, known as a **risk factor for chronic gastritis, stomach ulcers, and stomach cancer**.",
      tests: "A blood test (antibodies), and observation/tissue sampling via transnasal endoscopy (gastroscopy).",
      treatment:
        "If infection is confirmed, we often consider **eradication treatment** (a combination of oral medications). __The first attempt (primary eradication) and second attempt (secondary eradication) are covered by insurance__, but a **third attempt (tertiary eradication), needed if both the first and second attempts fail, is self-pay**. Success rates vary from person to person.",
      tip: "__Even successful eradication doesn't bring your stomach cancer risk down to zero__, so regular follow-up endoscopy is sometimes recommended even after eradication.",
    },
  },
  {
    slug: "hay-fever",
    title: "花粉症",
    category: "internal",
    summary: "花粉に対するアレルギー反応でくしゃみ・鼻水・鼻づまり・目のかゆみ等が起こります。重症度に応じた治療法が確立しており、重い症状には注射薬や手術まで選択肢があります。",
    pathology:
      "花粉症は有病率が**4割を超える**ともいわれる国民病で、近年は重症例の増加も指摘されています。くしゃみ・鼻水が主体の「くしゃみ・鼻漏型」、鼻づまりが主体の「鼻閉型」、両方がみられる「充全型」に分けられ、__くしゃみ発作・鼻漏の回数や口呼吸になる時間の長さによって、軽症から最重症まで段階的に重症度が分類される__ことが特徴です。症状が重いほど、早い段階での適切な治療が勧められています。",
    tests:
      "問診と鼻の中の観察（鼻鏡・内視鏡検査）で診断することが多く、典型的な所見があればそのまま治療を開始します。診断がはっきりしない場合や薬の効果が乏しい場合、根本的な体質改善を目指す治療（アレルゲン免疫療法）を検討する場合には、血液検査（アレルギー検査）や皮膚テスト、鼻の症状を誘発させて確認する鼻誘発試験等を組み合わせて確定診断を行います。",
    treatment:
      "症状の程度に応じた段階的な治療が基本です。軽症〜中等症では第2世代抗ヒスタミン薬や鼻噴霧用ステロイド薬を中心に、重症・最重症では__これらを複数組み合わせて__用い、必要に応じて点鼻用血管収縮薬を短期間（2週間程度）、症状が特に強い場合は経口ステロイド薬を1週間程度併用します。**標準治療でも症状が改善しない重症の花粉症には、抗IgE抗体（オマリズマブ）という注射薬**が、スギ花粉症の確定診断等一定の条件を満たす場合に使用できることが、近年のガイドラインに明記されました。花粉の飛散が始まる前からの「初期治療」や、根本的な体質改善を目指すアレルゲン免疫療法（舌下免疫療法等）も、症状の軽減や将来的な改善が期待される選択肢です。",
    tip: "__「毎年のことだから」と市販薬だけで過ごしている重い花粉症__の中には、注射薬まで含めた治療で大きく改善する余地が残っているケースがあります。強い鼻づまりが続く・眠れないほど症状が強い等でお困りの場合は、一度ご相談ください。",
    sources: [
      {
        label: "日本鼻科学会（鼻アレルギー診療ガイドライン作成委員会）「鼻アレルギー診療ガイドライン－通年性鼻炎と花粉症－2024年版（改訂第10版）」",
        url: "https://minds.jcqhc.or.jp/guidelines_kind/%E9%BC%BB%E3%82%A2%E3%83%AC%E3%83%AB%E3%82%AE%E3%83%BC/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Hay fever (seasonal allergic rhinitis)",
      summary: "An allergic reaction to pollen causing sneezing, a runny nose, nasal congestion, and itchy eyes. Treatment approaches are well established by severity, with options ranging up to injectable medication and surgery for severe cases.",
      pathology:
        "Hay fever is sometimes described as a national condition, with a prevalence said to exceed **40%**, and recent years have also seen an increase in severe cases. It's divided into a \"sneezing/runny nose type\" (dominated by sneezing and discharge), a \"congestion type\" (dominated by nasal blockage), and a \"combined type\" (both). A notable feature is that __severity is classified step by step, from mild to most severe, based on the frequency of sneezing attacks and discharge, and how much time is spent breathing through the mouth__. The more severe the symptoms, the more that early, appropriate treatment is recommended.",
      tests:
        "Diagnosis is often made through a history and examination inside the nose (using a nasal speculum or endoscope), and treatment typically begins right away if the findings are typical. If the diagnosis isn't clear, medication isn't working well, or treatment aimed at fundamentally changing your allergic tendency (allergen immunotherapy) is being considered, we combine a blood test (allergy testing), skin testing, and a nasal provocation test (deliberately triggering and observing a nasal reaction) to reach a confirmed diagnosis.",
      treatment:
        "Treatment is staged according to severity. For mild to moderate cases, treatment centers on second-generation antihistamines and nasal steroid sprays; for severe and most severe cases, __these are combined__, with a nasal decongestant spray used short-term (around 2 weeks) as needed, and oral steroids added for about a week if symptoms are especially intense. Recent guidelines have made clear that **an injectable anti-IgE antibody medication (omalizumab) can be used for severe hay fever that doesn't improve with standard treatment**, when certain conditions are met, such as a confirmed diagnosis of Japanese cedar pollen allergy. \"Early treatment\" started before pollen season begins, and allergen immunotherapy (such as sublingual immunotherapy) aimed at fundamentally changing your allergic tendency, are also options that can reduce symptoms and offer hope of long-term improvement.",
      tip: "__Among those managing severe hay fever with over-the-counter medication alone, year after year,__ some have real room for improvement with treatment that includes injectable medication. If you're struggling with persistent severe congestion, or symptoms bad enough to interfere with sleep, please come talk it over with us.",
    },
  },
  {
    slug: "allergic-rhinitis",
    title: "アレルギー性鼻炎",
    category: "internal",
    summary: "花粉以外の原因（ハウスダスト・ダニ等）による、鼻粘膜の通年性アレルギー反応です。環境調整と薬物治療を組み合わせることで、長く付き合いながら症状を抑えることができます。",
    pathology:
      "ハウスダストやダニのフン・死骸等が一年中鼻の粘膜に触れることで起こる、通年性のアレルギー性鼻炎です。くしゃみ・鼻水が主体の「くしゃみ・鼻漏型」、鼻づまりが主体の「鼻閉型」、両方を伴う「充全型」に分けられ、症状の頻度・強さによって重症度が段階的に分類されます。__皮膚テストや血液検査で陰性でも、鼻の粘膜だけで微量のアレルギー反応が起きている「ローカルアレルギー性鼻炎」という状態__も知られており、将来的に本格的なアレルギー性鼻炎や喘息に進展することがあるため、症状が続く場合は早めの相談が勧められています。",
    tests:
      "問診と鼻の中の観察に加え、血液検査（アレルギー検査）や鼻汁の好酸球検査で診断します。__検査が陰性でも症状が強く続く場合__は、鼻の粘膜に直接アレルゲンを触れさせて反応をみる鼻誘発試験を行い、見逃されやすいローカルアレルギー性鼻炎等を確認することがあります。",
    treatment:
      "ダニ対策（寝具・カーペットの管理等）を含めた**原因物質の除去・回避**がまず重要です。薬物治療は重症度に応じて第2世代抗ヒスタミン薬や鼻噴霧用ステロイド薬を単独または併用し、重症・最重症では点鼻用血管収縮薬の短期間使用や経口ステロイド薬を組み合わせます。__保存的な治療で改善しない重症例には、鼻の粘膜を縮小させる手術（粘膜下下鼻甲介骨切除術等）も選択肢__となり、長期にわたって症状改善効果が維持されることが報告されています。根本的な体質改善を目指すアレルゲン免疫療法は、数年継続すると治療終了後も長期間効果が続くことが報告されています。",
    tip: "強い鼻づまりが続く・鼻血を繰り返す・匂いが分かりにくい・いびきや睡眠時の無呼吸が疑われる等の場合は、__単なる鼻炎ではない病気が隠れていることもある__ため、一度しっかりとした評価を受けることをお勧めします。",
    sources: [
      {
        label: "日本鼻科学会（鼻アレルギー診療ガイドライン作成委員会）「鼻アレルギー診療ガイドライン－通年性鼻炎と花粉症－2024年版（改訂第10版）」",
        url: "https://minds.jcqhc.or.jp/guidelines_kind/%E9%BC%BB%E3%82%A2%E3%83%AC%E3%83%AB%E3%82%AE%E3%83%BC/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Allergic rhinitis (year-round)",
      summary: "A year-round allergic reaction in the nasal lining caused by something other than pollen, such as house dust or mites. Combining environmental changes with medication can keep symptoms under control over the long term.",
      pathology:
        "This is perennial (year-round) allergic rhinitis, caused by house dust, mite droppings and remains, and similar particles contacting the nasal lining all year. It's divided into a \"sneezing/runny nose type\" (dominated by sneezing and discharge), a \"congestion type\" (dominated by nasal blockage), and a \"combined type\" (both), and severity is classified step by step based on how often and how strongly symptoms occur. __There's also a recognized condition called \"local allergic rhinitis,\" where a small-scale allergic reaction occurs only in the nasal lining even when skin testing and blood tests come back negative__ — and because this can progress into full allergic rhinitis or asthma over time, we recommend coming in sooner rather than later if symptoms persist.",
      tests:
        "Beyond a history and examination inside the nose, diagnosis uses a blood test (allergy testing) and a test for eosinophils in nasal discharge. __If symptoms persist strongly despite negative test results__, we may perform a nasal provocation test — exposing the nasal lining directly to an allergen and observing the reaction — to check for local allergic rhinitis and other conditions that are easy to miss.",
      treatment:
        "**Removing or avoiding the allergen**, including mite countermeasures (managing bedding, carpets, etc.), is the first priority. Medication is used alone or in combination, based on severity, choosing from second-generation antihistamines and nasal steroid sprays; for severe and most severe cases, a short course of nasal decongestant spray or oral steroids is added. __For severe cases that don't improve with conservative treatment, surgery to reduce the nasal lining (such as submucosal turbinectomy) is also an option__, and has been reported to maintain symptom improvement over the long term. Allergen immunotherapy, aimed at fundamentally changing your allergic tendency, has been reported to keep working for a long time after treatment ends if continued for several years.",
      tip: "If you have persistent severe congestion, repeated nosebleeds, a reduced sense of smell, or suspected snoring or sleep apnea, __something other than simple rhinitis may be present__, so we'd recommend a thorough evaluation.",
    },
  },
  {
    slug: "urticaria",
    title: "蕁麻疹",
    category: "internal",
    summary: "かゆみを伴う膨疹（みみず腫れ状の盛り上がり）が出没する状態です。タイプの見極めが治療の近道になります。",
    pathology:
      "かゆみを伴う紅斑・膨疹が、**多くは24時間以内に跡形なく消える**ことを繰り返すのが特徴です。原因が特定できない「特発性」が最も多いですが、__特定の刺激（運動・入浴・寒冷・日光・圧迫など）がきっかけで出る「刺激誘発型」__や、まぶた・唇などが腫れる「血管性浮腫」など、いくつかのタイプに分かれます。同じ「蕁麻疹」でもタイプによって生活上の注意点や治療の進め方が異なるため、**まず正確にタイプを見極めること**が、遠回りせず改善に向かう近道になります。",
    tests:
      "基本的には**問診と皮疹の経過の確認で診断**できることが多く、蕁麻疹というだけで血液検査やアレルギー検査を一律に行うことはお勧めしていません。詳しい問診から特定の食物・薬剤・運動などとの関連が疑われる場合や、治療が効きにくい場合には、必要な範囲で血液検査（IgE値・甲状腺の自己抗体・炎症反応など）や誘発試験を行い、原因・悪化因子を探ります。",
    treatment:
      "**非鎮静性の第2世代抗ヒスタミン薬**の内服を基本とします。通常量で効果が不十分な場合は、**増量や他剤への変更・併用**を段階的に試み、それでも改善しない難治例では、専門的な注射薬による治療（抗IgE抗体製剤など）や、専門医療機関との連携も検討します。当面の目標は「生活に支障のない状態」、次に「症状が全く出ない状態」とし、__症状が治まっても自己判断ですぐに内服を中止せず__、段階的に薬を減らしていくことで、多くの場合は最終的に薬なしで過ごせる状態を目指せます。",
    tip: "蕁麻疹は、単一の原因だけで説明しようとしないことが大切です。疲労・ストレス・感染・特定の刺激などが**複合的に関わっている**ことが多く、原因探しに固執するより、__タイプに応じた適切な治療を続けることが改善への近道__です。長引く蕁麻疹でも多くは治癒に至りますので、一人で抱え込まずご相談ください。",
    sources: [{ label: "日本皮膚科学会「蕁麻疹診療ガイドライン2026（第4版）」" }],
    lastReviewed: "2026-10-10",
    en: {
      title: "Urticaria (hives)",
      summary: "A condition where itchy welts (raised, wheal-like bumps) come and go. Identifying the type is the fastest route to effective treatment.",
      pathology:
        "This is characterized by itchy red welts that **usually disappear without a trace within 24 hours**, in a repeating pattern. \"Idiopathic\" cases, where no cause can be identified, are the most common, but there are also several other types, including __\"inducible urticaria,\" triggered by a specific stimulus (exercise, bathing, cold, sunlight, pressure, etc.)__, and \"angioedema,\" where the eyelids, lips, or similar areas swell. Even under the single umbrella term \"urticaria,\" the everyday precautions and treatment approach differ by type, so **accurately identifying the type first** is the most direct route to improvement, without unnecessary detours.",
      tests:
        "In most cases, **diagnosis can be made based on a history and the course of the skin reaction**, and we don't recommend blood tests or allergy testing across the board just because urticaria is present. If a detailed history raises suspicion of a link to a specific food, medication, or exercise, or if treatment isn't working well, we run blood tests (IgE levels, thyroid autoantibodies, inflammatory markers, etc.) or provocation testing as needed, to look for the cause or any aggravating factors.",
      treatment:
        "Oral **non-sedating, second-generation antihistamines** form the foundation of treatment. If the standard dose isn't enough, we try **increasing the dose, or switching to or adding another medication**, in stages; for difficult cases that still don't improve, we also consider specialized injectable treatment (such as anti-IgE antibody medication) or coordination with a specialized institution. The immediate goal is \"a state that doesn't interfere with daily life,\" followed by \"no symptoms at all,\" and __rather than stopping medication abruptly on your own once symptoms settle__, tapering the medication in stages can, in many cases, eventually let you go without medication altogether.",
      tip: "With urticaria, it's important not to try to explain it with a single cause. Fatigue, stress, infection, specific triggers, and more are often **involved together**, and rather than fixating on finding \"the\" cause, __continuing the right treatment for your type is the faster route to improvement__. Even long-lasting urticaria resolves in most cases, so please don't carry it alone — come talk to us.",
    },
  },
  {
    slug: "atopic-dermatitis",
    title: "アトピー性皮膚炎",
    category: "internal",
    summary:
      "かゆみを伴う湿疹を繰り返す慢性の皮膚疾患です。正しいスキンケアと治療の継続で、症状のない状態を目指せます。",
    pathology:
      "__皮膚のバリア機能の低下とアレルギー体質を背景に、かゆみを伴う湿疹が良くなったり悪くなったりを繰り返す__慢性の皮膚疾患です。__乳幼児期に発症することが多い__ですが、__大人になってから発症・再燃する__こともあります。__肘・膝の裏、首、顔等__に左右対称に症状が出やすく、__乾燥・汗・ストレス・特定の食品やダニ等のアレルゲン__が症状を悪化させる要因になることがあります。",
    tests:
      "__問診・皮疹の分布や経過の確認__で診断することが多く、__必要に応じて血液検査（アレルギー検査）__を行うことがあります。",
    treatment:
      "**保湿剤によるスキンケア**を土台に、__炎症を抑えるステロイド外用薬やタクロリムス軟膏等の抗炎症外用薬__を、__症状の強さに応じて使い分け__ます。__「症状が良くなったら自己判断でやめる」のではなく、良い状態を維持するための間欠的な外用（プロアクティブ療法）__を続けることで、__再燃を防ぎながら、徐々に治療を減らしていく__ことを目指します。__重症例では、内服薬や注射薬（生物学的製剤）__が選択肢となることもあり、必要に応じて専門医療機関と連携します。",
    tip: "__「ステロイドは怖いから」と自己判断で治療を中断し、かえって悪化させてしまう__方が少なくありません。__正しく使えば、ステロイド外用薬は安全に症状をコントロールできる薬__です。__毎日の保湿ケアの継続が、実は一番地味で重要な治療__であり、__「かゆくない日」を増やしていくことが治療のゴール__です。症状の強さや経過に不安がある場合は、自己判断を続けず一度ご相談ください。",
    sources: [
      {
        label: "日本皮膚科学会・日本アレルギー学会「アトピー性皮膚炎診療ガイドライン2021」",
      },
    ],
    lastReviewed: "2026-10-14",
    en: {
      title: "Atopic dermatitis",
      summary: "A chronic skin condition causing recurring, itchy eczema. With proper skincare and consistent treatment, a symptom-free state is a realistic goal.",
      pathology:
        "This is a chronic skin condition where __a weakened skin barrier combined with an allergic predisposition__ causes itchy eczema that repeatedly flares and settles. __It often develops in infancy__, but can also __first appear or recur in adulthood__. Symptoms tend to appear symmetrically on __the inner elbows and knees, neck, face, and similar areas__, and can be made worse by __dryness, sweat, stress, and allergens such as certain foods or mites__.",
      tests:
        "Diagnosis is usually made through __a history and checking the distribution and course of the rash__, with a __blood test (allergy testing) added as needed__.",
      treatment:
        "**Skincare with moisturizer** forms the foundation, with __anti-inflammatory topical medications such as steroid creams or tacrolimus ointment used selectively based on symptom severity__. Rather than __\"stopping on your own once symptoms improve,\"__ continuing intermittent topical treatment to maintain a good state (proactive therapy) aims to __prevent flares while gradually reducing treatment over time__. __In severe cases, oral medication or injectable biologics__ may become options, with coordination with a specialized institution as needed.",
      tip: "__Quite a few people stop treatment on their own out of fear of steroids, which often ends up making things worse.__ __Used correctly, topical steroids are a medication that can safely control symptoms.__ __Keeping up daily moisturizing care is, in fact, the most unremarkable yet important treatment__, and __increasing the number of \"itch-free days\" is the real goal of treatment__. If you're unsure about the severity of your symptoms or how they're progressing, please stop guessing on your own and come talk to us.",
    },
  },
  {
    slug: "asthma",
    title: "気管支喘息（成人）",
    category: "internal",
    summary: "気道の慢性的な炎症により、咳・喘鳴・呼吸困難が繰り返し起こる状態です。吸入薬による長期管理で、発作のない生活を目指します。",
    pathology:
      "気道の慢性的な炎症により、気道が過敏になって狭くなりやすい状態です。咳・喘鳴（ゼーゼー・ヒューヒューという呼吸音）・呼吸困難が、**夜間や早朝、運動後、風邪の後などに繰り返し起こる**のが特徴です。長引く咳だけが唯一の症状という方もおり、咳喘息として見過ごされていることもあります。長期間の喘鳴で息苦しさが慢性化し、COPD（慢性閉塞性肺疾患）との鑑別が必要になる場合もあります。",
    tests:
      "問診・聴診に加え、**FeNO（呼気中の炎症物質を測定する検査）**や血液検査（好酸球数・IgE値等）で気道炎症の有無・程度を評価します。デジタルX線で他の肺疾患との鑑別を行うこともあります。喘息かどうかの診断だけでなく、**どの程度コントロールできているか**を定期的に評価することが治療方針の決定に重要です。",
    treatment:
      "**吸入ステロイド薬（ICS）**を中心とした吸入薬による長期管理が基本です。症状が十分に抑えられない場合は、長時間作用性気管支拡張薬（LABA）の併用など、**段階的に治療内容を調整（ステップアップ／ステップダウン）**します。治療の目標は、日常生活に支障がなく、発作による受診・休職・休校がない状態を維持することです。症状が軽い咳・喘鳴の段階でも治療介入のタイミングと考え、我慢せずご相談ください。",
    tip: "症状が落ち着いていても気道の炎症が続いていることが多いため、__自己判断で治療を中断しない__ことが大切です。治療を続けながら、どこまで薬を減らせるかは医師と一緒に見極めていきますので、安心して長期管理にお付き合いください。",
    sources: [{ label: "日本アレルギー学会「喘息予防・管理ガイドライン（JGL）」" }],
    lastReviewed: "2026-10-10",
    en: {
      title: "Bronchial asthma (adult)",
      summary: "Chronic airway inflammation causing recurring cough, wheezing, and difficulty breathing. Long-term management with inhaled medication aims for an attack-free life.",
      pathology:
        "Chronic inflammation makes the airways hypersensitive and prone to narrowing. Cough, wheezing (a whistling or rattling breathing sound), and difficulty breathing are characterized by **recurring at night, early morning, after exercise, or following a cold**. For some people, a persistent cough is the only symptom, and it can go unrecognized as cough-variant asthma. Chronic wheezing can also lead to ongoing breathlessness and sometimes needs to be distinguished from COPD (chronic obstructive pulmonary disease).",
      tests:
        "Beyond a history and listening to your breathing, we evaluate the presence and degree of airway inflammation with a **FeNO test (measuring an inflammatory substance in your exhaled breath)** and blood tests (eosinophil count, IgE level, etc.). A digital X-ray may also be used to distinguish it from other lung conditions. Beyond simply diagnosing asthma, regularly assessing **how well it's being controlled** is important for guiding treatment decisions.",
      treatment:
        "Long-term management centers on inhaled medication, primarily an **inhaled corticosteroid (ICS)**. If symptoms aren't adequately controlled, we **adjust treatment step by step (stepping up or down)**, such as adding a long-acting bronchodilator (LABA). The treatment goal is maintaining a state with no interference in daily life and no attacks requiring a doctor's visit, missed work, or missed school. Even at the stage of mild cough or wheezing, it's worth treating as a cue for intervention — please don't tough it out, come talk to us.",
      tip: "Even when symptoms have settled down, airway inflammation is often still ongoing, so __it's important not to stop treatment on your own judgment__. We'll work out together, over time, how far your medication can be reduced while continuing treatment — please feel at ease about the long-term management process.",
    },
  },
  {
    slug: "asthma-child",
    title: "小児気管支喘息",
    category: "internal",
    summary: "お子さまの気道の慢性的な炎症による咳・喘鳴・呼吸困難です。成人とは治療量や生活管理のポイントが異なります。",
    pathology:
      "お子さまの気道に慢性的な炎症が起こり、気道が過敏になって狭くなりやすい状態です。夜間・早朝や運動後、風邪をひいた後に**咳・喘鳴・呼吸困難が繰り返す**のが特徴です。ダニ・ハウスダスト等のアレルゲンや、運動・気候の変化が症状のきっかけになることがあります。小児の喘息は成長とともに症状が変化しやすく、**年齢に応じた評価と対応**が必要です。",
    tests:
      "問診に加え、年齢に応じたコントロール状態の質問票（JPAC・C-ACT・ACT等）を使って、日常生活の中でどの程度症状が抑えられているかを確認します。必要に応じて血液検査でアレルギーの関与を調べることもありますが、**検査よりも症状の経過と生活への支障の有無を重視**して治療方針を決めます。",
    treatment:
      "**吸入ステロイド薬（ICS）**による長期管理が基本で、**お子さまの年齢・体格に応じた薬の量・吸入デバイス（スペーサー付き吸入器等）**を選びます。成人と同じ薬でも使用量は少なく設定されるのが通常で、適切に使用すれば身長の伸びへの影響は小さいとされています。自宅でのダニアレルゲン対策（寝具の管理等）も、症状の軽減に役立つことがあります。運動前の対応や、予防接種・学校生活での注意点についてもご相談に応じます。",
    tip: "お子さまの喘息は、**症状がない時期も治療を継続することが将来の発作予防につながります**。自己判断で吸入をやめず、定期的な受診で成長に合わせて薬の量を見直していきましょう。風邪をひいた時に症状が悪化しやすいため、普段と様子が違う時は早めにご相談ください。",
    sources: [
      {
        label: "日本小児アレルギー学会「小児気管支喘息治療・管理ガイドライン2023（JPGL2023）」",
        url: "https://minds.jcqhc.or.jp/summary/c00825/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Childhood bronchial asthma",
      summary: "Cough, wheezing, and difficulty breathing from chronic airway inflammation in children. Treatment dosing and daily management differ from adults.",
      pathology:
        "Chronic inflammation in a child's airways makes them hypersensitive and prone to narrowing, characterized by __recurring cough, wheezing, and difficulty breathing__ at night, early morning, after exercise, or following a cold. Allergens such as mites and house dust, along with exercise and weather changes, can trigger symptoms. Childhood asthma symptoms tend to change as the child grows, so __age-appropriate evaluation and management__ is needed.",
      tests:
        "Beyond a history, we use age-appropriate control questionnaires (JPAC, C-ACT, ACT, etc.) to check how well symptoms are being kept under control in daily life. A blood test may be used to investigate allergic involvement as needed, but **we weight the course of symptoms and how much they interfere with daily life more heavily than test results** when deciding on treatment.",
      treatment:
        "Long-term management centers on an **inhaled corticosteroid (ICS)**, choosing a **medication dose and inhaler device (such as a spacer-equipped inhaler) suited to the child's age and build**. Even with the same medications used in adults, the dose used is normally lower, and when used appropriately, the impact on height growth is considered small. Managing mite allergens at home (bedding care, etc.) can also help reduce symptoms. We're also happy to discuss pre-exercise precautions, vaccinations, and considerations for school life.",
      tip: "For children's asthma, **continuing treatment even during symptom-free periods helps prevent future attacks**. Please don't stop inhalers on your own judgment — regular visits let us adjust the dose as your child grows. Symptoms tend to worsen with a cold, so please come in sooner rather than later if something seems different from usual.",
    },
  },
  {
    slug: "sas",
    title: "睡眠時無呼吸症候群（SAS）",
    category: "internal",
    summary: "睡眠中に呼吸が止まる・浅くなることを繰り返す状態です。肥満のある方に多く、高血圧や生活習慣病、居眠り運転のリスクとも関係します。",
    pathology:
      "睡眠中に上気道（のど）が狭くなったり塞がったりすることで、無呼吸・低呼吸を繰り返す状態です。**最大の原因は肥満**で、首まわりに脂肪が付くことで気道が狭くなりやすくなりますが、顎が小さい・扁桃が大きいなど、やせ型の方でも起こります。いびき・日中の強い眠気・起床時の頭痛・夜間の頻尿などが代表的なサインですが、**自分では気づきにくく、同居するご家族からの「呼吸が止まっている」という指摘がきっかけで受診される方が多い**疾患です。また、高血圧・糖尿病・脂質異常症などの生活習慣病や、将来的な心血管疾患のリスクとも関連することがわかっています。",
    tests:
      "問診（いびき・無呼吸の指摘・日中の眠気の程度等）に加え、簡易検査（当院の対応範囲内）でおおよその重症度を評価します。簡易検査で中等症以上が疑われる場合や、より正確な診断が必要な場合は、確定診断のための終夜睡眠ポリグラフ検査（PSG）を実施できる専門医療機関と連携します。",
    treatment:
      "軽症では、減量・禁酒・横向きで寝る等の**生活習慣の改善**が中心となります。中等症以上では、**CPAP（経鼻的持続陽圧呼吸療法）**という、眠っている間に鼻マスクから空気を送り込んで気道の閉塞を防ぐ治療が標準的です。CPAPは毎晩一定時間以上使い続けることで、日中の眠気の改善だけでなく、血圧や心血管疾患のリスクの低下も期待できるとされています。自己判断で使用を中断すると数日で症状がもとに戻ってしまうため、**根気よく治療を継続すること**が大切です。当院では呼吸器内科・内科の診療の範囲内で評価・導入後のフォローを行います。",
    tip: "いびきや日中の眠気は「体質」と見過ごされがちですが、SASは居眠り運転などの事故リスクにもつながる疾患です。家族から呼吸の止まりを指摘された、運転中に強い眠気を感じる、といった場合は早めにご相談ください。",
    sources: [
      {
        label: "日本呼吸器学会ほか「睡眠時無呼吸症候群（SAS）の診療ガイドライン2020」",
        url: "https://minds.jcqhc.or.jp/summary/c00587/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Sleep Apnea Syndrome (SAS)",
      summary: "A condition where breathing repeatedly stops or becomes shallow during sleep. It's common in people who are overweight, and is linked to high blood pressure, lifestyle-related conditions, and the risk of falling asleep while driving.",
      pathology:
        "This occurs when the upper airway (throat) narrows or becomes blocked during sleep, causing repeated pauses or shallow breathing. **The leading cause is being overweight** — fat around the neck narrows the airway — but it can also occur in slender people with a small jaw or large tonsils. Snoring, significant daytime sleepiness, morning headaches, and frequent nighttime urination are typical signs, but **it's hard to notice in yourself, and many people come in because a family member they live with points out that \"your breathing stopped.\"** It's also known to be linked to lifestyle-related conditions like high blood pressure, diabetes, and dyslipidemia, as well as future cardiovascular disease risk.",
      tests:
        "Beyond a history (snoring, reports of apnea, degree of daytime sleepiness), a simplified test (within the scope of what we offer) gives an approximate severity assessment. If the simplified test suggests moderate or more severe disease, or a more precise diagnosis is needed, we coordinate with a specialized institution capable of overnight polysomnography (PSG) for a definitive diagnosis.",
      treatment:
        "For mild cases, **lifestyle changes** such as weight loss, cutting back on alcohol, and sleeping on your side are the main approach. For moderate cases and above, **CPAP (continuous positive airway pressure therapy)** — delivering air through a nasal mask while you sleep to keep the airway open — is the standard treatment. Using CPAP consistently for a certain amount of time each night is thought to bring not just improved daytime sleepiness but also a reduced risk of high blood pressure and cardiovascular disease. Stopping on your own judgment causes symptoms to return within days, so **patiently continuing treatment** matters. We provide evaluation and follow-up after starting treatment within the scope of internal medicine/respiratory care.",
      tip: "Snoring and daytime sleepiness are often dismissed as \"just how I am,\" but SAS is a condition linked to real risks, including accidents from falling asleep while driving. If a family member has noticed your breathing stop, or you feel significant sleepiness while driving, please come talk to us sooner rather than later.",
    },
  },
  {
    slug: "reflux-esophagitis",
    title: "逆流性食道炎",
    category: "internal",
    summary: "胃の内容物が食道に逆流し、胸やけなどを起こす状態です。重症度や病型を見極めたうえで、お一人お一人に合った治療を行います。",
    pathology:
      "胃の内容物（胃酸など）が食道に逆流し、食道の粘膜に炎症を起こす状態です。**胸やけ・呑酸（酸っぱいものが上がってくる感じ）・胸の違和感**などの症状が出ることが多く、食後や就寝時に悪化しやすい傾向があります。内視鏡検査では炎症の程度を**LA分類**という国際的な基準で評価しますが、__炎症の強さと症状のつらさは必ずしも一致しません__。内視鏡で明らかな粘膜のただれ（びらん）が見られないのに逆流症状が強く出るタイプを__非びらん性胃食道逆流症（NERD）__と呼び、実は日本人の逆流症状をお持ちの方の中では、びらんを伴うGERDよりもNERDの方が多いとされています。これは食道の粘膜が酸に対して敏感になっている（**知覚過敏**）ことが関係していると考えられており、見た目の炎症の強さと症状のつらさが必ずしも一致しないのが特徴です。そのため、通常の酸分泌抑制薬だけでは効果が乏しい例もあり、タイプを見極めた上で薬の調整や生活習慣の見直しを組み合わせることが、改善への近道になります。加齢・肥満・食道裂孔ヘルニア・食生活（脂肪分の多い食事、飲酒、喫煙）などが背景にあることが多いです。",
    tests:
      "症状の内容・経過をお伺いしたうえで、経鼻内視鏡（胃カメラ）で食道・胃の粘膜の状態とLA分類による重症度を確認します。貧血や炎症反応の評価のため血液検査を行うこともあります。治療を行っても症状が改善しにくい場合は、自己判断で薬を増やすのではなく、診断そのものを見直すことが大切です。",
    treatment:
      "治療はまず**十分に胃酸の分泌を抑える薬剤**で症状を落ち着かせることから始め、4〜8週間ほどで効果を確認します。症状が治まった軽症の方は、薬を減らす・必要な時だけ内服する「オンデマンド療法」に移行できることが多く、重症の方や再発を繰り返す方は、再発予防のための維持療法を継続します。生活習慣の見直しも重要ですが、**誘発される食品や生活パターンには個人差がある**ため、高脂肪食・酸味の強い食品・香辛料・就寝前の食事・食後すぐに横になる習慣・飲酒喫煙・体重増加など、ご自身に当てはまるものを一緒に確認しながら絞り込んでいきます。他の持病のお薬（血圧の薬や痛み止めなど）が症状に影響していることもあるため、自己判断でのお薬の中止はせず、必ずご相談ください。改善しない場合や出血・狭窄、食道裂孔ヘルニアが疑われる場合は、専門医療機関へのご紹介を検討します。",
    tip: "胸やけは「よくある症状」として我慢されがちですが、背景にあるタイプや重症度によって治療の進め方は大きく変わります。市販薬で一時しのぎを続けるより、一度内視鏡でしっかり状態を確認し、ご自身に合った治療方針を一緒に見つけていきましょう。",
    sources: [
      {
        label: "日本消化器病学会「胃食道逆流症（GERD）診療ガイドライン」",
        url: "https://minds.jcqhc.or.jp/summary/c00644/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Reflux esophagitis",
      summary: "A condition where stomach contents flow back up into the esophagus, causing heartburn and similar symptoms. We identify the severity and subtype before tailoring treatment to each person.",
      pathology:
        "This is a condition where stomach contents (such as stomach acid) flow back up into the esophagus, inflaming its lining. It often causes **heartburn, acid regurgitation (a sour taste rising up), and chest discomfort**, which tend to worsen after meals or at bedtime. On endoscopy, the degree of inflammation is graded using an international scale called the **LA classification**, but __the severity of the inflammation and how uncomfortable the symptoms feel don't always line up__. A pattern where reflux symptoms are severe despite no visible erosion (breakdown of the lining) on endoscopy is called __non-erosive reflux disease (NERD)__, and in fact, among Japanese people with reflux symptoms, NERD is reportedly more common than erosive GERD. This is thought to relate to the esophageal lining becoming sensitive to acid (**visceral hypersensitivity**), meaning the visible severity of inflammation and how uncomfortable the symptoms feel don't always match. Because of this, standard acid-suppressing medication alone sometimes isn't enough, and identifying the subtype before combining medication adjustments with lifestyle changes is the faster route to improvement. Aging, obesity, a hiatal hernia, and diet (fatty meals, alcohol, smoking) are often underlying factors.",
      tests:
        "After asking about your symptoms and their course, we use transnasal endoscopy (gastroscopy) to check the condition of the esophageal and stomach lining and assess severity using the LA classification. A blood test may also be done to evaluate for anemia or inflammation. If symptoms don't improve with treatment, it's important to reconsider the diagnosis itself rather than simply increasing the medication on your own.",
      treatment:
        "Treatment typically starts with **medication that thoroughly suppresses stomach acid production** to settle symptoms, checking the effect after about 4–8 weeks. For milder cases where symptoms have settled, many people can move to \"on-demand therapy\" — reducing the dose or taking it only when needed — while those with severe or recurring symptoms continue maintenance therapy to prevent relapse. Reviewing lifestyle factors also matters, but **the foods and habits that trigger symptoms vary from person to person**, so we work together to identify what applies to you from among high-fat foods, acidic or spicy foods, eating before bed, lying down right after eating, alcohol and smoking, and weight gain. Medications for other conditions (such as blood pressure drugs or pain relievers) can sometimes affect symptoms too, so please don't stop any medication on your own — always talk to us first. If symptoms don't improve, or bleeding, narrowing, or a hiatal hernia is suspected, we consider referral to a specialized institution.",
      tip: "Heartburn tends to get dismissed as \"a common symptom\" and tolerated, but the right treatment approach varies greatly depending on the underlying subtype and severity. Rather than continuing to manage it temporarily with over-the-counter medication, let's get a thorough look with endoscopy and work out a treatment plan that fits you.",
    },
  },
  {
    slug: "ibs",
    title: "過敏性腸症候群（IBS）",
    category: "internal",
    summary: "腸に明らかな異常がないのに、腹痛・腹部不快感と下痢や便秘を繰り返す状態です。タイプを見極め、段階を踏んで治療を進めます。",
    pathology:
      "腸に炎症や腫瘍などの明らかな異常が見られないにもかかわらず、腹痛・腹部不快感と、下痢・便秘（またはその両方）を繰り返す状態です。脳と腸が互いに影響し合う「脳腸相関」という仕組みの乱れが背景にあると考えられており、ストレスや生活リズムの乱れで症状が悪化しやすいのはそのためです。__排便状況によって「便秘型」「下痢型」「混合型」などのタイプに分かれ__、タイプによって有効な薬剤や生活指導の内容が異なるため、まず正確にタイプを見極めることが改善への近道です。",
    tests:
      "症状の経過や排便状況（便の硬さ・頻度等）を詳しくお伺いし、__発熱・関節痛・血便・原因不明の体重減少などの「警告症状」や、50歳以上での発症、大腸疾患の家族歴がないか__を確認します。血液検査・尿検査・便潜血検査で炎症・貧血・感染の有無を確認し、これらに異常がある場合や警告症状を伴う場合は、大腸カメラなど精密検査が可能な専門医療機関へご紹介し、他の病気が隠れていないことを確認したうえで診断します。",
    treatment:
      "治療は段階的に進めます。まず食事指導（脂肪分やカフェイン、刺激の強い香辛料を控える、高FODMAP食品の制限を試す等）と生活習慣の改善（規則正しい食事、適度な運動）を基本とし、そのうえでタイプに応じた薬剤（下痢型には整腸剤や止痢薬、便秘型には緩下剤、腹痛には鎮痙薬等）を用います。これで改善が乏しい場合は、不安やストレスなど心理的な要因の関与を評価し、必要に応じて抗うつ薬等を併用することもあります。効果や適した治療法には個人差が大きいため、症状の変化を見ながら根気よく治療方針を調整していきます。",
    tip: "IBSの症状は「気のせい」ではなく、脳と腸の間で実際に起きている体の反応です。__症状を記録しておく__（食事内容・排便状況・ストレスの有無等）と、タイプの見極めや治療方針の検討に役立ちます。症状が長引いてつらい場合や、市販薬で改善しない場合は、一人で抱え込まずご相談ください。",
    sources: [
      {
        label: "日本消化器病学会「機能性消化管疾患診療ガイドライン2020－過敏性腸症候群（IBS）」",
        url: "https://minds.jcqhc.or.jp/summary/c00569/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Irritable Bowel Syndrome (IBS)",
      summary: "A condition causing recurring abdominal pain, discomfort, and diarrhea or constipation, without any clear abnormality in the bowel. We identify the subtype and progress treatment step by step.",
      pathology:
        "This is a condition where abdominal pain, discomfort, and diarrhea and/or constipation recur, despite no clear abnormality — such as inflammation or a tumor — being found in the bowel. A disruption in the \"gut-brain axis,\" the two-way communication between the brain and the gut, is thought to underlie it, which is why stress and a disrupted daily rhythm tend to worsen symptoms. __It's divided into subtypes — \"constipation-predominant,\" \"diarrhea-predominant,\" and \"mixed,\" among others — based on bowel habits__, and because the effective medications and lifestyle guidance differ by subtype, accurately identifying the subtype first is the fastest route to improvement.",
      tests:
        "We ask in detail about the course of your symptoms and bowel habits (stool consistency, frequency, etc.), and check for __\"warning signs\" such as fever, joint pain, blood in the stool, or unexplained weight loss, as well as onset after age 50 or a family history of colorectal disease__. A blood test, urine test, and fecal occult blood test check for inflammation, anemia, and infection, and if these are abnormal or warning signs are present, we refer you to a specialized institution capable of detailed testing such as colonoscopy, confirming no other condition is present before reaching a diagnosis.",
      treatment:
        "Treatment progresses in stages. We start with dietary guidance (cutting back on fat, caffeine, and strong spices; trying a low-FODMAP diet, etc.) and lifestyle improvements (regular meals, moderate exercise) as the foundation, then add medication suited to your subtype (gut-regulating or anti-diarrheal medication for diarrhea-predominant, laxatives for constipation-predominant, antispasmodics for abdominal pain, etc.). If this brings little improvement, we evaluate for psychological factors such as anxiety or stress, and may add an antidepressant or similar medication as needed. Because the effect and the right approach vary a great deal from person to person, we adjust the treatment plan patiently, watching how your symptoms change.",
      tip: "IBS symptoms aren't \"all in your head\" — they're a real physical response happening between the brain and gut. __Keeping a record of your symptoms__ (what you ate, bowel habits, any stress, etc.) can help with identifying your subtype and considering treatment. If your symptoms are persistent and difficult, or over-the-counter medication isn't helping, please don't carry it alone — come talk to us.",
    },
  },
  {
    slug: "functional-dyspepsia",
    title: "機能性ディスペプシア（FD）",
    category: "internal",
    summary: "胃カメラで潰瘍やがんなどの異常が見つからないのに、みぞおちの痛みや胃もたれが続く状態です。タイプに応じた治療で、多くの方が症状をコントロールできます。",
    pathology:
      "機能性ディスペプシア（FD）は、**胃カメラ検査で胃潰瘍や胃がんなどの器質的な病気が否定された上で**、胃の動きや知覚の異常によって症状が続く状態です。大きく分けて、食後の胃もたれや早期満腹感が中心の__食後愁訴症候群（PDS）__と、みぞおちの痛みや焼ける感じが中心の__心窩部痛症候群（EPS）__の2タイプがあり、重なって現れる方も少なくありません。背景には胃の運動機能の低下（食べた物をうまく送り出せない）、胃や十二指腸の知覚過敏、ストレスなどが関係していると考えられています。また、**ピロリ菌感染**がある方では、除菌によって症状が改善するケースも報告されており、ピロリ菌検査も診断・治療の重要な手がかりになります。",
    tests:
      "まず胃カメラ検査を行い、潰瘍・がん・逆流性食道炎など症状の原因となる器質的な病気がないかを確認します。この除外がFD診断の前提になります。あわせてピロリ菌の感染の有無を調べ、感染がある場合は除菌治療の対象となります。体重減少・嘔吐・貧血・飲み込みにくさなどの**警告症状**がある場合や、40歳以上で症状が新たに始まった場合は、より詳しい検査を優先します。",
    treatment:
      "まずピロリ菌感染があれば除菌治療を行い、改善を確認します。除菌対象でない場合や除菌後も症状が残る場合は、胃酸の分泌を抑える薬（酸分泌抑制薬）や、胃の動きを整える消化管運動機能改善薬を、症状のタイプ（PDS型かEPS型か）に応じて選択・調整します。それでも改善が乏しい場合は、漢方薬の併用や、ストレス・不安との関連を踏まえた心理的アプローチ（生活習慣の見直し、必要に応じて専門医との連携）を段階的に取り入れていきます。",
    tip: "「検査で異常がないのに辛い」という状態こそ、FDとして治療の対象になります。一人で抱え込まず、まずは胃カメラで安全を確認した上で、症状のタイプに合った治療を一緒に探していきましょう。",
    sources: [
      {
        label: "日本消化器病学会「機能性消化管疾患診療ガイドライン2021－機能性ディスペプシア（FD）（改訂第2版）」",
      },
    ],
    lastReviewed: "2026-10-21",
    en: {
      title: "Functional Dyspepsia (FD)",
      summary: "Persistent pain or heaviness in the upper abdomen despite no abnormality — such as an ulcer or cancer — found on endoscopy. With treatment suited to the subtype, most people can get their symptoms under control.",
      pathology:
        "Functional Dyspepsia (FD) is a condition where, **once endoscopy has ruled out a structural condition such as a stomach ulcer or stomach cancer**, symptoms continue because of abnormal stomach movement or sensitivity. It's broadly divided into two subtypes: __Postprandial Distress Syndrome (PDS)__, centered on fullness after eating and feeling full too quickly, and __Epigastric Pain Syndrome (EPS)__, centered on pain or a burning sensation in the upper abdomen — and quite a few people have a mix of both. Reduced stomach motility (food isn't moved along efficiently), hypersensitivity of the stomach and duodenum, and stress are all thought to play a role. For those with **H. pylori infection**, eradication has been reported to improve symptoms in some cases, making H. pylori testing an important clue for both diagnosis and treatment.",
      tests:
        "We start with an endoscopy to check for a structural condition behind the symptoms, such as an ulcer, cancer, or reflux esophagitis — this process of ruling things out is a prerequisite for an FD diagnosis. We also test for H. pylori infection, and if present, you become a candidate for eradication treatment. If **warning symptoms** such as weight loss, vomiting, anemia, or difficulty swallowing are present, or symptoms newly began at age 40 or older, we prioritize more detailed testing.",
      treatment:
        "If H. pylori infection is present, we start with eradication treatment and check for improvement. If you're not a candidate for eradication, or symptoms remain afterward, we select and adjust medication suited to your subtype (PDS or EPS) — acid-suppressing medication, or medication that helps regulate stomach motility. If improvement is still limited, we gradually introduce additional options, such as adding a Kampo (traditional Japanese herbal) medicine, or a psychological approach that takes stress and anxiety into account (reviewing lifestyle factors, coordinating with a specialist as needed).",
      tip: "\"It's painful even though testing found nothing wrong\" is exactly the situation FD treatment is meant for. Please don't carry it alone — let's first confirm your safety with an endoscopy, then work out a treatment approach suited to your subtype together.",
    },
  },
  {
    slug: "constipation",
    title: "便秘症",
    category: "internal",
    summary: "排便の回数が少ない、便が硬い等、排便に関する困りごとが続く状態です。原因に応じた薬剤選択が重要です。",
    pathology:
      "排便の回数が少ない「排便回数減少型」と、便は直腸まで来ているのに出しにくい「排便困難型」の大きく2つのタイプがあり、それぞれ原因や適した対処法が異なります。食事量や水分摂取量の不足、運動不足、加齢、糖尿病・甲状腺機能低下症等の病気、お薬の影響、大腸の機能的な問題等が関与することがあります。__まれに大腸の病気（腫瘍や狭窄等）が背景にある場合__もあるため、症状が急に始まった場合や血便・体重減少を伴う場合は注意が必要です。",
    tests:
      "排便の状況や経過、既往歴・内服薬等を詳しくお伺いします。血液検査で貧血や甲状腺機能等を確認し、腹部エコーやX線で腹部の状態を評価することがあります。**危険な兆候（血便、急激な体重減少、50歳以上での新規発症等）**がある場合は、大腸の精密検査が可能な専門医療機関へご紹介することがあります。",
    treatment:
      "水分・食物繊維の摂取、適度な運動、排便習慣の見直し等生活習慣の改善がまず基本となります。__薬物療法は、昔ながらの「センナ」などの刺激性下剤だけに頼るのは避けるべき治療__とされています。刺激性下剤は効果が強い一方、長期間の連用で効きにくくなったり、お腹の不調を招いたりすることがあるため、頓用（必要なときだけ使う）にとどめるのが望ましいとされています。現在は、腸内に水分を引き込んで便を柔らかくする薬（酸化マグネシウムやポリエチレングリコール等）を土台とし、効果が不十分な場合に上皮機能変容薬や胆汁酸トランスポーター阻害薬といった新しいタイプの薬を組み合わせるなど、一人ひとりの病状（タイプ）に応じた治療を行うことが推奨されています。",
    tip: "朝食後は腸が動きやすいタイミングと言われており、朝食をとった後にトイレに行く習慣をつけると排便リズムが整いやすいことがあります。__市販の下剤（特に刺激性のもの）を自己判断で長期間使い続けることは避け__、便秘が続く場合はお薬の見直しも含めてご相談ください。",
    sources: [
      {
        label: "日本消化管学会「便通異常症診療ガイドライン2023－慢性便秘症」",
        url: "https://minds.jcqhc.or.jp/summary/c00812/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Constipation",
      summary: "Ongoing trouble with bowel movements — infrequent stools, hard stools, and similar issues. Choosing the right medication for the underlying cause matters.",
      pathology:
        "There are two broad types: \"reduced-frequency type,\" where bowel movements simply happen less often, and \"evacuation-difficulty type,\" where stool reaches the rectum but is hard to pass — and the cause and the right approach differ for each. Contributing factors can include insufficient food or fluid intake, lack of exercise, aging, conditions like diabetes or hypothyroidism, medication side effects, and functional issues with the colon. __Rarely, a colon condition (such as a tumor or narrowing) underlies it__, so caution is needed if symptoms start suddenly or come with blood in the stool or weight loss.",
      tests:
        "We ask in detail about your bowel habits and their course, your medical history, and any medications you're taking. A blood test checks for anemia and thyroid function, and an abdominal ultrasound or X-ray may evaluate the abdomen. If __warning signs are present (blood in the stool, rapid weight loss, new onset at age 50 or older, etc.)__, we may refer you to a specialized institution capable of detailed colon testing.",
      treatment:
        "Lifestyle improvements — adequate fluids and fiber, moderate exercise, and reviewing your bowel habits — come first. __Medication relying solely on traditional stimulant laxatives like senna is a treatment best avoided__. While stimulant laxatives are effective, prolonged regular use can make them less effective over time and cause abdominal discomfort, so it's preferable to use them only as needed rather than regularly. The current recommended approach is to build on medications that draw water into the bowel to soften stool (such as magnesium oxide or polyethylene glycol), adding newer medication types — such as epithelial function modulators or bile acid transporter inhibitors — if the effect isn't enough, tailoring treatment to each person's specific type.",
      tip: "The period after breakfast is said to be when the bowel is naturally more active, so building a habit of going to the bathroom after breakfast can help establish a regular rhythm. __Please avoid using over-the-counter laxatives (especially stimulant types) long-term on your own judgment__, and if constipation persists, come talk to us — including about reviewing your current medication.",
    },
  },
  {
    slug: "diverticulosis",
    title: "結腸憩室症（大腸憩室症）",
    category: "internal",
    summary: "大腸の壁の一部が袋状に突出した状態で、多くは自覚症状のないありふれた変化です。万一の出血・炎症にも当院が窓口になります。",
    pathology:
      "大腸の壁の一部が外側に袋状に突出した状態（憩室）が複数できることを指します。本邦の成人の憩室保有率は約2割とされ、加齢とともに頻度が増える、比較的ありふれた変化です。多くは自覚症状がなく健康診断などで偶然見つかりますが、__憩室部分から出血する「憩室出血」や、憩室に炎症が及ぶ「憩室炎」を起こすことがあります__。喫煙や飲酒は憩室出血・憩室炎のリスクを高める可能性が指摘されています。",
    tests:
      "憩室症の多くは症状がないため、他の目的の検査（腹部エコーやCT等）で偶然発見されることが多いです。腹痛や発熱など憩室炎を疑う症状がある場合は、血液検査で炎症反応を確認し、CTで炎症の範囲や程度を評価します。下血がある場合は、出血の程度（血圧・脈拍等のバイタルサイン）をまず確認したうえで、原因精査や止血処置のために大腸内視鏡検査が可能な専門医療機関へご紹介します。",
    treatment:
      "症状のない憩室症については、特別な治療を必要とせず経過観察で問題ないことが一般的です。__憩室炎を起こした場合も、膿瘍や穿孔を伴わない軽症であれば、必ずしも抗菌薬を要さず、食事療法や安静のみで外来通院にて改善することが多い__とされています（最新のガイドラインでも、軽症例に一律に抗菌薬を投与しないことが提案されています）。ただし発熱が強い、免疫を抑える治療を受けている等の場合は抗菌薬治療や入院が必要になることもあり、個々の状態に応じて判断します。憩室炎が治った後は、大腸がんなど他の病気が隠れていないかを確認するため、__回復後に大腸内視鏡検査を受けることが推奨されています__。症状が重い場合や繰り返す場合、出血や狭窄・瘻孔を伴う場合には専門医療機関での精査・治療をご相談します。",
    tip: "憩室が見つかっても、それ自体は特別な病気というより年齢とともによく見られる変化の一つです。過度に心配する必要はありませんが、__急な腹痛や発熱、下血などの症状が出た場合は早めにご相談ください__。憩室炎は軽症であれば外来治療で改善することの多い病気ですので、自己判断で様子を見すぎず、まずは当院にご相談いただくことが大切です。",
    sources: [
      {
        label: "日本消化管学会「大腸憩室症（憩室出血・憩室炎）ガイドライン」",
        url: "https://minds.jcqhc.or.jp/summary/c00438/",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Colonic diverticulosis",
      summary: "A condition where part of the colon wall bulges outward into pouches — in most cases a common, symptomless finding. We're also your point of contact should bleeding or inflammation ever occur.",
      pathology:
        "This refers to multiple pouches (diverticula) forming where part of the colon wall bulges outward. In Japan, roughly 20% of adults are thought to have diverticula, a relatively common finding that becomes more frequent with age. Most people have no symptoms, and it's often found incidentally during testing for something else, but __bleeding from a diverticulum (\"diverticular bleeding\") or inflammation reaching a diverticulum (\"diverticulitis\") can sometimes occur__. Smoking and alcohol have been flagged as potentially raising the risk of diverticular bleeding and diverticulitis.",
      tests:
        "Because diverticulosis is usually symptomless, it's often found incidentally during testing done for another purpose (abdominal ultrasound, CT, etc.). If symptoms suggesting diverticulitis are present — abdominal pain, fever — a blood test checks for inflammation, and CT evaluates the extent and severity. If there's blood in the stool, we first check how significant the bleeding is (blood pressure, pulse, and other vital signs), then refer you to a specialized institution capable of colonoscopy to investigate the cause and, if needed, stop the bleeding.",
      treatment:
        "Symptomless diverticulosis generally needs no special treatment — watchful observation is fine. __Even when diverticulitis does occur, mild cases without an abscess or perforation often don't necessarily require antibiotics, and can improve with dietary measures and rest alone, managed as an outpatient__ (the latest guidelines also suggest not routinely giving antibiotics for mild cases). That said, significant fever or being on immunosuppressive treatment can mean antibiotics or hospitalization are needed, and we judge this individually. After diverticulitis has resolved, __colonoscopy is recommended during recovery__ to confirm no other condition, such as colon cancer, is hiding behind it. For severe or recurring cases, or those involving bleeding, narrowing, or a fistula, we discuss evaluation and treatment at a specialized institution.",
      tip: "Even if diverticula are found, this isn't really a special disease on its own — it's one of the common changes that appear with age. There's no need for excessive worry, but __please come talk to us sooner rather than later if sudden abdominal pain, fever, or blood in the stool occurs__. Diverticulitis, when mild, often improves with outpatient treatment, so rather than watching and waiting on your own judgment, it's important to talk to us first.",
    },
  },
  {
    slug: "atheroma",
    title: "粉瘤",
    category: "surgical",
    summary: "皮膚の下に袋状の構造ができ、老廃物が少しずつ溜まっていく良性のできものです。自然に消えることはなく、放置すると大きくなったり感染したりします。",
    pathology:
      "粉瘤（アテローム）は、皮膚の表面の組織が皮膚の下に入り込んで袋状になり、本来なら垢として剥がれ落ちるはずの角質や皮脂が袋の中に少しずつ蓄積していく良性のできものです。背中・首筋・顔・耳たぶなどにできやすく、よく見ると表面中央に小さな黒い点（開口部）があるのが特徴です。**脂肪のかたまりと誤解されがちですが、脂肪組織ではなく皮膚の老廃物の塊**です。放置すると徐々に大きくなるほか、**細菌感染を起こすと急に腫れて赤く痛み、独特のにおいを伴う内容物が出てくる**こともあります。",
    tests: "視診・触診で診断できることがほとんどです。他のできもの（脂肪腫等）との区別が必要な場合や、大きさ・深さの評価が必要な場合には体表超音波を用いることがあります。",
    treatment:
      "感染していない場合は、**日帰り手術での摘出**が根本的な治療になります。傷が目立ちにくいよう、しわの向きに沿った紡錘形の切開で袋ごと摘出する方法のほか、開口部を小さくくり抜いて内容物を出してから袋を引き出す方法（くり抜き法）もあり、部位や大きさに応じて相談しながら決めていきます。すでに感染して赤く腫れている場合は、まず抗菌薬等で炎症を落ち着かせたり、切開して膿を出す処置を行ったりしたうえで、改善後に時期をあらためて摘出することが一般的です。",
    tip: "**自然に治ることはなく、中身を自分で押し出そうとすると周囲に感染が広がり悪化することがある**ため、気になる場合は絶対につぶさないでください。__感染する前、まだ小さいうちに摘出するほうが傷跡も小さく、治療期間も短く済みます__。「様子を見ているうちに大きくなった・赤く腫れてきた」という場合こそ、早めのご相談をお勧めします。",
    sources: [
      {
        label: "日本形成外科学会「粉瘤（アテローム・表皮嚢腫）」",
        url: "https://jsprs.or.jp/general/disease/shuyo/hifu_hika/funryu.html",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Epidermoid cyst (atheroma)",
      summary: "A benign lump under the skin, formed as a sac that slowly fills with waste material. It never goes away on its own, and left alone it can grow larger or become infected.",
      pathology:
        "An epidermoid cyst (atheroma) is a benign growth that forms when surface skin tissue gets pushed under the skin and forms a sac, inside which keratin and sebum — material that would normally shed off as dead skin — gradually builds up. It tends to form on the back, neck, face, and earlobes, and a characteristic feature is a small black dot (an opening) visible at the center of the surface. **It's often mistaken for a lump of fat, but it's actually a mass of skin waste material, not fatty tissue.** Left alone, it gradually grows larger, and __if it becomes infected with bacteria, it can suddenly become swollen, red, and painful, and discharge contents with a distinctive odor__.",
      tests: "Diagnosis is usually possible through visual inspection and palpation. Surface ultrasound may be used if distinguishing it from another type of growth (such as a lipoma) is needed, or to assess its size and depth.",
      treatment:
        "If not infected, **same-day surgical removal** is the definitive treatment. Options include removing the whole sac through a spindle-shaped incision made along the natural skin creases to minimize scarring, or a \"punch excision\" technique where a small hole is made at the opening to remove the contents before extracting the sac — the approach is chosen together with you based on location and size. If it's already infected, red, and swollen, the usual approach is to first calm the inflammation with antibiotics or a procedure to drain the pus, then remove it at a later date once things have settled.",
      tip: "**It never resolves on its own, and trying to squeeze the contents out yourself can spread the infection to surrounding tissue and make things worse**, so please never try to pop it yourself if it concerns you. __Removing it while it's still small, before it becomes infected, means a smaller scar and a shorter treatment period.__ If you've been watching it and it has grown larger or become red and swollen, that's exactly the moment to come talk to us sooner rather than later.",
    },
  },
  {
    slug: "lipoma",
    title: "脂肪腫",
    category: "surgical",
    summary: "皮下にできる軟部腫瘍の中で最も頻度の高い良性のしこりです。柔らかく痛みのないことが多いですが、見た目だけで他の病気と区別がつかないこともあります。",
    pathology:
      "脂肪腫は、皮下にできる軟部組織の腫瘍の中で**最も頻度の高い良性のできもの**です。成熟した脂肪細胞が薄い被膜に包まれてできる柔らかいしこりで、多くはゆっくりと大きくなり、痛みを伴わないことがほとんどです。背中・肩・首まわりなど体幹に近い部位にできやすく、40〜50歳代や女性、肥満のある方にやや多いとされています。皮膚がドーム状に盛り上がり、押すと柔らかく動く塊として触れるのが特徴です。",
    tests:
      "視診・触診に加えて、**体表超音波（エコー）検査で深さや広がりを評価**します。必要に応じてCT・MRIで性状を確認することもあります。__まれに、画像だけでは悪性の脂肪肉腫との区別が難しいケースがある__ため、急速に大きくなる・硬さがある・サイズが大きい等の所見がある場合は、摘出して組織を調べることをお勧めすることがあります。",
    treatment:
      "根本的な治療は**手術による摘出**です。腫瘍の大きさに合わせて皮膚を切開し、周囲の組織や被膜を傷つけないよう丁寧に剥がして摘出します。摘出後は出血が溜まらないよう十分に止血し、大きさに応じてドレーン（排液管）を一時的に留置して圧迫固定することもあります。症状がなく小さいものは経過観察でも問題ありませんが、ご希望やサイズ・部位に応じて日帰り手術での摘出を相談しながら決めていきます。",
    tip: "摘出後の再発はまれとされており、きちんと取りきれば根本的な解決になります。__急に大きくなった・硬くなった・動きにくくなった__等の変化がある場合は、念のため一度ご相談ください。",
    sources: [
      {
        label: "日本形成外科学会「脂肪腫」",
        url: "https://jsprs.or.jp/general/disease/shuyo/hifu_hika/shiboshu.html",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Lipoma",
      summary: "The most common type of benign soft-tissue lump found under the skin. Usually soft and painless, though appearance alone isn't always enough to distinguish it from other conditions.",
      pathology:
        "A lipoma is the **most common type of benign growth** found among soft-tissue tumors under the skin. It's a soft lump formed from mature fat cells wrapped in a thin capsule, usually growing slowly and, in most cases, painless. It tends to form on the trunk — the back, shoulders, around the neck — and is somewhat more common in people in their 40s and 50s, in women, and in those who are overweight. A characteristic feature is a dome-shaped bulge in the skin that feels soft and moves when pressed.",
      tests:
        "Beyond visual inspection and palpation, we **evaluate its depth and extent with surface ultrasound**. CT or MRI may be used to confirm its characteristics as needed. __In rare cases, imaging alone can't reliably distinguish it from a malignant liposarcoma__, so if it's growing rapidly, feels firm, or is large, we may recommend removing it to examine the tissue.",
      treatment:
        "The definitive treatment is **surgical removal**. We make an incision sized to the lump and carefully separate it, along with its surrounding tissue and capsule, without damaging anything nearby. After removal, we achieve thorough hemostasis to prevent blood from pooling, and may temporarily place a drain and apply compression, depending on the size. A small, symptomless lipoma can also simply be monitored, but we discuss and decide together on same-day surgical removal based on your preference, size, and location.",
      tip: "Recurrence after removal is considered rare, and complete removal resolves the issue for good. If you notice it __suddenly growing larger, becoming firmer, or becoming less mobile__, please come talk to it over with us just to be safe.",
    },
  },
  {
    slug: "ingrown-nail",
    title: "巻き爪・陥入爪",
    category: "surgical",
    summary: "爪が周囲の皮膚に食い込み、痛み・炎症・化膿を起こすことがある状態です。多くは保存的治療から始めます。",
    pathology:
      "爪が周囲の皮膚に食い込み、痛み・炎症・化膿を起こすことがある状態。深爪や合わない靴、爪の変形等が誘因となります。__不適切な爪の切り方（特に角を丸く切りすぎること）は症状を悪化させる__ことが知られており、爪は指の先端より少し長めに、角を残して四角く切る（スクエアオフ）ことが勧められます。",
    tests: "視診。炎症・化膿の程度や爪の形状を確認します。",
    treatment:
      "軽度から中等度の場合、__テーピングや爪の形を整える矯正処置等の保存的治療がまず有効__とされています。いきなりの外科的治療は推奨されておらず、保存的治療で改善が乏しい場合や炎症を繰り返す場合に、フェノール法（炎症の原因となる爪の端の一部を薬剤で処理する方法）などの手術的処置を検討します。フェノール法は術後の痛みが少ない処置として位置づけられています。",
    tip: "深爪や合わない靴が誘因となることが多く、__日常の爪の切り方・靴選びの見直し__も予防に役立ちます。自己判断で爪の端を無理に切り込んだり放置したりすると悪化することがあるため、痛みが続く場合は早めにご相談ください。",
    sources: [
      {
        label: "日本創傷外科学会「創傷関連ガイドライン　第Ⅱ編 感染創診療ガイドライン（陥入爪・巻き爪）」",
        url: "https://www.jsswc.or.jp/guideline.html",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Ingrown toenails / curled nails",
      summary: "A condition where the nail digs into the surrounding skin, sometimes causing pain, inflammation, and infection. Treatment usually starts with conservative measures.",
      pathology:
        "This is a condition where the nail digs into the surrounding skin, sometimes causing pain, inflammation, and infection. It's often triggered by cutting nails too short, ill-fitting shoes, or a deformed nail shape. __Improper nail-cutting technique — especially rounding the corners too much — is known to make symptoms worse__, so it's recommended to cut the nail slightly longer than the end of the toe, leaving the corners square (\"square-off\" cutting).",
      tests: "Visual inspection, checking the degree of inflammation or infection and the shape of the nail.",
      treatment:
        "For mild to moderate cases, __conservative treatment — taping or procedures to reshape the nail — is usually effective as a first step__. Jumping straight to surgery isn't recommended; surgical procedures, such as the phenol method (chemically treating part of the nail edge that's causing inflammation), are considered when conservative treatment doesn't bring enough improvement or inflammation keeps recurring. The phenol method is recognized as a procedure with relatively little post-procedure pain.",
      tip: "Nails cut too short and ill-fitting shoes are common triggers, so __reviewing your everyday nail-cutting habits and shoe choice__ also helps with prevention. Forcefully cutting into the nail corner yourself, or leaving it alone, can make things worse, so please come talk to us sooner rather than later if pain persists.",
    },
  },
  {
    slug: "wound-care",
    title: "すり傷・切り傷・刺し傷などのケガ（創傷）",
    category: "surgical",
    summary: "日常生活で生じる切り傷・擦り傷・刺し傷・動物に咬まれた傷等の診療です。正しい初期対応が治りを左右します。",
    pathology:
      "包丁や転倒等による切り傷・擦り傷、釘やガラス等による刺し傷、動物に咬まれた傷など、日常でよく起こるケガ（創傷）です。傷の深さ・汚染の程度・異物の有無によって適切な処置が異なり、__自己判断での消毒や様子見だけでは感染や治りの遅れにつながる__ことがあります。特に刺し傷は見た目以上に深部まで達していたり異物が残っていたりすることがあり、注意が必要です。",
    tests:
      "傷の深さ・汚染・異物の有無を診察で確認します。異物の残存や深部組織の損傷が疑われる場合は、画像検査（X線・超音波等）での評価を検討します。__感染予防には水道水でしっかり洗浄することが有効__とされており、必ずしも消毒薬が必要というわけではありません。",
    treatment:
      "多くの単純な切り傷・擦り傷では、十分な洗浄を行ったうえで、創の状態に応じて創傷被覆材（傷を乾かさず治す保護材）や外用薬を使い分けます。__基礎疾患がなく深い損傷を伴わない単純な傷では、感染予防目的の抗菌薬投与が必ずしも必要とは限らない__とされていますが、受傷から時間が経った傷や汚染の強い傷（挫滅創等）では、十分な洗浄・処置のうえで縫合等の判断を行います。年齢・ワクチン接種歴・傷の状態によっては__破傷風予防__を検討します。動物に咬まれた傷は感染のリスクが高く、咬んだ動物の種類や状況によって対応（予防的な抗菌薬、狂犬病対策の要否等）が異なるため、慎重な評価が必要です。",
    tip: "小さな傷でも、__刺し傷・動物咬傷・汚れの強い傷・受傷から時間が経った傷__は自己判断でのケアだけでは不十分なことがあります。ばんそうこうを貼って様子を見る前に、一度傷の状態を診せていただくことで、適切な洗浄・処置や感染予防ができ、きれいな治りにつながります。",
    sources: [
      {
        label: "日本創傷外科学会「創傷関連ガイドライン　第Ⅰ編 急性創傷診療ガイドライン」",
        url: "https://www.jsswc.or.jp/guideline.html",
      },
    ],
    lastReviewed: "2026-10-10",
    en: {
      title: "Cuts, scrapes, punctures & other wounds",
      summary: "Care for everyday injuries — cuts, scrapes, punctures, and animal bites. The right first response makes a real difference in how well a wound heals.",
      pathology:
        "These are the everyday injuries that come from a kitchen knife or a fall (cuts and scrapes), from a nail or broken glass (punctures), or from an animal bite. The right treatment depends on the wound's depth, how contaminated it is, and whether any foreign material is present, and __relying on self-disinfection or simply watching and waiting can lead to infection or slower healing__. Puncture wounds in particular deserve caution, since they can reach deeper than they appear and sometimes leave foreign material behind.",
      tests:
        "We check the wound's depth, contamination, and any foreign material on examination. If foreign material or deeper tissue damage is suspected, we consider imaging (X-ray, ultrasound, etc.) for evaluation. __Thorough washing with tap water is effective for preventing infection__, and a disinfectant isn't always necessary.",
      treatment:
        "For most simple cuts and scrapes, after thorough washing, we choose between a wound dressing (which protects the wound while keeping it from drying out) or a topical medication, based on the wound's condition. __For a simple wound with no underlying condition and no deep damage, antibiotics given specifically to prevent infection aren't always necessary__, but for a wound that's had time pass since the injury or one that's heavily contaminated (a crush wound, etc.), we decide on suturing and similar steps after thorough washing and treatment. __Tetanus prevention__ is considered depending on age, vaccination history, and the wound's condition. Animal bites carry a higher infection risk, and the approach (preventive antibiotics, whether rabies precautions are needed, etc.) differs depending on the type of animal and the circumstances, so careful evaluation is needed.",
      tip: "Even a small wound — __a puncture, an animal bite, a heavily soiled wound, or one where time has passed since the injury__ — can sometimes need more than self-care alone. Rather than putting on a bandage and watching it, having us look at the wound first allows for proper cleaning, treatment, and infection prevention, leading to cleaner healing.",
    },
  },
  {
    slug: "burns",
    title: "熱傷（やけど）",
    category: "surgical",
    summary: "皮膚が熱によって損傷を受けた状態です。深さ・範囲によって治療方針が大きく異なり、重症度の見極めが大切です。",
    pathology:
      "熱傷（やけど）は、熱によって皮膚やその奥の組織が損傷を受けた状態です。損傷の深さにより、__表皮にとどまる「I度」、水疱（水ぶくれ）ができる「浅達性II度」「深達性II度」、皮膚が全層にわたって損傷する「III度」__に分類され、深さによって治りやすさ・痕の残りやすさが大きく異なります。重症度は__深さに加えて、熱傷の範囲（体表面積に占める割合）__によって判断され、顔面・手・関節部・会陰部等、__機能的・美容的に重要な部位の熱傷は、範囲が狭くても慎重な評価__が必要です。",
    tests:
      "視診による深さ・範囲の評価が基本です。__受傷直後は深さの判定が難しいことも多く、数日かけて評価を見直す__ことがあります。範囲が広い場合や全身状態への影響が懸念される場合は、血液検査等で全身状態を評価することもあります。",
    treatment:
      "**軽症〜中等症の熱傷（I度、範囲の限られたII度等）**に対しては、__当院の外科専門医（消化器外科専門医）が、創傷被覆材や外用薬を用いた処置__を行います。受傷直後は__流水での冷却（目安15〜30分程度）__が症状の悪化を抑えるために重要とされており、水疱（水ぶくれ）は__感染予防の観点から基本的には破らずに保護する__ことが勧められています。一方で、__熱傷面積が体表面積の一定割合を超える広範囲熱傷、顔面・気道熱傷が疑われるもの、深達性II度を超える深い熱傷、電撃傷・化学熱傷、小児や高齢の方の重症例__等は、__熱傷専門施設での全身管理が必要__と判断し、速やかに連携医療機関へご紹介します。",
    tip: "__「このくらいなら家で様子を見よう」と自己判断して受診が遅れると、深さの見極めが遅れ、治りが悪くなることがあります__。範囲が広い、水ぶくれが大きい、痛みが強い等、気になる場合はまずは一度ご来院ください。__当院で対応できる範囲かどうかも含めて__、診察のうえご説明します。",
    sources: [
      {
        label: "創傷・褥瘡・熱傷ガイドライン策定委員会「創傷・褥瘡・熱傷ガイドライン（2023）－6 熱傷診療ガイドライン（第3版）」",
        url: "https://minds.jcqhc.or.jp/summary/c00849/",
      },
    ],
    lastReviewed: "2026-10-13",
    en: {
      title: "Burns",
      summary: "Skin damage caused by heat. Treatment varies greatly depending on depth and extent, so correctly assessing severity matters.",
      pathology:
        "A burn is skin and underlying tissue damaged by heat. Based on depth, burns are classified as __\"first-degree,\" limited to the surface layer; \"superficial second-degree\" and \"deep second-degree,\" where blisters form; and \"third-degree,\" where the skin is damaged through its full thickness__ — and how easily it heals and how likely it is to scar differ greatly by depth. Severity is judged by __depth combined with the extent of the burn (the percentage of body surface area affected)__, and burns to functionally or cosmetically important areas — the face, hands, joints, groin, and similar areas — __need careful evaluation even if the area is small__.",
      tests:
        "Visual assessment of depth and extent is the basic approach. __Depth is often hard to judge right after the injury, and the assessment may need to be revised over the following days.__ If the area is extensive, or there's concern about the effect on your overall condition, we may evaluate with a blood test and similar means.",
      treatment:
        "For **mild to moderate burns (first-degree, limited-area second-degree, etc.)**, __our surgical specialist (a board-certified gastrointestinal surgeon) provides treatment using wound dressings and topical medication__. Right after the injury, __cooling under running water (roughly 15–30 minutes as a guide)__ is considered important for limiting how bad things get, and blisters are generally recommended to be __protected rather than popped, to prevent infection__. On the other hand, for __extensive burns covering a significant percentage of body surface area, suspected facial or airway burns, burns deeper than deep second-degree, electrical or chemical burns, and severe cases in children or older adults__, we judge that __whole-body management at a specialized burn facility is needed__ and promptly refer you to a partner institution.",
      tip: "__Deciding on your own that \"this is mild enough to watch at home\" and delaying a visit can delay an accurate assessment of depth and lead to slower healing.__ If the area is large, the blister is big, or the pain is significant, please come in first. We'll explain during the visit, including __whether it's something we can treat here__.",
    },
  },
  {
    slug: "hemorrhoids",
    title: "痔核（いぼ痔）・裂肛等の痔疾患",
    category: "surgical",
    summary: "肛門疾患の中で最も頻度の高い痔核（いぼ痔）と裂肛（切れ痔）。多くは生活習慣の見直しと外来での処置で改善が期待できる、治療法が確立した病気です。",
    pathology:
      "痔核（いぼ痔）は、肛門内にあるクッション状の組織がうっ血し、腫れたり脱出したりする状態で、肛門疾患の中で**最も頻度が高い**とされています。排便時のいきみ、便秘や下痢の繰り返し、長時間座りっぱなしの生活等が誘因となり、脱出の程度は軽いもの（排便時にふくらむだけ）から常に脱出した状態まで段階的に進行することが知られており、__この段階（グレード）に応じて適切な治療法が変わります__。裂肛（切れ痔）は肛門の皮膚に生じる裂け目で、便秘による硬い便の通過や繰り返す下痢が主な誘因です。慢性化すると**肛門の緊張（締め付け）が強くなって血流が悪化し、かえって治りにくくなる悪循環**が生じることが分かっています。",
    tests:
      "視診・触診に加え、必要に応じて肛門鏡で直接観察し、痔核の脱出の程度等を評価します。__鮮血の出血があっても「いつもの痔」とは限らず、大腸の病気が隠れていることがある__ため、出血を繰り返す場合や便の性状に変化がある場合は、下部消化管の内視鏡検査を検討します。",
    treatment:
      "痔核は脱出の程度に応じた段階的な治療が基本です。軽度〜中等度では、食物繊維・水分摂取や排便習慣の見直しといった生活指導、外用薬がまず行われ、十分な効果が得られない脱出を伴う内痔核には、**注射による硬化療法（ALTA療法）**が低侵襲な選択肢として、繰り返す出血・脱出を伴う重症例には**結紮切除術**が根治性の高い治療として選択されます。裂肛も多くは、食物繊維摂取・排便時のいきみを避ける・座浴等の生活指導と外用薬による**保存的治療でまず改善を図る**ことが推奨されており、いきなりの手術が勧められることは少なく、慢性化し肛門の緊張が強い場合に専門的な処置を検討します。",
    tip: "痔核・裂肛は__自己判断で市販薬のみに頼り続けると悪化・慢性化を招く__ことがあります。特に出血を「いつもの痔だから」と見過ごしてしまうと、重大な病気の発見が遅れることもあるため、繰り返す症状がある場合は早めのご相談をお勧めします。",
    sources: [
      {
        label: "日本大腸肛門病学会「肛門疾患（痔核・痔瘻・裂肛）・直腸脱診療ガイドライン2020年版」",
        url: "https://minds.jcqhc.or.jp/summary/c00557/",
      },
    ],
    lastReviewed: "2026-10-09",
    en: {
      title: "Hemorrhoids & anal fissures",
      summary: "Hemorrhoids and anal fissures are the most common anal conditions. Most can be expected to improve with lifestyle changes and outpatient procedures — well-established, effective treatments.",
      pathology:
        "A hemorrhoid is a condition where the cushion-like tissue inside the anus becomes congested with blood, causing swelling or prolapse, and it's **the most common** of all anal conditions. It's triggered by straining during bowel movements, recurring constipation or diarrhea, and prolonged sitting, and the degree of prolapse is known to progress in stages — from mild (bulging only during a bowel movement) to permanently prolapsed — with __the right treatment depending on this stage (grade)__. An anal fissure is a tear in the skin of the anus, mainly triggered by passing hard stool from constipation or by recurring diarrhea. Once it becomes chronic, it's known to create **a vicious cycle where the anal sphincter tightens, blood flow worsens, and healing becomes even harder**.",
      tests:
        "Beyond visual inspection and palpation, we use an anoscope to directly observe the area as needed, assessing the degree of hemorrhoid prolapse and similar findings. __Bright red bleeding isn't necessarily \"just the usual hemorrhoids\" — a colon condition can sometimes be the real cause__, so if bleeding recurs or your stool changes in character, we consider a lower gastrointestinal endoscopy.",
      treatment:
        "Treatment for hemorrhoids is staged according to the degree of prolapse. For mild to moderate cases, lifestyle guidance — fiber and fluid intake, reviewing bowel habits — and topical medication come first; for internal hemorrhoids with prolapse that don't respond well enough to these, **sclerotherapy by injection (ALTA therapy)** is a minimally invasive option, and for severe cases with recurring bleeding and prolapse, **ligation and excision** is chosen as a treatment with high cure rates. For anal fissures too, **conservative treatment is generally tried first** — fiber intake, avoiding straining during bowel movements, sitz baths, and topical medication — and jumping straight to surgery is uncommon; specialized procedures are considered when it becomes chronic and the sphincter is significantly tight.",
      tip: "__Relying solely on over-the-counter medication on your own judgment can let hemorrhoids or anal fissures worsen and become chronic.__ In particular, dismissing bleeding as \"just my usual hemorrhoids\" can delay finding a more serious condition, so if symptoms keep recurring, we'd recommend coming in sooner rather than later.",
    },
  },
  {
    slug: "bronchitis",
    title: "気管支炎",
    category: "internal",
    summary: "気管支の粘膜に炎症が起こり、咳や痰が続く病気です。多くはかぜの後に起こり、ウイルスが原因です。",
    pathology:
      "気管の奥にある気管支の粘膜に炎症が起こった状態です。多くは__かぜ（上気道感染症）に続いて起こり、原因の大部分はウイルス__です。発熱・のどの痛みといった症状が落ち着いたあとも、**咳や痰だけが1〜3週間ほど長引く**のが特徴で、気管支の粘膜が過敏になっているために、ちょっとした刺激（冷たい空気・煙等）でも咳が誘発されやすくなります。喫煙や大気汚染への曝露を繰り返すことで炎症が慢性化する「慢性気管支炎」は、急性気管支炎とは別の病態です。",
    tests:
      "多くは__問診・診察で診断__がつき、特別な検査を必要としません。発熱が長引く、息苦しさを伴う、痰に血が混じる等、肺炎を疑う所見がある場合は、デジタルX線（レントゲン）や血液検査で評価します。",
    treatment:
      "**ウイルスが原因のため抗菌薬（抗生物質）は基本的に使用しません**。安静・水分摂取を基本に、咳がつらい場合は去痰薬・鎮咳薬等で症状を和らげます。喘鳴（ゼーゼー）を伴う場合は、気管支を広げる吸入薬を用いることもあります。",
    tip: "__「かぜは治ったのに咳だけ残る」状態は、気管支炎ではよくあることです__。多くは自然に軽快しますが、3週間以上続く咳、発熱を繰り返す咳、体重減少を伴う咳の場合は、他の病気が隠れていないか評価が必要なため、一度ご相談ください。",
    sources: [],
    lastReviewed: "2026-10-24",
    en: {
      title: "Bronchitis",
      summary: "Inflammation of the bronchial tubes that causes an ongoing cough and phlegm. It usually follows a cold and is caused by a virus.",
      pathology:
        "This is inflammation of the lining of the bronchial tubes, the airways deep in the chest. It __usually follows a cold (an upper respiratory infection), and the large majority of cases are viral__. Even after symptoms like fever and sore throat have settled down, **the cough and phlegm alone often linger for one to three weeks** — a hallmark feature. Because the bronchial lining becomes more sensitive during this time, even minor triggers (cold air, smoke) can set off coughing fits. \"Chronic bronchitis,\" where repeated exposure to smoking or air pollution leads to long-term inflammation, is a separate condition from acute bronchitis.",
      tests:
        "In most cases, __diagnosis is made from your history and a physical exam__, without the need for special testing. If you have a prolonged fever, difficulty breathing, or blood-streaked phlegm — findings that raise concern for pneumonia — we evaluate with a digital X-ray and blood tests.",
      treatment:
        "**Because the cause is viral, antibiotics generally aren't used.** The basics are rest and staying hydrated; if the cough is bothersome, expectorants or cough suppressants can ease the symptoms. If wheezing is present, an inhaled bronchodilator may also be used.",
      tip: "__\"The cold is gone but the cough is still here\" is a very common pattern with bronchitis.__ Most cases resolve on their own, but a cough lasting more than three weeks, one that comes with recurring fever, or one accompanied by weight loss warrants an evaluation to rule out other conditions — please come talk to us if that's the case.",
    },
  },
  {
    slug: "gastritis",
    title: "胃炎",
    category: "internal",
    summary: "胃の粘膜に炎症が起こり、みぞおちの痛みや胃もたれなどの症状が出る状態です。原因により急性と慢性に分かれます。",
    pathology:
      "胃の内側を覆う粘膜に炎症が起こった状態です。__数日以内に症状が現れる「急性胃炎」__と、__長期間にわたって炎症が続く「慢性胃炎」__に大きく分けられます。急性胃炎は、暴飲暴食・香辛料の強い食事・痛み止め（NSAIDs）の使用・強いストレス・アルコールの多飲等がきっかけで起こることが多く、慢性胃炎の多くは**ピロリ菌（ヘリコバクター・ピロリ）の感染**が背景にあるとされています。",
    tests:
      "問診・診察に加え、__ピロリ菌感染の有無を調べる検査（尿素呼気試験・血液検査・便検査等）__を行うことがあります。症状が長引く場合や、体重減少・貧血・嘔吐・黒色便等の**注意すべき症状を伴う場合**は、胃の粘膜を直接観察する経鼻内視鏡（胃カメラ）での評価を検討します。",
    treatment:
      "原因に応じて、__胃酸の分泌を抑える薬（プロトンポンプ阻害薬等）__による対症療法を行います。原因となっている痛み止めやアルコール等があれば、中止・減量を検討します。ピロリ菌感染が確認された場合は、**除菌治療（抗菌薬を含む内服を1〜2週間程度）**を行うことで、慢性胃炎の改善や将来の胃潰瘍・胃がんのリスク低減が期待できます。",
    tip: "__みぞおちの痛みや胃もたれを「ただの胃炎」と自己判断し、市販薬だけで様子を見続けるのは注意が必要です。__ 特に体重減少・貧血・繰り返す嘔吐・黒色便を伴う場合は、他の病気が隠れていないか確認するため、早めにご相談ください。",
    sources: [],
    lastReviewed: "2026-10-24",
    en: {
      title: "Gastritis",
      summary: "Inflammation of the stomach lining that causes symptoms such as upper abdominal pain or a feeling of fullness after eating. It's broadly divided into acute and chronic forms, depending on the cause.",
      pathology:
        "This is inflammation of the lining of the stomach. It's broadly divided into __\"acute gastritis,\" where symptoms appear within a few days__, and __\"chronic gastritis,\" where inflammation persists over a long period__. Acute gastritis is often triggered by overeating or binge drinking, spicy food, use of pain relievers (NSAIDs), intense stress, or heavy alcohol use, while most chronic gastritis is thought to be caused by **infection with H. pylori (Helicobacter pylori)**.",
      tests:
        "Beyond a history and physical exam, we may run __tests to check for H. pylori infection (a urea breath test, blood test, or stool test)__. If symptoms persist, or if you have **concerning symptoms such as weight loss, anemia, vomiting, or black, tarry stools**, we consider evaluating the stomach lining directly with a transnasal endoscopy (gastroscopy).",
      treatment:
        "Depending on the cause, we treat symptomatically with __medications that suppress stomach acid (such as proton pump inhibitors)__. If a pain reliever or alcohol use is the trigger, we consider stopping or cutting back. If H. pylori infection is confirmed, **eradication therapy (a course of antibiotics and acid-suppressing medication over about 1–2 weeks)** can improve chronic gastritis and reduce the future risk of stomach ulcers and stomach cancer.",
      tip: "__Assuming upper abdominal pain or a feeling of fullness is \"just gastritis\" and relying only on over-the-counter medication deserves some caution.__ In particular, if it comes with weight loss, anemia, repeated vomiting, or black, tarry stools, please come in sooner rather than later so we can check that nothing more serious is going on.",
    },
  },
  {
    slug: "gastroenteritis",
    title: "胃腸炎（感染性腸炎）",
    category: "internal",
    summary: "胃や腸に炎症が起こり、嘔吐・下痢・腹痛等が現れる状態の総称です。多くはウイルスや細菌の感染が原因です。",
    pathology:
      "胃や腸の粘膜に炎症が起こり、__嘔吐・下痢・腹痛・発熱等__の症状が現れる状態をまとめて指す言葉です。原因の多くは感染性で、**ノロウイルス・ロタウイルス等のウイルス性**と、**サルモネラ・カンピロバクター・腸管出血性大腸菌（O157等）等の細菌性**に大きく分けられます。このうち、ウイルス性の胃腸炎については当院の「感染性胃腸炎（ノロウイルス・ロタウイルス）」のページ、食事が原因となる細菌性のものについては「細菌性食中毒」のページで、それぞれより詳しく解説しています。",
    tests:
      "多くは__症状の経過や周囲の流行状況から診断__し、特別な検査なしで対症療法を開始します。症状が重い場合、血便を伴う場合、集団発生が疑われる場合等には、便培養検査等で原因を調べることがあります。",
    treatment:
      "治療の基本は__水分・電解質の補給__で、特に乳幼児・高齢者は脱水に注意が必要です。嘔吐が強い場合は少量ずつこまめに水分を摂っていただき、必要に応じて点滴による補液を行います。**細菌性が疑われ症状が重い場合を除き、抗菌薬は基本的に使用しません。**下痢止めは、原因菌によってはかえって症状を長引かせることがあるため、自己判断での使用は推奨していません。",
    tip: "__嘔吐・下痢が続くと、気づかないうちに脱水が進んでいることがあります。__ 尿の回数が減っている、ぐったりしている、水分を受け付けない等の様子があれば、様子を見ずに早めにご相談ください。血便を伴う場合も、同様に早めの受診をおすすめします。",
    sources: [],
    lastReviewed: "2026-10-24",
    en: {
      title: "Gastroenteritis (infectious enteritis)",
      summary: "An umbrella term for inflammation of the stomach and intestines causing vomiting, diarrhea, and abdominal pain. Most cases are caused by a viral or bacterial infection.",
      pathology:
        "This is an umbrella term for inflammation of the lining of the stomach and intestines that produces __vomiting, diarrhea, abdominal pain, and fever__. Most cases are infectious, broadly split into **viral causes (such as norovirus and rotavirus)** and **bacterial causes (such as Salmonella, Campylobacter, and enterohemorrhagic E. coli like O157)**. For viral gastroenteritis specifically, see our \"Viral gastroenteritis (norovirus, rotavirus)\" page, and for bacterial cases linked to food, see our \"Bacterial food poisoning\" page — both go into more detail.",
      tests:
        "In most cases, __diagnosis is based on how your symptoms are progressing and what's going around in the community__, and symptomatic treatment starts without special testing. If symptoms are severe, there's blood in the stool, or an outbreak is suspected, a stool culture or similar test may be used to identify the cause.",
      treatment:
        "The foundation of treatment is __replacing fluids and electrolytes__ — infants and older adults in particular need close attention to avoid dehydration. If vomiting is severe, small, frequent sips of fluid are recommended, with IV fluids added if needed. **Antibiotics generally aren't used unless a bacterial cause is suspected and symptoms are severe.** We don't recommend using anti-diarrheal medication on your own judgment, since depending on the organism involved it can actually prolong the illness.",
      tip: "__Ongoing vomiting and diarrhea can lead to dehydration before you realize it.__ If you notice reduced urination, listlessness, or an inability to keep fluids down, please don't wait and see — come in sooner rather than later. The same goes for blood in the stool.",
    },
  },
  {
    slug: "bowel-obstruction",
    title: "腸閉塞（イレウス）",
    category: "surgical",
    summary: "腸の内容物の流れが止まってしまう状態です。「腸閉塞」と「イレウス」は日本の臨床現場では同じ意味で使われがちですが、本来は原因が異なる2つのタイプがあります。",
    pathology:
      "腸の中身（消化物やガス）の流れが、何らかの原因で止まってしまった状態です。日本では「腸閉塞」と「イレウス」という言葉が__同じ意味で使われることが多い__のですが、本来は原因によって2つのタイプに分かれます。**①機械的な閉塞（狭い意味での腸閉塞、英語ではbowel obstruction）**は、お腹の手術後の癒着・腫瘍・ヘルニアの嵌頓（かんとん）・腸重積等、__腸そのものが物理的にふさがれたり折れ曲がったりする__ことで起こります。**②機能的な閉塞（麻痺性イレウス、英語ではileus）**は、物理的な閉塞はないものの、__腹膜炎や開腹手術後等で腸の動き（蠕動運動）が弱まり、内容物が先に進めなくなる__ことで起こります。特に①のうち、腸への血流が障害されるタイプ（絞扼性腸閉塞）は、**腸が壊死してしまう危険があるため緊急の対応が必要**です。",
    tests:
      "問診・診察（お腹の張り・腸の音の聴診等）に加え、__腹部X線・CT検査__で、腸の拡張やガス・液体のたまり方、閉塞の原因・部位を評価します。血流障害を伴う絞扼性腸閉塞が疑われる場合は、特に迅速な評価と対応が必要です。",
    treatment:
      "多くは、__飲食を中断し、鼻からチューブを入れて腸の中のガス・液体を抜く処置（減圧）__と点滴による水分・電解質補給を行う保存的治療から開始します。機能的な閉塞（麻痺性イレウス）は、多くの場合この保存的治療で改善します。機械的な閉塞のうち、**血流障害を伴う絞扼性腸閉塞や、保存的治療で改善しない場合には、緊急手術が必要**となることがあり、専門的な治療が可能な医療機関と連携します。",
    tip: "__お腹の張り・激しい腹痛・繰り返す嘔吐に加えて、ガスやおならが全く出ない状態__が続く場合は、腸閉塞を疑う重要なサインです。様子を見ずに、早めの受診・ご相談をおすすめします。過去にお腹の手術を受けたことがある方は、癒着による腸閉塞のリスクがあることも知っておいていただきたい点です。",
    sources: [],
    lastReviewed: "2026-10-24",
    en: {
      title: "Bowel obstruction (ileus)",
      summary: "A condition where the contents of the intestine stop moving through. In everyday Japanese clinical use, \"bowel obstruction\" and \"ileus\" are often used interchangeably, but they're technically two distinct types with different causes.",
      pathology:
        "This is a state where the contents of the intestine (digested material and gas) stop moving along, for one of several reasons. In Japan, the terms for \"bowel obstruction\" and \"ileus\" are __often used interchangeably in everyday clinical conversation__, but they technically refer to two distinct types based on cause. **① Mechanical obstruction (bowel obstruction in the strict sense)** happens when __the intestine itself is physically blocked or kinked__ — from adhesions after abdominal surgery, a tumor, a strangulated hernia, intussusception, and similar causes. **② Functional obstruction (paralytic ileus)** happens when there's no physical blockage, but __the intestine's muscular movement (peristalsis) weakens__ — for example after peritonitis or abdominal surgery — so contents simply stop advancing. Within type ①, the subtype where blood flow to the intestine is compromised (strangulated obstruction) carries a **risk of the bowel tissue dying, and needs urgent treatment.**",
      tests:
        "Beyond a history and physical exam (checking for abdominal distension, listening for bowel sounds), we evaluate with __abdominal X-ray and CT scans__ to assess how distended the bowel is, how gas and fluid have accumulated, and the cause and location of the obstruction. If a strangulated obstruction with compromised blood flow is suspected, especially rapid evaluation and treatment are needed.",
      treatment:
        "Most cases start with conservative treatment: __stopping all food and drink, and placing a tube through the nose to decompress the bowel by draining gas and fluid__, along with IV fluids and electrolytes. Functional obstruction (paralytic ileus) usually improves with this conservative approach alone. Among mechanical obstructions, **a strangulated obstruction with compromised blood flow, or one that doesn't improve with conservative treatment, may require emergency surgery**, and we coordinate with an institution capable of that specialized care.",
      tip: "__Abdominal distension, severe abdominal pain, and repeated vomiting, combined with a complete inability to pass gas or stool,__ is an important warning sign of bowel obstruction. Please don't wait and see — come in or get in touch sooner rather than later. If you've had abdominal surgery in the past, it's also worth knowing that adhesions can put you at risk for this kind of obstruction.",
    },
  },
];

export function getDisease(slug: string): DiseaseEntry | undefined {
  return DISEASES.find((d) => d.slug === slug);
}

export function getDiseasesByCategory(category: DiseaseCategory): DiseaseEntry[] {
  return DISEASES.filter((d) => d.category === category);
}

export const DISEASE_CATEGORY_ORDER: DiseaseCategory[] = ["internal", "surgical"];

/**
 * 内科系疾患の一覧ページ表示用のサブ分類。
 * グループの並び順・グループ内の並び順は、一般的な受診頻度・有病率の
 * おおよその目安（頻度の高いものを先に）にもとづく大まかな目安であり、
 * 統計的な厳密さを示すものではない。新しい内科系疾患を追加した場合は、
 * 必ずいずれか1つのグループに slug を追加すること（このリストに含まれない
 * 内科系疾患は一覧ページに表示されない）。
 */
export const INTERNAL_SUBCATEGORIES: { label: string; labelEn: string; slugs: string[] }[] = [
  {
    label: "かぜ・感染症・呼吸器",
    labelEn: "Colds, infections & respiratory",
    slugs: [
      "common-cold",
      "bronchitis",
      "influenza",
      "covid-19",
      "croup",
      "streptococcal-pharyngitis",
      "mycoplasma-pneumonia",
      "rsv-infection",
      "human-metapneumovirus-infection",
      "viral-gastroenteritis",
      "gastroenteritis",
      "bacterial-food-poisoning",
      "asthma",
      "asthma-child",
      "community-acquired-pneumonia",
      "aspiration-pneumonia",
    ],
  },
  {
    label: "生活習慣病・内分泌",
    labelEn: "Lifestyle & endocrine conditions",
    slugs: [
      "hypertension",
      "dyslipidemia",
      "diabetes",
      "thyroid",
      "hyperuricemia-gout",
      "fatty-liver-disease",
      "chronic-kidney-disease",
    ],
  },
  {
    label: "循環器疾患",
    labelEn: "Cardiovascular conditions",
    slugs: ["heart-failure", "atrial-fibrillation", "angina-ischemic-heart-disease"],
  },
  {
    label: "血液疾患（貧血）",
    labelEn: "Blood disorders (anemia)",
    slugs: ["iron-deficiency-anemia", "megaloblastic-anemia", "renal-anemia"],
  },
  {
    label: "骨・運動器疾患",
    labelEn: "Bone & musculoskeletal conditions",
    slugs: ["osteoporosis", "knee-osteoarthritis", "acute-low-back-pain"],
  },
  {
    label: "皮膚の感染症",
    labelEn: "Skin infections",
    slugs: ["impetigo", "herpes-labialis", "herpes-zoster", "cellulitis", "tinea-pedis"],
  },
  {
    label: "虫・動物による感染症／熱中症",
    labelEn: "Insect/animal-related infections & heat stroke",
    slugs: ["insect-bites", "tick-bite-sfts", "cat-scratch-disease", "heat-stroke"],
  },
  {
    label: "消化器疾患",
    labelEn: "Digestive conditions",
    slugs: ["gastritis", "constipation", "reflux-esophagitis", "functional-dyspepsia", "ibs", "h-pylori", "stomatitis", "gallstones", "diverticulosis", "ischemic-colitis", "terminal-ileitis"],
  },
  {
    label: "アレルギー疾患",
    labelEn: "Allergic conditions",
    slugs: ["hay-fever", "allergic-rhinitis", "urticaria", "atopic-dermatitis"],
  },
  {
    label: "泌尿器疾患",
    labelEn: "Urinary conditions",
    slugs: ["acute-cystitis", "overactive-bladder", "chronic-cystitis", "ureteral-stone", "bph"],
  },
  {
    label: "耳鼻科・神経疾患",
    labelEn: "ENT & neurological conditions",
    slugs: ["sinusitis", "ear-infection", "headache", "bppv", "meniere-disease", "lumbar-spinal-stenosis"],
  },
  {
    label: "睡眠・生活の質",
    labelEn: "Sleep & quality of life",
    slugs: ["insomnia", "sas"],
  },
];

/** services.detailsの箇条書き文字列中に含まれる疾患名を自動リンクするための辞書。
 *  キーが長い順にマッチさせることで「糖尿病」と「2型糖尿病」のような重複を避ける。
 *  href を指定すると /diseases/[slug] 以外（例: /diet-guidance）へリンクできる。 */
type DiseaseLinkLabel = { label: string; slug: string; href?: string };
export const DISEASE_LINK_LABELS: DiseaseLinkLabel[] = DISEASES
  .map((d): DiseaseLinkLabel => ({ label: d.title.replace(/（.*）/, ""), slug: d.slug }))
  .concat([
    { label: "生活習慣病", slug: "", href: "/diet-guidance" },
    { label: "かぜ", slug: "common-cold" },
    { label: "高血圧", slug: "hypertension" },
    { label: "脂質異常症", slug: "dyslipidemia" },
    { label: "糖尿病", slug: "diabetes" },
    { label: "花粉症", slug: "hay-fever" },
    { label: "鼻炎", slug: "allergic-rhinitis" },
    { label: "蕁麻疹", slug: "urticaria" },
    { label: "睡眠時無呼吸症候群", slug: "sas" },
    { label: "粉瘤", slug: "atheroma" },
    { label: "脂肪腫", slug: "lipoma" },
    { label: "巻き爪", slug: "ingrown-nail" },
    { label: "陥入爪", slug: "ingrown-nail" },
    { label: "やけど", slug: "burns" },
    { label: "火傷", slug: "burns" },
    { label: "切り傷", slug: "wound-care" },
    { label: "擦り傷", slug: "wound-care" },
    { label: "刺し傷", slug: "wound-care" },
    { label: "動物咬傷", slug: "wound-care" },
    { label: "痔", slug: "hemorrhoids" },
    { label: "ピロリ菌", slug: "h-pylori" },
    { label: "胆石症", slug: "gallstones" },
    { label: "胆石", slug: "gallstones" },
    { label: "胆嚢炎", slug: "cholecystitis" },
    { label: "尿管結石症", slug: "ureteral-stone" },
    { label: "尿路結石", slug: "ureteral-stone" },
    { label: "急性膀胱炎", slug: "acute-cystitis" },
    { label: "慢性膀胱炎", slug: "chronic-cystitis" },
    { label: "膀胱炎", slug: "acute-cystitis" },
    { label: "市中肺炎", slug: "community-acquired-pneumonia" },
    { label: "誤嚥性肺炎", slug: "aspiration-pneumonia" },
    { label: "過活動膀胱", slug: "overactive-bladder" },
    { label: "不眠症", slug: "insomnia" },
    { label: "口内炎", slug: "stomatitis" },
    { label: "虫垂炎", slug: "appendicitis" },
    { label: "盲腸", slug: "appendicitis" },
    { label: "回腸末端炎", slug: "terminal-ileitis" },
    { label: "虚血性腸炎", slug: "ischemic-colitis" },
    { label: "感冒", slug: "common-cold" },
    { label: "上気道感染症", slug: "common-cold" },
    { label: "甲状腺疾患", slug: "thyroid" },
    { label: "BPPV", slug: "bppv" },
    { label: "良性発作性頭位めまい症", slug: "bppv" },
    { label: "メニエール病", slug: "meniere-disease" },
    { label: "高尿酸血症", slug: "hyperuricemia-gout" },
    { label: "痛風", slug: "hyperuricemia-gout" },
    { label: "口唇ヘルペス", slug: "herpes-labialis" },
    { label: "単純ヘルペス", slug: "herpes-labialis" },
    { label: "帯状疱疹", slug: "herpes-zoster" },
    { label: "ヘルペス", slug: "herpes-labialis" },
    { label: "RSウイルス感染症", slug: "rsv-infection" },
    { label: "RSウイルス", slug: "rsv-infection" },
    { label: "ヒトメタニューモウイルス感染症", slug: "human-metapneumovirus-infection" },
    { label: "ヒトメタニューモウイルス", slug: "human-metapneumovirus-infection" },
    { label: "溶連菌感染症", slug: "streptococcal-pharyngitis" },
    { label: "溶連菌", slug: "streptococcal-pharyngitis" },
    { label: "マイコプラズマ肺炎", slug: "mycoplasma-pneumonia" },
    { label: "マイコプラズマ", slug: "mycoplasma-pneumonia" },
    { label: "クループ症候群", slug: "croup" },
    { label: "クループ", slug: "croup" },
    { label: "とびひ", slug: "impetigo" },
    { label: "伝染性膿痂疹", slug: "impetigo" },
    { label: "ノロウイルス", slug: "viral-gastroenteritis" },
    { label: "ロタウイルス", slug: "viral-gastroenteritis" },
    { label: "感染性胃腸炎", slug: "gastroenteritis" },
    { label: "感染性腸炎", slug: "gastroenteritis" },
    { label: "鉄欠乏性貧血", slug: "iron-deficiency-anemia" },
    { label: "貧血", slug: "iron-deficiency-anemia" },
    { label: "巨赤芽球性貧血", slug: "megaloblastic-anemia" },
    { label: "ビタミンB12欠乏性貧血", slug: "megaloblastic-anemia" },
    { label: "葉酸欠乏性貧血", slug: "megaloblastic-anemia" },
    { label: "悪性貧血", slug: "megaloblastic-anemia" },
    { label: "心不全", slug: "heart-failure" },
    { label: "心房細動", slug: "atrial-fibrillation" },
    { label: "不整脈", slug: "atrial-fibrillation" },
    { label: "腎性貧血", slug: "renal-anemia" },
    { label: "骨粗鬆症", slug: "osteoporosis" },
    { label: "虫刺され", slug: "insect-bites" },
    { label: "蜂刺され", slug: "insect-bites" },
    { label: "ハチ刺され", slug: "insect-bites" },
    { label: "マダニ", slug: "tick-bite-sfts" },
    { label: "SFTS", slug: "tick-bite-sfts" },
    { label: "重症熱性血小板減少症候群", slug: "tick-bite-sfts" },
    { label: "猫ひっかき病", slug: "cat-scratch-disease" },
    { label: "蜂窩織炎", slug: "cellulitis" },
    { label: "足白癬", slug: "tinea-pedis" },
    { label: "水虫", slug: "tinea-pedis" },
    { label: "副鼻腔炎", slug: "sinusitis" },
    { label: "インフルエンザ", slug: "influenza" },
    { label: "新型コロナウイルス感染症", slug: "covid-19" },
    { label: "新型コロナ", slug: "covid-19" },
    { label: "脂肪肝", slug: "fatty-liver-disease" },
    { label: "NASH", slug: "fatty-liver-disease" },
    { label: "NAFLD", slug: "fatty-liver-disease" },
    { label: "慢性腎臓病", slug: "chronic-kidney-disease" },
    { label: "CKD", slug: "chronic-kidney-disease" },
    { label: "前立腺肥大症", slug: "bph" },
    { label: "熱中症", slug: "heat-stroke" },
    { label: "変形性膝関節症", slug: "knee-osteoarthritis" },
    { label: "膝OA", slug: "knee-osteoarthritis" },
    { label: "中耳炎", slug: "ear-infection" },
    { label: "外耳炎", slug: "ear-infection" },
    { label: "狭心症", slug: "angina-ischemic-heart-disease" },
    { label: "虚血性心疾患", slug: "angina-ischemic-heart-disease" },
    { label: "心筋梗塞", slug: "angina-ischemic-heart-disease" },
    { label: "ぎっくり腰", slug: "acute-low-back-pain" },
    { label: "急性腰痛症", slug: "acute-low-back-pain" },
    { label: "食中毒", slug: "bacterial-food-poisoning" },
    { label: "カンピロバクター", slug: "bacterial-food-poisoning" },
    { label: "サルモネラ", slug: "bacterial-food-poisoning" },
    { label: "アトピー性皮膚炎", slug: "atopic-dermatitis" },
    { label: "アトピー", slug: "atopic-dermatitis" },
    { label: "蓄膿症", slug: "sinusitis" },
    { label: "片頭痛", slug: "headache" },
    { label: "緊張型頭痛", slug: "headache" },
    { label: "群発頭痛", slug: "headache" },
    { label: "腰部脊柱管狭窄症", slug: "lumbar-spinal-stenosis" },
    { label: "脊柱管狭窄症", slug: "lumbar-spinal-stenosis" },
    { label: "逆流性食道炎", slug: "reflux-esophagitis" },
    { label: "NERD", slug: "reflux-esophagitis" },
    { label: "非びらん性胃食道逆流症", slug: "reflux-esophagitis" },
    { label: "機能性ディスペプシア", slug: "functional-dyspepsia" },
    { label: "FD", slug: "functional-dyspepsia" },
    { label: "胃もたれ", slug: "functional-dyspepsia" },
    { label: "過敏性腸症候群", slug: "ibs" },
    { label: "便秘症", slug: "constipation" },
    { label: "便秘", slug: "constipation" },
    { label: "大腸憩室症", slug: "diverticulosis" },
    { label: "結腸憩室症", slug: "diverticulosis" },
    { label: "自律神経失調症", slug: "dysautonomia" },
    { label: "迷走神経反射（血管迷走神経性失神）", slug: "vasovagal-syncope" },
    { label: "血管迷走神経性失神", slug: "vasovagal-syncope" },
    { label: "迷走神経反射", slug: "vasovagal-syncope" },
    // 症状ページ「考えられる主な原因」等で使われる、疾患ページ見出しと表記が異なる原因名の別名
    { label: "感冒（かぜ症候群・上気道感染症）", slug: "common-cold" },
    { label: "かぜ症候群", slug: "common-cold" },
    { label: "花粉症（季節性アレルギー性鼻炎）", slug: "hay-fever" },
    { label: "良性発作性頭位めまい症（BPPV）", slug: "bppv" },
    { label: "とびひ（伝染性膿痂疹）", slug: "impetigo" },
    { label: "足白癬（水虫）", slug: "tinea-pedis" },
    { label: "熱傷（やけど）", slug: "burns" },
    { label: "創傷（切り傷・すり傷等）", slug: "wound-care" },
    { label: "痔（いぼ痔・切れ痔等）", slug: "hemorrhoids" },
    { label: "ピロリ菌関連疾患", slug: "h-pylori" },
    { label: "感染性胃腸炎（ウイルス性・細菌性）", slug: "viral-gastroenteritis" },
    { label: "脂肪肝（NAFLD/NASH）", slug: "fatty-liver-disease" },
    { label: "慢性腎臓病（CKD）", slug: "chronic-kidney-disease" },
    { label: "甲状腺機能の異常", slug: "thyroid" },
    // 自費診療ページ（/self-pay/）へのリンク
    { label: "GLP-1ダイエット（低用量開始プラン）", slug: "", href: "/self-pay/glp1" },
    { label: "男性型脱毛症（AGA）", slug: "", href: "/self-pay/aga" },
    { label: "AGA治療（フィナステリド）", slug: "", href: "/self-pay/aga" },
    { label: "AGA治療（デュタステリド系）", slug: "", href: "/self-pay/aga" },
    { label: "ED治療薬（バイアグラ）", slug: "", href: "/self-pay/ed" },
    { label: "ED治療薬（シアリス）", slug: "", href: "/self-pay/ed" },
    { label: "花粉症ステロイド注射", slug: "", href: "/self-pay/pollen-steroid" },
  ])
  .filter((v, i, arr) => arr.findIndex((x) => x.label === v.label) === i)
  .sort((a, b) => b.label.length - a.label.length);

/**
 * DISEASE_LINK_LABELS の英語版。英訳のある疾患のタイトル（en.title）から自動生成する。
 * 英語タイトルは "High blood pressure (hypertension)" や "Hyperuricemia and gout" のように
 * 括弧や and/& で複数の呼び方を1つにまとめていることが多く、症状ページの原因名では
 * そのうち一部の呼び方だけが使われることがあるため、括弧の有無・and/&区切りの
 * それぞれの部分文字列も候補ラベルとして追加する。
 */
function expandEnTitleVariants(title: string): string[] {
  const variants = new Set<string>([title]);
  const withoutParens = title.replace(/\s*\([^)]*\)/g, "").trim();
  if (withoutParens) variants.add(withoutParens);
  const parenMatch = title.match(/\(([^)]*)\)/);
  if (parenMatch?.[1]) variants.add(parenMatch[1].trim());
  for (const base of [title, withoutParens]) {
    for (const part of base.split(/\s+(?:and|&)\s+/i)) {
      const trimmed = part.trim();
      if (trimmed) variants.add(trimmed);
    }
  }
  return [...variants].filter(Boolean);
}

export const DISEASE_LINK_LABELS_EN: DiseaseLinkLabel[] = DISEASES
  .filter((d) => d.en?.title)
  .flatMap((d): DiseaseLinkLabel[] =>
    expandEnTitleVariants(d.en!.title!).map((label) => ({ label, slug: d.slug })),
  )
  .concat([
    // 症状ページの原因名で使われる呼び方のうち、疾患タイトルの自動展開では
    // 拾いきれない代表的な別表現だけを補足する。
    { label: "Common cold", slug: "common-cold" },
    { label: "Cold", slug: "common-cold" },
    { label: "Autonomic dysregulation", slug: "dysautonomia" },
    { label: "H. pylori-related conditions", slug: "h-pylori" },
    { label: "H. pylori", slug: "h-pylori" },
    { label: "Arrhythmia", slug: "atrial-fibrillation" },
    { label: "Anemia", slug: "iron-deficiency-anemia" },
    { label: "Thyroid dysfunction", slug: "thyroid" },
    { label: "Thyroid", slug: "thyroid" },
    { label: "Migraine", slug: "headache" },
    { label: "Wounds", slug: "wound-care" },
    { label: "Ingrown/curved toenails", slug: "ingrown-nail" },
    { label: "Ingrown toenail", slug: "ingrown-nail" },
    { label: "Infectious gastroenteritis", slug: "gastroenteritis" },
    { label: "Male pattern hair loss (AGA)", slug: "", href: "/self-pay/aga" },
    { label: "Male pattern hair loss", slug: "", href: "/self-pay/aga" },
  ])
  .filter((v, i, arr) => arr.findIndex((x) => x.label.toLowerCase() === v.label.toLowerCase()) === i)
  .sort((a, b) => b.label.length - a.label.length);
