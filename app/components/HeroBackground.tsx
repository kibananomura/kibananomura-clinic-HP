/**
 * Hero 背景。周辺地図を使用。
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* 周辺地図 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-map.jpg')" }}
      />

      {/* テキスト可読性：左側を白くフェード */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.15) 65%, transparent 85%)",
        }}
      />

      {/* 下端を白へなじませる */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,1) 100%)",
        }}
      />
    </div>
  );
}
