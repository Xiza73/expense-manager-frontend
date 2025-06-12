export const Week = {
  SUNDAY: 'sunday',
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
} as const;
export type Week = (typeof Week)[keyof typeof Week];

export const WeekShort = {
  SUN: 'sun',
  MON: 'mon',
  TUE: 'tue',
  WED: 'wed',
  THU: 'thu',
  FRI: 'fri',
  SAT: 'sat',
} as const;
export type WeekShort = (typeof WeekShort)[keyof typeof WeekShort];

export const getWeek = (date: Date): Week => {
  const day = date.getDay();

  const weekDays: Week[] = Object.values(Week);

  return weekDays[day] || Week.SUNDAY;
};

export const getWeekShort = (date: Date): WeekShort => {
  const day = date.getDay();

  const weekDays: WeekShort[] = Object.values(WeekShort);

  return weekDays[day] || WeekShort.SUN;
};
