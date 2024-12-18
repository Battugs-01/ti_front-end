import { ScreeningListType } from "service/screening_list/type";
import http from "..";

namespace employRegistration {
  export const list = (body: any) =>
    http.post<ScreeningListType[]>("admin/user/page", {
      hasAuth: true,
      body,
    });
}

export default employRegistration;
