/**
 * 疾患ページ（/diseases/[slug]）と院長ブログ（/blog/[slug]）の相互リンク表。
 *
 * キーは疾患の slug、値はその疾患を扱ったブログ記事の slug。
 * ここに1行足すだけで、疾患ページには「関連する院長ブログ」、
 * ブログ記事には「関連する病気の解説」が両方向に自動で表示される。
 */
export const RELATED_POSTS_BY_DISEASE: Record<string, string[]> = {
  "wound-care": ["kizu-shoudoku", "shukketsu-shashin-onegai"],
  appendicitis: ["kaicho-mattan-en"],
  "terminal-ileitis": ["kaicho-mattan-en"],
  influenza: ["influenza-vaccine-mayoi", "furumisuto-hana-no-jotai"],
  asthma: ["zensoku-chiryo"],
  "reflux-esophagitis": ["ppi-chouki-fukuyou"],
  "h-pylori": ["ikamera-nansai-kara"],
  "pulmonary-ntm": ["hai-ntm-sho", "hai-kousankin"],
  legionellosis: ["legionella"],
  hypertension: ["kouatsu-genryou-fuan"],
  dyslipidemia: ["statin-kinniku-houkai"],
};

export function getRelatedPostSlugs(diseaseSlug: string): string[] {
  return RELATED_POSTS_BY_DISEASE[diseaseSlug] ?? [];
}

export function getRelatedDiseaseSlugs(postSlug: string): string[] {
  return Object.entries(RELATED_POSTS_BY_DISEASE)
    .filter(([, posts]) => posts.includes(postSlug))
    .map(([disease]) => disease);
}

/** クライアントコンポーネントに渡す、リンク表示に必要な最小限の情報 */
export type RelatedLink = { slug: string; titleJa: string; titleEn: string };
