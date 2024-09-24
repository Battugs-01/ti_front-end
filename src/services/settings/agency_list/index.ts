import http from "service/index";
import { SuccessResponse, PaginationResponse } from "types";
import { AgencyListType } from "./type";

namespace agencyList {
  export const create = (body: any) =>
    http.post<SuccessResponse>("/agency", {
      hasAuth: true,
      body,
    });

  export const edit = (body: any, id: any) =>
    http.put<SuccessResponse>(`/agency/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const list = (body: any) =>
    http.post<PaginationResponse<AgencyListType>>("/agency/list", {
      hasAuth: true,
      body,
    });

  export const deleteAgency = (id: number) =>
    http.del<SuccessResponse>(`/agency/${id}`, {
      hasAuth: true,
    });
}

export default agencyList;
