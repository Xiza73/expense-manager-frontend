import { Currency, CurrencyKey } from '@/domain/currency.enum';

import { Month, MonthKey } from './month.enum';

export interface ApiAccount {
  id: number;
  description?: string;
  month: MonthKey;
  year: number;
  date: string;
  currency: CurrencyKey;
  amount: number;
  balance: number;
  expenseAmount: number;
  incomeAmount: number;
  isDefault: boolean;
}

export interface Account {
  id: number;
  description?: string;
  month: Month;
  year: number;
  date: Date;
  currency: Currency;
  amount: number;
  balance: number;
  expenseAmount: number;
  incomeAmount: number;
  isDefault: boolean;
}
