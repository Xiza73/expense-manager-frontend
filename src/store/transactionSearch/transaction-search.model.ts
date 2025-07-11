import { GetTransactionsRequest } from '@/app/transaction/domain/requests/get-transactions.request';

export type TransactionSearchState = {
  search?: GetTransactionsRequest;
  isSameSearch?: boolean;
}

export interface TransactionSearchStore extends TransactionSearchState {
  setTransactionSearch: (data: GetTransactionsRequest) => void;
}
