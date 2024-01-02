import { Order } from "service/order/type";
import { PaginationResponse } from "types";

export interface Statement {
  dashboard: StatementDashboard;
  list: PaginationResponse<Order>;
}

export interface StatementDashboard {
  total_order_amount: number;
  total_commission_amount: number;
  total_event_amount: number;
  total_coupon_amount: number;
  total_product_amount: number;
}
