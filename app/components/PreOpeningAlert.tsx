import Link from "next/link";

/**
 * 症状・疾患解説ページ下部に共通配置する、開院前であることの注意喚起。
 * 検索経由で個別ページに直接流入した方が、現在診療を行っていないことに
 * 気づかず来院してしまうのを防ぐ（誤来院防止・期待値コントロール）。
 */
export default function PreOpeningAlert() {
  return (
    <div className="mt-6 rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
      <p>
        <span aria-hidden="true">⚠ </span>
        当院は<strong>2027年10月1日開院予定</strong>で、現在は建設準備中のため診療を行っておりません。
        今、急な症状でお困りの方は、
        <Link href="/links" className="font-bold underline underline-offset-2">
          宮崎市の休日・夜間急病センターや＃8000（子ども救急医療電話相談）等の情報
        </Link>
        をご利用ください。
      </p>
    </div>
  );
}
