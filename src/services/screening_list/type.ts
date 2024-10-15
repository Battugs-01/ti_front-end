// import { PermissionList } from "service/settings/permission/type";
import { Caregiver } from "service/statistical_report/type";
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
  caregiver: Caregiver;
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
  priority: string;
  count_comp_ass: number;
  date_comp_ass: string;
  developer_plan: boolean;
  is_temporary: boolean;
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
  employee: any;
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
  title_en: string;
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
  role: string;
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

export interface AdvanceCarePlanning {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  is_have_self_care_lost_someone: boolean;
  have_self_care_lost_someone: string;
  decisions_maker: string;
}

export interface ComprehensiveType {
  care_foci_percent: CareFociPercent[];
  mini_cog: Minicog;
  barthel_index: BodyBarthelIndex;
  gds: Gds;
  health: Health;
  comp_ass: CompAss;
  care_foci: CareFocus[];
  diseases: any[];
}

export interface BodyBarthelIndex {
  items: BarthelIndexElement[];
  point: number;
}

export interface BarthelIndexElement {
  id: number;
  created_at: Date;
  updated_at: Date;
  physical_condition_id: number;
  barthel_index_id: number;
  barthel_index: ItemBarthelIndex;
  answer_id: number;
  answer: Answer;
}

export interface Answer {
  id: number;
  created_at: Date;
  updated_at: Date;
  ref_barthel_index_id: number;
  answer: string;
  answer_en: string;
  point: number;
}

export interface ItemBarthelIndex {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  name_en: string;
  description: string;
}

export interface CareFocus {
  name: string;
  items: CareFocusItem[];
}

export interface CareFocusItem {
  name: string;
  is_have: boolean;
  desc: string;
}

export interface CareFociPercent {
  name: string;
  name_en: string;
  percent: number;
}

export interface CompAss {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  employee_id: number;
  date: Date;
  assessment_id: number;
  what_exactly_want_us: string;
  is_belong_religious_group: boolean;
  belong_religious_group: string;
  description: string;
  valuation: Valuation;
  drug_treatment: DrugTreatment;
  physical_condition: PhysicalCondition;
  cognition: Cognition;
  nutrition_hydration: NutritionHydration;
  mood: Mood;
  is_temporary: boolean;
  health_risks: HealthRisks;
  preventive_health: PreventiveHealth;
  advance_care_planning: AdvanceCarePlanning;
  environment: Environment;
  psychological_resources: PsychologicalResources;
  spiritual_needs: SpiritualNeeds;
  care_foci: CareFoci;
}

export interface AdvanceCarePlanning {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  is_have_self_care_lost_someone: boolean;
  have_self_care_lost_someone: string;
  decisions_maker: string;
}

export interface CareFoci {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  comprehensive_assessment_id: number;
  items: null;
}

export interface Cognition {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  is_recent_remembering: boolean;
  recent_remembering: string;
  is_daily_chores_problem: boolean;
  daily_chores_problem: string;
  is_declining_voc: boolean;
  declining_voc: string;
  is_declining_judgment: boolean;
  declining_judgment: string;
  is_recognizing: boolean;
  recognizing: string;
  minicog: Minicog;
  gds: Gds;
}

export interface Gds {
  is_life_satisfied: boolean;
  is_often_sad: boolean;
  is_feel_weak: boolean;
  is_rather_stay_home: boolean;
  is_feel_useless: boolean;
  point?: number;
}

export interface Minicog {
  words: string;
  word_point: number;
  clock_id: number;
  clock: Clock;
  clock_point: number;
  total_point: number;
}

export interface Clock {
  id: number;
  created_at: Date;
  updated_at: Date;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: string;
  file_size: number;
}

export interface DrugTreatment {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  drugs: null;
  is_miss_drug: boolean;
  name_of_drugs: string;
  difficulties_of_using: string;
}

