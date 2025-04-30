export enum PaymentMethodKey {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  YAPE_PLIN = 'YAPE_PLIN',
}

export const PaymentMethod = {
  [PaymentMethodKey.CASH]: 'cash',
  [PaymentMethodKey.BANK_TRANSFER]: 'bank_transfer',
  [PaymentMethodKey.CREDIT_CARD]: 'credit_card',
  [PaymentMethodKey.DEBIT_CARD]: 'debit_card',
  [PaymentMethodKey.PAYPAL]: 'paypal',
  [PaymentMethodKey.CRYPTOCURRENCY]: 'cryptocurrency',
  [PaymentMethodKey.YAPE_PLIN]: 'yape_plin',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const getPaymentMethodKey = (
  paymentMethod: PaymentMethod,
): PaymentMethodKey => {
  const paymentMethodKey = (
    Object.keys(PaymentMethod) as PaymentMethodKey[]
  ).find((key: PaymentMethodKey) => PaymentMethod[key] === paymentMethod);

  if (!paymentMethodKey) return PaymentMethodKey.CASH;

  return paymentMethodKey;
};
