import { queryOptions } from '@tanstack/react-query';

import { useQuery } from '@/hooks/useQuery';

import { GetTransactionServicesResponse } from '../domain/responses/get-transaction-services.response';
import { getTransactionServices } from '../services/transaction-service.service';

export const getTransactionServicesQueryKey = () => [
  'get-transaction-services',
];

const getTransactionServicesFn = async () => {
  const data = await getTransactionServices();

  const transactionServices = data.responseObject.data;

  return transactionServices;
};

export const getTransactionServicesQueryOptions = () =>
  queryOptions<GetTransactionServicesResponse>({
    queryKey: getTransactionServicesQueryKey(),
    queryFn: getTransactionServicesFn,
  });

export const useGetTransactionServicesQuery = () =>
  useQuery<GetTransactionServicesResponse>({
    queryKey: getTransactionServicesQueryKey(),
    queryFn: getTransactionServicesFn,
  });
