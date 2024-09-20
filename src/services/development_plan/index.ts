import { ListType } from "service/type";
import http from "..";
import { GetDevPlanType, ResponseType } from "./type";

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
}

export default developmentPlan;
