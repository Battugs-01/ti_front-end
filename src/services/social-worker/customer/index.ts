import http from "service/index";

namespace orphanElderly {
  export const create = (body: any) =>
    http.post("ministry/elderly", {
      hasAuth: true,
      body,
    });
  export const elderlyList = (body: any) =>
    http.post<any>(`ministry/elderly/list`, {
      hasAuth: true,
      body,
    });
  export const elderlyEdit = (body: any, id: any) =>
    http.put(`ministry/elderly/${id}`, {
      hasAuth: true,
      body,
    });
  export const getElderly = (id: any) =>
    http.get(`ministry/elderly/${id}`, {
      hasAuth: true,
    });
}

export default orphanElderly;
