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

export const SERVICE_OPERATION_TYPES = Object.freeze([
  {
    value: ServiceOperationType.food,
    label: "Food & Dining",
  },
  {
    value: ServiceOperationType.night,
    label: "Night Life",
  },
  {
    value: ServiceOperationType.event,
    label: "Event & Ticket",
  },
  {
    value: ServiceOperationType.thing,
    label: "Things To Do",
  },
]);

export enum GenderType {
  male = 0,
  female = 1,
}

export const workersGenderArray = Object.freeze([
  {
    label: "Эр",
    value: GenderType.male,
  },
  {
    label: "Эм",
    value: GenderType.female,
  },
]);

export const EducationType = Object.freeze([
  {
    label: "Боловсролгүй",
    value: "Боловсролгүй",
  },
  {
    label: "Бага",
    value: "Бага",
  },
  {
    label: "Дунд",
    value: "Дунд",
  },
  {
    label: "Суурь",
    value: "Суурь",
  },
  {
    label: "Бүрэн дунд",
    value: "Бүрэн дунд",
  },
  {
    label: "Техникийн болон мэргэжлийн",
    value: "Техникийн болон мэргэжлийн",
  },
  {
    label: "Тусгай мэргэжлийн дунд",
    value: "Тусгай мэргэжлийн дунд",
  },
  {
    label: "Дипломын болон дээд",
    value: "Дипломын болон дээд",
  },
  {
    label: "Бакалаврын дээд",
    value: "Бакалаврын дээд",
  },
  {
    label: "Магистр",
    value: "Магистр",
  },
  {
    label: "Доктор",
    value: "Доктор",
  },
]);

