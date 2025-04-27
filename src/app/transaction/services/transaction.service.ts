import { NullApiResponse } from '@/domain/responses/null.response';
import { api } from '@/lib/axios';
import { buildQueryParams } from '@/utils/build-query-params.util';

import { CreateTransactionRequest } from '../domain/requests/create-transaction.request';
import { GetTransactionsRequest } from '../domain/requests/get-transactions.request';
import { UpdateTransactionRequest } from '../domain/requests/update-transaction.request';
import { GetTransactionApiResponse } from '../domain/responses/get-transaction.response';
import { GetTransactionsApiResponse } from '../domain/responses/get-transactions.response';

const MODULE = '/transaction';

export const getTransaction = async (id: string) => {
  const { data } = await api.get<GetTransactionApiResponse>(`${MODULE}/${id}`);

  return data;
};

export const getTransactions = async (request: GetTransactionsRequest) => {
  const queryParams = buildQueryParams(request);

  const { data } = await api.get<GetTransactionsApiResponse>(
    `${MODULE}?${queryParams}`,
  );

  return data;
};

export const createTransaction = async (request: CreateTransactionRequest) => {
  const { data } = await api.post<NullApiResponse>(`${MODULE}`, request);

  return data;
};

export const updateTransaction = async ({
  id,
  ...request
}: UpdateTransactionRequest) => {
  const { data } = await api.put<NullApiResponse>(`${MODULE}/${id}`, request);

  return data;
};

export const deleteTransaction = async (id: string) => {
  const { data } = await api.delete<NullApiResponse>(`${MODULE}/${id}`);

  return data;
};
