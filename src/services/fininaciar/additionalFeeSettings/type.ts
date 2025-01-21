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

export interface AdditionalFeeType {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  category_code: string;
  fee_code: string;
  fee_name: string;
  unit_measurement: string;
  fee_amount: number;
  number_1: number;
  number_2: number;
  total_amount: number;
}
