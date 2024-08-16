import { Address, Profile } from "service/type";

export interface PermissionList {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  profile_id: number | null;
  profile?: Profile;
  agency_id: number;
  agency: Agency;
  birth_date: Date;
  gender: string;
  email: string;
  phone: string;
  is_active: boolean;
  address: Address;
}

export interface Agency {
  id: number;
  created_at: Date;
  updated_at: Date;
  code?: string;
  name: string;
  is_active: boolean;
  city_id?: number;
  district_id?: number;
}
