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
export const deleteConfirm = "delete me";
export const deleteConfirmReg = /^delete me$/g;
export const FieldRequireMessage = "The field is required";

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
])