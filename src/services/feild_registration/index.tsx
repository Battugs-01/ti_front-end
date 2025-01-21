import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { CargoApproachList, GetTempAdditionalFeeType } from "./type";

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

  export const ticketAdditionalFee = (body: any) =>
    http.post<SuccessResponse>(
      "/transport-record/create/additional-fee-ticket",
      {
        hasAuth: true,
        body,
      }
    );

  export const getTempAdditionalFee = (id: number) =>
    http.get<GetTempAdditionalFeeType>(
      `/transport-record/additional-fee-ticket/${id}`,
      {
        hasAuth: true,
      }
    );

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
