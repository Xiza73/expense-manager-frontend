import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { ChartArea, Table } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FiltersDrawer from '@/app/transaction/components/FiltersDrawer';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import AccountInfoChart from '../../components/AccountInfoChart';
import { AccountInfoContent } from '../../components/AccountInfoContent/AccountInfoContent';
import AccountInfoHeader from '../../components/AccountInfoHeader';
import GoToTransactionButton from '../../components/GoToTransactionButton';
import { getAccountQueryOptions } from '../../queries/account.query';

export const Account: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { accountId } = useParams({ from: '/account/$accountId' });
  const { method } = useSearch({ from: '/account/$accountId' });

  const { data: account, refetch } = useSuspenseQuery(
    getAccountQueryOptions(accountId),
  );

  const [showChart, setShowChart] = useState(false);

  const handleShowChart = () => {
    setShowChart(!showChart);
  };

  useEffect(() => {
    if (method === 'crt' || method === 'edt') {
      refetch();

      navigate({
        to: '/account/$accountId',
        params: { accountId },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

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
          <Button onClick={handleShowChart}>
            {showChart ? (
              <Table className="w-5 h-5" />
            ) : (
              <ChartArea className="w-5 h-5" />
            )}
          </Button>
          <GoToTransactionButton accountId={accountId} />
        </div>
      </div>
      {showChart && <AccountInfoChart account={account} />}
      {!showChart && <AccountInfoContent account={account} />}
    </PageContainer>
  );
};
