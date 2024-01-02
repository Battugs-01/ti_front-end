import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { Offer } from "./types";

namespace offer {
  export const list = (body: any) =>
    http.post<PaginationResponse<Offer>>(`admin/offer/list`, {
      hasAuth: true,
      body,
    });
  export const create = (body: any) =>
    http.post<SuccessResponse>(`admin/offer/create`, {
      hasAuth: true,
      body,
    });
  export const update = (id: number, body: any) =>
    http.put<SuccessResponse>(`admin/offer/update/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteOffer = (id: any) =>
    http.del<SuccessResponse>(`admin/offer/delete/${id}`, {
      hasAuth: true,
    });
  export const getOffer = (id: any) =>
    http.get<Offer>(`admin/offer/get/${id}`, {
      hasAuth: true,
    });
}

export default offer;

//userAppTerms
