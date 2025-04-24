import { Currency } from '@/domain/currency.enum';

import { Account, ApiAccount } from '../domain/account.interface';
import { Month } from '../domain/month.enum';

export const accountAdapter = (account: ApiAccount): Account => {
  return {
    id: account.id,
    description: account.description,
    month: Month[account.month],
    year: account.year,
    date: new Date(account.date),
    currency: Currency[account.currency],
    amount: account.amount,
    balance: account.balance,
    expenseAmount: account.expenseAmount,
    incomeAmount: account.incomeAmount,
  };
};
