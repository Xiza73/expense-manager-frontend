import { useNavigate } from '@tanstack/react-router';
import { Pencil, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Account } from '@/app/account/domain/account.interface';
import { CustomTable } from '@/components/CustomTable/CustomTable';
import { Text } from '@/components/ui/text';

import { accountHeader } from '../../pages/utils/account-header.util';
import { getColumns, InfoHeaderData } from './columns';

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

  const columns = getColumns({ t, isMonthly: account.isMonthly });

  const data: InfoHeaderData[] = [
    {
      amount: account.amount,
      balance: account.balance,
      expenseAmount: account.expenseAmount,
      incomeAmount: account.incomeAmount,
      idealDailyExpenditure: account.idealDailyExpenditure,
      realDailyExpenditure: account.realDailyExpenditure,
      realDaysSpent: account.realDaysSpent,
      leftDailyExpenditure: account.leftDailyExpenditure,
      daysInDebt: account.daysInDebt,
      currency: account.currency,
    },
  ];

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
          {accountHeader(
            t(account.month || ''),
            account.year,
            account.description,
          )}
        </Text>
        <Pencil
          className="pb-1 cursor-pointer"
          onClick={handleGoToEdit}
        />
      </div>
      <CustomTable
        withPagination={false}
        withFooter={false}
        data={data}
        columns={columns}
        currentPage={1}
        totalPages={1}
      />
    </>
  );
};
