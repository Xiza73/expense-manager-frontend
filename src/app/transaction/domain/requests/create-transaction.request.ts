import { CurrencyKey } from '@/domain/currency.enum';
import { PaymentMethodKey } from '@/domain/payment-method.enum';

import { TransactionTypeKey } from '../transaction-type.enum';

export interface CreateTransactionRequest {
  name: string;
  description?: string;
  amount: number;
  currency: CurrencyKey;
  type: TransactionTypeKey;
  paymentMethod: PaymentMethodKey;
  date: string;
  categoryId: number;
  serviceId?: number;
  accountId: number;
}
