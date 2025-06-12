import { cn } from '@/lib/utils';
import { truncate } from '@/utils/truncate.util';

import { getEndTime } from '../../utils/get-end-time.util';

export interface CalendarCardProps {
  name: string;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

interface CalendarDayCardProps extends React.ComponentProps<'div'> {
  duration: number;
  prevDuration: number;
  left: number;
  startTime: string;
  name: string;
  hourHandler: Record<string, string>;
}

export const CalendarDayCard: React.FC<CalendarDayCardProps> = ({
  name,
  duration,
  prevDuration,
  left,
  startTime,
  hourHandler,
}) => {
  const { value } = truncate(name, 20);

  return (
    <div
      className={cn(
        'p-1',
        'overflow-hidden truncate',
        'absolute top-1 left-1 z-10',
        'flex flex-col justify-center items-start',
        'text-sm',
        'border border-gray-300 dark:border-gray-800 rounded',
        'bg-gray-200 dark:bg-gray-700',
        'text-gray-800 dark:text-gray-200',
      )}
      style={{
        height: `${duration * 3.4 + (duration - 1) * 0.5}rem`,
        left: `${left * 8 + (left + 1) * 0.3 + (prevDuration - 1) * 4}rem`,
        width: `${8 + (duration - 1) * 4}rem`,
      }}
    >
      <p>
        {startTime} - {getEndTime(hourHandler, startTime, duration)}
      </p>
      <p className="flex-1">{value}</p>
    </div>
  );
};
