import Script from "next/script";

/**
 * Google Analytics 4（GA4）の計測タグ。
 *
 * NEXT_PUBLIC_GA_MEASUREMENT_ID（例: "G-XXXXXXXXXX"）をVercelの環境変数に
 * 設定すると自動的に有効になる。未設定の間は何も出力しない
 * （実在しないIDでgtagを呼び出さないようにするため）。
 *
 * 取得手順:
 * 1. https://analytics.google.com/ でアカウント・プロパティを作成
 * 2. 「データストリーム」→ウェブ→サイトURL（https://www.kibananomura.jp）を登録
 * 3. 発行された測定ID（G-から始まる文字列）を控える
 * 4. Vercelのプロジェクト設定 > Environment Variables に
 *    NEXT_PUBLIC_GA_MEASUREMENT_ID として登録し、再デプロイする
 */
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
