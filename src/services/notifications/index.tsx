import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import {
  NotificationCreateInput,
  NotificationListInput,
  NotificationsModel,
} from "./types";

namespace notifications {
  export const list = (body?: NotificationListInput) =>
    http.post<PaginationResponse<NotificationsModel>>(
      `admin/notification/list`,
      {
        hasAuth: true,
        body,
      }
    );
  export const create = (body: NotificationCreateInput) =>
    http.post<SuccessResponse>(`admin/notification/create`, {
      hasAuth: true,
      body,
    });

  export const update = (id: number, body: NotificationCreateInput) =>
    http.put<SuccessResponse>(`admin/notification/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const remove = (id: number) =>
    http.del<SuccessResponse>(`admin/notification/delete/${id}`, {
      hasAuth: true,
    });

  export const audienceCheck = (body: NotificationCreateInput) =>
    http.post<{ total: number }>(`admin/notification/audience_check`, {
      hasAuth: true,
      body,
    });

  export const send = (id: number) =>
    http.put<SuccessResponse>(`admin/notification/send/${id}`, {
      hasAuth: true,
    });
}

export default notifications;

//userAppTerms
