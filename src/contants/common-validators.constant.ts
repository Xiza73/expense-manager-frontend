import { z } from 'zod';

import { MonthKey } from '@/app/account/domain/month.enum';
import { TransactionTypeKey } from '@/app/transaction/domain/transaction-type.enum';
import { CurrencyKey } from '@/domain/currency.enum';
import { PaymentMethodKey } from '@/domain/payment-method.enum';
import { moneyToNumber } from '@/utils/money-format.util';

export const commonValidators = {
  minCharacters: (min: number) => z.string().min(min, 'too_low'),
  money: z
    .string()
    .min(1, 'enter_valid_amount')
    .refine((value) => {
      const numberValue = moneyToNumber(value, ',');
      return !isNaN(numberValue) && numberValue > 0;
    }, 'invalid_amount'),
  currency: z.nativeEnum(CurrencyKey, {
    invalid_type_error: 'invalid_currency',
    required_error: 'currency_is_required',
  }),
  transactionType: z.nativeEnum(TransactionTypeKey, {
    invalid_type_error: 'invalid_transaction_type',
    required_error: 'transaction_type_is_required',
  }),
  paymentMethod: z.nativeEnum(PaymentMethodKey, {
    invalid_type_error: 'invalid_payment_method',
    required_error: 'payment_method_is_required',
  }),
  month: z.nativeEnum(MonthKey, {
    invalid_type_error: 'invalid_month',
    required_error: 'month_is_required',
  }),
  date: z.date(),
  year: z
    .string()
    .refine((value) => {
      const isValid = Number.isInteger(Number(value));

      return isValid;
    }, 'year_must_be_number')
    .refine((value) => {
      const year = Number(value);
      const maxYear = new Date().getFullYear() + 1;

      return year >= 1900 && year <= maxYear;
    }, 'year_must_be_between'),
  id: (_name: string) =>
    z
      .string()
      .min(1, 'is_required')
      .refine((value) => {
        const isValid = Number.isInteger(Number(value));

        return isValid;
      }, 'id_must_be_number'),
  optionalId: (_name: string) =>
    z
      .string()
      .refine((value) => {
        if (!value) return true;

        const isValid = Number.isInteger(Number(value));

        return isValid;
      }, 'id_must_be_number')
      .optional(),
  token: z
    .string({ message: '' })
    .min(1, 'token_is_required')
    .max(36, 'token_must_be_36_characters_long'),
};
