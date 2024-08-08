import { Rule } from "antd/lib/form";
import { MerchantRole } from "service/merchant/type";
import {
  ServiceOperationType,
  ServiceCategory,
  ServiceStatusType,
} from "service/merchantService/type";
import { NotificationType } from "service/notifications/types";
import { ProductCategoryType } from "service/product/type";
import { Week } from "types";
import Khan from "assets/government/img/khan.png";
import Khas from "assets/government/img/khas.png";
import Trade from "assets/government/img/trade.png";
import Golomt from "assets/government/img/golomt.png";
import State from "assets/government/img/govBank.png";
import National from "assets/government/img/bank1.png";
import Chingis from "assets/government/img/bank2.png";
import Capitron from "assets/government/img/bank3.png";
import Trans from "assets/government/img/bank4.png";
import Wallet from "assets/government/img/wallet.png";

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
  male = 0,
  female = 1,
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

export const BankList = Object.freeze([
  {
    image: Khan,
    label: "Хаан банк",
    value: "khan_bank",
  },
  {
    image: Khas,
    label: "Хас банк",
    value: "khas_bank",
  },
  {
    image: State,
    label: "Төрийн банк",
    value: "state_bank",
  },
  {
    image: Trade,
    label: "Худалдаа хөгжлийн банк",
    value: "trade_development_bank",
  },
  {
    image: Golomt,
    label: "Голомт банк",
    value: "golomt_bank",
  },
  {
    image: National,
    label: "Үндэсний ХОБанк",
    value: "national_bank",
  },
  {
    image: Capitron,
    label: "Капитрон банк",
    value: "capitron_bank",
  },
  {
    image: Chingis,
    label: "Чингис хаан банк",
    value: "chingis_bank",
  },
  {
    image: Wallet,
    label: "Монгол банк",
    value: "mongol_bank",
  },
  {
    image: Trans,
    label: "Тээвэр хөгжлийн банк",
    value: "trans_bank",
  },
  {
    image: Wallet,
    label: "Ариг банк",
    value: "arig_bank",
  },
  {
    image: Wallet,
    label: "М банк",
    value: "m_bank",
  },
  {
    image: Wallet,
    label: "Төрийн сан",
    value: "state_fund",
  },
  {
    image: Wallet,
    label: "МҮЦК төв",
    value: "msc_center",
  },
  {
    image: Wallet,
    label: "Ард кредит",
    value: "ard_credit",
  },
  {
    image: Wallet,
    label: "Hi Pay",
    value: "hi_pay",
  },
  {
    image: Wallet,
    label: "Мобифинанс",
    value: "mobifinance",
  },
]);

export enum SettingsTab {
  permission = "permission",
  careFoci = "careFoci",
}

export enum StatisticalTab {
  statistical = "statistical",
  careFoci = "careFoci",
}
