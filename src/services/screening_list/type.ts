import { PermissionList } from "service/settings/permission/type";
import { Address } from "service/type";

export interface ScreeningListType {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  customer: Customer;
  employee_id: number;
  employee: PermissionList;
  date: Date;
  blood_presure: number;
  heart_rate: number;
  respiratory_rate: number;
  body_temp: number;
  cfs_point: number;
  level: string;
}

export interface Customer {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  rd: string;
  phone: string;
  is_active: boolean;
  profile_id: null;
  age: number;
  is_have_care_giver: boolean;
  address: Address;
  person_in_charge_id: number;
}
