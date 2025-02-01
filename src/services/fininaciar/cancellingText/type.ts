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

export interface InvalidateTicketList {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  additional_fee_ticket_id: number;
  fee_code: string;
  fee_name: string;
  unit_measurement: string;
  fee_amount: number;
  number_1: number;
  number_2: number;
  total_amount: number;
  invalidate_request_id: number;
  invalidate_request: InvalidateRequest;
}

export interface InvalidateRequest {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  created_by: AtedBy;
  updated_by_id: number;
  ticket_id: number;
  ticket: Ticket;
  calc_ids: number[];
  status: string;
}

export interface AtedBy {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  created_by?: AtedBy;
  updated_by_id: number;
  updated_by?: AtedBy;
  first_name: string;
  last_name: string;
  phone: string;
  registration_number: string;
  age: number;
  gender: string;
  avatar_path: string;
  email: string;
  is_active: boolean;
  role_name: string;
  position: string;
  customer_company_id: number;
}

export interface Ticket {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  shipping_or_assignment: string;
  container_transport_record_id: number;
  container_transport_record: null;
  debit: null;
  ticket_number: string;
  cargo_weight: number;
  additional_fee_category_id: number;
  additional_fee_category: AdditionalFeeCategory;
  date: Date;
  additional_fee_ticket_calculated: null;
}

export interface AdditionalFeeCategory {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  code: string;
  category_type: string;
  AdditionalFees: null;
}
