import { NullApiResponse } from '@/domain/responses/null.response';
import { api } from '@/lib/axios';

import { CreateTransactionServiceRequest } from '../domain/requests/create-transaction-service.request';
import { UpdateTransactionServiceRequest } from '../domain/requests/update-transaction-service.request.request';
import { GetTransactionServicesApiResponse } from '../domain/responses/get-transaction-services.response';

const MODULE = '/transaction-service';

export const getTransactionServices = async () => {
  const { data } = await api.get<GetTransactionServicesApiResponse>(
    `${MODULE}`,
  );

  return data;
};

export const createTransactionService = async (
  body: CreateTransactionServiceRequest,
) => {
  const { data } = await api.post<NullApiResponse>(`${MODULE}`, body);

  return data;
};

export const updateTransactionService = async ({
  id,
  ...body
}: UpdateTransactionServiceRequest) => {
  const { data } = await api.put<NullApiResponse>(`${MODULE}/${id}`, body);

  return data;
};

export const deleteTransactionService = async (id: string) => {
  const { data } = await api.delete<NullApiResponse>(`${MODULE}/${id}`);

  return data;
};
