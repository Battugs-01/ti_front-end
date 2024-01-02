import { Order } from "service/order/type";
import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { StatementDashboard } from "./types";

namespace statement {
  export const list = (body?: any) =>
    http.post<PaginationResponse<Order>>("admin/statement/list", {
      hasAuth: true,
      body,
    });
  export const confirm = (body?: any) =>
    http.post<SuccessResponse>("admin/statement/confirm", {
      hasAuth: true,
      body,
    });
  export const dashboard = (body?: any) =>
    http.post<StatementDashboard>("admin/statement/dashboard", {
      hasAuth: true,
      body,
    });
}

export default statement;
