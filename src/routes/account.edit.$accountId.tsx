import { createFileRoute } from '@tanstack/react-router';

import EditAccount from '@/app/account/pages/EditAccount';
import { getAccountQueryOptions } from '@/app/account/queries/account.query';
import { queryClient } from '@/main';

export const Route = createFileRoute('/account/edit/$accountId')({
  loader: async ({ params }) => {
    return queryClient.ensureQueryData(
      getAccountQueryOptions(params.accountId),
    );
  },
  component: EditAccount,
});
