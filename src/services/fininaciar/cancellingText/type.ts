export interface CustomerCompanyType {
  id: number;
  created_at: Date;
  updated_at: Date;
  shortcut_name: string;
  name: string;
  is_broker: boolean;
  ledger_id: number;
  contact_number: string;
  ledger_name: string;
}
