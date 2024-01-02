import { MerchantService } from "service/merchantService/type";
import { Base } from "service/type";

export interface Merchant extends Base {
  firebase_uuid: string;
  push_token: string;
  phone: string;
  email: string;
  avatar: string;
  service_id: number;
  service?: MerchantService;
  full_name: string;
  role: MerchantRole;
  notification_count: number;
  last_login_date: Date;
}

export enum MerchantRole {
  owner = "owner",
  manager = "manager",
}
