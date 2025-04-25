import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';

import { AccountInfoContent } from '@/app/account/components/AccountInfoContent/AccountInfoContent';
import AccountInfoHeader from '@/app/account/components/AccountInfoHeader';
import GoToTransactionButton from '@/app/account/components/GoToTransactionButton';
import { useGetLatestAccountQuery } from '@/app/account/queries/account.query';
import PageContainer from '@/components/PageContainer';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const { data: account, refetch } = useGetLatestAccountQuery();

  const { wasCreated } = useSearch({ from: '/' });

  useEffect(() => {
    if (wasCreated) {
      refetch();

      navigate({ to: '/' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasCreated]);

  if (!account) return null;

  const accountId = account.id.toString();

  return (
    <PageContainer>
      <AccountInfoHeader account={account} />
      <GoToTransactionButton
        accountId={accountId}
        redirect="main"
      />
      <AccountInfoContent account={account} />
    </PageContainer>
  );
};
