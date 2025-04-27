export enum TransactionTypeKey {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export const TransactionType = {
  [TransactionTypeKey.EXPENSE]: 'Expense',
  [TransactionTypeKey.INCOME]: 'Income',
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
