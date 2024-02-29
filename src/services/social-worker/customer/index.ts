import http from "service/index";
import { DataType, ElderlyInterface } from "./type";

namespace orphanElderly {
  export const create = (body: any) =>
    http.post<ElderlyInterface>("socialworker/elderly", {
      hasAuth: true,
      body,
    });
  export const elderlyList = (body: any) =>
    http.post<DataType>(`socialworker/elderly/list`, {
      hasAuth: true,
      body,
    });
  export const elderlyEdit = (body: any, id: any) =>
    http.put(`socialworker/elderly/${id}`, {
      hasAuth: true,
      body,
    });
  export const getElderly = (id: any) =>
    http.get<ElderlyInterface>(`socialworker/elderly/${id}`, {
      hasAuth: true,
    });
  export const sendToDistrict = (id: any) =>
    http.put(`socialworker/elderly/toDistrict/${id}`, {
      hasAuth: true,
    });
  export const distribute = (body: any, id: any) =>
    http.put(`socialworker/elderly/toCareCenter/${id}`, {
      hasAuth: true,
      body,
    });
}

export default orphanElderly;
