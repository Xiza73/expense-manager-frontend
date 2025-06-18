import { cn } from '@/lib/utils';

import { getEndTime } from '../../utils/get-end-time.util';

export const CalendarTask: React.FC<React.ComponentProps<'div'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-start w-32 md:w-56',
        'mt-6 p-4',
        'border border-solid border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CalendarTaskCardProps extends React.ComponentProps<'div'> {
  name: string;
  startTime: string;
  hourHandler: Record<string, string>;
  duration: number;
}

export const CalendarTaskCard: React.FC<CalendarTaskCardProps> = ({
  name,
  startTime,
  hourHandler,
  duration,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-center w-full',
        'px-4 py-2',
        'rounded-sm',
        'border border-gray-300 dark:border-gray-700',
        'bg-gray-200 dark:bg-gray-900',
        className,
      )}
      {...props}
    >
      <p>
        {startTime} - {getEndTime(hourHandler, startTime, duration)}
        <br />
        {name}
      </p>
    </div>
  );
};
