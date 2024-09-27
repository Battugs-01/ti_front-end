// import { Address } from "service/social-worker/customer/type";

import { Profile } from "service/type";

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
  profile: Profile;
  profile_id: number;
  district_id: number;
}
