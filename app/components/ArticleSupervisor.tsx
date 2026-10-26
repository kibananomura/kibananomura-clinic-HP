import Link from "next/link";
import { useSite } from "../lib/site";

/**
 * 症状・疾患解説ページ等、医療情報コンテンツの末尾に表示する「執筆・監修」ボックス。
 * E-E-A-T（経験・専門性・権威性・信頼性）対策として、記事内容の責任者を明示する。
 * 資格・経歴は app/lib/site.tsx の director.qualifications / director.bio と一致させること。
 */
export default function ArticleSupervisor() {
  const { t, lang } = useSite();

  return (
    <div className="mt-8 rounded-[1.75rem] border border-primary/15 bg-surface/90 p-6 shadow-card sm:p-7">
      <p className="text-xs font-bold text-ink/50">
        {lang === "en" ? "Written & reviewed by" : "この記事の執筆・監修"}
      </p>
      <div className="mt-3 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary-dark">
          {lang === "en" ? "N" : "野"}
        </div>
        <div>
          <p className="text-[15px] font-bold text-ink">
            {lang === "en"
              ? `Kibana Nomura General Medicine Clinic — ${t.director.name}, Director`
              : (
                  <>
                    木花のむら総合診療所 院長{"　"}
                    <span className="whitespace-nowrap">野村 信介</span>
                  </>
                )}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">
            {lang === "en"
              ? t.director.qualifications.join(" / ")
              : "防衛医科大学校卒／日本外科学会専門医／日本消化器外科学会専門医／日本医師会認定健康スポーツ医"}
          </p>
          <Link
            href="/#director"
            className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary-dark underline underline-offset-2 hover:text-primary"
          >
            {lang === "en" ? "Meet the director" : "院長紹介を見る"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
