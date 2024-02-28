import http from "service/index";
import { ElderlyInterface } from "./type";

namespace orphanElderly {
  export const create = (body: any) =>
    http.post("socialworker/elderly", {
      hasAuth: true,
      body,
    });
  export const elderlyList = (body: any) =>
    http.post<any>(`socialworker/elderly/list`, {
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
}

export default orphanElderly;
