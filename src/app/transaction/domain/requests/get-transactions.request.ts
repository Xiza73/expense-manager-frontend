import { Order } from '@/domain/order.enum';

import { TransactionTypeKey } from '../transaction-type.enum';

export const GetTransactionsFieldOrder = {
  DATE: 'date',
  NAME: 'name',
  CATEGORY: 'category',
  SERVICE: 'service',
  PAYMENT_METHOD: 'paymentMethod',
  TYPE: 'type',
  AMOUNT: 'amount',
};
export type GetTransactionsFieldOrder =
  (typeof GetTransactionsFieldOrder)[keyof typeof GetTransactionsFieldOrder];

export interface GetTransactionsRequest {
  page?: number;
  limit?: number;
  type?: TransactionTypeKey;
  accountId?: number;
  categoryId?: number;
  serviceId?: number;
  fieldOrder?: GetTransactionsFieldOrder;
  order?: Order;
}
