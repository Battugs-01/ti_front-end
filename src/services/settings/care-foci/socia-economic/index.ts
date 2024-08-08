import { SuccessResponse, PaginationResponse } from "types";
import http from "../../..";

namespace sociaEconomic {
  export const get = (body: any) =>
    http.post<PaginationResponse<any>>("/carecenter/employee/list", {
      hasAuth: true,
      body,
    });

  export const deletecare = (id: number) =>
    http.del<SuccessResponse>(`/carecenter/employee/${id}`, {
      hasAuth: true,
    });
}

export default sociaEconomic;
