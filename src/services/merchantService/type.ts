import { Merchant } from "service/merchant/type";
import { Order } from "service/order/type";
import { Review } from "service/review/type";
import { Base } from "types";

export enum ServiceOperationType {
  food = "food",
  night = "night",
  event = "event",
  thing = "thing",
}
export enum ServiceCategory {
  pub = "pub",
  lounge = "lounge",
  restaurant = "restaurant",
  coffee = "coffee",
  chinese = "chinese",
  korean = "korean",
  asian = "asian",
  european = "european",
  russian = "russian",
  pizza = "pizza",
  fastfood = "fastfood",
  night = "night",
  karaoke = "karaoke",
  health = "health_food_restaurant",
  cafe = "cafe",
  dessert = "dessert",
  sushi = "sushi",
  ramen = "ramen",
  steak = "steak",
  wine = "wine",
  cocktail = "cocktail",
  gallery = "gallery",
  museum = "museum",
  jazz = "jazz",
  hot_pot = "hot_pot",
  backery = "bakery",
  buffet = "buffet",
  restaurant_lounge = "restaurant_lounge",
  sushi_hot_pot = "sushi_hot_pot",
  restaurant_pub = "restaurant_pub",
  service = "service",
  bar = "bar",
  italian = "italian",
  vegan = "vegan",
}

export enum ServiceStatusType {
  sponsored = "sponsored",
  verified = "verified",
  initial = "initial",
  manual = "manual",
}

export interface MerchantServiceSchedule {
  week_days: string[];
  opening: Date;
  closing: Date;
}
export enum ServiceStatusRequestType {
  pending = "pending",
  cancelled = "cancelled",
}
export interface MerchantService extends Base {
  merchant_id?: number;
  team?: Merchant[];
  name: string;
  logo?: string;
  operation_types: ServiceOperationType[];
  categories: string[];
  banners?: string[];
  photos?: string[];
  menus?: string[];
  description?: string;
  description_mn?: string;
  total_rating?: number;
  address?: string;
  website?: string;
  email: string;
  is_tourist_friendly: boolean;
  location?: number[];
  phone?: string;
  price_range?: number;
  tags?: string[];
  discount?: number;
  discount_start_date?: Date;
  discoutn_end_date?: Date;
  status: ServiceStatusType;
  is_active: boolean;
  hours?: MerchantServiceSchedule[];
  status_request?: ServiceStatusRequestType;
  verified_at?: Date;
  sponsored_at?: Date;
  commission_event?: number;
  commission_coupon?: number;
  commission_product?: number;
  commission_start_date?: Date;
  account_number?: string;
  account_bank?: string;
  account_holder?: string;
  reviews?: Review[];
  total_click: number;
  orders?: Order[];
  subscription_price?: number;
  subscription_end_date?: Date;
  subscription_name?: string;
  merchant?: Merchant;
  is_event: boolean;
  is_product: boolean;
  is_coupon: boolean;
  is_auto_sponsored: boolean;
  review_count: number;
}

export interface ServiceDashboard {
  total_income: number;
  total_sales: number;
  total_commission: number;
  total_customers: number;
  commission_percent: number;
  customer_percent: number;
  sales_percent: number;
  income_percent: number;
  review?: {
    total: number;
    avatar_urls: string[];
    percent: number;
  };
}
