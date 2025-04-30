import { PopoverProps } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface FormDateProps<TFieldValues extends FieldValues>
  extends React.ComponentProps<React.FC<PopoverProps>> {
  error?: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  disableNavigation?: boolean;
  defaultMonth?: Date;
}

export const FormDate = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  disableNavigation = false,
  defaultMonth,
  ...props
}: FormDateProps<TFieldValues>) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const formatStr = language === 'es' ? `dd 'de' MMMM, yyyy` : 'PPP';

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: date } }) => (
        <Popover {...props}>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full rounded-none justify-start text-left font-normal shadow-none border-gray-300',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2" />
              {date ? (
                format(date, formatStr, {
                  locale: language === 'es' ? es : enUS,
                })
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              {...(defaultMonth && { defaultMonth })}
              disableNavigation={disableNavigation}
              showOutsideDays={!disableNavigation}
              onSelect={onChange}
              initialFocus
            />
          </PopoverContent>
          {error && <span className="text-red-500 text-sm">* {t(error)}</span>}
        </Popover>
      )}
    />
  );
};
