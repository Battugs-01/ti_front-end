import { PermissionList } from "service/settings/permission/type";
import { Address, Agency, Profile } from "service/type";

export interface ScreeningListType {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  rd: string;
  phone: string;
  is_active: boolean;
  profile_id: number | null;
  age: number;
  is_have_care_giver: boolean;
  address: Address;
  person_in_charge_id: number;
  person_in_charge: PersonInCharge;
  assessments: Assessments[];
  development_plans: DevelopmentPlan[];
  assessment: Assessment;
  gender: string;
}

export interface DevelopmentPlan {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  created_employee_id: number;
  updated_employee_id: null;
  items: null;
}

export interface Assessments {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  employee_id: number;
  date: Date;
  blood_presure: number;
  heart_rate: number;
  respiratory_rate: number;
  body_temp: number;
  cfs_point: number;
  level: string;
}

export interface Assessment {
  level: string;
  cfs_point: number;
  date: Date;
  total: number;
}

export interface PersonInCharge {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  profile_id: number;
  profile: Profile;
  agency_id: number;
  agency: Agency;
  birth_date: Date;
  gender: string;
  email: string;
  phone: string;
  is_active: boolean;
  address: PersonInChargeAddress;
}

export interface PersonInChargeAddress {
  city_id: number;
  district_id: number;
  khoroo_id: number;
  desc: string;
}

export interface AssessmentListType {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  customer: Customer;
  employee_id: number;
  employee: PermissionList;
  date: Date;
  blood_presure: number;
  heart_rate: number;
  respiratory_rate: number;
  body_temp: number;
  cfs_point: number;
  level: string;
  questions: Questions[];
}

export interface Questions {
  id: number;
  created_at: Date;
  updated_at: Date;
  assessment_id: number;
  question_id: number;
  question: Question;
  answer: boolean;
}

export interface Question {
  id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  title: string;
  is_boolean: boolean;
}

export interface Customer {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  rd: string;
  phone: string;
  is_active: boolean;
  profile_id: null;
  age: number;
  is_have_care_giver: boolean;
  address: Address;
  person_in_charge_id: number;
}

export interface CustomerDevelopmentPlan {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  created_employee_id: number;
  created_employee: CreatedEmployee;
  updated_employee_id: null;
  items: Item[];
}

export interface CreatedEmployee {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  profile: Profile;
  profile_id: number;
  agency_id: number;
  agency?: Agency;
  birth_date: Date;
  gender: string;
  email: string;
  phone: string;
  is_active: boolean;
  address: Address;
}

export interface Item {
  id: number;
  created_at: Date;
  updated_at: Date;
  plan_id: number;
  intervention: string;
  care_foci_item_id: number;
  care_foci_item: CareFociItem;
  frequency: number;
  frequency_type: string;
  person_in_charge_id: number;
  person_in_charge: CreatedEmployee;
  estimated_date: Date;
}

export interface CareFociItem {
  id: number;
  created_at: Date;
  updated_at: Date;
  care_foci_id: number;
  name: string;
  min: number;
  max: number;
  description: string;
}
