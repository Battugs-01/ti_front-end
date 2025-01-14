import type { LedgerType } from "../accountSettlement/ledger/type";

export interface CustomerCompanyType {
  id: number;
  created_at: Date;
  updated_at: Date;
  shortcut_name: string;
  name: string;
  is_broker: boolean;
  ledger_id: number;
  ledger: LedgerType;
  contact_number: string;
}
