import { QueryParams } from '@/domain/api.interface';
import { useQuery } from '@/hooks/useQuery';

import { transactionAdapter } from '../adapters/transaction.adapter';
import { GetTransactionsRequest } from '../domain/requests/get-transactions.request';
import { GetTransactionsResponse } from '../domain/responses/get-transactions.response';
import { getTransactions } from '../services/transaction.service';

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
