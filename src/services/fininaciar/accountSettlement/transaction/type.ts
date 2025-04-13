import { Ledger } from "service/feild_registration/type";

export interface Transaction {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  ledger_id: number;
  ledger: Ledger;
  transaction_type: string;
  amount: number;
  payment_type: string;
  payer: string;
  barimt: number;
  ledger_amount: number;
}
