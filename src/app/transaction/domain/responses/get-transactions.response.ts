import { ListData, ResponseListData } from '@/domain/api.interface';

import { ApiTransaction, Transaction } from '../transaction.interface';

export type GetTransactionsApiResponse = ResponseListData<ApiTransaction>;

export type GetTransactionsResponse = ListData<Transaction>;
