import { Address } from "service/type";

export interface ResponseType {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  code: string;
  name: string;
  is_active: boolean;
}

export interface ManagementReportType {
  id: number;
  first_name: string;
  level1: number;
  level2: number;
  level3: number;
  role: string;
  rate: number;
}

export interface StatisticalReportType {
  year: number;
  month: number;
  level_1: number;
  level_2: number;
  level_3: number;
}

export interface CareFociReportType {
  name: string;
  items: CareFociReportItem[];
}

export interface CareFociReportItem {
  name: string;
  months: number[];
}

export interface ClosedReportType {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  rd: string;
  phone: string;
  is_active: boolean;
  gender: string;
  profile_id: null;
  age: number;
  address: Address;
  person_in_charge_id: number;
  person_in_charge: PersonInCharge;
  agency_id: number;
  agency: Agency;
  assessments: AssessmentElement[];
  development_plans: DevelopmentPlan[];
  caregiver: Caregiver;
  close: Close;
  assessment: PurpleAssessment;
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

export interface AssessmentElement {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  agency_id: number;
  employee_id: number;
  date: Date;
  cfs_point: number;
  level: string;
}

export interface PurpleAssessment {
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
  agency_id: number;
  birth_date: Date;
  gender: string;
  email: string;
  phone: string;
  is_active: boolean;
  role: string;
  address: PersonInChargeAddress;
}

export interface PersonInChargeAddress {
  city_id: number;
  district_id: number;
  khoroo_id: number;
  desc: string;
}

export interface Agency {
  id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  name: string;
}

export interface Close {
  is_close: boolean;
  date: Date;
  reason: string;
  employee_id: number;
}

export interface Question {
  id: number;
  created_at: Date;
  updated_at: Date;
  assessment_id: number;
  question_id: number;
  answer: boolean;
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
  gender: string;
  profile_id: number;
  age: number;
  address: Address;
  person_in_charge_id: number;
  assessments: null;
  development_plans: null;
  caregiver: Caregiver;
}

export interface Caregiver {
  is_with_someone: boolean;
  is_cohabitant: boolean;
  who_is: string;
  phone: string;
}
