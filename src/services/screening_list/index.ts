import http from "..";
import { ResponseType } from "./type";

namespace screenList {
  export const list = (body: any) =>
    http.post<ResponseType[]>("screenlist/list", {
      hasAuth: true,
      body,
    });

  export const edit = (body?: any) =>
    http.put<ResponseType>("screenlist/edit", {
      hasAuth: true,
      body,
    });
}

export default screenList;
