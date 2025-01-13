import { Admin } from "service/auth/type";
import { PaginationResponse, SuccessResponse } from "types";
import http from "..";

namespace workers {
  export const list = (body: any) =>
    http.post<PaginationResponse<Admin>>("/user/page", {
      hasAuth: true,
      body,
    });
  export const deleteEmploy = (id: number) =>
    http.del<SuccessResponse>(`/user/${id}`, {
      hasAuth: true,
    });
  export const updateWorkers = (body: any, id: number) =>
    http.put(`/user/${id}`, {
      hasAuth: true,
      body,
    });
  export const createWorkers = (body: any) =>
    http.post("/user", {
      hasAuth: true,
      body,
    });
}

export default workers;
