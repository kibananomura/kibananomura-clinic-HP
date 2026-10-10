/**
 * アレルギー性鼻炎の花粉以外の原因（ハウスダスト・ダニ等）を示すオリジナルの挿絵。
 * 外部素材は使用せず、本サイト用に作成したシンプルな線画アイコン。
 */

const ICON_PROPS = {
  className: "h-8 w-8",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function DustCloudIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ICON_PROPS}>
      <circle cx="10" cy="15" r="3.4" fill="none" />
      <circle cx="13.5" cy="13.5" r="2.6" fill="none" />
      <circle cx="7.3" cy="13" r="2.2" fill="none" />
      <path d="M5 5.5v2.6M3.7 6.8h2.6" />
      <path d="M19 8.5v2.2M17.9 9.6h2.2" />
      <path d="M14.3 3.5v2M13.3 4.5h2" />
    </svg>
  );
}

function MiteIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ICON_PROPS}>
      <ellipse cx="12" cy="12" rx="5" ry="6" />
      <path d="M8 8l-3-2M16 8l3-2M8 16l-3 2M16 16l3 2M7 11l-3.5-.5M17 11l3.5-.5M7 14l-3.5.5M17 14l3.5.5" />
      <circle cx="10.2" cy="9.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="13.8" cy="9.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BeddingIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ICON_PROPS}>
      <path d="M3 18v-5a3 3 0 013-3h12a3 3 0 013 3v5" />
      <path d="M3 18h18M5 10V7.5A1.5 1.5 0 016.5 6H11a1.5 1.5 0 011.5 1.5V10" />
      <path d="M3 14.5h7" />
    </svg>
  );
}

function PetIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ICON_PROPS}>
      <circle cx="12" cy="15.5" r="3.2" />
      <circle cx="7.5" cy="9.5" r="1.6" />
      <circle cx="16.5" cy="9.5" r="1.6" />
      <circle cx="9.3" cy="6.3" r="1.3" />
      <circle cx="14.7" cy="6.3" r="1.3" />
    </svg>
  );
}

const ALLERGENS = [
  { Icon: DustCloudIcon, label: "ハウスダスト" },
  { Icon: MiteIcon, label: "ダニ（死骸・フン）" },
  { Icon: BeddingIcon, label: "寝具・カーペット" },
  { Icon: PetIcon, label: "ペットの毛・フケ" },
];

export default function AllergenSourcesIllustration() {
  return (
    <div className="mt-6 rounded-2xl bg-surface/90 p-5 shadow-card">
      <h2 className="text-sm font-bold text-primary-dark">
        花粉以外の主な原因（通年性アレルギー性鼻炎）
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ALLERGENS.map(({ Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-xl bg-accent/50 px-2 py-4 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon />
            </span>
            <span className="text-xs font-medium leading-snug text-ink/80">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-ink/50">
        ※ イラストは本サイト用に作成したオリジナルです。
      </p>
    </div>
  );
}
