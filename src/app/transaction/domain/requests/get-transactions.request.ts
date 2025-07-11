import { Order } from '@/domain/order.enum';
import { PaymentMethodKey } from '@/domain/payment-method.enum';

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
  search?: string;
  type?: TransactionTypeKey;
  paymentMethod?: PaymentMethodKey;
  accountId?: number;
  categoryId?: number;
  serviceId?: number;
  fieldOrder?: GetTransactionsFieldOrder;
  order?: Order;
}
