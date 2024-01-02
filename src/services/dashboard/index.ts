import http from "..";
import { Dashboard, StatData, StatInput } from "./types";

namespace dashboard {
  export const dashboardStats = (body: any) =>
    http.post<Dashboard>(`admin/dashboard/dashboard`, { hasAuth: true, body });
  export const stats = (body: StatInput) =>
    http.post<StatData[]>(`admin/dashboard/statistic`, {
      hasAuth: true,
      body,
    });
  export const slots = (body: any) =>
    http.post<any>(`admin/dashboard/slots`, {
      hasAuth: true,
      body,
    });
  export const merchantLatest = (body: any) =>
    http.post<any>(`admin/dashboard/merchant/latest`, {
      hasAuth: true,
      body,
    });
  export const reviews = (body: any) =>
    http.post<any>(`admin/dashboard/reviews`, {
      hasAuth: true,
      body,
    });
  export const topTenMerchants = (body: any) =>
    http.post<any>(`admin/dashboard/top-ten/merchants`, {
      hasAuth: true,
      body,
    });
  export const topTenProducts = (body: any) =>
    http.post<any>(`admin/dashboard/top-ten/products`, {
      hasAuth: true,
      body,
    });
  export const transactionLatest = (body: any) =>
    http.post<any>(`admin/dashboard/transaction/latest`, {
      hasAuth: true,
      body,
    });
}

export default dashboard;

//userAppTerms
