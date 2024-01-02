import { PaginationResponse } from "types";
import http from "..";
import { Customer, CustomerInput } from "./types";

export const keys = {
  terms: "terms",
  faq: "faq",
  language: "language",
  commission: "commission",
  subscription: "subscription",
};

namespace customer {
  export const list = (body: CustomerInput) =>
    http.post<PaginationResponse<Customer>>(`admin/customer/list`, {
      body,
      hasAuth: true,
    });
  export const get = (id: number) =>
    http.get<Customer>(`admin/customer/get/${id}`, {
      hasAuth: true,
    });
}

export default customer;

//userAppTerms
