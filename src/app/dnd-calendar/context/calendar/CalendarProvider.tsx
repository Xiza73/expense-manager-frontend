import { useCallback, useMemo, useReducer } from 'react';

import { CalendarType } from '../../domain/calendar-type.enum';
import { getDateInfo } from '../../utils/get-date-info.util';
import { CalendarActions } from './calendar.action';
import { CalendarContext, initialState } from './calendar.context';
import { CalendarProviderProps } from './calendar.interface';
import { calendarReducer } from './calendar.reducer';

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  defaultCalendarType = initialState.defaultCalendarType,
  children,
}) => {
  const [state, dispatch] = useReducer(calendarReducer, {
    ...initialState,
    calendarType: defaultCalendarType,
    dateInfo: getDateInfo(new Date(), defaultCalendarType),
  });

  const setCalendarType = useCallback((calendarType: CalendarType) => {
    dispatch({
      type: CalendarActions.SET_CALENDAR_TYPE,
      payload: calendarType,
    });
  }, []);

  const setDate = useCallback((date: Date) => {
    dispatch({
      type: CalendarActions.SET_DATE,
      payload: date,
    });
  }, []);

  const setToday = useCallback(() => {
    dispatch({
      type: CalendarActions.SET_DATE,
      payload: new Date(),
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setCalendarType,
      setDate,
      setToday,
    }),
    [state, setCalendarType, setDate, setToday],
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
