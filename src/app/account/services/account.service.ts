import { api } from '@/lib/axios';
import { buildQueryParams } from '@/utils/build-query-params.util';

import { CreateAccountRequest } from '../domain/requests/create-account.request';
import { GetAccountsRequest } from '../domain/requests/get-accounts.request';
import { CreateAccountApiResponse } from '../domain/responses/create-account.response';
import { GetAccountApiResponse } from '../domain/responses/get-account.response';
import { GetAccountsApiResponse } from '../domain/responses/get-accounts.response';

const MODULE = '/account';

export const getLatestAccount = async () => {
  const { data } = await api.get<GetAccountApiResponse>(`${MODULE}/latest`);

  return data;
};

export const getAccounts = async (request: GetAccountsRequest) => {
  const queryParams = buildQueryParams(request);

  const { data } = await api.get<GetAccountsApiResponse>(
    `${MODULE}?${queryParams}`,
  );

  return data;
};

export const getAccount = async (id: string) => {
  const { data } = await api.get<GetAccountApiResponse>(`${MODULE}/${id}`);

  return data;
};

export const createAccount = async (request: CreateAccountRequest) => {
  const { data } = await api.post<CreateAccountApiResponse>(
    `${MODULE}`,
    request,
  );

  return data;
};
