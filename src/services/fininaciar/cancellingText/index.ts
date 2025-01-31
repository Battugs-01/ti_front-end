import { PaginationResponse, SuccessResponse } from "types";
import http from "../..";

namespace cancellingText {
  export const list = (body: any) =>
    http.post<PaginationResponse<any>>("/additional-fee/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/additional-fee", {
      hasAuth: true,
      body,
    });

  export const deleteA = (id: number) =>
    http.del<SuccessResponse>(`/additional-fee/${id}`, {
      hasAuth: true,
    });

  export const update = (body: any, id: number) =>
    http.put<SuccessResponse>(`/additional-fee/${id}`, {
      hasAuth: true,
      body,
    });
}

export default cancellingText;
