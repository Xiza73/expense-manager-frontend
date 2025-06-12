import { cn } from '@/lib/utils';

import { Format, getHours, Hour, Hour12 } from '../../constants/hour.constant';
import { useCalendar } from '../../context/calendar/calendar.context';
import { PartialData } from '../../domain/calendar-day.interface';
import { getDateId } from '../../utils/get-date-id.util';
import { CalendarDayCard } from '../CalendarCard/CalendarCard';

export interface CalendarDayProps<T extends PartialData>
  extends React.ComponentProps<'table'> {
  data: T[];
  startTime?: Hour;
  endTime?: Hour;
  format?: Format;
}

interface HourData<T> {
  hour: string;
  data: T[];
}

export const CalendarDay = <T extends PartialData>({
  className,
  data,
  startTime = Hour['00:00'],
  endTime = Hour['23:30'],
  format = Format.HOUR_24,
  ...props
}: CalendarDayProps<T>) => {
  const { date } = useCalendar();
  const dateId = getDateId(date);

  const hoursHeader = getHours(startTime, endTime, format);

  const hourData: HourData<T>[] = hoursHeader.map(({ id, hour }) => ({
    hour,
    data: data.filter((data) => data.hourId === id && data.dayId === dateId),
  }));

  const maxDuration = Math.max(...hourData.map(({ data }) => data.length + 1));

  const HourHandler = format === Format.HOUR_12 ? Hour12 : Hour;

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden border-collapse mt-6">
      <table
        className={cn(
          'border-collapse border border-gray-200 dark:border-gray-700',
          className,
        )}
        style={{
          width: `${(maxDuration + 1) * 8 + maxDuration * 0.5}rem`,
          minWidth: '100%',
        }}
        {...props}
      >
        <tbody>
          {hourData.map(({ hour, data }) => (
            <tr key={hour}>
              <th
                className={cn(
                  'h-16 w-32 pl-2',
                  'border border-gray-200 dark:border-gray-700',
                  'text-start text-gray-600 dark:text-gray-400',
                  'font-semibold',
                )}
              >
                {hour}
              </th>
              <td
                className={cn(
                  'h-16 p-2',
                  'relative',
                  'border border-gray-200 dark:border-gray-700',
                  'bg-gray-50 dark:bg-gray-950',
                  'text-gray-800 dark:text-gray-200',
                )}
              >
                {data.map((el, index) => (
                  <CalendarDayCard
                    key={index}
                    name={el.name}
                    duration={el.duration}
                    prevDuration={data[index - 1]?.duration || 1}
                    left={index}
                    startTime={el.hourId}
                    hourHandler={HourHandler}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
