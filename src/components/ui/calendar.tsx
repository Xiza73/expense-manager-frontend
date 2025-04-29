import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  disableNavigation = false,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-4 mx-auto',
        month_caption: 'flex justify-center items-center text-sm font-medium',
        caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-x-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative size-8 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        weekday: cn('inline-flex', 'size-8 p-0 pl-2 font-thin text-sm'),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal aria-selected:opacity-100 cursor-pointer',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal aria-selected:opacity-100 cursor-pointer',
        ),
        day_range_start:
          'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
        day_range_end:
          'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground pointer-events-none',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground pointer-events-none',
        day_today: 'bg-accent text-accent-foreground',
        outside:
          'outside-outside text-muted-foreground aria-selected:text-muted-foreground cursor-not-allowed',
        day_outside:
          'day-outside text-muted-foreground aria-selected:text-muted-foreground cursor-not-allowed',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        PreviousMonthButton: ({ className, ...props }) =>
          disableNavigation ? (
            <></>
          ) : (
            <Button
              variant="ghost"
              className={cn(className)}
              {...props}
            >
              <ChevronLeft className="size-4" />
            </Button>
          ),
        NextMonthButton: ({ className, ...props }) =>
          disableNavigation ? (
            <></>
          ) : (
            <Button
              variant="ghost"
              className={cn(className)}
              {...props}
            >
              <ChevronRight className="size-4" />
            </Button>
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
