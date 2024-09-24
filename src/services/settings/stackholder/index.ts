import http from "service/index";
import { SuccessResponse, PaginationResponse } from "types";
import { StackholderType } from "./type";

namespace stackholderList {
  export const create = (body: any) =>
    http.post<SuccessResponse>("/stackholder", {
      hasAuth: true,
      body,
    });

  export const edit = (body: any, id: any) =>
    http.put<SuccessResponse>(`/stackholder/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const list = (body: any) =>
    http.post<PaginationResponse<StackholderType>>("/stackholder/list", {
      hasAuth: true,
      body,
    });

  export const deleteStackholder = (id: number) =>
    http.del<SuccessResponse>(`/stackholder/${id}`, {
      hasAuth: true,
    });
}

export default stackholderList;
