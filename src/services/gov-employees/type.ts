import { File } from "service/social-worker/customer/type";

export enum EmployeeTab {
  all = "all",
  employee = "employee",
  contract = "contract worker",
  probation = "probation worker",
  attached = "attached",
}

export interface DataType {
  items: EmployeeInterface[];
  total: number;
}
export interface EmployeeInterface {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_active: boolean;
  position: string;
  user_type: number;
  city_id: number;
  district_id: number;
  khoroo_id: number;
  profile_id: number;
  profile: File;
}
