import { ChevronsUpDown } from 'lucide-react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

export interface FormInputProps<TFieldValues extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
}

export const FormSelect = <TFieldValues extends FieldValues>({
  register,
  name,
  error,
  className,
  placeholder,
  options,
  ...props
}: FormInputProps<TFieldValues>) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full mb-4 relative">
      <select
        className={cn(
          'w-full border p-2 appearance-none',
          error ? 'border-red-500' : 'border-gray-300',
          className,
        )}
        {...props}
        {...register(name)}
      >
        {placeholder && (
          <option
            value=""
            disabled
            className="text-muted-foreground"
          >
            {placeholder}
          </option>
        )}
        {options.map(({ value, label }) => (
          <option
            key={value}
            value={value}
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
  );
};
