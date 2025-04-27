import { ResponseData } from '@/domain/api.interface';

import { ApiTransaction, Transaction } from '../transaction.interface';

export type GetTransactionApiResponse = ResponseData<ApiTransaction>;

export type GetTransactionResponse = Transaction & {
  account: {
    id: number;
  };
};
