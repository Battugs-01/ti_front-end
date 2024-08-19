import { ListType } from "service/type";
import http from "..";
import { ScreeningListType } from "./type";

namespace screenList {
  export const list = (body: any) =>
    http.post<ListType<ScreeningListType[]>>("assessment/list", {
      hasAuth: true,
      body,
    });

  export const edit = (body?: any) =>
    http.put<ScreeningListType>("screenlist/edit", {
      hasAuth: true,
      body,
    });
}

export default screenList;
