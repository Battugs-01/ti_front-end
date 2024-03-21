import { ListElderly } from "service/social-worker/customer/type";

export enum RequestType {
  decide = "decide",
  saved = "saved",
  putOnHold = "putOnHold",
  migration = "migration",
  decided = "decided",
}
export enum DetailType {
  history = "historyOfMigration",
  case = "personalCase",
  plan = "developmentPlan",
  pension = "Pension information",
  food = "Food card",
  diagnostic = "Diagnostic card",
}
export enum CaregiverType {
  all = "all",
  distribute = "distribute",
  died = "died",
  forcedReleace = "forcedReleace",
  putOnHold = "putOnHold",
  registered = "regitered",
  releasedOwnRequest = "releasedOwnRequest",
  saved = "saved",
  takingCare = "takingCare",
  canceled = "canceled",
}

export type ListProps = {
  id?: number;
  image?: string;
  name?: string;
  surname?: string;
  registrationNumber?: string;
  state?: Number;
  date?: any;
  time?: string;
  url?: string;
};

export type ElderlyListProps = {
  data?: ListElderly;
};

export type RightContentType = {
  showDetail?: () => void;
  state?: Number;
  date?: any;
  id?: any;
  time?: string;
  data?: ListElderly;
};

export interface CardData {
  id?: number;
  image?: string;
  name?: string;
  surname?: string;
  registrationNumber?: string;
  state?: Number;
  date?: any;
}

export enum FilterDocumentline {
  contract = 0,
  client_doc = 1,
  health_doc = 2,
}

export interface FilterDocumentButton {
  value: FilterDocumentline;
  label: string;
}
