import { CurrencyKey } from '@/domain/currency.enum';

import { MonthKey } from '../month.enum';

export interface CreateAccountRequest {
  description?: string;
  month: MonthKey;
  year: number;
  currency: CurrencyKey;
  amount: number;
}
