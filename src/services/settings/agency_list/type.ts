import { Address, Profile } from "service/type";

export interface AgencyListType {
  id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  name: string;
  director_name: string;
  address: Address;
  email: string;
  phone_no: string;
  link: string;
  date_establishment: number;
  profile: Profile;
  profile_id: number;
}
