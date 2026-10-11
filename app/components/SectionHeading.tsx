type Props = {
  eyebrow: string;
  title?: string;
  align?: "center" | "left";
  /** タイトルを省略し、eyebrow を大きな見出しとして表示する */
  eyebrowAsTitle?: boolean;
  /**
   * 見出しタグ。そのページで最初に現れる唯一の主見出し（ページタイトル）として
   * 使う場合は "h1" を指定する。ホームページ内のセクション見出し等、
   * ページ内に他の見出しと並列で複数存在する場合は既定の "h2" のままにする。
   */
  as?: "h1" | "h2";
};

/**
 * セクション見出し。アイビーブロウ＋タイトル＋手描き風のうねった下線で、
 * 医療的な硬さをやわらげる。
 */
export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
  eyebrowAsTitle = false,
  as = "h2",
}: Props) {
  const isCenter = align === "center";
  const Heading = as;

  if (eyebrowAsTitle) {
    return (
      <div className={isCenter ? "text-center" : "text-left"}>
        <Heading className="text-2xl font-bold text-ink [text-wrap:balance] sm:text-3xl">
          {eyebrow}
        </Heading>
        <svg
          viewBox="0 0 180 22"
          className={`deco mt-3 h-4 w-36 text-primary ${isCenter ? "mx-auto" : ""}`}
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 14 C 46 4 96 4 140 11"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <g transform="translate(146 4)">
            <path d="M0 7 C 8 4 16 6 22 0 C 18 10 10 12 0 7 Z" fill="currentColor" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <span className="eyebrow">{eyebrow}</span>
      <Heading className="mt-5 text-2xl font-bold text-ink [text-wrap:balance] sm:text-3xl">{title}</Heading>
      <svg
        viewBox="0 0 180 22"
        className={`deco mt-3 h-4 w-36 text-primary ${isCenter ? "mx-auto" : ""}`}
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 14 C 46 4 96 4 140 11"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <g transform="translate(146 4)">
          <path d="M0 7 C 8 4 16 6 22 0 C 18 10 10 12 0 7 Z" fill="currentColor" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
