import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import UpdateTransaction from '@/app/transaction/pages/UpdateTransaction';
import { getTransactionQueryOptions } from '@/app/transaction/queries/transaction.query';
import { queryClient } from '@/main';

const editTransactionSearchSchema = z.object({
  redirect: z.enum(['main', 'account']).optional(),
});

export const Route = createFileRoute('/transaction/edit/$transactionId')({
  loader: async ({ params }) => {
    return queryClient.ensureQueryData(
      getTransactionQueryOptions(params.transactionId),
    );
  },
  validateSearch: editTransactionSearchSchema,
  component: UpdateTransaction,
});
