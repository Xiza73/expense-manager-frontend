import { NullApiResponse } from '@/domain/responses/null.response';
import { api } from '@/lib/axios';
import { buildQueryParams } from '@/utils/build-query-params.util';

import { CreateTransactionRequest } from '../domain/requests/create-transaction.request';
import { GetTransactionsRequest } from '../domain/requests/get-transactions.request';
import { GetTransactionsApiResponse } from '../domain/responses/get-transactions.response';

const MODULE = '/transaction';

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
