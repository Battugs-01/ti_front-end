import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { CargoApproachList } from "./type";

namespace fieldRegistration {
  export const list = (body: any) =>
    http.post<PaginationResponse<CargoApproachList>>("/transport-record/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/transport-record/create", {
      hasAuth: true,
      body,
    });

  export const deleteRegistration = (body: any) =>
    http.del<SuccessResponse>("/transport-create/delete", {
      hasAuth: true,
      body,
    });

  export const updateRegistration = (body: any, id: number) =>
    http.put<SuccessResponse>(`/transport-record/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default fieldRegistration;
