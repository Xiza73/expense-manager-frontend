import { Currency, CurrencyKey } from '@/domain/currency.enum';

import { Month, MonthKey } from './month.enum';

export interface ApiAccount {
  id: number;
  description?: string;
  isMonthly: boolean;
  month?: MonthKey;
  year?: number;
  date: string;
  currency: CurrencyKey;
  amount: number;
  balance: number;
  expenseAmount: number;
  incomeAmount: number;
  idealDailyExpenditure: number;
  realDailyExpenditure: number;
  leftDailyExpenditure: number;
  realDaysSpent: number;
  daysInDebt: number;
  isDefault: boolean;
}

export interface Account {
  id: number;
  description?: string;
  isMonthly: boolean;
  month?: Month;
  year?: number;
  date: Date;
  currency: Currency;
  amount: number;
  balance: number;
  expenseAmount: number;
  incomeAmount: number;
  idealDailyExpenditure: number;
  realDailyExpenditure: number;
  leftDailyExpenditure: number;
  realDaysSpent: number;
  daysInDebt: number;
  isDefault: boolean;
}
