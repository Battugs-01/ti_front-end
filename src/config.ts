import { Rule } from "antd/lib/form";
import { Week } from "types";

export const deleteConfirm = "delete me";
export const deleteConfirmReg = /^delete me$/g;
export const FieldRequireMessage = "Энэ талбарыг оруулах шаардлагатай!";

export const FORM_ITEM_RULE: (value?: any) => Rule[] = (value?: any) => [
  { message: FieldRequireMessage, required: true, ...value },
];
// Service
export enum GenderType {
  male = "male",
  female = "female",
}

export const workersGenderArray = Object.freeze([
  {
    label: "Эрэгтэй",
    value: GenderType.male,
  },
  {
    label: "Эмэгтэй",
    value: GenderType.female,
  },
]);

// male = "male",
// female = "female",

export enum UserRoleType {
  admin = "admin",
  manager = "manager",
}

export const permissionArray = Object.freeze([
  UserRoleType.admin,
  UserRoleType.manager,
]);

export const permissionArraySuperAdmin = Object.freeze([
  UserRoleType.admin,
  UserRoleType.manager,
]);

export enum DevPlanQuistions {
  TreatInteract = "TreatInteract",
  LifePride = "LifePride",
  LifeValue = "LifeValue",
  PriorityService = "PriorityService",
}

export const ageOptions = Object.freeze([
  {
    label: "-54",
    value: ["0", "54"],
  },
  {
    label: "55-59",
    value: ["55", "59"],
  },
  {
    label: "60-64",
    value: ["60", "64"],
  },
  {
    label: "65-69",
    value: ["65", "69"],
  },
  {
    label: "70-74",
    value: ["70", "74"],
  },
  {
    label: "75+",
    value: ["75", "200"],
  },
]);

export const isDisablity = Object.freeze([
  {
    label: "Тийм",
    value: true,
  },
  {
    label: "Үгүй",
    value: false,
  },
]);

export enum Disability {
  A21 = 0,
  C36 = 1,
}
export const disabilityType = Object.freeze([
  {
    label: "A21",
    value: Disability.A21,
  },
  {
    label: "C36",
    value: Disability.C36,
  },
]);

export enum RoleType {
  aimag = 2,
  sum = 3,
}

export const roleSelect = Object.freeze([
  {
    label: "Аймаг / Хот",
    value: RoleType.aimag,
  },
  {
    label: "Сум / Дүүрэг",
    value: RoleType.sum,
  },
]);

export const WEEK_DAY_ARRAY = Object.freeze([
  {
    value: Week.Monday,
    label: "Mon",
  },
  {
    value: Week.Tuesday,
    label: "Tue",
  },
  {
    value: Week.Wednesday,
    label: "Wed",
  },
  {
    value: Week.Thursday,
    label: "Thu",
  },
  {
    value: Week.Friday,
    label: "Fri",
  },
  {
    value: Week.Saturday,
    label: "Sat",
  },
  {
    value: Week.Sunday,
    label: "Sun",
  },
]);
export const COMMISSION_ARRAY = Object.freeze(
  new Array(101)
    .fill(1)
    .map((_, index) => ({ label: index + " %", value: index }))
);

export const BANK_ARRAY = Object.freeze([
  {
    value: "tdb",
    label: "Trade and Development bank",
  },
  {
    value: "khaan",
    label: "Khan bank",
  },
  {
    value: "golomt",
    label: "Golomt bank",
  },
  {
    value: "khas",
    label: "Xac bank",
  },
  {
    value: "state",
    label: "State bank",
  },
  {
    value: "capitron",
    label: "Capitron bank",
  },
]);

export const CURRENCY_ARRAY = Object.freeze([
  {
    label: "MNT",
    value: "mnt",
    symbol: "₮",
  },
  {
    label: "USD",
    value: "usd",
    symbol: "$",
  },
]);

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const LANGUAGES = Object.freeze([
  {
    label: "Mongolia",
    value: "mn",
  },
  {
    label: "English",
    value: "en",
  },
  {
    label: "Korea",
    value: "kr",
  },
  {
    label: "China",
    value: "cn",
  },
  {
    label: "Russia",
    value: "ru",
  },
]);

export enum FieldRegistrationTab {
  CargoApproach = "cargo_approach",
  Remainder = "remainder",
  ArrivalField = "arrival_field",
}
