import { Currency } from '@/domain/currency.enum';
import { PaymentMethod } from '@/domain/payment-method.enum';

import { GetTransactionResponse } from '../domain/responses/get-transaction.response';
import { ApiTransaction, Transaction } from '../domain/transaction.interface';
import { TransactionType } from '../domain/transaction-type.enum';

export const transactionAdapter = (
  transaction: ApiTransaction,
): Transaction => {
  return {
    id: transaction.id,
    name: transaction.name,
    description: transaction.description,
    amount: transaction.amount,
    currency: Currency[transaction.currency],
    type: TransactionType[transaction.type],
    date: new Date(transaction.date),
    paymentMethod: PaymentMethod[transaction.paymentMethod],
    isActive: transaction.isActive,
    category: {
      id: transaction.category.id,
      name: transaction.category.name,
    },
    service: {
      id: transaction.service?.id,
      name: transaction.service?.name,
    },
  };
};

export const getTransactionAdapter = (
  transaction: ApiTransaction,
): GetTransactionResponse => {
  return {
    ...transactionAdapter(transaction),
    account: {
      id: transaction.account.id,
    },
  };
};
