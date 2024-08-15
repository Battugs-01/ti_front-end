import http from "..";
import { ResponseType } from "./type";

namespace screenList {
  export const list = () =>
    http.post<ResponseType[]>("screenlist/list", {
      hasAuth: true,
    });

  export const edit = (body?: any) =>
    http.put<ResponseType>("screenlist/edit", {
      hasAuth: true,
      body,
    });
  export const district = (id: any) =>
    http.get<ResponseType[]>(`/public/address/district/${id}`, {
      hasAuth: true,
    });
  export const khoroo = (id: any) =>
    http.get<ResponseType[]>(`/public/address/khoroo/${id}`, {
      hasAuth: true,
    });
}

export default screenList;
