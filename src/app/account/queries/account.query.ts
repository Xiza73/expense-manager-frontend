import { queryOptions } from '@tanstack/react-query';

import { QueryParams } from '@/domain/api.interface';
import { useQuery } from '@/hooks/useQuery';

import { accountAdapter } from '../adapters/account.adapter';
import { GetAccountsRequest } from '../domain/requests/get-accounts.request';
import { GetAccountResponse } from '../domain/responses/get-account.response';
import { GetAccountsResponse } from '../domain/responses/get-accounts.response';
import {
  getAccount,
  getAccounts,
  getLatestAccount,
} from '../services/account.service';

export const useGetLatestAccountQuery = () =>
  useQuery<GetAccountResponse>({
    queryKey: ['get-latest-account'],
    showPageError: true,
    queryFn: async () => {
      const data = await getLatestAccount();

      const account = accountAdapter(data.responseObject);

      return account;
    },
  });

export const useGetAccountsQuery = (req: QueryParams<GetAccountsRequest>) =>
  useQuery<GetAccountsResponse>({
    ...req,
    queryKey: ['get-accounts'],
    showPageError: true,
    queryFn: async () => {
      const data = await getAccounts(req.params);

      const accounts = data.responseObject.data.map((account) =>
        accountAdapter(account),
      );

      return {
        ...data.responseObject,
        data: accounts,
      };
    },
  });

export const getAccountQueryOptions = (id: string) =>
  queryOptions<GetAccountResponse>({
    queryKey: ['get-account', id],
    queryFn: async () => {
      const data = await getAccount(id);

      const account = accountAdapter(data.responseObject);

      return account;
    },
  });
