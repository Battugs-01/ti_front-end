import { PaginationResponse, SuccessResponse } from "types";
import http from "../..";
import { CustomerCompanyType } from "./type";

namespace cargoName {
  export const list = (body: any) =>
    http.post<PaginationResponse<CustomerCompanyType>>(
      "/transport-category/page",
      {
        hasAuth: true,
        body,
      }
    );

  export const create = (body: any) =>
    http.post<SuccessResponse>("/transport-category/create", {
      hasAuth: true,
      body,
    });

  export const deleteA = (id: number) =>
    http.del<SuccessResponse>(`/transport-category/delete/${id}`, {
      hasAuth: true,
    });

  export const update = (body: any, id: number) =>
    http.put<SuccessResponse>(`/transport-category/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default cargoName;
