/**
 * 「よろず相談所」らしい温かさ・有機的な雰囲気を出すための装飾SVG群。
 * すべて装飾目的のため aria-hidden。クリックは透過する。
 */

export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      className={`deco ${className ?? ""}`}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45 118 C 45 80 44 50 44 18"
        stroke="#7FB67E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M44 70 C 18 64 6 44 10 18 C 38 22 50 44 44 70 Z"
        fill="#94C892"
      />
      <path
        d="M44 92 C 70 86 82 66 78 40 C 50 44 38 66 44 92 Z"
        fill="#BFE0BC"
      />
      <path
        d="M44 50 C 30 44 24 30 28 16 C 44 20 50 36 44 50 Z"
        fill="#7FB67E"
      />
    </svg>
  );
}

export function Blossom({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`deco ${className ?? ""}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#F2B19C">
        <ellipse cx="30" cy="15" rx="9" ry="13" />
        <ellipse cx="30" cy="45" rx="9" ry="13" />
        <ellipse cx="15" cy="30" rx="13" ry="9" />
        <ellipse cx="45" cy="30" rx="13" ry="9" />
      </g>
      <circle cx="30" cy="30" r="8" fill="#F6C56B" />
    </svg>
  );
}

export function Dots({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={`deco ${className ?? ""}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={8 + c * 15} cy={8 + r * 15} r="2.6" />
          )),
        )}
      </g>
    </svg>
  );
}

/** ふんわりぼかした有機的なカラーブロブ（背景の奥行き・温かみ用） */
export function SoftBlob({ className }: { className?: string }) {
  return <div aria-hidden="true" className={`deco blob blur-3xl ${className ?? ""}`} />;
}

/**
 * セクション間をやわらかくつなぐ波形のディバイダ。
 * 上のセクションの下端に置き、下のセクションの色 (color) で波を描く。
 */
export function WaveDivider({
  color,
  className,
  flip = false,
}: {
  color: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`deco pointer-events-none -mb-px w-full overflow-hidden leading-[0] ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`h-[40px] w-full sm:h-[64px] ${flip ? "rotate-180" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 40 C 240 0 480 80 720 56 C 960 32 1200 0 1440 40 L1440 80 L0 80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
