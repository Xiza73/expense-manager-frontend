import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router';
import { z } from 'zod';

import Account from '@/app/account/pages/Account';
import { getAccountQueryOptions } from '@/app/account/queries/account.query';
import ErrorPage from '@/components/ErrorPage';
import { queryClient } from '@/main';
import { getAxiosError } from '@/utils/get-axios-error.util';

const accountIdSearchSchema = z.object({
  wasCreated: z.boolean().optional(),
});

export const Route = createFileRoute('/account/$accountId')({
  loader: ({ params }) => {
    return queryClient.ensureQueryData(
      getAccountQueryOptions(params.accountId),
    );
  },
  validateSearch: accountIdSearchSchema,
  errorComponent: (props: ErrorComponentProps) => (
    <ErrorPage message={getAxiosError(props.error)} />
  ),
  component: Account,
});
