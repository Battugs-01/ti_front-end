import { SuccessResponse } from "types";
import http from "..";

export const keys = {
  terms: "terms",
  faq: "faq",
  language: "language",
  commission: "commission",
  subscription: "subscription",
  avatars: "avatars",
  faqCustomer: "faq_customer",
};

namespace settings {
  export const get = <T>(key: string) => {
    if (!key) return;
    const res = http.get<T>(`admin/settings/config/get/${key}`, {
      hasAuth: true,
    });
    return res;
  };
  export const set = <T>(key: string, body: T) => {
    return http.put<SuccessResponse>(`admin/settings/config/set/${key}`, {
      body: {
        key,
        type: "JSON",
        value: JSON.stringify(body),
      },
      hasAuth: true,
    });
  };
}

export default settings;

//userAppTerms
