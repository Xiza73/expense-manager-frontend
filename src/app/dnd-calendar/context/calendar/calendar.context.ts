import { createContext } from '@/utils/create-context.util';

import { CalendarType } from '../../domain/calendar-type.enum';
import { CalendarContextProps, CalendarState } from './calendar.interface';

export const initialState: CalendarState = {
  defaultCalendarType: CalendarType.DAY,
  dateInfo: '',
  date: new Date(),
  calendarType: CalendarType.DAY,
};

export const [CalendarContext, useCalendar] =
  createContext<CalendarContextProps>(
    {
      ...initialState,
      setCalendarType: (_: CalendarType) => {},
      setDate: (_: Date) => {},
      setToday: () => {},
    },
    'Calendar',
  );
