import { useGetLatestAccountQuery } from '@/app/account/queries/account.query';
import { Text } from '@/components/ui/text';
import { patternMoney } from '@/utils/money-format.util';

export const MainInfoHeader: React.FC = () => {
  const { data } = useGetLatestAccountQuery();

  if (!data) return null;

  return (
    <>
      <Text
        as="h2"
        className="text-center"
      >
        {data.month} - {data.year}
      </Text>
      <div className="flex flex-col md:flex-row justify-center md:justify-around w-full text-center">
        <div className="flex flex-col md:justify-start">
          <Text as="p">
            Amount:{' '}
            <strong>
              {' '}
              {patternMoney(data.amount.toString(), { prefix: data.currency })}
            </strong>
          </Text>
          <Text as="p">
            Balance:{' '}
            <strong>
              {' '}
              {patternMoney(data.balance.toString(), { prefix: data.currency })}
            </strong>
          </Text>
        </div>
        <div className="flex flex-col md:justify-end md:text-right">
          <Text as="p">
            Expense Amount:{' '}
            <strong>
              {' '}
              {patternMoney(data.expenseAmount.toString(), {
                prefix: data.currency,
              })}
            </strong>
          </Text>
          <Text as="p">
            Income Amount:{' '}
            <strong>
              {' '}
              {patternMoney(data.incomeAmount.toString(), {
                prefix: data.currency,
              })}
            </strong>
          </Text>
        </div>
      </div>
    </>
  );
};
