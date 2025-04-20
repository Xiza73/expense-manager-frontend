import { ListData, ResponseListData } from '@/domain/api.interface';

import { Account, ApiAccount } from '../account.interface';

export type GetAccountsApiResponse = ResponseListData<ApiAccount>;

export type GetAccountsResponse = ListData<Account>;
