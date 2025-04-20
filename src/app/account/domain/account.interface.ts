import { Currency, CurrencyKey } from '@/domain/currency.enum';

import { Month, MonthKey } from './month.enum';

export interface ApiAccount {
  id: number;
  description?: string;
  month: MonthKey;
  year: number;
  currency: CurrencyKey;
  amount: number;
  balance: number;
  expenseAmount: number;
  incomeAmount: number;
}

export interface Account {
  id: number;
  description?: string;
  month: Month;
  year: number;
  currency: Currency;
  amount: number;
  balance: number;
  expenseAmount: number;
  incomeAmount: number;
}
