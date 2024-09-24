import { Address } from "service/type";

export interface StackholderType {
  id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  name: string;
  fax: string;
  email: string;
  phone_no: string;
  link: string;
  address: Address;
}
