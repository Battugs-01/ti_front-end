import { Rule } from "antd/lib/form";
import { Week } from "types";

export const deleteConfirm = "delete me";
export const deleteConfirmReg = /^delete me$/g;
export const FieldRequireMessage = "Энэ талбарыг оруулах шаардлагатай!";

export const FORM_ITEM_RULE: (value?: any) => Rule[] = (value?: any) => [
  { message: FieldRequireMessage, required: true, ...value },
];

export const BUCKET_NAMES = {
  photos: "photos",
  banners: "banners",
  logo: "logo",
  productBanner: "productbanner",
  productPhotos: "productphotos",
  notifications: "notifications",
  avatars: "avatars",
  menus: "menus",
};
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

export enum AgencyType {
  dev_area = 7,
  care_foci = 8,
  care_center = 9,
}
// male = "male",
// female = "female",

export const agencyArray = Object.freeze([
  {
    label: "Дархан–Уул аймгийн Ахмадын Хөгжлийн төв ОНӨУТҮГ",
    value: AgencyType.dev_area,
  },
  {
    label: "“АЧЛАЛТ ХҮҮХДҮҮД “ Идэвхтэй насжилтыг дэмжих төв",
    value: AgencyType.care_foci,
  },
  {
    label: "Мандал сум",
    value: AgencyType.care_center,
  },
]);

export enum UserRoleType {
  case_manager = "case_manager",
  senior_case_manager = "senior_case_manager",
  operation_manager = "operation_manager",
  doctor = "doctor",
  admin = "admin",
}

export const permissionArray = Object.freeze([
  UserRoleType.case_manager,
  UserRoleType.senior_case_manager,
  UserRoleType.operation_manager,
  UserRoleType.doctor,
  UserRoleType.admin,
]);

export enum ScreeningTab {
  all = "all",
  level_1 = "level_1",
  level_2 = "level_2",
  level_3 = "level_3",
}

export enum DashboardTab {
  all = "all",
  darkhan = "darkhan",
  mandal = "mandal",
  achlalt = "achlalt",
}

export enum TotalCaseTab {
  level = "level",
  age = "age",
  gender = "gender",
}

export enum DevPlanQuistions {
  TreatInteract = "TreatInteract",
  LifePride = "LifePride",
  LifeValue = "LifeValue",
  PriorityService = "PriorityService",
}

export enum CareFociEnum {
  physicalCondition = 1,
  psychologyChange = 2,
  Econemy = 3,
  HealthRisk = 4,
}

export const levelOptions = Object.freeze([
  {
    label: "Level 1",
    value: ScreeningTab.level_1,
  },
  {
    label: "Level 2",
    value: ScreeningTab.level_2,
  },
  {
    label: "Level 3",
    value: ScreeningTab.level_3,
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

export enum SettingsTab {
  permission = "permission",
  careFoci = "careFoci",
}

export enum StatisticalTab {
  management_report = "management_report",
  closed_case_report = "closed_case_report",
  case_manager_report = "case_manager_report",
  report_log = "report_log",
  statistical_report = "statistical_report",
  care_foci = "care_foci",
  statistic_report = "statistic_report",
}

export enum DevelopmentPlanDetailTab {
  general = "general_info",
  development = "development_plan",
}

export enum DevelopmentPlanGraphTab {
  mini_cog = "mini_cog",
  gds = "gds",
  barthel = "barthel_index",
}
