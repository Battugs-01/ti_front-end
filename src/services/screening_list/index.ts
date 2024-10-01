import { ListType } from "service/type";
import http from "..";
import {
  AssessmentListType,
  ComprehensiveType,
  EmergencyChecklistType,
  ScreeningListType,
} from "./type";

namespace screenList {
  export const list = (body: any) =>
    http.post<ListType<ScreeningListType[]>>("customer/list", {
      hasAuth: true,
      body,
    });

  export const customerDetail = (id: string) =>
    http.get<ScreeningListType>(`customer/get/${id}`, {
      hasAuth: true,
    });

  export const assessmentDetail = (id: string) =>
    http.get<AssessmentListType[]>(`customer/assessments/${id}`, {
      hasAuth: true,
    });
  export const assessmentComprehensive = (id: number) =>
    http.get<ComprehensiveType>(`assessment/comprehensive/${id}`, {
      hasAuth: true,
    });

  export const emergencyGet = (body: any) =>
    http.post<EmergencyChecklistType>(`emergency/get`, {
      hasAuth: true,
      body,
    });

  export const edit = (id: number, body?: any) =>
    http.put<ScreeningListType>(`customer/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const switchCustomer = (id: number, body?: any) =>
    http.put<ScreeningListType>(`assessment/movement/${id}`, {
      hasAuth: true,
      body,
    });
  export const close = (body?: any) =>
    http.post<ScreeningListType>("customer/close", {
      hasAuth: true,
      body,
    });
}

export default screenList;
