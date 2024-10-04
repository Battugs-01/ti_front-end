import http from "..";
import { PlannedWorksType } from "./types";

namespace plannedWorks {
  export const list = (body: any) =>
    http.post<PlannedWorksType[]>("customer/planned_works", {
      hasAuth: true,
      body,
    });

  export const customerDetail = (id: string) =>
    http.get<any>(`customer/get/${id}`, {
      hasAuth: true,
    });
}

export default plannedWorks;
