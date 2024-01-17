import http from "..";

namespace governmentUser {
  export const create = (body: any) =>
    http.post("/user", {
      hasAuth: true,
      body,
    });
  export const getUsers = (body: any) =>
    http.post("/user/list", {
      hasAuth: true,
      body,
    });
  export const updateUser = (body: any) =>
    http.put("/user", {
      hasAuth: true,
      body,
    });
}

export default governmentUser;
