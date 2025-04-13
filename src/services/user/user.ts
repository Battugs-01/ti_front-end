import { SuccessResponse } from "types";
import http from "..";

namespace user {
  export const create = (body: any) =>
    http.post<SuccessResponse>(`/user/create`, {
      hasAuth: true,
      body,
    });
  export const update = (id: number, body: any) =>
    http.put<SuccessResponse>(`/user/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default user;
