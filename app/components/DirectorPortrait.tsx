/**
 * 院長写真のプレースホルダー。白衣の硬さではなく、自然光・温かみ・
 * 話しかけやすい表情をイメージしたイラスト。実写真は開院準備時に差し替え想定。
 */
export default function DirectorPortrait({
  className,
  ariaLabel,
  note,
}: {
  className?: string;
  ariaLabel: string;
  note: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-4xl ${className ?? ""}`}>
      <svg
        viewBox="0 0 480 560"
        className="h-full w-full"
        role="img"
        aria-label={ariaLabel}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4FAF2" />
            <stop offset="100%" stopColor="#E2F0DF" />
          </linearGradient>
          <radialGradient id="light" cx="70%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#FCF6E2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FCF6E2" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="480" height="560" fill="url(#bg)" />
        <rect width="480" height="560" fill="url(#light)" />

        <g fill="#BFE0BC" opacity="0.6">
          <ellipse cx="60" cy="80" rx="40" ry="18" transform="rotate(-25 60 80)" />
          <ellipse cx="120" cy="50" rx="34" ry="15" transform="rotate(15 120 50)" />
          <ellipse cx="430" cy="120" rx="44" ry="20" transform="rotate(20 430 120)" />
        </g>

        <g transform="translate(240 250)">
          <path
            d="M-150 310 C -150 190 -90 150 0 150 C 90 150 150 190 150 310 Z"
            fill="#7FB67E"
          />
          <path
            d="M-40 168 C -40 220 40 220 40 168 L 40 150 L -40 150 Z"
            fill="#F2C9A0"
          />
          <path d="M-26 156 L 0 196 L 26 156 Z" fill="#FFFFFF" opacity="0.9" />
          <circle cx="0" cy="60" r="92" fill="#F6D3AE" />
          <path
            d="M-94 50 C -96 -40 96 -40 94 50 C 70 10 60 -6 0 -6 C -60 -6 -70 10 -94 50 Z"
            fill="#3A3026"
          />
          <path d="M-44 60 q 16 14 32 0" stroke="#3A3026" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M12 60 q 16 14 32 0" stroke="#3A3026" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="-52" cy="92" r="13" fill="#F4A38A" opacity="0.5" />
          <circle cx="52" cy="92" r="13" fill="#F4A38A" opacity="0.5" />
          <path d="M-26 104 q 26 26 52 0" stroke="#B5654A" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      </svg>
      <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
        {note}
      </span>
    </div>
  );
}
