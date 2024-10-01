import http from "service/index";
import { PaginationResponse, SuccessResponse } from "types";
import { UserType } from "./type";

namespace userList {
  export const create = (body: any) =>
    http.post<SuccessResponse>("/employee", {
      hasAuth: true,
      body,
    });

  export const edit = (body: any, id: any) =>
    http.put<SuccessResponse>(`/employee/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const get = (id: any) =>
    http.put<UserType>(`/employee/get/${id}`, {
      hasAuth: true,
    });

  export const list = (body: any) =>
    http.post<PaginationResponse<UserType>>("/employee/list", {
      hasAuth: true,
      body,
    });

  export const deleteUser = (id: number) =>
    http.del<SuccessResponse>(`/employee/${id}`, {
      hasAuth: true,
    });

  export const updatePasswordUser = (body: any, id: number) =>
    http.put<SuccessResponse>(`/employee/update/password/${id}`, {
      hasAuth: true,
      body,
    });
}

export default userList;
