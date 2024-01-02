import { Sorter } from "service/customers/types";
import { MerchantService } from "service/merchantService/type";
import { Order } from "service/order/type";
import { Base } from "types";

export enum ProductStatusType {
  inprogress = "inprogress",
  cancelled = "cancelled",
  ended = "ended",
  notStarted = "not_started",
}
export enum ProductCategoryType {
  club = "club",
  event = "event",
  activity = "activity",
  massage = "massage",
  cultural = "cultural",
  food = "food",
  discount = "discount",
  beauty = "beauty",
  sport = "sport",
  relax = "relax",
  drink = "drink",
}

export enum ProdcutMenuType {
  event_tax = "sponsored",
  coupon = "verified",
  initial = "initial",
  manual = "manual",
}
export enum ProductType {
  event = "event",
  coupon = "coupon",
  product = "product",
  banner = "banner",
  news = "news",
}

export interface Product extends Base {
  name: string;
  category: ProductCategoryType;
  status: ProductStatusType;
  banner: string;
  photos: string[];
  service_id: number;
  service?: MerchantService;
  description: string;
  tags?: string[];
  website: string;
  phone: string;
  address: string;
  location: number[];
  start_date: Date;
  end_date: Date;
  regular_price: number;
  limit: number;
  original_limit: number;
  discount_percentage: number;
  discount_end_date: Date;
  discount_start_date: Date;
  unit_sold: number;
  type: ProductType;
  orders?: Order[];
  has_limit: boolean;
  has_discount: boolean;
  currency: string;
}

export interface ProductListInput {
  address?: string;
  category?: string;
  created_at?: string[];
  deleted_at?: string[];
  description?: string;
  discount_end_date?: string[];
  end_date?: string[];
  is_all?: boolean;
  limit?: number;
  name?: string;
  page?: number;
  phone?: string;
  service_id?: number;
  sorter?: Sorter;
  start_date?: string[];
  status?: string;
  tag?: string;
  updated_at?: string[];
  website?: string;
}

export interface ProductCreateInput {
  address: string;
  banner: string;
  category: string;
  description: string;
  discount_end_date: string;
  discount_percentage: number;
  end_date: string;
  limit: number;
  location: number[];
  name: string;
  phone: string;
  photos: string[];
  regular_price: number;
  service_id: number;
  start_date: string;
  status: string;
  tags: string[];
  website: string;
}
