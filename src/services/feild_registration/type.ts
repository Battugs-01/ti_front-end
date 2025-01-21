import { AdditionalFeeType } from "service/fininaciar/additionalFeeSettings/type";

export interface CargoApproachList {
  id: number;
  container_code: string;
  capacity: number;
  broker_name: string;
  broker_id: number;
  direction: string;
  approach_report_date: Date;
  arrived_at_site: string;
  opened_at: string;
  left_site: string;
  returned_at: string;
  status: string;
  is_recieved_and_waggon_gone: boolean;
  for_sale: boolean;
  container_cargo: ContainerCargo;
  transport_recieve: TransportRecieve;
  transport_give: TransportGive;
}

export interface ContainerCargo {
  cargo_name: string;
  reciever_email: string;
  reciever_phone: string;
}

export interface TransportGive {
  transfer_fee: number;
  transport_broker: string;
  transfer_broker_name: string;
}

export interface TransportRecieve {
  transport_fee: number;
  currency: string;
  customer_company_id: number;
  payment_method: string;
  additional_fee_note: string;
}

export interface GetTempAdditionalFeeType {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  container_transport_record_id: number;
  ticket_number: string;
  cargo_weight: number;
  category_fee_id: number;
  date: Date;
  additional_fee_ticket_calculated: TempAdditionalFee[];
}

export interface TempAdditionalFee {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  temp_additional_fee_wrapper_id: number;
  additional_fee_id: number;
  additional_fee: AdditionalFeeType;
  number_1: number;
  number_2: number;
  total_amount: number;
}
