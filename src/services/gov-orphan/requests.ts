import { CardInterface, DataType } from ".";
import http from "..";

namespace orphanUser {
  export const create = (body: any) =>
    http.post("ministry/carecenter", {
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
  export const getList = (body: any) =>
    http.get<CardInterface[]>(`ministry/carecenter/approved/care_centers`, {
      hasAuth: true,
      body,
    });
  export const getEmployeeList = (body: any, id: any) =>
    http.post<DataType>(`ministry/carecenter/employee/list/${id}`, {
      hasAuth: true,
      body,
    });
}

export default orphanUser;
