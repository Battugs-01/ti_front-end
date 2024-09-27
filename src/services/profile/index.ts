import http from "service/index";
import { SuccessResponse } from "types";

namespace profile {
  export const info = (body: any) =>
    http.put<SuccessResponse>("/profile", {
      hasAuth: true,
      body,
    });

  export const editPassword = (body: any) =>
    http.put<SuccessResponse>(`/profile/update/password`, {
      hasAuth: true,
      body,
    });
}

export default profile;
