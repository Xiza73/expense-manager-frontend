import { ResponseData } from '@/domain/api.interface';

import { TransactionApiService, TransactionService } from '../transaction-service.interface';

export type GetTransactionServicesApiResponse = ResponseData<{
  data: TransactionApiService[];
}>;

export type GetTransactionServicesResponse = TransactionService[];
