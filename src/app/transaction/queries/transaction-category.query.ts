import { queryOptions } from '@tanstack/react-query';

import { useQuery } from '@/hooks/useQuery';

import { GetTransactionCategoriesResponse } from '../domain/responses/get-transaction-categories.response';
import { getTransactionCategories } from '../services/transaction-category.service';

export const getTransactionCategoriesQueryKey = () => [
  'get-transaction-categories',
];

const getTransactionCategoriesFn = async () => {
  const data = await getTransactionCategories();

  const transactionCategories = data.responseObject.data;

  return transactionCategories;
};

export const getTransactionCategoriesQueryOptions = () =>
  queryOptions<GetTransactionCategoriesResponse>({
    queryKey: getTransactionCategoriesQueryKey(),
    queryFn: getTransactionCategoriesFn,
  });

export const useGetTransactionCategoriesQuery = () =>
  useQuery<GetTransactionCategoriesResponse>({
    queryKey: getTransactionCategoriesQueryKey(),
    queryFn: getTransactionCategoriesFn,
  });
