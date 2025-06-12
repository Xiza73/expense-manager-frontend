import { CalendarType } from '../../domain/calendar-type.enum';

export interface CalendarState {
  defaultCalendarType: CalendarType;
  calendarType: CalendarType;
  date: Date;
  dateInfo: string;
}

export interface CalendarContextProps extends CalendarState {
  setCalendarType: (calendarType: CalendarType) => void;
  setDate: (date: Date) => void;
  setToday: () => void;
}

export interface CalendarProviderProps {
  defaultCalendarType?: CalendarType;
  children: React.ReactNode;
}
