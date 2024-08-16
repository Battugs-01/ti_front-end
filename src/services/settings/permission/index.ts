import http from "service/index";
import { PaginationResponse, SuccessResponse } from "types";
import { PermissionList } from "./type";

namespace permission {
  export const list = (body: any) =>
    http.post<PaginationResponse<PermissionList>>("/admin/employee/list", {
      hasAuth: true,
      body,
    });
  export const create = (body: any) =>
    http.post<PaginationResponse<any>>("/admin/employee", {
      hasAuth: true,
      body,
    });

  export const deletePermission = (id: number) =>
    http.del<SuccessResponse>(`/admin/employee/${id}`, {
      hasAuth: true,
    });

  export const edit = (id: number, body: any) =>
    http.put<SuccessResponse>(`/admin/employee/${id}`, {
      hasAuth: true,
      body,
    });
}

export default permission;
