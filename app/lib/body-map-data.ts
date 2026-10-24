/**
 * 身体シェーマ（BodySchema コンポーネント）の部位⇔症状ページのマッピング。
 *
 * 新しい症状ページ（symptoms-data.ts）を追加した場合は、関係する部位の
 * slugs にも追加すること（小児科系・自費診療系は対象外。それぞれ別の
 * 導線（ホームの小児科カード・自費診療セクション）で案内しているため）。
 *
 * onFigure: true の部位はシルエット上の図形として表示し、false の部位は
 * （「肌の症状」「健診結果」等、体の一箇所に限定できないもの）図の下に
 * チップボタンとして表示する。
 */

export type BodyRegionShape =
  | { type: "circle"; cx: number; cy: number; r: number }
  | { type: "rect"; x: number; y: number; width: number; height: number; rx: number };

export type BodyRegion = {
  id: string;
  label: string;
  onFigure: boolean;
  shapes: BodyRegionShape[];
  slugs: string[];
};

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: "head",
    label: "頭・顔",
    onFigure: true,
    shapes: [{ type: "circle", cx: 100, cy: 38, r: 30 }],
    slugs: ["headache", "dizziness", "snoring-daytime-sleepiness", "allergy-rhinitis-itching"],
  },
  {
    id: "neck",
    label: "首・のど",
    onFigure: true,
    shapes: [{ type: "rect", x: 85, y: 64, width: 30, height: 18, rx: 6 }],
    slugs: ["neck-swelling-fatigue", "persistent-cough", "fever-cold"],
  },
  {
    id: "chest",
    label: "胸",
    onFigure: true,
    shapes: [{ type: "rect", x: 58, y: 82, width: 84, height: 66, rx: 18 }],
    slugs: ["palpitations-shortness-of-breath"],
  },
  {
    id: "abdomen",
    label: "お腹",
    onFigure: true,
    shapes: [{ type: "rect", x: 58, y: 150, width: 84, height: 52, rx: 14 }],
    slugs: ["abdominal-pain", "heartburn-stomach-discomfort", "bowel-changes", "abdominal-distension-surgical"],
  },
  {
    id: "hip",
    label: "おしり",
    onFigure: true,
    shapes: [{ type: "rect", x: 60, y: 204, width: 80, height: 26, rx: 12 }],
    slugs: ["hemorrhoids"],
  },
  {
    id: "arms",
    label: "手・腕",
    onFigure: true,
    shapes: [
      { type: "rect", x: 18, y: 86, width: 30, height: 140, rx: 15 },
      { type: "rect", x: 152, y: 86, width: 30, height: 140, rx: 15 },
    ],
    slugs: ["numbness", "bruises-sprains-injuries", "nail-trouble"],
  },
  {
    id: "legs",
    label: "足",
    onFigure: true,
    shapes: [
      { type: "rect", x: 62, y: 232, width: 34, height: 172, rx: 16 },
      { type: "rect", x: 104, y: 232, width: 34, height: 172, rx: 16 },
    ],
    slugs: ["itchy-feet-skin-peeling", "bruises-sprains-injuries", "nail-trouble"],
  },
  {
    id: "skin",
    label: "肌の症状",
    onFigure: false,
    shapes: [],
    slugs: ["skin-redness-swelling", "wounds-burns", "lumps-and-bumps"],
  },
  {
    id: "general",
    label: "健診・その他",
    onFigure: false,
    shapes: [],
    slugs: ["checkup-lifestyle-disease"],
  },
];

export function getBodyRegion(id: string): BodyRegion | undefined {
  return BODY_REGIONS.find((r) => r.id === id);
}

/**
 * BODY_REGIONS内のslugsで参照している症状ページのタイトル（日本語のみ）。
 * BodySchemaコンポーネントが症状一覧ページへのリンク文言を表示するためだけに使う。
 * symptoms-data.ts（本文テキストを含み重い）をクライアント側にバンドルしないよう、
 * タイトルだけをこのファイルに複製している。
 * symptoms-data.tsの該当slugのtitleを変更した場合は、ここも合わせて更新すること。
 */
export const SYMPTOM_TITLES: Record<string, string> = {
  headache: "頭痛",
  dizziness: "めまい",
  "snoring-daytime-sleepiness": "いびき・日中の眠気",
  "allergy-rhinitis-itching": "鼻炎・くしゃみ・皮膚のかゆみ",
  "neck-swelling-fatigue": "首の腫れ・だるさ",
  "persistent-cough": "咳が続く",
  "fever-cold": "発熱・かぜ症状",
  "palpitations-shortness-of-breath": "動悸・息切れ",
  "abdominal-pain": "腹痛・お腹の不調",
  "heartburn-stomach-discomfort": "胸やけ・胃の不調",
  "bowel-changes": "便通異常（下痢・便秘・血便）",
  "abdominal-distension-surgical": "お腹の張り・痛み（外科的な評価が必要な場合）",
  hemorrhoids: "お尻の痛み・出血",
  numbness: "手足のしびれ",
  "bruises-sprains-injuries": "打撲・捻挫・ケガ",
  "nail-trouble": "爪のトラブル",
  "itchy-feet-skin-peeling": "足のかゆみ・皮むけ",
  "skin-redness-swelling": "皮膚の赤み・腫れ・熱感",
  "wounds-burns": "きず・やけど",
  "lumps-and-bumps": "できもの・しこり",
  "checkup-lifestyle-disease": "健診異常・生活習慣病",
};
