import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { Merchant } from "./type";

namespace merchant {
  export const list = (body: any) =>
    http.post<PaginationResponse<Merchant>>("admin/merchant/list", {
      body,
      hasAuth: true,
    });

  export const remove = (id: number) =>
    http.del<SuccessResponse>(`admin/merchant/remove/${id}`, {
      hasAuth: true,
    });
  export const create = (body?: any) =>
    http.post("admin/merchant/create", {
      hasAuth: true,
      body,
    });
  export const update = (id: number, body?: any) =>
    http.put(`admin/merchant/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default merchant;
