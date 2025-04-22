import { Account } from '@/app/account/domain/account.interface';
import { Text } from '@/components/ui/text';
import { patternMoney } from '@/utils/money-format.util';

export interface AccountInfoHeaderProps {
  account: Account;
}

export const AccountInfoHeader: React.FC<AccountInfoHeaderProps> = ({ account }) => {
  return (
    <>
      <Text
        as="h2"
        className="text-center"
      >
        {account.month} - {account.year}
      </Text>
      <div className="flex flex-col md:flex-row justify-center md:justify-around w-full text-center">
        <div className="flex flex-col md:justify-start">
          <Text as="p">
            Amount:{' '}
            <strong>
              {' '}
              {patternMoney(account.amount.toString(), {
                prefix: account.currency,
              })}
            </strong>
          </Text>
          <Text as="p">
            Balance:{' '}
            <strong>
              {' '}
              {patternMoney(account.balance.toString(), {
                prefix: account.currency,
              })}
            </strong>
          </Text>
        </div>
        <div className="flex flex-col md:justify-end md:text-right">
          <Text as="p">
            Expense Amount:{' '}
            <strong>
              {' '}
              {patternMoney(account.expenseAmount.toString(), {
                prefix: account.currency,
              })}
            </strong>
          </Text>
          <Text as="p">
            Income Amount:{' '}
            <strong>
              {' '}
              {patternMoney(account.incomeAmount.toString(), {
                prefix: account.currency,
              })}
            </strong>
          </Text>
        </div>
      </div>
    </>
  );
};
