export interface DataType {
  items: ListElderly[];
  total: number;
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
  elderly_id: number;
  elderly: Elderly;
  status: number;
  city_id: number;
  district_id: number;
  khoroo_id: number;
  ordinances: null;
  welfare_documents: null;
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
}

export interface ElderlyInterface {
  id: number;
  created_at: Date;
  updated_at: Date;
  care_center_id: number;
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
  documents: Documents;
  situational: DefinitionGovernor[];
  definition_governor: DefinitionGovernor[];
  modified_user_id: number;
  created_user_id: number;
  city_id: number;
  district_id: number;
  khoroo_id: number;
  status: number;
  ordinances: null;
  welfare_documents: null;
}

export interface DefinitionGovernor {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  file_name: FileName;
  original_name: OriginalName;
  physical_path: String;
  extention: Extention;
  file_size: number;
}

export enum Extention {
  PNG = "png",
}

export enum FileName {
  Cls6Cdfg0000101T6Vr2G7EimPNG = "cls6cdfg0000101t6vr2g7eim.png",
}

export enum OriginalName {
  ChelPNG = "chel.png",
}

export enum PhysicalPath {
  ImagesCls6Cdfg0000101T6Vr2G7EimPNG = "images/cls6cdfg0000101t6vr2g7eim.png",
}

export interface Documents {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  elderly_id: number;
  is_pension_loan: boolean;
  care_request: DefinitionGovernor[];
  insurance_notebook: DefinitionGovernor[];
  is_pension_inquiry: DefinitionGovernor[];
  pension_loan: DefinitionGovernor[];
  is_disability_inquiry: DefinitionGovernor[];
  other_welfare_services_inquiry: DefinitionGovernor[];
  insurance_discounts_inquiry: DefinitionGovernor[];
  care_center_discount_inquiry: DefinitionGovernor[];
  identity_card: DefinitionGovernor[];
  property_inquiry: DefinitionGovernor[];
  is_have_children_inquiry: DefinitionGovernor[];
  is_have_sibling_inquiry: DefinitionGovernor[];
  is_married_inquiry: DefinitionGovernor[];
  is_divorce_inquiry: DefinitionGovernor[];
}
