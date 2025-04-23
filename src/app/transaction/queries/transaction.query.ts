import { QueryOptions, QueryParams } from '@/domain/api.interface';
import { NullResponse } from '@/domain/responses/null.response';
import { useMutation } from '@/hooks/useMutation';
import { useQuery } from '@/hooks/useQuery';

import { transactionAdapter } from '../adapters/transaction.adapter';
import { CreateTransactionRequest } from '../domain/requests/create-transaction.request';
import { GetTransactionsRequest } from '../domain/requests/get-transactions.request';
import { GetTransactionsResponse } from '../domain/responses/get-transactions.response';
import {
  createTransaction,
  getTransactions,
} from '../services/transaction.service';

export const useGetTransactionsQuery = (
  req: QueryParams<GetTransactionsRequest>,
) =>
  useQuery<GetTransactionsResponse, GetTransactionsRequest>({
    ...req,
    queryKey: ['get-transactions'],
    showPageError: true,
    queryFn: async () => {
      const data = await getTransactions(req.params);

      const transactions = data.responseObject.data.map((transaction) =>
        transactionAdapter(transaction),
      );

      return {
        ...data.responseObject,
        data: transactions,
      };
    },
  });

export const useCreateTransactionMutation = (options: QueryOptions) =>
  useMutation<NullResponse, CreateTransactionRequest>({
    ...options,
    showError: true,
    showSuccess: true,
    mutationFn: async (request) => {
      const data = await createTransaction(request);

      return {
        message: data.message,
        success: data.success,
      };
    },
  });
