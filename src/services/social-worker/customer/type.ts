export interface DataType {
  items: ListElderly[];
  total: number;
}

export enum ElderlyStatus {
  ElderlySave = 1,
  ElderlyRequestSendToDistrict = 2,
  ElderlyRequestSendSendToCareCenter = 3,
  ElderlyWaiting = 4,
  ElderlyAllocated = 5,
  ElderlyTakingCare = 6,
  ElderlyCareCenterReturned = 7,
  ElderlyDied = 8,
  ReturnSum = 9,
  WaitDistrict = 10,
}

export enum RequestType {
  all = "all",
  saved = "saved",
  putOnHold = "putOnHold",
  returned = "returned",
  requestSend = "requestSend",
}

export interface ListElderly {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_user_id: number;
  created_user: CreatedUser;
  modified_user_id: number;
  elderly_id: number;
  elderly: Elderly;
  status: number;
  city_id: number;
  district_id: number;
  khoroo_id: number;
  ordinances: null;
  welfare_documents: null;
}

export interface CreatedUser {
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
  city: City;
  district_id: number;
  district: City;
  khoroo_id: number;
  khoroo: City;
}

export interface Elderly {
  id: number;
  created_at: Date;
  updated_at: Date;
  profile_id: number;
  family_name: string;
  first_name: string;
  last_name: string;
  rd: string;
  gender: number;
  age: number;
  birth_date: Date;
  is_disability: boolean;
  disability_desc: string;
  education: string;
  reason: string;
  marriage: string;
  family_count: number;
  children_count: number;
  address: null;
  situational: null;
  definition_governor: null;
  created_user_id: number;
  profile: File;
}

export interface ElderlyInterface {
  id: number;
  created_at: Date;
  updated_at: Date;
  profile_id: number;
  family_name: string;
  first_name: string;
  last_name: string;
  rd: string;
  gender: number;
  age: number;
  birth_date: Date;
  is_disability: boolean;
  disability_desc: string;
  education: string;
  reason: string;
  marriage: string;
  family_count: number;
  children_count: number;
  laboratory_tests: LaboratoryTests[];
  address: Address;
  documents: Documents;
  situational: DefinitionGovernor[];
  definition_governor: DefinitionGovernor[];
  created_user_id: number;
  profile: File;
}

export interface Address {
  id: number;
  created_at: Date;
  updated_at: Date;
  elderly_id: number;
  city_id: number;
  city: City;
  district_id: number;
  district: City;
  khoroo_id: number;
  khoroo: City;
  street: string;
  description: string;
}

export interface City {
  id: number;
  created_at: Date;
  updated_at: Date;
  code?: string;
  name: string;
  is_active: boolean;
  city_id?: number;
  district_id?: number;
  description?: string;
}

export interface DefinitionGovernor {
  id: number;
  created_at: Date;
  updated_at: Date;
  file_name: string;
  original_name: OriginalName;
  physical_path: string;
  extention: Extention;
  file_size: number;
}

export enum Extention {
  Empty = "",
  PDF = "pdf",
}

export enum OriginalName {
  Empty = "",
  Sample1PDF = "sample (1).pdf",
}

export interface Documents {
  id: number;
  created_at: Date;
  updated_at: Date;
  elderly_id: number;
  is_pension_loan: boolean;
  care_request: DefinitionGovernor[];
  insurance_notebook: DefinitionGovernor[];
  is_pension_inquiry: DefinitionGovernor[];
  pension_loan: DefinitionGovernor[];
  is_disability_inquiry: DefinitionGovernor[];
  other_welfare_services_inquiry: any[];
  insurance_discounts_inquiry: DefinitionGovernor[];
  care_center_discount_inquiry: DefinitionGovernor[];
  identity_card: DefinitionGovernor[];
  property_inquiry: DefinitionGovernor[];
  is_have_children_inquiry: DefinitionGovernor[];
  is_have_sibling_inquiry: DefinitionGovernor[];
  is_married_inquiry: DefinitionGovernor[];
  is_divorce_inquiry: DefinitionGovernor[];
}

export interface LaboratoryTests {
  id: number;
  created_at: Date;
  updated_at: Date;
  elderly_id: number;
  laboratory_test_id: number;
  laboratory_test: LaboratoryTest;
  files: File[];
}

export interface File {
  id: number;
  created_at: Date;
  updated_at: Date;
  file_name: string;
  original_name: OriginalName;
  physical_path: string;
  extention: Extention;
  file_size: number;
}
export interface LaboratoryTest {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  is_active: boolean;
}
