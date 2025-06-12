import { CalendarType } from '../../domain/calendar-type.enum';

export const CalendarActions = {
  SET_CALENDAR_TYPE: 'SET_CALENDAR_TYPE',
  SET_DATE: 'SET_DATE',
} as const;
export type CalendarActions =
  (typeof CalendarActions)[keyof typeof CalendarActions];

export interface SetDefaultValuesAction {
  type: typeof CalendarActions.SET_CALENDAR_TYPE;
  payload: CalendarType;
}

export interface SetDateAction {
  type: typeof CalendarActions.SET_DATE;
  payload: Date;
}

export type CalendarAction = SetDefaultValuesAction | SetDateAction;
