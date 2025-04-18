import http from "service/index";
import { PaginationResponse, SuccessResponse } from "types";
import { LedgerType } from "./type";

namespace ledger {
  export const statement = (body: any) =>
    http.post<PaginationResponse<LedgerType>>("/ledger/page-statement", {
      hasAuth: true,
      body,
    });

  export const list = (body: any) =>
    http.post<PaginationResponse<LedgerType>>("/ledger/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/ledger/create", {
      hasAuth: true,
      body,
    });

  export const deleteA = (id: number, body: any) =>
    http.del<SuccessResponse>(`/ledger/delete/${id}`, {
      hasAuth: true,
      body,
    });

  export const update = (id: number, body: any) =>
    http.put<SuccessResponse>(`/ledger/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default ledger;
