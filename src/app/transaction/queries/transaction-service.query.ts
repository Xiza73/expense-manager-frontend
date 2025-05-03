import { queryOptions } from '@tanstack/react-query';

import { NullResponse } from '@/domain/responses/null.response';
import { useMutation } from '@/hooks/useMutation';
import { useQuery } from '@/hooks/useQuery';
import { queryClient } from '@/main';

import { transactionServiceAdapter } from '../adapters/transaction-service.adapter';
import { CreateTransactionServiceRequest } from '../domain/requests/create-transaction-service.request';
import { UpdateTransactionServiceRequest } from '../domain/requests/update-transaction-service.request.request';
import { GetTransactionServicesResponse } from '../domain/responses/get-transaction-services.response';
import {
  createTransactionService,
  deleteTransactionService,
  getTransactionServices,
  updateTransactionService,
} from '../services/transaction-service.service';

export const getTransactionServicesQueryKey = () => [
  'get-transaction-services',
];

const getTransactionServicesFn = async () => {
  const data = await getTransactionServices();

  const transactionServices = data.responseObject.data.map(
    (transactionService) => transactionServiceAdapter(transactionService),
  );

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

export const useCreateTransactionServiceMutation = () =>
  useMutation<NullResponse, CreateTransactionServiceRequest>({
    showError: true,
    showSuccess: true,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-transaction-services'],
      });
    },
    mutationFn: async (request) => {
      const data = await createTransactionService(request);

      return {
        message: data.message,
        success: data.success,
      };
    },
  });

export const useUpdateTransactionServiceMutation = () =>
  useMutation<NullResponse, UpdateTransactionServiceRequest>({
    showError: true,
    showSuccess: true,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-transaction-services'],
      });
    },
    mutationFn: async (request) => {
      const data = await updateTransactionService(request);

      return {
        message: data.message,
        success: data.success,
      };
    },
  });

export const useDeleteTransactionServiceMutation = () =>
  useMutation<NullResponse, string>({
    showError: true,
    showSuccess: true,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-transaction-services'],
      });
    },
    mutationFn: async (id) => {
      const data = await deleteTransactionService(id);

      return {
        message: data.message,
        success: data.success,
      };
    },
  });
