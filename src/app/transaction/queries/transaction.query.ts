import { queryOptions } from '@tanstack/react-query';

import { QueryParams } from '@/domain/api.interface';
import { NullResponse } from '@/domain/responses/null.response';
import { useMutation } from '@/hooks/useMutation';
import { useQuery } from '@/hooks/useQuery';
import { queryClient } from '@/main';

import {
  getTransactionAdapter,
  transactionAdapter,
} from '../adapters/transaction.adapter';
import { CreateTransactionRequest } from '../domain/requests/create-transaction.request';
import { GetTransactionsRequest } from '../domain/requests/get-transactions.request';
import { UpdateTransactionRequest } from '../domain/requests/update-transaction.request';
import { GetTransactionResponse } from '../domain/responses/get-transaction.response';
import { GetTransactionsResponse } from '../domain/responses/get-transactions.response';
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from '../services/transaction.service';

export const getTransactionQueryOptions = (id: string) =>
  queryOptions<GetTransactionResponse>({
    queryKey: ['get-transactions', id],
    queryFn: async () => {
      const data = await getTransaction(id);

      const transaction = getTransactionAdapter(data.responseObject);

      return transaction;
    },
  });

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

export const useCreateTransactionMutation = () =>
  useMutation<NullResponse, CreateTransactionRequest>({
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

export const useUpdateTransactionMutation = () =>
  useMutation<NullResponse, UpdateTransactionRequest>({
    showError: true,
    showSuccess: true,
    mutationFn: async (request) => {
      const data = await updateTransaction(request);

      return {
        message: data.message,
        success: data.success,
      };
    },
  });

export const useDeleteTransactionMutation = () =>
  useMutation<NullResponse, string>({
    showError: true,
    showSuccess: true,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-transactions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-account'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-latest-account'],
      });
    },
    mutationFn: async (id) => {
      const data = await deleteTransaction(id);

      return {
        message: data.message,
        success: data.success,
      };
    },
  });
