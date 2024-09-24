import { Address, Profile } from "service/type";

export interface UserType {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  profile_id: number | null;
  is_initial_admin: boolean;
  agency_id: number | null;
  stackholder_id: number | null;
  stackholder?: Stackholder;
  email: string;
  phone: string;
  is_active: boolean;
  role: string;
  address: Address;
  profile?: Profile;
  agency?: Agency;
}

export interface Agency {
  id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  name: string;
  director_name: string;
  email: string;
  phone_no: string;
  link: string;
  date_establishment: number;
  address: Address;
}

export interface Stackholder {
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
