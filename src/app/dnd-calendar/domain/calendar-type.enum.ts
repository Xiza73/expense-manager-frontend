export const CalendarType = {
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
} as const;
export type CalendarType = (typeof CalendarType)[keyof typeof CalendarType];
