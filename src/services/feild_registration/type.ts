export interface CargoApproachList {
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
