import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Currency } from '@/domain/currency.enum';
import { cn } from '@/lib/utils';

export interface FormAmountProps<TFieldValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  register: UseFormRegister<TFieldValues>;
  currency: Currency;
  amountName: Path<TFieldValues>;
}

export const FormAmount = <TFieldValues extends FieldValues>({
  register,
  currency,
  amountName,
  error,
  ...props
}: FormAmountProps<TFieldValues>) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-wrap mb-4">
      <div className="relative">
        <select
          className={cn(
            'border p-2 appearance-none',
            'cursor-auto pr-2',
            error ? 'border-red-500' : 'border-gray-300',
          )}
          disabled={true}
        >
          <option value={currency}>{currency}</option>
        </select>
      </div>
      <input
        className={cn(
          'flex-1 border border-l-0 p-2',
          'focus:border-l-0',
          error ? 'border-red-500' : 'border-gray-300',
        )}
        {...props}
        {...register(amountName)}
      />
      {error && (
        <span className="text-red-500 text-sm w-full">* {t(error)}</span>
      )}
    </div>
  );
};
