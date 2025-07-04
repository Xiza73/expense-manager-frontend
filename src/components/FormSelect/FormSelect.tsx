import { ChevronsUpDown } from 'lucide-react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

export interface FormInputProps<TFieldValues extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder?: string;
  enabledDefault?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const FormSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  className,
  placeholder,
  enabledDefault = false,
  options,
  ...props
}: FormInputProps<TFieldValues>) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: selectedValue } }) => (
        <div className="flex flex-col w-full mb-4 relative">
          <select
            className={cn(
              'w-full border p-2 appearance-none',
              error ? 'border-red-500' : 'border-gray-300',
              className,
              !selectedValue && placeholder && 'text-muted-foreground',
            )}
            {...props}
            onChange={onChange}
            value={selectedValue}
          >
            {placeholder && (
              <option
                value=""
                disabled={!enabledDefault}
                className="text-muted-foreground dark:text-muted-foreground"
              >
                {placeholder}
              </option>
            )}
            {options.map(({ value, label }) => (
              <option
                key={value}
                value={value}
                className="text-black dark:text-muted"
              >
                {label}
              </option>
            ))}
          </select>
          <div className="absolute right-1 top-0 bottom-0 flex items-center justify-center pointer-events-none">
            <ChevronsUpDown className="w-5 h-5 text-gray-500" />
          </div>
          {error && <span className="text-red-500 text-sm">* {t(error)}</span>}
        </div>
      )}
    />
  );
};
