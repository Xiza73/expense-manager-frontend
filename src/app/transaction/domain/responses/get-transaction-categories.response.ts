import { ResponseData } from '@/domain/api.interface';

import { TransactionCategory } from '../transaction-category.interface';

export type GetTransactionCategoriesApiResponse = ResponseData<{
  data: TransactionCategory[];
}>;

export type GetTransactionCategoriesResponse = TransactionCategory[];
