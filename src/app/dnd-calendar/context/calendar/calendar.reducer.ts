import { getDateInfo } from '../../utils/get-date-info.util';
import {
  CalendarAction,
  CalendarActions,
  SetDateAction,
  SetDefaultValuesAction,
} from './calendar.action';
import { CalendarState } from './calendar.interface';

type CalendarHandler = (
  state: CalendarState,
  action: CalendarAction,
) => CalendarState;

const calendarReducerHandler: Record<CalendarActions, CalendarHandler> = {
  [CalendarActions.SET_CALENDAR_TYPE]: (state, action) => ({
    ...state,
    calendarType: (action as SetDefaultValuesAction).payload,
    dateInfo: getDateInfo(
      state.date,
      (action as SetDefaultValuesAction).payload,
    ),
  }),
  [CalendarActions.SET_DATE]: (state, action) => ({
    ...state,
    date: (action as SetDateAction).payload,
    dateInfo: getDateInfo(
      (action as SetDateAction).payload,
      state.calendarType,
    ),
  }),
};

export const calendarReducer = (
  state: CalendarState,
  action: CalendarAction,
): CalendarState => calendarReducerHandler[action.type](state, action) ?? state;
