export enum TransactionTypeKey {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  DEBT = 'DEBT',
  LOAN = 'LOAN',
}

export const TransactionType = {
  [TransactionTypeKey.EXPENSE]: 'expense',
  [TransactionTypeKey.INCOME]: 'income',
  [TransactionTypeKey.DEBT]: 'debt',
  [TransactionTypeKey.LOAN]: 'loan',
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const getTransactionTypeKey = (
  type: TransactionType,
): TransactionTypeKey => {
  return Object.keys(TransactionType).find(
    (key) => TransactionType[key as TransactionTypeKey] === type,
  ) as TransactionTypeKey;
};
