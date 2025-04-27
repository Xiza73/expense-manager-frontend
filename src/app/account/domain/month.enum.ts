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
  [MonthKey.JANUARY]: 'January',
  [MonthKey.FEBRUARY]: 'February',
  [MonthKey.MARCH]: 'March',
  [MonthKey.APRIL]: 'April',
  [MonthKey.MAY]: 'May',
  [MonthKey.JUNE]: 'June',
  [MonthKey.JULY]: 'July',
  [MonthKey.AUGUST]: 'August',
  [MonthKey.SEPTEMBER]: 'September',
  [MonthKey.OCTOBER]: 'October',
  [MonthKey.NOVEMBER]: 'November',
  [MonthKey.DECEMBER]: 'December',
} as const;
export type Month = (typeof Month)[keyof typeof Month];

export const getMonthKey = (month: Month): MonthKey => {
  return Object.values(MonthKey).find(
    (key) => Month[key] === month,
  ) as MonthKey;
};
