import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { WeekShort } from '../../constants/week.constant';
import { useCalendar } from '../../context/calendar/calendar.context';
import { CalendarDay, PartialData } from '../../domain/calendar-day.interface';
import { getDateId, isSameDate } from '../../utils/get-date-id.util';
import { CalendarTableProps } from './Calendar';

export const CalendarMonth = <T extends PartialData>({
  startsOnMonday = false,
  className,
  data,
  ...props
}: CalendarTableProps<T>) => {
  const { t } = useTranslation();
  const { date } = useCalendar();

  const [weeksInMonth, setWeeksInMonth] = useState(0);
  const [days, setDays] = useState<CalendarDay<T>[]>([]);

  const weekNames = !startsOnMonday
    ? Object.values(WeekShort)
    : Object.values(WeekShort).slice(1).concat(Object.values(WeekShort)[0]);

  useEffect(() => {
    handleDays(date);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const handleDays = (date: Date): void => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    // const lastDayOfWeek = lastDayOfMonth.getDay();
    const startNullSpaces = startsOnMonday
      ? firstDayOfWeek === 0
        ? 6
        : firstDayOfWeek - 1
      : firstDayOfWeek;
    const endNullSpaces = 0;

    setWeeksInMonth(
      Math.ceil((startNullSpaces + daysInMonth + endNullSpaces) / 7),
    );

    setDays([
      ...Array.from({ length: startNullSpaces }, (_, i) => ({
        id: i.toString(),
        data: [],
      })),
      ...Array.from({ length: daysInMonth }, (_, i) => {
        const thisDate = new Date(
          firstDayOfMonth.getFullYear(),
          firstDayOfMonth.getMonth(),
          i + 1,
        );
        const id = getDateId(thisDate);

        return {
          id,
          date: thisDate,
          data: data.filter((data) => data.dayId === id),
        };
      }),
      ...Array.from({ length: endNullSpaces }, (_, i) => ({
        id: i.toString(),
        data: data,
      })),
    ]);
  };

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden border-collapse">
      <table
        className={cn(
          'w-full mt-6 min-w-xl',
          'border-collapse border border-gray-200 dark:border-gray-700',
          className,
        )}
        {...props}
      >
        <thead>
          <tr>
            {weekNames.map((week) => (
              <th
                key={week}
                className={cn(
                  'border border-gray-200 dark:border-gray-700',
                  'text-center text-gray-600 dark:text-gray-400',
                  'font-semibold',
                )}
              >
                {t(week)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: weeksInMonth }, (_, week) => (
            <tr key={week}>
              {days.slice(week * 7, week * 7 + 7).map((day) => {
                if (!day.date) {
                  return (
                    <td
                      key={day.id}
                      className={cn('min-w-60 h-32')}
                    ></td>
                  );
                }

                return (
                  <td
                    key={day.id}
                    className={cn(
                      'min-w-60 h-32',
                      'text-center',
                      'border border-gray-200 dark:border-gray-700',
                      'bg-gray-50 dark:bg-gray-950',
                      'text-gray-800 dark:text-gray-200',
                      isSameDate(day.date, date) &&
                        'bg-blue-100 dark:bg-blue-800',
                    )}
                  >
                    <div
                      className={cn(
                        'flex flex-col justify-center items-start',
                        'h-full w-full',
                      )}
                    >
                      <div className="ml-auto mr-2">{day.date?.getDate()}</div>
                      <div className="flex-1 p-2">box</div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
