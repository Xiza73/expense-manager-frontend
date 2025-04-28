import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { ChartArea, Table } from 'lucide-react';
import { useEffect, useState } from 'react';

import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';

import AccountInfoChart from '../../components/AccountInfoChart';
import { AccountInfoContent } from '../../components/AccountInfoContent/AccountInfoContent';
import AccountInfoHeader from '../../components/AccountInfoHeader';
import GoToTransactionButton from '../../components/GoToTransactionButton';
import { getAccountQueryOptions } from '../../queries/account.query';

export const Account: React.FC = () => {
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
      <div className="flex ml-auto gap-2">
        <Button
          className="mt-6 ml-auto"
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
      {showChart && <AccountInfoChart account={account} />}
      {!showChart && <AccountInfoContent account={account} />}
    </PageContainer>
  );
};
