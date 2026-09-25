import { BRAND } from "./brand";

/** 本番サイトのベースURL。metadataBase・canonical・sitemap・IndexNow等で共通利用する。 */
export const BASE_URL = "https://www.kibananomura.jp";

/**
 * IndexNow用のAPIキー。public/{INDEXNOW_KEY}.txt にキー自体をファイル内容として配置し、
 * scripts/indexnow-submit.mjs から送信する（詳細はそのスクリプトのコメント参照）。
 */
export const INDEXNOW_KEY = "2ec2e28bd96afcd60ba2951334e48fbc";

const titleSuffix = "宮崎市木花 内科・小児科・外科 2027年10月1日開院";

export const SITE_SEO = {
  title: `${BRAND.ja.primary} | ${titleSuffix}`,
  description: BRAND.ja.seoDescription,
  keywords: [
    "木花のむら診療所",
    "木花診療所",
    "木花 クリニック",
    "宮崎市 木花 クリニック",
    "宮崎市木花 クリニック",
    "木花 内科",
    "木花 小児科",
    "宮崎市",
    "木花",
    "熊野",
    "内科",
    "小児科",
    "外科",
    "消化器内科",
    "アレルギー科",
    "CT",
    "胃カメラ",
    "水曜午後",
    "野村信介",
  ],
} as const;
