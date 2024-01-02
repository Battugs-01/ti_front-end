import { Customer } from "service/customers/types";
import { MerchantService } from "service/merchantService/type";
import { Product } from "service/product/type";
import { Base } from "types";
export enum PaymentChannel {
  qpay = "qpay",
  socialPay = "socialpay",
  bankTransfer = "banktransfer",
}
export enum OrderType {
  subscription = "subscription",
  default = "default",
}
export interface Order extends Base {
  product_id: number;
  product?: Product;
  service_id: number;
  service?: MerchantService;
  customer_id: number;
  customer?: Customer;
  order_uuid: string;
  email: string;
  unit: number;
  regular_price: number;
  purchased_price: number;
  commission: number;
  payment_channel: PaymentChannel;
  is_paid: boolean;
  is_transfered: boolean;
  is_org: boolean;
  org_reg_no: string;
  org_name: string;
  bank_invoice_id: string;
  bank_qr_code: string;
  deep_links: string[];
  ebarimt?: Ebarimt;
  status: string;
  type: OrderType;
  commission_amount: number;
  is_confirmed : boolean;
  // When Subscription
  subscription_name: string;
  subscription_description: string;
  subscription_end_date?: Date;
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
  stocks?: Stock[];
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

export interface OrderCheck {
  is_paid: boolean;
}
