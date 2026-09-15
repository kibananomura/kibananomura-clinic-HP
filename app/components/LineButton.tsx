type LineButtonProps = {
  label?: string;
  className?: string;
  /** Visual size variant */
  size?: "md" | "lg";
};

/**
 * LINE登録CTAボタン。LINEブランドカラー(#06C755)を使用。
 * 実際のLINE公式アカウントURLは開院準備時に href に設定する想定。
 */
/**
 * ラベルを「本文」と「（括弧）」に分割し、それぞれ inline-block で囲う。
 * これにより折り返しは括弧の前でのみ起き、「LINE登／録」のような
 * 不自然な改行を防ぐ。
 */
function renderLabel(label: string) {
  const idx = label.search(/[（(]/);
  if (idx > 0) {
    return (
      <>
        <span className="inline-block [word-break:keep-all]">
          {label.slice(0, idx)}
        </span>
        <span className="inline-block [word-break:keep-all]">
          {label.slice(idx)}
        </span>
      </>
    );
  }
  return <span className="[word-break:keep-all]">{label}</span>;
}

export default function LineButton({
  label = "LINE で登録する",
  className = "",
  size = "md",
}: LineButtonProps) {
  const sizing =
    size === "lg" ? "px-7 py-4 text-base" : "px-6 py-3.5 text-[15px]";

  return (
    <a
      href="https://line.me/R/ti/p/@159yebck"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-line text-center font-bold leading-tight text-white shadow-soft transition-transform hover:scale-[1.03] active:scale-100 ${sizing} ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.58 7.48 8.41 8.12.33.07.78.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.89.55 1.09-.46 5.86-3.45 8-5.91 1.47-1.62 2.18-3.27 2.18-5.04C22 5.69 17.52 2 12 2Z" />
      </svg>
      <span>{renderLabel(label)}</span>
    </a>
  );
}
