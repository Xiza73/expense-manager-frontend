import { useNavigate } from '@tanstack/react-router';
import { Pencil, Star } from 'lucide-react';

import { Account } from '@/app/account/domain/account.interface';
import { Text } from '@/components/ui/text';
import { getNumberSymbol, patternMoney } from '@/utils/money-format.util';

export interface AccountInfoHeaderProps {
  account: Account;
}

export const AccountInfoHeader: React.FC<AccountInfoHeaderProps> = ({
  account,
}) => {
  const navigate = useNavigate();

  const handleGoToEdit = () => {
    navigate({
      to: '/account/edit/$accountId',
      params: { accountId: account.id.toString() },
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center w-full gap-2 items-center">
        {account.isDefault && (
          <Star className="text-yellow-500 fill-current pb-1" />
        )}
        <Text
          as="h2"
          className="text-center"
        >
          {account.month} - {account.year}
        </Text>
        <Pencil
          className="pb-1 cursor-pointer"
          onClick={handleGoToEdit}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around w-full text-center">
        <div className="flex flex-col md:justify-start md:text-left">
          <Text as="p">
            Amount:{' '}
            <strong>
              {patternMoney(account.amount.toString(), {
                prefix: account.currency,
              })}
            </strong>
          </Text>
          <Text as="p">
            Balance:{' '}
            <strong>
              {getNumberSymbol(account.balance)}{' '}
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
