import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Text } from '@/components/ui/text';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

import { Format, Hour } from '../../constants/hour.constant';
import { useCalendar } from '../../context/calendar/calendar.context';
import { PartialData } from '../../domain/calendar-day.interface';
import { CalendarType } from '../../domain/calendar-type.enum';
import { CalendarDay } from './CalendarDay';
import { CalendarMonth } from './CalendarMonth';
import { CalendarWeek } from './CalendarWeek';

export const Calendar: React.FC<React.ComponentProps<'div'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CalendarHeader: React.FC<React.ComponentProps<'div'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-center justify-between w-full gap-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CalendarTableProps<T extends PartialData>
  extends React.ComponentProps<'table'> {
  data: T[];
  startTime?: Hour;
  endTime?: Hour;
  format?: Format;
  startsOnMonday?: boolean;
  onAddItem?: (item: T) => void;
  onDeleteItem?: (item: T) => void;
  onUpdateItem?: (item: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CalendarTableHandler: Record<CalendarType, React.FC<any>> = {
  [CalendarType.MONTH]: CalendarMonth,
  [CalendarType.WEEK]: CalendarWeek,
  [CalendarType.DAY]: CalendarDay,
};

export const CalendarTable = <T extends PartialData>(
  props: CalendarTableProps<T>,
) => {
  const { calendarType } = useCalendar();

  const Component = CalendarTableHandler[calendarType];

  return <Component {...props} />;
};

export const CalendarTodayButton: React.FC<React.ComponentProps<'button'>> = ({
  className,
  ...props
}) => {
  const { setToday } = useCalendar();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <Button
      className={cn('rounded-full', className)}
      onClick={() => setToday()}
      {...props}
    >
      Today
    </Button>
  );
};

export const CalendarPrevButton: React.FC<React.ComponentProps<'button'>> = ({
  className,
  ...props
}) => {
  const { calendarType, date, setDate } = useCalendar();

  const handleClick = () => {
    if (calendarType === CalendarType.MONTH) {
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));

      return;
    }

    if (calendarType === CalendarType.DAY) {
      setDate(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
      );
    }

    if (calendarType === CalendarType.WEEK) {
      const prevWeekStart = new Date(date);
      prevWeekStart.setDate(date.getDate() - 7);
      setDate(prevWeekStart);
    }
  };

  return (
    <Button
      className={cn('rounded-full', className)}
      variant="ghost"
      onClick={handleClick}
      {...props}
    >
      <ChevronLeft className="w-6 h-6" />
    </Button>
  );
};

export const CalendarNextButton: React.FC<React.ComponentProps<'button'>> = ({
  className,
  ...props
}) => {
  const { calendarType, date, setDate } = useCalendar();

  const handleClick = () => {
    if (calendarType === CalendarType.MONTH) {
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));

      return;
    }

    if (calendarType === CalendarType.DAY) {
      setDate(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      );
    }

    if (calendarType === CalendarType.WEEK) {
      const nextWeekStart = new Date(date);
      nextWeekStart.setDate(date.getDate() + 7);
      setDate(nextWeekStart);
    }
  };

  return (
    <Button
      className={cn('rounded-full', className)}
      variant="ghost"
      onClick={handleClick}
      {...props}
    >
      <ChevronRight className="w-6 h-6" />
    </Button>
  );
};

interface CalendarDateInfoProps extends React.ComponentProps<'div'> {
  showPrevButton?: boolean;
  showNextButton?: boolean;
}

export const CalendarDateInfo: React.FC<CalendarDateInfoProps> = ({
  className,
  showPrevButton = true,
  showNextButton = true,
  ...props
}) => {
  const { dateInfo } = useCalendar();

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      {showPrevButton && <CalendarPrevButton className="mr-2" />}
      <Text className="text-lg font-semibold">{dateInfo}</Text>
      {showNextButton && <CalendarNextButton className="ml-2" />}
    </div>
  );
};

interface CalendarTypeSelectorProps {
  className?: string;
}

export const CalendarTypeSelector: React.FC<CalendarTypeSelectorProps> = ({
  className,
}) => {
  const { calendarType, setCalendarType, setToday } = useCalendar();
  const isMobile = useIsMobile();

  const handleCalendarTypeChange = (value: string) => {
    if (!value) return;

    setCalendarType(value as CalendarType);
  };

  if (isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{calendarType}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Calendar Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={calendarType}
            onValueChange={handleCalendarTypeChange}
          >
            {Object.values(CalendarType).map((type) => (
              <DropdownMenuRadioItem
                key={type}
                value={type}
                className="cursor-pointer"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setToday()}
            className="cursor-pointer justify-center"
          >
            Today
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <ToggleGroup
      type="single"
      value={calendarType}
      onValueChange={handleCalendarTypeChange}
      className={cn('flex items-center', className)}
    >
      {Object.values(CalendarType).map((type) => (
        <ToggleGroupItem
          key={type}
          value={type}
          className={cn(
            'cursor-pointer rounded px-2 py-1 text-sm',
            'bg-transparent hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-100 data-[state=on]:bg-gray-300',
            'dark:hover:bg-gray-700 dark:active:bg-gray-800 dark:focus:bg-gray-600 dark:data-[state=on]:bg-gray-800',
          )}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
