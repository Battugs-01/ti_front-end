import { ListType } from "service/type";
import http from "..";
import { CareFociItemElement, GetDevPlanType, ResponseType } from "./type";

namespace developmentPlan {
  export const list = (body: any) =>
    http.post<ListType<any>>("development_plan/list", {
      hasAuth: true,
      body,
    });
  export const seniorNoPlanList = (body: any) =>
    http.post<ResponseType[]>("no_development_plan/list", {
      hasAuth: true,
      body,
    });

  export const create = (body?: any) =>
    http.post<ResponseType>("development_plan", {
      hasAuth: true,
      body,
    });

  export const getDetail = (id: number) =>
    http.get<GetDevPlanType>(`development_plan/get/${id}`, {
      hasAuth: true,
    });

  export const updateDevPlan = (body: any) =>
    http.put<CareFociItemElement[]>("development_plan/update", {
      hasAuth: true,
      body,
    });
  export const closeRequest = (id: any, body: any) =>
    http.put(`development_plan/close/${id}`, {
      hasAuth: true,
      body,
    });
}

export default developmentPlan;
