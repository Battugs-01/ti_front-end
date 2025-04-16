import { CustomerCompanyType } from "service/fininaciar/additionalFeeSettings/type";

export interface LedgerType {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  name: string;
  debit: number;
  credit: number;
  credit_sum: number;
  debit_sum: number;
  transaction_sum: number;
  ledger_balance_sum: number;
  balance: number;
  initial_balance: number;
  customer_company?: CustomerCompanyType;
  init_day_balance: number;
  last_day_balance: number;
}

export interface LedgerMetaType {
  total_balance: number;
}
