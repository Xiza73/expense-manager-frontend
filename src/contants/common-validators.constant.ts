import { z } from 'zod';

import { MonthKey } from '@/app/account/domain/month.enum';
import { TransactionTypeKey } from '@/app/transaction/domain/transaction-type.enum';
import { CurrencyKey } from '@/domain/currency.enum';
import { PaymentMethodKey } from '@/domain/payment-method.enum';
import { moneyToNumber } from '@/utils/money-format.util';

export const commonValidators = {
  minCharacters: (min: number) =>
    z.string().min(min, `Must be at least ${min} characters`),
  money: z
    .string()
    .min(1, 'Please enter a valid amount')
    .refine((value) => {
      const numberValue = moneyToNumber(value, ',');
      return !isNaN(numberValue) && numberValue > 0;
    }, 'Invalid amount'),
  currency: z.nativeEnum(CurrencyKey, {
    invalid_type_error: 'Invalid currency',
    required_error: 'Currency is required',
  }),
  transactionType: z.nativeEnum(TransactionTypeKey, {
    invalid_type_error: 'Invalid transaction type',
    required_error: 'Transaction type is required',
  }),
  paymentMethod: z.nativeEnum(PaymentMethodKey, {
    invalid_type_error: 'Invalid payment method',
    required_error: 'Payment method is required',
  }),
  month: z.nativeEnum(MonthKey, {
    invalid_type_error: 'Invalid month',
    required_error: 'Month is required',
  }),
  date: z.date(),
  year: z
    .string()
    .refine((value) => {
      const isValid = Number.isInteger(Number(value));

      return isValid;
    }, 'Year must be a number')
    .refine((value) => {
      const year = Number(value);
      const maxYear = new Date().getFullYear() + 1;

      return year >= 1900 && year <= maxYear;
    }, `Year must be between 1900 and ${new Date().getFullYear() + 1}`),
  id: (name: string) =>
    z
      .string()
      .min(1, `${name} is required`)
      .refine((value) => {
        const isValid = Number.isInteger(Number(value));

        return isValid;
      }, `${name} must be a number`),
  token: z
    .string({ message: '' })
    .min(1, 'Token is required')
    .max(36, 'Token must be 36 characters long'),
};
