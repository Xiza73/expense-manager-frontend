import { ResponseData } from '@/domain/api.interface';

import { TransactionService } from '../transaction-service.interface';

export type GetTransactionServicesApiResponse = ResponseData<{
  data: TransactionService[];
}>;

export type GetTransactionServicesResponse = TransactionService[];
