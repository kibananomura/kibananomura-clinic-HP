/**
 * LINE公式アカウントのURLを一元管理する。
 * 環境変数 NEXT_PUBLIC_LINE_URL が設定されていればそれを優先し、
 * 未設定の場合は下記のデフォルト値を使う。両方とも空の場合、
 * LINE関連のリンク（app/components/LineLink.tsx 等）は
 * 「現在LINE公式アカウントを開設準備中です」という表示に自動で切り替わる。
 */
export const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@337njouw";

/** Facebookページ「木花のむら総合診療所」（公開。2026-11-12から毎日投稿） */
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61595134787241";

/** Instagram（2026-11-03開設。空にすると、フッターのアイコンを出さない） */
export const INSTAGRAM_URL = "https://www.instagram.com/kibananomura/";
