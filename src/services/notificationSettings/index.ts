import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { NotificationSettings } from "./type";

module notificationSettings {
  export const list = (body?: any) =>
    http.post<PaginationResponse<NotificationSettings>>(
      "admin/notification/settings/list",
      {
        hasAuth: true,
        body,
      }
    );
  export const create = (body?: any) =>
    http.post<SuccessResponse>("admin/notification/settings/create", {
      hasAuth: true,
      body,
    });
  export const update = (id: number, body?: any) =>
    http.put<SuccessResponse>(`admin/notification/settings/update/${id}`, {
      hasAuth: true,
      body,
    });
  export const remove = (id: number) =>
    http.del<SuccessResponse>(`admin/notification/settings/delete/${id}`, {
      hasAuth: true,
    });
}

export default notificationSettings;
