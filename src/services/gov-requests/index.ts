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
  died = "died",
  forcedReleace = "forcedReleace",
  putOnHold = "putOnHold",
  registered = "regitered",
  releasedOwnRequest = "releasedOwnRequest",
  saved = "saved",
  takingCare = "takingCare",
}

export type ListProps = {
  id?: number;
  image?: string;
  name?: string;
  surname?: string;
  registrationNumber?: string;
  state?: Number;
  date?: any;
};

export type RightContentType = {
  state?: Number;
  date?: any;
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
