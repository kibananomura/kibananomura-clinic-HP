/**
 * Instagram で紹介した記事・ページの一覧（新しい順）。/sns ページの上に並ぶ。
 * Instagram は投稿の本文のリンクが押せないため、プロフィールのリンクを /sns にして、
 * 「続きはプロフィールのリンクから」で来た人が、読みたい記事にすぐ届くようにする。
 * Instagram のストック（開業支援チーム/book/instagram/stock/）を投稿したら、ここの先頭に足す。
 */
export type SnsFeatured = { slug?: string; href?: string; ja?: string; en?: string };

export const SNS_FEATURED: SnsFeatured[] = [
  { slug: "kansen-2026-11-2" },
  { slug: "kansen-dousen-bunri" },
  { slug: "flu-vaccine-timing" },
  { slug: "kizu-shoudoku" },
  { slug: "kibana-no-namae" },
  { href: "/careers", ja: "職員募集（看護師・医療事務）", en: "Careers (nurses and medical office staff)" },
];