export const MaritalStatus = Object.freeze([
  {
    label: "Огт гэрлээгүй",
    value: "Огт гэрлээгүй",
  },
  {
    label: "Гэрлэсэн (Батлуулсан)",
    value: "Гэрлэсэн (Батлуулсан)",
  },
  {
    label: "Гэрлэсэн (Батлуулаагүй)",
    value: "Гэрлэсэн (Батлуулаагүй)",
  },
  {
    label: "Тусгаарласан",
    value: "Тусгаарласан",
  },
  {
    label: "Цуцалсан",
    value: "Цуцалсан",
  },
  {
    label: "Бэлэвсэн",
    value: "Бэлэвсэн",
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


export enum Disability{
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
  agentlag = 1,
  aimag = 2,
  sum = 3,
}

export const selectRole = Object.freeze([
  {
    label: "Агентлаг",
    value: RoleType.agentlag,
  },
  {
    label: "Аймаг / Хот",
    value: RoleType.aimag,
  },
  {
    label: "Сум / Дүүрэг",
    value: RoleType.aimag,
  },
]);

export const SERVICE_CATEGORY_TYPES = Object.freeze([
  {
    value: ServiceCategory.cocktail,
    label: "Cocktail Bar",
  },
  {
    value: ServiceCategory.museum,
    label: "Museum",
  },
  {
    value: ServiceCategory.gallery,
    label: "Gallery",
  },
  {
    value: ServiceCategory.health,
    label: "Health food restaurant",
  },
  {
    value: ServiceCategory.cafe,
    label: "Cafe",
  },
  {
    value: ServiceCategory.dessert,
    label: "Dessert Shop",
  },
  {
    value: ServiceCategory.sushi,
    label: "Sushi Restaurant",
  },
  {
    value: ServiceCategory.ramen,
    label: "Ramen Restaurant",
  },
  {
    value: ServiceCategory.steak,
    label: "Steak Houset",
  },
  {
    value: ServiceCategory.wine,
    label: "Wine Bar",
  },
  {
    value: ServiceCategory.asian,
    label: "Asian Restaurant",
  },
  {
    value: ServiceCategory.jazz,
    label: "Jazz Club",
  },
  {
    value: ServiceCategory.chinese,
    label: "Chinese",
  },
  {
    value: ServiceCategory.coffee,
    label: "Coffee shop",
  },
  {
    value: ServiceCategory.european,
    label: "European Restaurant",
  },
  {
    value: ServiceCategory.fastfood,
    label: "Fast Food",
  },
  {
    value: ServiceCategory.korean,
    label: "Korean Restaurant",
  },
  {
    value: ServiceCategory.karaoke,
    label: "Karaoke",
  },
  {
    value: ServiceCategory.lounge,
    label: "Lounge",
  },
  {
    value: ServiceCategory.night,
    label: "Night Club",
  },
  {
    value: ServiceCategory.pizza,
    label: "Pizza",
  },
  {
    value: ServiceCategory.pub,
    label: "Pub",
  },
  {
    value: ServiceCategory.restaurant,
    label: "Restaurant",
  },
  {
    value: ServiceCategory.russian,
    label: "Russian",
  },
  {
    value: ServiceCategory.hot_pot,
    label: "Hot Pot",
  },
  {
    value: ServiceCategory.backery,
    label: "Backery",
  },
  {
    value: ServiceCategory.buffet,
    label: "Buffet Restaurant",
  },
  {
    value: ServiceCategory.restaurant_lounge,
    label: "Restaurant & Lounge",
  },
  {
    value: ServiceCategory.sushi_hot_pot,
    label: "Sushi & Hot Pot Restaurant",
  },
  {
    value: ServiceCategory.restaurant_pub,
    label: "Restaurant & Pub",
  },
  {
    value: ServiceCategory.service,
    label: "Service",
  },
  {
    value: ServiceCategory.bar,
    label: "Bar",
  },
  {
    value: ServiceCategory.vegan,
    label: "Vegan Restaurant",
  },
  {
    value: ServiceCategory.italian,
    label: "Italian Restaurant",
  },
]);
export const SERVICE_STATUS_ARRAY = Object.freeze([
  {
    value: ServiceStatusType.initial,
    label: "Request",
  },
  {
    value: ServiceStatusType.manual,
    label: "Manually Added",
  },
  {
    value: ServiceStatusType.sponsored,
    label: "Sponsored",
  },
  {
    value: ServiceStatusType.verified,
    label: "Verified",
  },
]);

// Product

export const PRODUCT_CATEGORY_ARRAY = Object.freeze([
  {
    label: "Club",
    value: ProductCategoryType.club,
  },
  {
    label: "Event",
    value: ProductCategoryType.event,
  },
  {
    label: "Activity",
    value: ProductCategoryType.activity,
  },
  {
    label: "Massage",
    value: ProductCategoryType.massage,
  },
  {
    label: "Cultural",
    value: ProductCategoryType.cultural,
  },
  {
    label: "Food",
    value: ProductCategoryType.food,
  },

  {
    label: "Beauty",
    value: ProductCategoryType.beauty,
  },
  {
    label: "Sport",
    value: ProductCategoryType.sport,
  },
  {
    label: "Relax",
    value: ProductCategoryType.relax,
  },
  {
    label: "Drink",
    value: ProductCategoryType.drink,
  },
]);

// Others
export const PRICE_RANGE_ARRAY = Object.freeze([
  {
    value: 1,
    label: "$",
  },
  {
    value: 2,
    label: "$$",
  },
  {
    value: 3,
    label: "$$$",
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

export const MERCHANT_ROLES = Object.freeze([
  {
    value: MerchantRole.owner,
    label: "Owner",
  },
  {
    label: "Manager",
    value: MerchantRole.manager,
  },
]);

export const NOTIFICATION_TYPES = Object.freeze([
  {
    value: NotificationType.customer,
    label: "Customer",
  },
  {
    value: NotificationType.merchant,
    label: "Merchant",
  },
]);

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
  // {
  //   image: Wallet,
  //   label: "ҮЦаас төвлөрсөн хадгаламж төв",
  //   value: "mobifinance",
  // },
  // {
  //   image: Wallet,
  //   label: "Мобифинанс",
  //   value: "mobifinance",
  // },
]);

// value: "mobifinance",
// value: "hi_pay",
// value: "msc_center",
// value: "ard_credit",
// value: "state_fund",
