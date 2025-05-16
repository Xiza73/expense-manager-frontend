import { createColumnHelper } from '@tanstack/react-table';

import { Currency } from '@/domain/currency.enum';
import { getNumberSymbol, patternMoney } from '@/utils/money-format.util';

export interface InfoHeaderData {
  amount: number;
  balance: number;
  expenseAmount: number;
  incomeAmount: number;
  idealDailyExpenditure: number;
  realDailyExpenditure: number;
  realDaysSpent: number;
  daysInDebt: number;
  currency: Currency;
}

const columnHelper = createColumnHelper<InfoHeaderData>();

interface ColumnsProps {
  t: (key: string) => string;
  isMonthly?: boolean;
}

export const getColumns = ({ t, isMonthly = true }: ColumnsProps) => {
  const columns = [
    {
      order: 1,
      column: columnHelper.accessor('amount', {
        header: t('amount'),
        cell: (info) =>
          patternMoney(info.getValue().toString(), {
            prefix: info.row.original.currency,
          }),
      }),
    },
    {
      order: 4,
      column: columnHelper.accessor('balance', {
        header: t('balance'),
        cell: (info) => {
          const value = info.getValue();
          const currency = info.row.original.currency;

          return (
            <>
              {getNumberSymbol(value)}{' '}
              {patternMoney(value.toString(), {
                prefix: currency,
              })}
            </>
          );
        },
      }),
    },
    {
      order: 2,
      column: columnHelper.accessor('expenseAmount', {
        header: t('expenseAmount'),
        cell: (info) =>
          patternMoney(info.getValue().toString(), {
            prefix: info.row.original.currency,
          }),
      }),
    },
    {
      order: 3,
      column: columnHelper.accessor('incomeAmount', {
        header: t('incomeAmount'),
        cell: (info) =>
          patternMoney(info.getValue().toString(), {
            prefix: info.row.original.currency,
          }),
      }),
    },
    {
      order: 5,
      hidden: !isMonthly,
      column: columnHelper.accessor('idealDailyExpenditure', {
        header: t('idealDailyExpenditure'),
        cell: (info) =>
          patternMoney(info.getValue().toString(), {
            prefix: info.row.original.currency,
          }),
      }),
    },
    {
      order: 6,
      hidden: !isMonthly,
      column: columnHelper.accessor('realDailyExpenditure', {
        header: t('realDailyExpenditure'),
        cell: (info) =>
          patternMoney(info.getValue().toString(), {
            prefix: info.row.original.currency,
          }),
      }),
    },
    {
      order: 7,
      hidden: !isMonthly,
      column: columnHelper.accessor('realDaysSpent', {
        header: t('realDaysSpent'),
        cell: (info) => info.getValue().toString(),
      }),
    },
    {
      order: 8,
      hidden: !isMonthly,
      column: columnHelper.accessor('daysInDebt', {
        header: t('daysInDebt'),
        cell: (info) => info.getValue().toString(),
      }),
    },
  ];

  if (!isMonthly) {
    return columns
      .filter((data) => !data.hidden)
      .sort((a, b) => a.order - b.order)
      .map((data) => data.column);
  }

  return columns.map((data) => data.column);
};
