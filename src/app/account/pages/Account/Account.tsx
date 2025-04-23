import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';

import PageContainer from '@/components/PageContainer';

import { AccountInfoContent } from '../../components/AccountInfoContent/AccountInfoContent';
import AccountInfoHeader from '../../components/AccountInfoHeader';
import GoToTransactionButton from '../../components/GoToTransactionButton';
import { getAccountQueryOptions } from '../../queries/account.query';

export const Account: React.FC = () => {
  const { accountId } = useParams({ from: '/account/$accountId' });

  const searchParams = useSearch({ from: '/account/$accountId' });

  const { data: account } = useSuspenseQuery(getAccountQueryOptions(accountId));

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