export interface Environment {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  is_have_neightbourhood_risk: boolean;
  neightbourhood_risk: string;
  is_have_fall_risk_area: boolean;
  fall_risk_area: string;
  is_have_fire_hazards: boolean;
  fire_hazards: string;
  is_have_poor_access: boolean;
  poor_access: string;
  is_have_general_hygience: boolean;
  general_hygience: string;
  is_have_storage_of_medicine: boolean;
  storage_of_medicine: string;
  is_have_lighting: boolean;
  lighting: string;
  is_have_shelter: boolean;
  shelter: string;
  general_remarks: string;
}

export interface HealthRisks {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  is_sleep_problem: boolean;
  sleep_problem: string;
  is_loss_of_appetite: boolean;
  loss_of_appetite: string;
  is_pain: boolean;
  pain: string;
  is_fall_rist: boolean;
  fall_rist: string;
  is_dental_promblem: boolean;
  dental_promblem: string;
  is_wounds_rashes: boolean;
  wounds_rashes: string;
  is_cardiorespiratory_issue: boolean;
  cardiorespiratory_issue: string;
  is_bowel_problem: boolean;
  bowel_problem: string;
  is_urine_incontinence: boolean;
  urine_incontinence: string;
  other_problem: string;
}

export interface Mood {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  is_distress: boolean;
  distress: string;
  is_low_mood_last_two_week: boolean;
  is_lost_interest_last_two_week: boolean;
}

export interface NutritionHydration {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  fluid_daily: number;
  is_unintentional_weight_loss: boolean;
  mid_calf_circumference: number;
  weight: number;
  height: number;
  bmi: number;
}

export interface PhysicalCondition {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  ability_to_move_id: number;
  other_ability_to_move: string;
  visual_ability: boolean;
  is_listen_right_ear: boolean;
  is_listen_left_ear: boolean;
  is_problem_understaning: boolean;
  is_problem_self: boolean;
  bdl: null;
  iadl: null;
  barthel_indexs: BarthelIndexElement[];
  barthel_index_point: number;
}

export interface PreventiveHealth {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  is_regularly_alchohol_smoke: boolean;
  regularly_alchohol_smoke: string;
  is_checkup_care_clinic_last_sx_month: boolean;
  is_regularly_exercise: boolean;
  regularly_exercise: string;
}

export interface PsychologicalResources {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  feel_lonely: string;
  family_draw_id: number;
  elderly_social_rel_id: number;
  living_arrangement: string;
  caregiver_assessment: string;
  is_caregiver_depressed: boolean;
  caregiver_depressed: string;
  is_elderly_abuse: boolean;
  elderly_abuse: string;
  is_any_trade_off_finance: boolean;
  any_trade_off_finance: string;
  other_note: string;
}

export interface SpiritualNeeds {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  is_help_beliefs_cope_stress: boolean;
  help_beliefs_cope_stress: string;
  life_meaning: string;
  is_belief_affect_health: boolean;
  belief_affect: string;
  is_religious_community: boolean;
  religious_community: string;
  spiritual_issues_health: string;
}

export interface Valuation {
  id: number;
  created_at: Date;
  updated_at: Date;
  comprehensive_assessment_id: number;
  treat_interact: string;
  life_pride: string;
  life_value: string;
  priority_service: string;
  valution_diseases: any[];
  regular_treatment: string;
  doctor_appointment: string;
  blood_presure: number;
  heart_rate: number;
  respiratory_rate: number;
  body_temp: number;
}

export interface Health {
  blood_presure: number;
  heart_rate: number;
  respiratory_rate: number;
  body_temp: number;
}

export interface Emergency {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  name_en: string;
  description: string;
}

export interface EmergencyChecklistType {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  employee_id: number;
  assessment_id: number;
  date: Date;
  emergency_care_service: Emergency[];
  other_care_services: string;
  emergency_early_examinations: Emergency[];
  other_early_examinations: string;
}
