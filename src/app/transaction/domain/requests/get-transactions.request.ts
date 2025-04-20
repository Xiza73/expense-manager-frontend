import { TransactionTypeKey } from '../transaction-type.enum';

export interface GetTransactionsRequest {
  page: number;
  limit: number;
  type?: TransactionTypeKey;
  accountId?: number;
  categoryId?: number;
  serviceId?: number;
}
