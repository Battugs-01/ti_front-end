import http from "service/index";

namespace orphanElderly {
  export const create = (body: any) =>
    http.post("ministry/elderly", {
      hasAuth: true,
      body,
    });
  export const getOrphan = (id: any) =>
    http.get<any>(`ministry/carecenter/${id}`, {
      hasAuth: true,
    });
  export const edit = (body: any, id: any) =>
    http.put(`ministry/carecenter/${id}`, {
      hasAuth: true,
      body,
    });
}

export default orphanElderly;
