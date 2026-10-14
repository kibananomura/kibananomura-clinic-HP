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
