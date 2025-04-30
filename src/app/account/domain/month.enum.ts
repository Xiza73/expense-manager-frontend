export enum MonthKey {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
}

export const Month = {
  [MonthKey.JANUARY]: 'january',
  [MonthKey.FEBRUARY]: 'february',
  [MonthKey.MARCH]: 'march',
  [MonthKey.APRIL]: 'april',
  [MonthKey.MAY]: 'may',
  [MonthKey.JUNE]: 'june',
  [MonthKey.JULY]: 'july',
  [MonthKey.AUGUST]: 'august',
  [MonthKey.SEPTEMBER]: 'september',
  [MonthKey.OCTOBER]: 'october',
  [MonthKey.NOVEMBER]: 'november',
  [MonthKey.DECEMBER]: 'december',
} as const;
export type Month = (typeof Month)[keyof typeof Month];

export const getMonthKey = (month: Month): MonthKey => {
  return Object.values(MonthKey).find(
    (key) => Month[key] === month,
  ) as MonthKey;
};
