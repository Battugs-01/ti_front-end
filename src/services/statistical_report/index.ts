import http from "..";
import { ResponseType } from "./type";

namespace statisticalReport {
  export const activeAgingList = (body: any) =>
    http.post<ResponseType[]>("statistical-report/active-aging/list", {
      hasAuth: true,
      body,
    });
  export const caseManagementList = (body: any) =>
    http.post<ResponseType[]>("statistical-report/case-management/list", {
      hasAuth: true,
      body,
    });

  export const edit = (body?: any) =>
    http.put<ResponseType>("statistical_report/edit", {
      hasAuth: true,
      body,
    });
}

export default statisticalReport;
