"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, Blossom } from "../components/Decor";
import InlineRichText from "../components/InlineRichText";
import MedicalWebPageJsonLd from "../components/MedicalWebPageJsonLd";
import { useSite } from "../lib/site";
import {
  SCHOOL_ATTENDANCE_INTRO,
  SCHOOL_ATTENDANCE_CATEGORY_NOTE,
  SCHOOL_ATTENDANCE_TABLE,
  SCHOOL_ATTENDANCE_CAUTION,
  SCHOOL_ATTENDANCE_LAST_REVIEWED,
} from "../lib/school-attendance-data";

const CATEGORY_STYLE: Record<string, string> = {
  第一種: "bg-rose-100 text-rose-700",
  第二種: "bg-primary/15 text-primary-dark",
  第三種: "bg-amber-100 text-amber-800",
  "（学校感染症の指定なし）": "bg-ink/10 text-ink/60",
};

export default function SchoolAttendanceClient() {
  const { t } = useSite();

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <MedicalWebPageJsonLd
        name="学校感染症と出席停止期間の基準"
        description="学校保健安全法施行規則に基づく、お子さんがよくかかる感染症の出席停止期間の目安一覧。"
        url="/school-attendance"
        lastReviewed={SCHOOL_ATTENDANCE_LAST_REVIEWED}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <SectionHeading
              eyebrow="お子さんの感染症"
              title="学校感染症と出席停止期間の基準"
              as="h1"
            />
          </FadeIn>

          <FadeIn delay={0.03}>
            <p className="mt-6 rounded-2xl bg-surface/90 p-4 text-sm leading-relaxed text-ink/70 shadow-card">
              <InlineRichText text={SCHOOL_ATTENDANCE_INTRO} />
            </p>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-8 rounded-[1.75rem] bg-surface/90 p-7 shadow-card">
            <h2 className="text-lg font-bold text-primary-dark">第一種・第二種・第三種とは</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
              <InlineRichText text={SCHOOL_ATTENDANCE_CATEGORY_NOTE} />
            </p>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-8 rounded-[1.75rem] bg-surface/90 p-6 shadow-card sm:p-7">
            <h2 className="text-lg font-bold text-primary-dark">出席停止期間の目安一覧</h2>
            <p className="mt-2 text-xs text-ink/60">
              ※病状・施設の運用により異なる場合があります。最終的な登校（登園）可否は学校・園の指示に従ってください。
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-primary/10">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-primary/10 text-primary-dark">
                    <th className="whitespace-nowrap px-4 py-3 font-bold">感染症</th>
                    <th className="whitespace-nowrap px-4 py-3 font-bold">分類</th>
                    <th className="px-4 py-3 font-bold">出席停止期間の基準</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHOOL_ATTENDANCE_TABLE.map((row, i) => (
                    <tr
                      key={row.disease}
                      className={i % 2 === 0 ? "bg-surface" : "bg-cream/60"}
                    >
                      <td className="whitespace-nowrap px-4 py-3 align-top font-bold text-ink">
                        {row.disease}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 align-top">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${
                            CATEGORY_STYLE[row.category] ?? "bg-ink/10 text-ink/60"
                          }`}
                        >
                          {row.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top leading-relaxed text-ink/80">
                        {row.criteria}
                        {row.note && (
                          <span className="mt-1 block text-xs text-ink/50">※{row.note}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 rounded-[1.75rem] bg-accent/50 p-7">
            <h2 className="text-lg font-bold text-primary-dark">ご登校・ご登園にあたって</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
              <InlineRichText text={SCHOOL_ATTENDANCE_CAUTION} />
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8">
            <p className="rounded-2xl bg-surface/90 p-4 text-xs leading-relaxed text-ink/60 shadow-card">
              根拠法令：学校保健安全法施行規則第18条・第19条（学校において予防すべき感染症の種類および出席停止の期間の基準）。本ページは各種公的資料・学校現場向け資料をもとに一般的な基準を整理したものであり、最新の改正内容や個別の判断については、
              <a
                href="https://www.japaneselawtranslation.go.jp/ja/laws/view/4975"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                e-Gov法令検索
              </a>
              および学校・園・教育委員会への確認をお願いいたします。最終更新日: {SCHOOL_ATTENDANCE_LAST_REVIEWED}
            </p>
          </FadeIn>

          <FadeIn delay={0.16} className="mt-10 text-center">
            <a
              href="https://line.me/R/ti/p/@337njouw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              {t.register.button}
              <span aria-hidden="true">→</span>
            </a>
          </FadeIn>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/diseases"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              疾患一覧へ戻る
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              {t.common.backHome}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
