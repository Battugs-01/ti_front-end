import { ListType } from "service/type";
import http from "..";
import {
  AssessmentListType,
  CustomerDevelopmentPlan,
  ScreeningListType,
} from "./type";

namespace screenList {
  export const list = (body: any) =>
    http.post<ListType<ScreeningListType[]>>("customer/list", {
      hasAuth: true,
      body,
    });

  export const assessmentDetail = (id: string) =>
    http.get<AssessmentListType[]>(`customer/assessments/${id}`, {
      hasAuth: true,
    });

  export const edit = (body?: any) =>
    http.put<ScreeningListType>("screenlist/edit", {
      hasAuth: true,
      body,
    });

  export const developmentPlansList = (id: number) =>
    http.get<CustomerDevelopmentPlan[]>(`customer/development_plans/${id}`, {
      hasAuth: true,
    });
}

export default screenList;
