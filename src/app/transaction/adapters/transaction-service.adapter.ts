import {
  TransactionApiService,
  TransactionService,
} from '../domain/transaction-service.interface';

export const transactionServiceAdapter = (
  transactionService: TransactionApiService,
): TransactionService => {
  return {
    id: transactionService.id,
    name: transactionService.name,
    userId: transactionService.user_id,
  };
};
