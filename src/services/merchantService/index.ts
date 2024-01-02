import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import {
  MerchantService,
  ServiceDashboard,
  ServiceOperationType,
} from "./type";
import { Merchant } from "service/merchant/type";
import { Product } from "service/product/type";

namespace merchantService {
  export const list = (body?: any) =>
    http.post<PaginationResponse<MerchantService>>(`admin/service/list`, {
      hasAuth: true,
      body,
    });
  export const importXLSX = (body?: any) =>
    http.post<SuccessResponse>("admin/service/import", {
      hasAuth: true,
      body,
    });
  export const update = (id: number, body?: any) =>
    http.put<SuccessResponse>(`admin/service/update/${id}`, {
      hasAuth: true,
      body,
    });
  export const create = (body?: any) =>
    http.post<SuccessResponse>("admin/service/create", {
      hasAuth: true,
      body,
    });
  export const get = (id: number) =>
    http.get<MerchantService>(`admin/service/get/${id}`, {
      hasAuth: true,
    });
  export const dashboard = (id: number, body?: any) =>
    http.post<ServiceDashboard>(`admin/service/dashboard/${id}`, {
      hasAuth: true,
      body,
    });
  export const teamMembers = (id: number, body?: any) =>
    http.post<PaginationResponse<Merchant>>(`admin/service/teamMembers/${id}`, {
      hasAuth: true,
      body,
    });
  export const remove = (id: number) =>
    http.del<SuccessResponse>(`admin/service/delete/${id}`, {
      hasAuth: true,
    });
  export const products = (id: number, body?: any) =>
    http.post<PaginationResponse<Product>>(`admin/service/products/${id}`, {
      hasAuth: true,
      body,
    });
  export const createPermission = (body?: any) =>
    http.post<SuccessResponse>(`admin/service/permission/create`, {
      hasAuth: true,
      body,
    });
  export const getMapIconUrl = (types?: ServiceOperationType[]) => {
    if ((types?.length || 0) <= 0) return "";

    var url = "/map/";
    if (types?.includes(ServiceOperationType.event))
      return (url += "event.png");
    if (types?.includes(ServiceOperationType.thing))
      return (url += "thing.png");
    if (types?.includes(ServiceOperationType.food)) return (url += "food.png");
    if (types?.includes(ServiceOperationType.night))
      return (url += "night.png");
    return "";
  };
}

export default merchantService;
