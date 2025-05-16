import { Currency } from '@/domain/currency.enum';

import { Account, ApiAccount } from '../domain/account.interface';
import { Month } from '../domain/month.enum';

export const accountAdapter = (account: ApiAccount): Account => {
  return {
    ...account,
    ...(account.month
      ? { month: Month[account.month] }
      : {
          month: undefined,
        }),
    date: new Date(account.date),
    currency: Currency[account.currency],
  };
};
