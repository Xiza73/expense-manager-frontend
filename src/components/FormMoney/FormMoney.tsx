import { ChevronsUpDown } from 'lucide-react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Currency, CurrencyKey } from '@/domain/currency.enum';
import { cn } from '@/lib/utils';

export interface FormMoneyProps<TFieldValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  register: UseFormRegister<TFieldValues>;
  currencyName: Path<TFieldValues>;
  amountName: Path<TFieldValues>;
  disabledCurrency?: boolean;
}

export const FormMoney = <TFieldValues extends FieldValues>({
  register,
  currencyName,
  amountName,
  error,
  disabledCurrency = false,
  ...props
}: FormMoneyProps<TFieldValues>) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-wrap mb-4">
      <div className="relative">
        <select
          className={cn(
            'border p-2 appearance-none',
            disabledCurrency ? 'cursor-auto pr-2' : 'pr-6',
            error ? 'border-red-500' : 'border-gray-300',
          )}
          disabled={disabledCurrency}
          {...register(currencyName)}
        >
          {Object.values(CurrencyKey).map((currency) => (
            <option
              key={currency}
              value={currency}
            >
              {Currency[currency]}
            </option>
          ))}
        </select>
        {!disabledCurrency && (
          <div className="absolute right-1 top-0 bottom-0 flex items-center justify-center pointer-events-none">
            <ChevronsUpDown className="w-5 h-5 text-gray-500" />
          </div>
        )}
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
