import { Admin } from "service/auth/type";
import { PaginationResponse, SuccessResponse } from "types";
import http from "..";

namespace workers {
  export const list = (body: any) =>
    http.post<PaginationResponse<Admin>>("admin/user/page", {
      hasAuth: true,
      body,
    });

  export const deleteEmploy = (id: number) =>
    http.del<SuccessResponse>(`/admin/user/${id}`, {
      hasAuth: true,
    });
  export const updateWorkers = (body: any, id: number) =>
    http.put(`/carecenter/user/${id}`, {
      hasAuth: true,
      body,
    });
  export const createWorkers = (body: any) =>
    http.post("/admin/user", {
      hasAuth: true,
      body,
    });
}

export default workers;
