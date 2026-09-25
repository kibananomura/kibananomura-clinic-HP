#!/usr/bin/env node
/**
 * IndexNow送信スクリプト。
 *
 * ページの公開・更新後にBing/Yandex等（IndexNow対応検索エンジン）へ
 * URLを通知し、再クロールを促す。
 *
 * 使い方:
 *   node scripts/indexnow-submit.mjs                     # sitemap.tsの全URLを送信
 *   node scripts/indexnow-submit.mjs https://www.kibananomura.jp/news  # 個別URLを指定して送信
 *   node scripts/indexnow-submit.mjs /news /blog/some-post         # 相対パスでも可
 *
 * npm run indexnow でも実行可能（package.json参照）。
 *
 * 現時点では手動実行を想定している。将来的には、デプロイ完了フック
 * （例: Vercelのdeploy hookやGitHub Actionsのpost-deployステップ）から
 * このスクリプトを自動実行する形へ発展させることを想定している。
 *
 * 参考: https://www.indexnow.org/documentation
 */

const BASE_URL = "https://www.kibananomura.jp";
const INDEXNOW_KEY = "2ec2e28bd96afcd60ba2951334e48fbc";
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

function toAbsoluteUrl(input) {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }
  return `${BASE_URL}${input.startsWith("/") ? "" : "/"}${input}`;
}

async function getSitemapUrls() {
  // sitemap.ts をNext.jsのビルドを経由せず直接読むのは難しいため、
  // 起動中のdev/本番サーバーの /sitemap.xml から取得する。
  // サーバーが起動していない場合は静的なフォールバックURL一覧を使う。
  const candidates = [
    `${BASE_URL}/sitemap.xml`,
    "http://localhost:3000/sitemap.xml",
  ];
  for (const url of candidates) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const xml = await res.text();
      const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
      if (urls.length > 0) return urls;
    } catch {
      // 次の候補を試す
    }
  }
  console.warn(
    "sitemap.xmlの取得に失敗しました。トップページのみ送信します。"
  );
  return [BASE_URL];
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length > 0 ? args.map(toAbsoluteUrl) : await getSitemapUrls();

  const payload = {
    host: new URL(BASE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  console.log(`IndexNowへ ${urlList.length} 件のURLを送信します...`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  if (!res.ok && res.status !== 202) {
    const text = await res.text().catch(() => "");
    console.error(text);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
