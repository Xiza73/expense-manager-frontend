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
}

export const getColumns = ({ t }: ColumnsProps) => [
  columnHelper.accessor('amount', {
    header: t('amount'),
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('balance', {
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
  columnHelper.accessor('expenseAmount', {
    header: t('expenseAmount'),
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('incomeAmount', {
    header: t('incomeAmount'),
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('idealDailyExpenditure', {
    header: t('idealDailyExpenditure'),
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('realDailyExpenditure', {
    header: t('realDailyExpenditure'),
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('realDaysSpent', {
    header: t('realDaysSpent'),
    cell: (info) => info.getValue().toString(),
  }),
  columnHelper.accessor('daysInDebt', {
    header: t('daysInDebt'),
    cell: (info) => info.getValue().toString(),
  }),
];
