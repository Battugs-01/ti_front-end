import http from "service/index";
import { PaginationResponse, SuccessResponse } from "types";
import { PermissionList } from "./type";

namespace permission {
  export const list = (body: any) =>
    http.post<PaginationResponse<PermissionList>>("/employee/list", {
      hasAuth: true,
      body,
    });
  export const create = (body: any) =>
    http.post<PaginationResponse<any>>("/employee", {
      hasAuth: true,
      body,
    });

  export const deletePermission = (id: number) =>
    http.del<SuccessResponse>(`/employee/${id}`, {
      hasAuth: true,
    });

  export const edit = (id: number, body: any) =>
    http.put<SuccessResponse>(`/employee/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default permission;
