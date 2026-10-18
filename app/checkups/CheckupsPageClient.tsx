"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, LeafSprig } from "../components/Decor";
import { useSite } from "../lib/site";
import InlineRichText from "../components/InlineRichText";

const CHECKUPS_JA = [
  {
    name: "健康診断",
    feature: "問診・身体計測・血圧・血液検査・尿検査など、一般的な項目をひととおり確認します。",
    age: "年齢制限なし",
    use: "年に一度、ご自身の健康状態を確認しておきたい方に。",
  },
  {
    name: "人間ドック（半日ドック）",
    feature: "一般的な健康診断よりも詳しい検査項目を、半日でまとめて受けていただけます。",
    age: "年齢制限なし",
    use: "より詳しく調べて安心したい方、毎年しっかり健診を受けたい方に。",
  },
  {
    name: "特定健診（メタボ健診）",
    feature: "生活習慣病予防のための健診です。宮崎市等の制度に準じて実施予定です。",
    age: "40〜74歳",
    use: "対象年齢で、健康保険証をお持ちの方に。",
  },
  {
    name: "ABC検診（胃がんリスク検診）",
    feature: "血液検査（ペプシノゲン検査・ピロリ菌抗体検査）の組み合わせで、胃がんのなりやすさを調べます。",
    age: "40歳以上目安",
    use: "胃カメラの前段階として、まずリスクを知っておきたい方に。",
  },
  {
    name: "胃がん検診",
    feature: "胃内視鏡（胃カメラ）または胃部X線検査による、胃がんの早期発見を目的とした検診です。",
    age: "40歳以上目安（内視鏡は50歳以上が中心）",
    use: "定期的に胃がん検診を受けたい方に。",
  },
  {
    name: "大腸がん検診",
    feature: "便潜血検査（2日法）による、大腸がんの早期発見を目的とした検診です。",
    age: "40歳以上目安",
    use: "定期的に大腸がん検診を受けたい方に。",
  },
  {
    name: "肺がん検診",
    feature: "胸部X線検査（必要に応じて喀痰細胞診）による、肺がんの早期発見を目的とした検診です。",
    age: "40歳以上目安",
    use: "定期的に肺がん検診を受けたい方に。",
  },
  {
    name: "結核健診（定期健康診断）",
    feature: "感染症法に基づく、結核の定期健康診断です。胸部X線検査を行います（施設・業務により65歳未満の方が対象となる場合もあります）。",
    age: "65歳以上が中心",
    use: "65歳以上の方、または施設・業務上の定期健診対象となる方に。",
  },
  {
    name: "肝炎ウイルス検診",
    feature: "B型・C型肝炎ウイルスへの感染の有無を調べる血液検査です。",
    age: "年齢制限なし",
    use: "これまで肝炎検査を受けたことがない方に。",
  },
  {
    name: "企業健診（法定健診）",
    feature: "労働安全衛生法に基づく、事業所の従業員の皆さまを対象とした健康診断です（雇入時健診・定期健診等）。",
    age: "年齢制限なし",
    use: "従業員の健診先をお探しの、地域の事業所の方に。",
  },
  {
    name: "特定業務従事者の健康診断",
    feature: "深夜業・有害業務など、労働安全衛生規則で定められた特定の業務に従事する方を対象とした、通常より頻度の高い健康診断です（概ね6ヶ月に1回）。",
    age: "年齢制限なし",
    use: "特定業務に従事する従業員の方、その事業所の方に。",
  },
  {
    name: "肺がん2次検診（精密検査）",
    feature: "健診等の胸部X線で影を指摘された方向けに、**院内のCT設備**を用いた精密検査を行います。",
    age: null,
    use: "健診で「要精査」となり、肺の詳しい検査が必要な方に。",
  },
];

export default function CheckupsPageClient() {
  const { t, lang } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -right-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            eyebrow={t.services.checkupsBadge}
            title={t.services.checkupsTitle}
            as="h1"
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-relaxed text-ink/75">
            {t.services.checkupsBody}
          </p>
        </FadeIn>

        {lang === "ja" ? (
          <FadeIn delay={0.07}>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto rounded-2xl border border-primary/10">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <caption className="sr-only">対応予定の健康診断・各種検診の一覧</caption>
                <thead>
                  <tr className="bg-primary/10 text-primary-dark">
                    <th scope="col" className="whitespace-nowrap px-4 py-3 font-bold">検診名</th>
                    <th scope="col" className="px-4 py-3 font-bold">内容</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-3 font-bold">対象年齢</th>
                    <th scope="col" className="px-4 py-3 font-bold">こんな方に</th>
                  </tr>
                </thead>
                <tbody>
                  {CHECKUPS_JA.map((row) => (
                    <tr key={row.name} className="odd:bg-surface even:bg-cream/60">
                      <th scope="row" className="whitespace-nowrap px-4 py-3 align-top font-bold text-ink">
                        {row.name}
                      </th>
                      <td className="px-4 py-3 align-top leading-relaxed text-ink/80">
                        <InlineRichText text={row.feature} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 align-top">
                        {row.age ? (
                          <strong className="font-bold text-primary-dark underline decoration-primary/40 underline-offset-2">
                            {row.age}
                          </strong>
                        ) : (
                          <span className="text-ink/50">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top leading-relaxed text-ink/80">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.07}>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink/80">
              {t.services.checkupsTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </FadeIn>
        )}

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink/70">
            {lang === "ja"
              ? "料金・開始時期は現在調整中です。詳細が決まり次第、料金ページでご案内します。"
              : "Pricing and launch timing are still being finalized. Details will be published on our pricing page."}
          </p>
          <p className="mt-2 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
            >
              {t.services.pricingLink}
            </Link>
          </p>
        </FadeIn>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
          >
            <span aria-hidden="true">←</span>
            {t.common.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
