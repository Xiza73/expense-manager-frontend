import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { getAccountQueryOptions } from '../../queries/account.query';

export const Account: React.FC = () => {
  const { accountId } = useParams({ from: '/account/$accountId' });

  const { data: account } = useSuspenseQuery(getAccountQueryOptions(accountId));

  return (
    <>
      <h1>Account works!</h1>
      <pre>{JSON.stringify(account, null, 2)}</pre>
    </>
  );
};
