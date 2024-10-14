import { Address, Profile } from "service/type";

export interface TotalPointInterface {
  mini_cog: number;
  barthel_index: number;
  gds: number;
}

export interface TotalCaseInterface {
  levels: Levels[];
  ages: { [key: string]: number };
  sex: Sex;
}

export interface Levels {
  name: string;
  percent: number;
  male_percent: number;
  female_percent: number;
}

export interface Sex {
  female: number;
  male: number;
}

export interface MapDataType {
  name: string;
  percent: number;
  profile: Profile;
  male_count: number;
  male_percent: number;
  female_count: number;
  female_percent: number;
  address: Address;
}
