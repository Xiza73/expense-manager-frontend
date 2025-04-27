import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';

import PageContainer from '@/components/PageContainer';

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
      <GoToTransactionButton accountId={accountId} />
      <AccountInfoContent account={account} />
    </PageContainer>
  );
};
