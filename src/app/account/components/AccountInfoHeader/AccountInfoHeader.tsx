import { useNavigate } from '@tanstack/react-router';
import { Pencil, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

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
          {t(account.month)} - {account.year}
        </Text>
        <Pencil
          className="pb-1 cursor-pointer"
          onClick={handleGoToEdit}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around w-full text-center">
        <div className="flex flex-col md:justify-start md:text-left">
          <Text as="p">
            {t('amount')}:{' '}
            <strong>
              {patternMoney(account.amount.toString(), {
                prefix: account.currency,
              })}
            </strong>
          </Text>
          <Text as="p">
            {t('balance')}:{' '}
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
            {t('expenseAmount')}:{' '}
            <strong>
              {' '}
              {patternMoney(account.expenseAmount.toString(), {
                prefix: account.currency,
              })}
            </strong>
          </Text>
          <Text as="p">
            {t('incomeAmount')}:{' '}
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
