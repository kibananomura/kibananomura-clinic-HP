export type ScheduleSlot = {
  open: boolean;
  start?: string;
  end?: string;
};

export type ScheduleDay = {
  am: ScheduleSlot;
  pm: ScheduleSlot;
};

/** 水曜PM の配列インデックス（月=0, 火=1, 水=2） */
export const WED_PM_INDEX = 2;

/**
 * 月〜金（土日祝休み）の受付時間。午前・午後とも診療。
 */
export const SCHEDULE: ScheduleDay[] = [
  // 月 8:30–12:00 + 15:00–18:30
  {
    am: { open: true, start: "8:30", end: "12:00" },
    pm: { open: true, start: "15:00", end: "18:30" },
  },
  // 火 8:30–12:00 + 15:00–18:30
  {
    am: { open: true, start: "8:30", end: "12:00" },
    pm: { open: true, start: "15:00", end: "18:30" },
  },
  // 水 8:30–12:00 + 15:00–18:30
  {
    am: { open: true, start: "8:30", end: "12:00" },
    pm: { open: true, start: "15:00", end: "18:30" },
  },
  // 木 8:30–12:00 + 15:00–18:30
  {
    am: { open: true, start: "8:30", end: "12:00" },
    pm: { open: true, start: "15:00", end: "18:30" },
  },
  // 金 8:30–12:00 + 15:00–18:30
  {
    am: { open: true, start: "8:30", end: "12:00" },
    pm: { open: true, start: "15:00", end: "18:30" },
  },
];
