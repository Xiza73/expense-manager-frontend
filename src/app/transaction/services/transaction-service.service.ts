import { api } from '@/lib/axios';

import { GetTransactionServicesApiResponse } from '../domain/responses/get-transaction-services.response';

const MODULE = '/transaction-service';

export const getTransactionServices = async () => {
  const { data } = await api.get<GetTransactionServicesApiResponse>(
    `${MODULE}`,
  );

  return data;
};
