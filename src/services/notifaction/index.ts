import http from "service/index";
import { ListType } from "./types";

namespace notificationsWeb {
  export const list = () =>
    http.post<ListType[]>("/notification/list", {
      hasAuth: true,
    });
  export const read = (id: number) =>
    http.put<any>(`notification/read/${id}`, {
      hasAuth: true,
    });
  export const readALl = () =>
    http.put<any>("notification/read_all", {
      hasAuth: true,
    });
}

export default notificationsWeb;
