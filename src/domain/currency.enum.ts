export const CurrencyKey = {
  PEN: 'PEN',
  USD: 'USD',
  EUR: 'EUR',
} as const;
export type CurrencyKey = (typeof CurrencyKey)[keyof typeof CurrencyKey];

export const Currency = {
  [CurrencyKey.PEN]: 'S/',
  [CurrencyKey.USD]: '$',
  [CurrencyKey.EUR]: '€',
} as const;
export type Currency = (typeof Currency)[keyof typeof Currency];

export const getCurrencyKey = (currency: Currency): CurrencyKey => {
  const currencyKey = (Object.keys(Currency) as CurrencyKey[]).find(
    (key: CurrencyKey) => Currency[key] === currency,
  );

  if (!currencyKey) return CurrencyKey.PEN;

  return currencyKey;
};
