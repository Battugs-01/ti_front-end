import { MerchantService } from "service/merchantService/type";
import { Product } from "service/product/type";
import { Review } from "service/review/type";

export interface Customer {
  avatar: string;
  birthday: string;
  created_at: string;
  created_user_id: number;
  current_city: string;
  email: string;
  firebase_uuid: string;
  first_name: string;
  gender: string;
  id: number;
  income_price: number;
  last_name: string;
  likes: number;
  nickname: string;
  order_count: number;
  phone: string;
  phone_locale: string;
  push_token: string;
  review_count: number;
  reviews: Review[];
  ticket_buys: TicketBuy[];
  updated_at: string;
  updated_user_id: number;
  last_login_date: Date;
}

export interface ServiceClass {}

export interface Like {
  created_at: string;
  created_user_id: number;
  customer_id: number;
  id: number;
  review_id?: number;
  updated_at: string;
  updated_user_id: number;
  service_id?: number;
}

export interface TicketBuy {
  bank_invoice_id: string;
  bank_qr_code: string;
  commission: number;
  created_at: string;
  created_user_id: number;
  customer: TicketBuyCustomer;
  customer_id: number;
  deeplinks: Deeplink[];
  ebarimt: Ebarimt;
  email: string;
  id: number;
  "is_ transfered": boolean;
  is_org: boolean;
  is_paid: boolean;
  order_uuid: string;
  org_name: string;
  org_reg_no: string;
  payment_channel: string;
  product: Product;
  product_id: number;
  purchased_price: number;
  regular_price: number;
  service: MerchantService;
  service_id: number;
  unit: number;
  updated_at: string;
  updated_user_id: number;
}

export interface TicketBuyCustomer {
  string: string;
  birthday: string;
  created_at: string;
  created_user_id: number;
  current_city: string;
  email: string;
  firebase_uuid: string;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
  likes: number;
  nickname: string;
  phone: string;
  phone_locale: string;
  push_token: string;
  reviews: Review[];
  ticket_buys: string[];
  updated_at: string;
  updated_user_id: number;
}

export interface Deeplink {
  description: string;
  link: string;
  logo: string;
  name: string;
}

export interface Ebarimt {
  amount: string;
  bill_id: string;
  bill_type: string;
  branch_no: string;
  cash_amount: string;
  city_tax: string;
  created_at: string;
  created_user_id: number;
  customer_no: string;
  date: string;
  district_code: string;
  id: number;
  image: string;
  internal_code: string;
  is_cancelled: boolean;
  lottery: string;
  mac_address: string;
  merchant_id: string;
  message: string;
  non_cash_amount: string;
  order: string;
  order_id: number;
  qr_data: string;
  register_no: string;
  stocks: Stock[];
  success: boolean;
  tax_type: string;
  updated_at: string;
  updated_user_id: number;
  vat: string;
}

export interface Stock {
  barCode: string;
  cityTax: string;
  code: string;
  created_at: string;
  created_user_id: number;
  ebarimt_id: number;
  id: number;
  measureUnit: string;
  name: string;
  qty: string;
  totalAmount: string;
  unitPrice: string;
  updated_at: string;
  updated_user_id: number;
  vat: string;
}

export interface Hour {
  closing: string;
  created_at: string;
  created_user_id: number;
  id: number;
  opening: string;
  service_id: number;
  updated_at: string;
  updated_user_id: number;
  week_days: string[];
}

export interface TeamMember {
  string: string;
  created_at: string;
  created_user_id: number;
  email: string;
  firebase_uuid: string;
  first_name: string;
  id: number;
  last_name: string;
  phone: string;
  push_token: string;
  service_id: number;
  updated_at: string;
  updated_user_id: number;
}

export interface CustomerInput {
  birthday?: string[];
  created_at?: string[];
  current_city?: string;
  deleted_at?: string[];
  email?: string;
  first_name?: string;
  gender?: string;
  is_all?: boolean;
  last_name?: string;
  limit?: number;
  nickname?: string;
  page?: number;
  phone?: string;
  phone_locale?: string;
  sorter?: Sorter;
  updated_at?: string[];
}

export interface Sorter {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
