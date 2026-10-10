/**
 * 九州地方の花粉飛散カレンダー（簡易版）。
 * 出典：政府広報オンラインが公表している全国の花粉飛散時期の表（地域別）のうち、
 * 「九州」の行を抜き出し、宮崎で花粉症の相談を受ける際の目安として簡略化した。
 * 実際の飛散時期・量は年の気象条件により変動するため、あくまで目安。
 */

type PollenRow = {
  name: string;
  family: string;
  kind: "tree" | "herb";
  /** 1〜12月、0=ほぼなし 1=やや飛散 2=多い 3=非常に多い */
  months: number[];
};

const POLLEN_ROWS: PollenRow[] = [
  { name: "ハンノキ属", family: "カバノキ科", kind: "tree", months: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "スギ", family: "", kind: "tree", months: [0, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "ヒノキ", family: "", kind: "tree", months: [0, 0, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0] },
  { name: "イネ科", family: "", kind: "herb", months: [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0] },
  { name: "ブタクサ属", family: "キク科", kind: "herb", months: [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0] },
  { name: "ヨモギ属", family: "キク科", kind: "herb", months: [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0] },
  { name: "カナムグラ", family: "アサ科", kind: "herb", months: [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0] },
];

const MONTH_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

function cellClass(kind: "tree" | "herb", level: number) {
  if (level === 0) return "bg-surface";
  if (kind === "tree") {
    if (level === 1) return "bg-[#d9cdbd]";
    if (level === 2) return "bg-[#a98f6e]";
    return "bg-[#6b4a2d]";
  }
  if (level === 1) return "bg-[#dcebb0]";
  if (level === 2) return "bg-[#9cc24a]";
  return "bg-[#5f7a1f]";
}

export default function PollenCalendarKyushu() {
  return (
    <div className="mt-6 rounded-2xl bg-surface/90 p-5 shadow-card">
      <h2 className="text-sm font-bold text-primary-dark">
        宮崎（九州）の花粉飛散時期の目安
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
        出典：政府広報オンラインが公表する地域別の花粉飛散時期の表のうち「九州」の数値をもとに作成（簡略化）。実際の飛散時期・量は年の気象条件によって変動します。
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[560px] border-collapse text-center text-[11px] sm:text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 bg-surface/90 px-2 py-1.5 text-left font-bold text-ink">
                花粉名
              </th>
              {MONTH_LABELS.map((m) => (
                <th key={m} className="w-8 px-0.5 py-1.5 font-bold text-ink/70">
                  {m}月
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {POLLEN_ROWS.map((row) => (
              <tr key={row.name}>
                <td className="sticky left-0 whitespace-nowrap bg-surface/90 px-2 py-1 text-left font-medium text-ink">
                  {row.name}
                  {row.family && (
                    <span className="ml-1 text-[10px] text-ink/50">（{row.family}）</span>
                  )}
                </td>
                {row.months.map((level, i) => (
                  <td key={i} className="px-0.5 py-1">
                    <div
                      className={`mx-auto h-3.5 w-full rounded-sm ${cellClass(row.kind, level)}`}
                      aria-label={`${row.name} ${MONTH_LABELS[i]}月 レベル${level}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-ink/70">
        <div className="flex items-center gap-2">
          <span className="font-bold text-ink/80">木本（スギ・ヒノキ等）</span>
          <LegendSwatch className="bg-[#d9cdbd]" label="少ない" />
          <LegendSwatch className="bg-[#a98f6e]" label="やや多い" />
          <LegendSwatch className="bg-[#6b4a2d]" label="多い" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-ink/80">草本（イネ科・ブタクサ等）</span>
          <LegendSwatch className="bg-[#dcebb0]" label="少ない" />
          <LegendSwatch className="bg-[#9cc24a]" label="やや多い" />
          <LegendSwatch className="bg-[#5f7a1f]" label="多い" />
        </div>
      </div>
    </div>
  );
}

function LegendSwatch({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`h-3 w-3 rounded-sm ${className}`} aria-hidden="true" />
      {label}
    </span>
  );
}
