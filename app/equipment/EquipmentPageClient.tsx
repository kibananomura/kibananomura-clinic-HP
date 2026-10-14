"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, LeafSprig } from "../components/Decor";
import { useSite } from "../lib/site";
import { equipment } from "../lib/equipment";

export default function EquipmentPageClient() {
  const { t, lang } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -right-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            eyebrow={t.equipment.eyebrow}
            title={t.equipment.heading}
            as="h1"
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-relaxed text-ink/75">
            {t.equipment.intro}
          </p>
        </FadeIn>

        {lang === "ja" && (
          <FadeIn delay={0.07}>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto rounded-2xl border border-primary/10">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <caption className="sr-only">院内で即日実施可能な主な検査一覧</caption>
                <thead>
                  <tr className="bg-primary/10 text-primary-dark">
                    <th scope="col" className="whitespace-nowrap px-4 py-3 font-bold">検査名</th>
                    <th scope="col" className="px-4 py-3 font-bold">特徴</th>
                    <th scope="col" className="px-4 py-3 font-bold">こんな時に</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "16列CT", feature: "痛み・被ばくを抑えた開放的な装置、短時間で撮影", use: "腹部・頭部の精査、外傷後の確認等" },
                    { name: "経鼻内視鏡（胃カメラ）", feature: "鼻から挿入、会話しながら楽に受けられる", use: "胃痛・胸やけ・ピロリ菌精査等" },
                    { name: "腹部エコー（超音波）", feature: "痛み・被ばくなし、お子さんから高齢の方まで", use: "肝臓・胆のう・腎臓等の観察" },
                    { name: "デジタルX線（レントゲン）", feature: "低被ばく、その場ですぐ画像確認", use: "胸部・骨・副鼻腔の確認等" },
                    { name: "FeNO（呼気NO検査）", feature: "息を吐くだけ、数分で終了", use: "長引く咳・気管支喘息の診断と経過確認" },
                    { name: "処置室（外科小手術）", feature: "外科専門医による日帰り対応", use: "粉瘤・脂肪腫の切除、巻き爪処置、縫合等" },
                  ].map((row) => (
                    <tr key={row.name} className="odd:bg-surface even:bg-cream/60">
                      <th scope="row" className="whitespace-nowrap px-4 py-3 align-top font-bold text-ink">
                        {row.name}
                      </th>
                      <td className="px-4 py-3 align-top leading-relaxed text-ink/80">{row.feature}</td>
                      <td className="px-4 py-3 align-top leading-relaxed text-ink/80">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        )}

        <div className="mx-auto mt-10 max-w-4xl space-y-6">
          {equipment.map((item, i) => {
            const c = lang === "en" ? item.en : item.ja;
            return (
              <FadeIn key={c.name} delay={Math.min(i * 0.05, 0.2)}>
                <article className="grid items-stretch gap-0 overflow-hidden rounded-3xl bg-surface/90 shadow-card sm:grid-cols-2">
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[220px]">
                    <Image
                      src={item.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7">
                    <h2 className="text-lg font-bold text-primary-dark sm:text-xl">
                      {c.name}
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.9] text-ink/80">
                      {c.body}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-ink/50">
          {t.equipment.imageNote}
        </p>

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
