export interface PayDebtLoanRequest {
  id: string;
  amount: number;
  isPartial: boolean;
  description?: string;
}
