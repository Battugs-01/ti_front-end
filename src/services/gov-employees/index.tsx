import http from "service/index";
import { DataType } from "./type";

namespace employee {
  export const create = (body: any) =>
    http.post("socialworker/user", {
      hasAuth: true,
      body,
    });
  export const employeeList = (body: any) =>
    http.post<DataType>(`socialworker/user/list`, {
      hasAuth: true,
      body,
    });
  export const employeeEdit = (body: any, id: any) =>
    http.put(`socialworker/user/${id}`, {
      hasAuth: true,
      body,
    });
  export const getElderly = (id: any) =>
    http.get(`socialworker/user/${id}`, {
      hasAuth: true,
    });
  export const employeeDelete = (id: any) =>
    http.del(`socialworker/user/${id}`, {
      hasAuth: true,
    });
}

export default employee;
