import { Currency, CurrencyKey } from '@/domain/currency.enum';
import { PaymentMethod, PaymentMethodKey } from '@/domain/payment-method.enum';

import { TransactionType, TransactionTypeKey } from './transaction-type.enum';

export interface ApiTransaction {
  id: number;
  name: string;
  description?: string;
  amount: number;
  currency: CurrencyKey;
  type: TransactionTypeKey;
  paymentMethod: PaymentMethodKey;
  date: string;
  isActive: boolean;
  isDebtLoan: boolean;
  isPaid: boolean;
  category: {
    id: number;
    name: string;
  };
  service?: {
    id: number;
    name: string;
  };
  account: {
    id: number;
  };
}

export interface Transaction {
  id: number;
  name: string;
  description?: string;
  amount: number;
  currency: Currency;
  type: TransactionType;
  date: Date;
  paymentMethod: PaymentMethod;
  isActive: boolean;
  isDebtLoan: boolean;
  isPaid: boolean;
  category: {
    id: number;
    name: string;
  };
  service: {
    id?: number;
    name?: string;
  };
}
