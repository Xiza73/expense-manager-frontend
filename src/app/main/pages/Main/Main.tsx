import { useNavigate, useSearch } from '@tanstack/react-router';
import { ChartArea, Table } from 'lucide-react';
import { useEffect, useState } from 'react';

import AccountInfoChart from '@/app/account/components/AccountInfoChart';
import { AccountInfoContent } from '@/app/account/components/AccountInfoContent/AccountInfoContent';
import AccountInfoHeader from '@/app/account/components/AccountInfoHeader';
import GoToTransactionButton from '@/app/account/components/GoToTransactionButton';
import { useGetLatestAccountQuery } from '@/app/account/queries/account.query';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const { method } = useSearch({ from: '/' });

  const { data: account, refetch } = useGetLatestAccountQuery();

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (method === 'crt' || method === 'edt') {
      refetch();

      navigate({ to: '/' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  const handleShowChart = () => {
    setShowChart(!showChart);
  };

  if (!account) return null;

  const accountId = account.id.toString();

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
      {!showChart && (
        <AccountInfoContent
          account={account}
          redirect="main"
        />
      )}
    </PageContainer>
  );
};
