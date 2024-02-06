import http from "..";

namespace address {
  export const city = () =>
    http.get<any>("/public/address/city", {
      hasAuth: true,
    });
  export const district = (id: any) =>
    http.get<any>(`/public/district/${id}`, {
      hasAuth: true,
    });
  export const khoroo = (id: any) =>
    http.get(`/public/district/${id}`, {
      hasAuth: true,
    });
}

export default address;
