import { api } from '@/lib/axios';

import { GetTransactionCategoriesApiResponse } from '../domain/responses/get-transaction-categories.response';

const MODULE = '/transaction-category';

export const getTransactionCategories = async () => {
  const { data } = await api.get<GetTransactionCategoriesApiResponse>(
    `${MODULE}`,
  );

  return data;
};
