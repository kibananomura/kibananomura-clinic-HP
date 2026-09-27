"use client";

import { useEffect, useState } from "react";
import { useSite } from "../lib/site";

// 開院予定日：2027年10月1日（JST 00:00）
const OPENING_DATE = new Date("2027-10-01T00:00:00+09:00");

type Remaining = { months: number; days: number; totalDays: number };

function monthsAndDaysUntilOpening(): Remaining {
  const now = new Date();
  const totalDays = Math.ceil((OPENING_DATE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // 暦月ベースで「あと◯ヶ月◯日」を算出する
  let months = (OPENING_DATE.getFullYear() - now.getFullYear()) * 12 + (OPENING_DATE.getMonth() - now.getMonth());
  const monthAnchor = new Date(now);
  monthAnchor.setMonth(monthAnchor.getMonth() + months);
  if (monthAnchor.getTime() > OPENING_DATE.getTime()) {
    months -= 1;
    monthAnchor.setMonth(monthAnchor.getMonth() - 1);
  }
  const days = Math.ceil((OPENING_DATE.getTime() - monthAnchor.getTime()) / (1000 * 60 * 60 * 24));

  return { months: Math.max(months, 0), days: Math.max(days, 0), totalDays };
}

/**
 * 開院までの残り期間（◯ヶ月◯日）を表示するバッジ。
 * サーバー/クライアントでの日付ズレによるハイドレーション不整合を避けるため、
 * マウント後にのみ実際の日数を計算・表示する（マウント前は非表示）。
 */
export default function OpeningCountdown() {
  const { lang } = useSite();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(monthsAndDaysUntilOpening());
  }, []);

  if (remaining === null) {
    // マウント前は何も表示しない（サーバー描画とクライアント初回描画を一致させる）
    return null;
  }

  if (remaining.totalDays <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary-dark ring-1 ring-primary/20">
        {lang === "ja" ? "開院しました" : "Now open"}
      </span>
    );
  }

  const { months, days } = remaining;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary-dark ring-1 ring-primary/20">
      {lang === "ja" ? (
        <>
          開院まであと {months > 0 && <>{months}ヶ月</>} {days}日
        </>
      ) : (
        <>
          {months > 0 && <>{months} mo </>}
          {days} days until opening
        </>
      )}
    </span>
  );
}
