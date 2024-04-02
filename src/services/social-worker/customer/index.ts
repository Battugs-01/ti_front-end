import http from "service/index";
import { DataType, ElderlyInterface } from "./type";
import { DisabilityTypeInterface } from "service/base/type";
import { tabCounts } from "service/gov-requests";

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
    http.put<ElderlyInterface>(`socialworker/elderly/${id}`, {
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
  export const disability_type = () =>
    http.get<DisabilityTypeInterface[]>(
      `socialworker/public/disability_types`,
      {
        hasAuth: true,
      }
    );
  export const elderly_counts = () =>
    http.get<tabCounts[]>(`socialworker/elderly/counts`, {
      hasAuth: true,
    });
}

export default orphanElderly;
