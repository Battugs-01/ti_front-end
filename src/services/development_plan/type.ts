export interface ResponseType {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  code: string;
  name: string;
  is_active: boolean;
}

export interface GetDevPlanType {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  comprehensive_assessment_id: number;
  created_employee_id: number;
  updated_employee_id: null;
  is_active: boolean;
  items: DevPlanItem[];
}

export interface DevPlanItem {
  id: number;
  created_at: Date;
  updated_at: Date;
  plan_id: number;
  care_foci_id: number | null;
  care_foci?: CareFoci;
  valuation_id: number | null;
  care_foci_items?: CareFociItemElement[];
  general_items?: CareFociItemElement[];
}

export interface CareFoci {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  name_eng: string;
  key: string;
  is_active: boolean;
  description: string;
  items: null;
}

export interface CareFociItemElement {
  id: number;
  created_at: Date;
  updated_at: Date;
  plan_item_id: number;
  customer_care_foci_item_id?: number;
  customer_care_foci_item?: CustomerCareFociItem;
  care_foci_desc?: string;
  severity_level: string;
  summary_plan: string;
  duration: number;
  result: string;
  is_resolved: boolean;
  person_in_charge_id: null;
  key?: string;
  desc?: string;
}

export interface CustomerCareFociItem {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_care_foci_id: number;
  care_foci_id: number;
  care_foci_item_id: number;
  care_foci_item: CareFociItem;
  is_have: boolean;
  name?: string;
  description: string;
}

export interface CareFociItem {
  id: number;
  created_at: Date;
  updated_at: Date;
  care_foci_id: number;
  key: string;
  name: string;
  name_eng: string;
  min: number;
  max: number;
  description: string;
}
