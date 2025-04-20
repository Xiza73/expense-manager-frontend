import { api } from '@/lib/axios';

import { GetAccountApiResponse } from '../domain/responses/get-account.response';
import { GetAccountsApiResponse } from '../domain/responses/get-accounts.response';

const MODULE = '/account';

export const getLatestAccount = async () => {
  const { data } = await api.get<GetAccountApiResponse>(`${MODULE}/latest`);

  return data;
};

export const getAccounts = async () => {
  const { data } = await api.get<GetAccountsApiResponse>(`${MODULE}`);

  return data;
};

export const getAccount = async (id: string) => {
  const { data } = await api.get<GetAccountApiResponse>(`${MODULE}/${id}`);

  return data;
};
