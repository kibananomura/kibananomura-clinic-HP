import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <div className="text-8xl font-bold text-primary/20">404</div>
      <h1 className="mt-4 text-2xl font-bold text-ink">ページが見つかりません</h1>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink/70">
        お探しのページは移動・削除されたか、URLが正しくない可能性があります。
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
        >
          トップページへ戻る
        </Link>
        <Link
          href="/faq"
          className="inline-flex items-center justify-center rounded-full border-2 border-primary/30 px-7 py-3.5 font-bold text-primary transition-colors hover:border-primary"
        >
          よくある質問
        </Link>
      </div>
    </div>
  );
}
