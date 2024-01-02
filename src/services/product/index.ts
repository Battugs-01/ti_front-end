import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { Product, ProductCreateInput, ProductListInput } from "./type";

namespace product {
  export const list = (body?: ProductListInput) =>
    http.post<PaginationResponse<Product>>("admin/product/list", {
      hasAuth: true,
      body,
    });
  export const remove = (id: number) =>
    http.del<SuccessResponse>(`admin/product/delete/${id}`, { hasAuth: true });
  export const create = (body: ProductCreateInput) =>
    http.post("admin/product/create", { hasAuth: true, body });
  export const update = (id: number, body: Product) =>
    http.put(`admin/product/update/${id}`, { hasAuth: true, body });
  export const get = (id: number) =>
    http.get<Product>(`admin/product/${id}`, { hasAuth: true });
}

export default product;
