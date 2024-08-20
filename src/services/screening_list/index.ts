import { ListType } from "service/type";
import http from "..";
import { ScreeningListType } from "./type";

namespace screenList {
  export const list = (body: any) =>
    http.post<ListType<ScreeningListType[]>>("assessment/list", {
      hasAuth: true,
      body,
    });

  export const assessmentDetail = (id: string) =>
    http.get<ListType<ScreeningListType[]>>(`customer/assessments/${id}`, {
      hasAuth: true,
    });

  export const edit = (body?: any) =>
    http.put<ScreeningListType>("screenlist/edit", {
      hasAuth: true,
      body,
    });
}

export default screenList;
