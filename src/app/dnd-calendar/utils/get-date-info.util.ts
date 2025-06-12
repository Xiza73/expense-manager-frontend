import { CalendarType } from '../domain/calendar-type.enum';

export const getDateInfo = (date: Date, calendarType: CalendarType): string => {
  if (calendarType === CalendarType.MONTH) {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  if (calendarType === CalendarType.WEEK) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
};
