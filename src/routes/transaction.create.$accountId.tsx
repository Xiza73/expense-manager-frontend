import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router';
import { z } from 'zod';

import { getAccountQueryOptions } from '@/app/account/queries/account.query';
import CreateTransaction from '@/app/transaction/pages/CreateTransaction';
import ErrorPage from '@/components/ErrorPage';
import { queryClient } from '@/main';
import { getAxiosError } from '@/utils/get-axios-error.util';

const createTransactionSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/transaction/create/$accountId')({
  loader: ({ params }) => {
    return queryClient.ensureQueryData(
      getAccountQueryOptions(params.accountId),
    );
  },
  validateSearch: createTransactionSearchSchema,
  errorComponent: (props: ErrorComponentProps) => (
    <ErrorPage message={getAxiosError(props.error)} />
  ),
  component: CreateTransaction,
});
