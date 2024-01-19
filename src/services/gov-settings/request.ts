import { UserListApi } from ".";
import http from "..";

namespace governmentUser {
  export const create = (body: any) =>
    http.post<any>("/ministry/user", {
      hasAuth: true,
      body,
    });
  export const getUsers = (body: any) =>
    http.post<UserListApi>("/ministry/user/list", {
      hasAuth: true,
      body,
    });
  export const getUser = (id: any) =>
    http.get<any>(`/ministry/user/${id}`, {
      hasAuth: true,
    });
  export const updateUser = (body: any, id: any) =>
    http.put(`/ministry/user/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteUser = (id: any) =>
    http.del(`/ministry/user/${id}`, {
      hasAuth: true,
    });
}

export default governmentUser;
