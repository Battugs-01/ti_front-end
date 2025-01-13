import { SuccessResponse } from "types";
import http from "..";

namespace fieldRegistration {
  export const list = (body: any) =>
    http.post<any[]>("transport-record/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("transport-record", {
      hasAuth: true,
      body,
    });

  export const deleteRegistration = (body: any) =>
    http.del<SuccessResponse>("admin/user/delete", {
      hasAuth: true,
      body,
    });

  export const updateRegistration = (body: any) =>
    http.put<SuccessResponse>("admin/user/update", {
      hasAuth: true,
      body,
    });
}

export default fieldRegistration;
