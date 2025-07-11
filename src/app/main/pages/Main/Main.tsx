import { useNavigate, useSearch } from '@tanstack/react-router';
import { ChartArea, Table } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AccountInfoChart from '@/app/account/components/AccountInfoChart';
import { AccountInfoContent } from '@/app/account/components/AccountInfoContent/AccountInfoContent';
import AccountInfoHeader from '@/app/account/components/AccountInfoHeader';
import GoToTransactionButton from '@/app/account/components/GoToTransactionButton';
import { useGetLatestAccountQuery } from '@/app/account/queries/account.query';
import FiltersDrawer from '@/app/transaction/components/FiltersDrawer';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import FirstAccount from '../../components/FirstAccount';

export const Main: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { method } = useSearch({ from: '/expense-manager' });

  const { data: account, refetch } = useGetLatestAccountQuery();

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (method === 'crt' || method === 'edt') {
      refetch();

      navigate({ to: '/expense-manager' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  const handleShowChart = () => {
    setShowChart(!showChart);
  };

  if (!account) return <FirstAccount />;

  const accountId = account.id.toString();

  return (
    <PageContainer>
      <AccountInfoHeader account={account} />
      <div className="flex flex-col md:flex-row justify-center md:justify-between w-full text-center mt-6 md:mb-2">
        <Text
          as="h2"
          className="text-center md:pb-0 md:m-0"
        >
          {t('transactions')}
        </Text>
        <div className="flex ml-auto gap-2">
          {!showChart && <FiltersDrawer />}
          <Button
            className="ml-auto"
            onClick={handleShowChart}
          >
            {showChart ? (
              <Table className="w-5 h-5" />
            ) : (
              <ChartArea className="w-5 h-5" />
            )}
          </Button>
          <GoToTransactionButton
            accountId={accountId}
            redirect="main"
          />
        </div>
      </div>
      {showChart && <AccountInfoChart account={account} />}
      {!showChart && (
        <AccountInfoContent
          account={account}
          redirect="main"
        />
      )}
    </PageContainer>
  );
};
