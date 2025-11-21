export enum PayStatusKey {
  PAID = 'PAID',
  PENDING = 'PENDING',
}

export const PayStatusLabel = {
  [PayStatusKey.PAID]: 'paid',
  [PayStatusKey.PENDING]: 'pending',
} as const;
export type PayStatusLabel =
  (typeof PayStatusLabel)[keyof typeof PayStatusLabel];
