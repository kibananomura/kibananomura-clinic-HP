import holidayJp from "@holiday-jp/holiday_jp";
import { SCHEDULE, type ScheduleSlot } from "./schedule";

/**
 * 「今、空いていますか？」に答えるための、現在の受付状況。
 * キバナビ（chatbot-server.ts）が毎回サーバー側で計算してプロンプトに渡す（AIに日時や残り時間を計算させない）。
 * 年末年始・お盆などの臨時休診は、ここには入っていない。
 */

export const OPENING_DATE = "2027-10-01";

const WEEKDAYS_JA = ["日", "月", "火", "水", "木", "金", "土"];
const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type JstDay = { ymd: string; month: number; day: number; dow: number };

const jstFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function jstParts(date: Date) {
  const p = Object.fromEntries(jstFormat.formatToParts(date).map((x) => [x.type, x.value]));
  const ymd = `${p.year}-${p.month}-${p.day}`;
  return { ymd, minutes: Number(p.hour) * 60 + Number(p.minute) };
}

function dayOf(ymd: string): JstDay {
  // 日付だけを扱うため、UTCの正午として作る（どのタイムゾーンのサーバーでも同じ日付になる）
  const d = new Date(`${ymd}T12:00:00Z`);
  return { ymd, month: d.getUTCMonth() + 1, day: d.getUTCDate(), dow: d.getUTCDay() };
}

function addDays(ymd: string, n: number) {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function toMinutes(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

function holidayName(ymd: string): string | null {
  const date = new Date(`${ymd}T12:00:00Z`);
  if (!holidayJp.isHoliday(date)) return null;
  return holidayJp.between(date, date)[0]?.name ?? "祝日";
}

/** その日の受付枠（土日祝は空） */
function slotsOf(day: JstDay): { label: "am" | "pm"; slot: Required<ScheduleSlot> }[] {
  if (day.dow === 0 || day.dow === 6 || holidayName(day.ymd)) return [];
  const schedule = SCHEDULE[day.dow - 1];
  return (["am", "pm"] as const)
    .map((label) => ({ label, slot: schedule[label] }))
    .filter((s): s is { label: "am" | "pm"; slot: Required<ScheduleSlot> } => s.slot.open && !!s.slot.start && !!s.slot.end);
}

/** 今より後の、いちばん近い受付開始 */
function nextOpening(today: string, nowMinutes: number) {
  for (let i = 0; i < 14; i++) {
    const day = dayOf(addDays(today, i));
    for (const { slot } of slotsOf(day)) {
      if (i > 0 || toMinutes(slot.start) > nowMinutes) return { day, start: slot.start, isToday: i === 0 };
    }
  }
  return null;
}

/** キバナビに渡す「現在の受付状況」の説明文 */
export function clinicStatusText(now: Date = new Date()): string {
  const { ymd, minutes } = jstParts(now);
  const today = dayOf(ymd);
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  const lines = [
    `現在の日時：${today.month}月${today.day}日（${WEEKDAYS_JA[today.dow]}）${hh}:${mm}（日本時間）／Now: ${WEEKDAYS_EN[today.dow]} ${ymd} ${hh}:${mm} (Japan time)`,
  ];

  if (ymd < OPENING_DATE) {
    lines.push("当院は2027年10月1日開院予定で、現在はまだ診療を行っていません（開院前）。受付時間は開院後のものです。");
    return lines.join("\n");
  }

  const slots = slotsOf(today);
  const current = slots.find(({ slot }) => minutes >= toMinutes(slot.start) && minutes < toMinutes(slot.end));
  if (current) {
    const remaining = toMinutes(current.slot.end) - minutes;
    lines.push(
      `現在は${current.label === "am" ? "午前" : "午後"}の受付時間内です（${current.slot.start}〜${current.slot.end}）。受付終了の${current.slot.end}まで、あと${remaining}分です。`
    );
    if (current.label === "am") {
      const pm = slots.find((s) => s.label === "pm");
      if (pm) lines.push(`午前の受付終了後は、${pm.slot.start}から午後の受付があります。`);
    }
    return lines.join("\n");
  }

  const holiday = holidayName(ymd);
  if (slots.length === 0) {
    lines.push(`本日は休診日です（${holiday ? `祝日：${holiday}` : `${WEEKDAYS_JA[today.dow]}曜日`}）。`);
  } else if (minutes < toMinutes(slots[0].slot.start)) {
    lines.push("現在は受付開始前です。");
  } else if (slots.some((s) => s.label === "pm") && minutes < toMinutes(slots.find((s) => s.label === "pm")!.slot.start)) {
    lines.push("現在は昼休み（受付時間外）です。");
  } else {
    lines.push("本日の受付は終了しました。");
  }

  const next = nextOpening(ymd, minutes);
  if (next) {
    lines.push(
      next.isToday
        ? `次の受付は、本日${next.start}からです。`
        : `次の受付は、${next.day.month}月${next.day.day}日（${WEEKDAYS_JA[next.day.dow]}）${next.start}からです。`
    );
  }
  return lines.join("\n");
}
