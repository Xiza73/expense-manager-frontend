import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router';

import Account from '@/app/account/pages/Account';
import { getAccountQueryOptions } from '@/app/account/queries/account.query';
import ErrorPage from '@/components/ErrorPage';
import { queryClient } from '@/main';

export const Route = createFileRoute('/account/$accountId')({
  loader: ({ params }) => {
    return queryClient.ensureQueryData(
      getAccountQueryOptions(params.accountId),
    );
  },
  errorComponent: (props: ErrorComponentProps) => (
    <ErrorPage message={props.error?.message} />
  ),
  component: Account,
});
