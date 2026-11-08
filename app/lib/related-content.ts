/**
 * 疾患ページ（/diseases/[slug]）と院長ブログ（/blog/[slug]）の相互リンク表。
 *
 * キーは疾患の slug、値はその疾患を扱ったブログ記事の slug。
 * ここに1行足すだけで、疾患ページには「関連する院長ブログ」、
 * ブログ記事には「関連する病気の解説」が両方向に自動で表示される。
 */
export const RELATED_POSTS_BY_DISEASE: Record<string, string[]> = {
  "wound-care": ["kizu-shoudoku", "shukketsu-shashin-onegai", "hotai-card", "ashi-tako-sign"],
  cellulitis: ["hotai-card", "ashi-tako-sign"],
  "tinea-pedis": ["ashi-tako-sign"],
  "ureteral-stone": ["hajimemashite"],
  appendicitis: ["kaicho-mattan-en"],
  "terminal-ileitis": ["kaicho-mattan-en"],
  influenza: ["influenza-vaccine-mayoi", "furumisuto-hana-no-jotai", "kansen-2026-11", "flu-vaccine-timing"],
  "common-cold": ["kaze-taisho-ryoho", "sougou-kanyaku-nemuke"],
  "streptococcal-pharyngitis": ["hotai-card", "kansen-2026-07"],
  "covid-19": ["kansen-2026-07"],
  "bacterial-food-poisoning": ["kansen-2026-07"],
  gastroenteritis: ["kansen-2026-07", "kansen-2026-11"],
  "viral-gastroenteritis": ["kansen-2026-07"],
  "rsv-infection": ["kansen-2026-11"],
  "tick-bite-sfts": ["kansen-2026-11"],
  asthma: ["zensoku-chiryo"],
  "asthma-child": ["zensoku-chiryo"],
  "allergic-rhinitis": ["kyonen-no-allergy-kusuri", "sougou-kanyaku-nemuke"],
  "hay-fever": ["kyonen-no-allergy-kusuri"],
  "reflux-esophagitis": ["ppi-chouki-fukuyou"],
  gastritis: ["ppi-chouki-fukuyou", "ikamera-nansai-kara", "ikamera-junbi"],
  "h-pylori": ["ikamera-nansai-kara", "ikamera-junbi"],
  constipation: ["senna-choukirenyou"],
  "pulmonary-ntm": ["hai-ntm-sho", "hai-kousankin"],
  legionellosis: ["legionella"],
  "lumbar-spinal-stenosis": ["shibire-shinkei-saisei", "ashi-nanika"],
  "acute-low-back-pain": ["shibire-shinkei-saisei"],
  "megaloblastic-anemia": ["shibire-shinkei-saisei"],
  hypertension: ["kouatsu-genryou-fuan", "kouatsu-kusuri-tsuzukeru", "shita-no-ketsuatsu", "kusuri-yamerarenai", "seijou-no-jouge-fuan", "hontou-no-chiryou"],
  "orthostatic-hypotension": ["kouatsu-genryou-fuan"],
  dyslipidemia: ["statin-kinniku-houkai", "yasete-iru-noni-ldl", "tomato-juice-ryouba", "seikatsu-shukanbyo-gokai", "hontou-no-chiryou"],
  "fatty-liver-disease": ["herashitemo-yasenai", "ichinichi-isshoku-yasenai"],
  diabetes: ["tounyoubyou-kankai", "tounyoubyou-shokuji", "ashi-tako-sign", "hosuu-5000", "seikatsu-shukanbyo-gokai", "mainichi-chigau-mono"],
  "hyperuricemia-gout": ["tsuufuu-hossa-timing", "purin-tai-yurai"],
  "iron-deficiency-anemia": ["tetsu-vitamin-c-ekiden"],
  osteoporosis: ["herashitemo-yasenai"],
  "knee-osteoarthritis": ["ashi-kutsu-erabi", "hosuu-5000"],
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
