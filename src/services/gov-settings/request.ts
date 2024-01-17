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
  export const getUser = (id: any) =>
    http.get(`/user/${id}`, {
      hasAuth: true,
    });
  export const updateUser=(body:any,id:any)=>
  http.put(`/user/${id}`,{
    hasAuth:true,
    body
  })
  export const deleteUser=(id:any)=>
  http.del(`/user/${id}`,{
    hasAuth:true,
  })
}

export default governmentUser;
