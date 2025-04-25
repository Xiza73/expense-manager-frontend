import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';

import PageContainer from '@/components/PageContainer';

import { AccountInfoContent } from '../../components/AccountInfoContent/AccountInfoContent';
import AccountInfoHeader from '../../components/AccountInfoHeader';
import GoToTransactionButton from '../../components/GoToTransactionButton';
import { getAccountQueryOptions } from '../../queries/account.query';

export const Account: React.FC = () => {
  const { accountId } = useParams({ from: '/account/$accountId' });

  const { wasCreated } = useSearch({ from: '/account/$accountId' });

  const { data: account, refetch } = useSuspenseQuery(
    getAccountQueryOptions(accountId),
  );

  useEffect(() => {
    if (wasCreated) {
      refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasCreated]);

  return (
    <PageContainer>
      <AccountInfoHeader account={account} />
      <GoToTransactionButton accountId={accountId} />
      <AccountInfoContent account={account} />
    </PageContainer>
  );
};
