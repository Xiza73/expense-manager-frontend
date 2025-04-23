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
  [PaymentMethodKey.CASH]: 'Cash',
  [PaymentMethodKey.BANK_TRANSFER]: 'Bank Transfer',
  [PaymentMethodKey.CREDIT_CARD]: 'Credit Card',
  [PaymentMethodKey.DEBIT_CARD]: 'Debit Card',
  [PaymentMethodKey.PAYPAL]: 'Paypal',
  [PaymentMethodKey.CRYPTOCURRENCY]: 'Cryptocurrency',
  [PaymentMethodKey.YAPE_PLIN]: 'Yape/Plin',
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
