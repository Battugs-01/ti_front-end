import { SuccessResponse } from "types";
import http from "..";

namespace user {
  export const update = (id: number, body: any) =>
    http.put<SuccessResponse>(`/user/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default user;
