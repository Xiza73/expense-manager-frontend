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
  leftDailyExpenditure: number;
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
  const simpleColumns = [
    columnHelper.accessor('amount', {
      header: t('amount'),
      cell: (info) =>
        patternMoney(info.getValue().toString(), {
          prefix: info.row.original.currency,
        }),
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
  ];

  const columns = [
    columnHelper.group({
      header: t('basic_information'),
      columns: [
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
      ],
    }),
    columnHelper.group({
      header: t('transactions'),
      columns: [
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
      ],
    }),
    columnHelper.group({
      header: t('daily_expenditure'),
      columns: [
        columnHelper.accessor('idealDailyExpenditure', {
          header: t('ideal'),
          cell: (info) =>
            patternMoney(info.getValue().toString(), {
              prefix: info.row.original.currency,
            }),
        }),
        columnHelper.accessor('realDailyExpenditure', {
          header: t('real'),
          cell: (info) =>
            patternMoney(info.getValue().toString(), {
              prefix: info.row.original.currency,
            }),
        }),
        columnHelper.accessor('leftDailyExpenditure', {
          header: t('left'),
          cell: (info) =>
            patternMoney(info.getValue().toString(), {
              prefix: info.row.original.currency,
            }),
        }),
      ],
    }),
    columnHelper.group({
      id: 'other',
      header: t('days'),
      columns: [
        columnHelper.accessor('realDaysSpent', {
          header: t('real_spent'),
          cell: (info) => info.getValue().toString(),
        }),
        columnHelper.accessor('daysInDebt', {
          header: t('in_debt'),
          cell: (info) => info.getValue().toString(),
        }),
      ],
    }),
  ];

  if (!isMonthly) return simpleColumns;

  return columns;
};
