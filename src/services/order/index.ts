import { PaginationResponse } from "types";
import http from "..";
import { Order, OrderCheck } from "./type";

namespace order {
  export const list = (body?: any) =>
    http.post<PaginationResponse<Order>>("admin/order/list", {
      hasAuth: true,
      body,
    });
  export const detail = (id: string) =>
    http.get<Order>(`admin/order/${id}`, {
      hasAuth: true,
    });
  export const check = (order_uuid: string) =>
    http.get<OrderCheck>(`admin/order/check/${order_uuid}`, { hasAuth: true });
}

export default order;
