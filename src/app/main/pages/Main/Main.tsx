import { useSearch } from '@tanstack/react-router';

import { AccountInfoContent } from '@/app/account/components/AccountInfoContent/AccountInfoContent';
import AccountInfoHeader from '@/app/account/components/AccountInfoHeader';
import GoToTransactionButton from '@/app/account/components/GoToTransactionButton';
import { useGetLatestAccountQuery } from '@/app/account/queries/account.query';
import PageContainer from '@/components/PageContainer';

export const Main: React.FC = () => {
  const { data: account } = useGetLatestAccountQuery();

  const searchParams = useSearch({ from: '/' });

  if (!account) return null;

  const accountId = account.id.toString();

  return (
    <PageContainer>
      <AccountInfoHeader account={account} />
      <GoToTransactionButton accountId={accountId} />
      <AccountInfoContent
        account={account}
        fromCreateTransaction={searchParams.wasCreated}
      />
    </PageContainer>
  );
};
