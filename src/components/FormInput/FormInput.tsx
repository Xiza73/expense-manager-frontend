import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

export interface FormInputProps<TFieldValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
}

export const FormInput = <TFieldValues extends FieldValues>({
  register,
  name,
  error,
  className,
  ...props
}: FormInputProps<TFieldValues>) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full mb-4">
      <input
        className={cn(
          'w-full border p-2',
          error ? 'border-red-500' : 'border-gray-300',
          className,
        )}
        {...props}
        {...register(name)}
      />
      {error && <span className="text-red-500 text-sm">* {t(error)}</span>}
    </div>
  );
};
