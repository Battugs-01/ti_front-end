// import { Address } from "service/social-worker/customer/type";

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  employee: Admin;
}

export interface Admin {
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
  role: string;
  // city: Address;
  district_id: number;
}
