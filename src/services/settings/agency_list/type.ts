import { Address, Profile } from "service/type";

export interface AgencyListType {
  id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  director_name: string;
  name: string;
  name_en: string;
  address: Address;
  email: string;
  phone_no: string;
  link: string;
  establishment_year: number;
  profile: Profile;
  profile_id: number;
}
