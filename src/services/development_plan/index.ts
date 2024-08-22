import { ListType } from "service/type";
import http from "..";
import { ResponseType } from "./type";

namespace developmentPlan {
  export const list = (body: any) =>
    http.post<ListType<[]>>("development_plan/list", {
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
}

export default developmentPlan;
