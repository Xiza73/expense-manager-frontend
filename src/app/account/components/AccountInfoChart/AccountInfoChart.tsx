import _ from 'lodash';
import randomColor from 'randomcolor';
import { useEffect } from 'react';

import { TransactionType } from '@/app/transaction/domain/transaction-type.enum';
import { useGetTransactionsQuery } from '@/app/transaction/queries/transaction.query';
import ChartArea from '@/components/ChartArea';
import ChartDoughnut from '@/components/ChartDoughnut';
import { Text } from '@/components/ui/text';
import { getDate, getDayMonth } from '@/utils/date.util';

import { Account } from '../../domain/account.interface';

export interface AccountInfoChartProps {
  account: Account;
}

export const AccountInfoChart: React.FC<AccountInfoChartProps> = ({
  account,
}) => {
  const { data: response, refetch } = useGetTransactionsQuery({
    enabled: Boolean(account?.id),

    showLoading: false,
    params: {
      accountId: account.id,
    },
  });

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!response) return null;

  const transactions = _.cloneDeep(response.data).reverse();

  const dateCategories = transactions.reduce((acc, transaction) => {
    const date = getDayMonth(transaction.date);

    if (!acc.includes(date)) {
      acc.push(date);
    }

    return acc;
  }, [] as string[]);

  const dataRecord: Record<string, number> = transactions.reduce(
    (acc, transaction) => {
      const date = getDate(transaction.date);
      const symbol = transaction.type === TransactionType.EXPENSE ? -1 : 1;

      if (acc[date]) {
        acc[date] += symbol * transaction.amount;
      } else {
        acc[date] = symbol * transaction.amount;
      }

      return acc;
    },
    {} as Record<string, number>,
  );

  const dataRemaining: number[] = [];
  let remaining = account.amount;

  for (const record of Object.values(dataRecord)) {
    remaining += record;

    dataRemaining.push(remaining);
  }

  const dataExpense: number[] = Object.values(dataRecord).map((value) =>
    value < 0 ? -value : 0,
  );

  const dataIncome: number[] = Object.values(dataRecord).map((value) =>
    value > 0 ? value : 0,
  );

  const expenseDataByServiceRecord = transactions.reduce((acc, transaction) => {
    const service = transaction.service.name;
    const symbol = transaction.type === TransactionType.EXPENSE ? 1 : 0;

    if (!service) return acc;

    if (acc[service]) {
      acc[service] += symbol * transaction.amount;
    } else {
      acc[service] = symbol * transaction.amount;
    }

    return acc;
  }, {} as Record<string, number>);

  Object.keys(expenseDataByServiceRecord).forEach((key) => {
    if (expenseDataByServiceRecord[key] === 0) {
      delete expenseDataByServiceRecord[key];
    }
  });

  const expenseDataByServiceColors = randomColor({
    count: Object.keys(expenseDataByServiceRecord).length,
    hue: 'red',
    luminosity: 'dark',
  });

  const expenseDataByCategoryRecord = transactions.reduce(
    (acc, transaction) => {
      const category = transaction.category.name;
      const symbol = transaction.type === TransactionType.EXPENSE ? 1 : 0;

      if (acc[category]) {
        acc[category] += symbol * transaction.amount;
      } else {
        acc[category] = symbol * transaction.amount;
      }

      return acc;
    },
    {} as Record<string, number>,
  );

  Object.keys(expenseDataByCategoryRecord).forEach((key) => {
    if (expenseDataByCategoryRecord[key] === 0) {
      delete expenseDataByCategoryRecord[key];
    }
  });

  const expenseDataByCategoryColors = randomColor({
    count: Object.keys(expenseDataByCategoryRecord).length,
    hue: 'green',
    luminosity: 'dark',
  });

  return (
    <div className="w-full max-w-full mt-8 flex flex-col gap-4">
      <Text
        as="h2"
        className="text-center"
      >
        Remaining on this month
      </Text>
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden">
        <ChartArea
          categories={dateCategories}
          series={[
            {
              name: 'Remaining',
              data: dataRemaining,
            },
          ]}
        />
      </div>
      <Text
        as="h2"
        className="text-center"
      >
        Expenses and income
      </Text>
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden">
        <ChartArea
          categories={dateCategories}
          series={[
            {
              name: 'Expenses',
              data: dataExpense,
              color: '#ff0000',
            },
            {
              name: 'Income',
              data: dataIncome,
              color: '#00ff00',
            },
          ]}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-full ">
        <div className="flex flex-col justify-center overflow-x-auto overflow-y-hidden">
          <Text
            as="h2"
            className="text-center"
          >
            Expenses by service
          </Text>
          <ChartDoughnut
            colors={expenseDataByServiceColors}
            labels={Object.keys(expenseDataByServiceRecord)}
            series={Object.values(expenseDataByServiceRecord)}
          />
        </div>
        <div className="flex flex-col justify-center overflow-x-auto overflow-y-hidden">
          <Text
            as="h2"
            className="text-center"
          >
            Expenses by category
          </Text>
          <ChartDoughnut
            colors={expenseDataByCategoryColors}
            labels={Object.keys(expenseDataByCategoryRecord)}
            series={Object.values(expenseDataByCategoryRecord)}
          />
        </div>
      </div>
    </div>
  );
};
