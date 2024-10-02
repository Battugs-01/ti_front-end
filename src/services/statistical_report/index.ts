import { ListType } from "service/type";
import http from "..";
import {
  CareFociReportType,
  CaseManagerReportType,
  ClosedReportType,
  ManagementReportType,
  ResponseType,
  StatisticalReportType,
} from "./type";

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

  export const managementReportList = (body?: any) =>
    http.post<ManagementReportType[]>("statistics/management/report", {
      hasAuth: true,
      body,
    });

  export const closedReportList = (body?: any) =>
    http.post<ListType<ClosedReportType[]>>("statistics/closed/report", {
      hasAuth: true,
      body,
    });

  export const casemanagerReportList = (body?: any) =>
    http.post<ListType<CaseManagerReportType[]>>(
      "statistics/case_manager/report",
      {
        hasAuth: true,
        body,
      }
    );

  export const reportLogList = (body?: any) =>
    http.post<ResponseType[]>("statistical_report/report_log/list", {
      hasAuth: true,
      body,
    });

  export const statisticalReportList = (body?: any) =>
    http.post<StatisticalReportType[]>("statistics/statistical/report", {
      hasAuth: true,
      body,
    });

  export const careFociReportList = (body?: any) =>
    http.post<CareFociReportType[]>("statistics/care_foci/report", {
      hasAuth: true,
      body,
    });

  export const statisticalReportAge = (body?: any) =>
    http.post<ResponseType[]>("statistics/statistical-age/report", {
      hasAuth: true,
      body,
    });
}

export default statisticalReport;
