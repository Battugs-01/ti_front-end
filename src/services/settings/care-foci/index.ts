import { SuccessResponse, PaginationResponse } from "types";
import http from "../../";
import { CareFoci } from "./type";

namespace carefoci {
  export const get = () =>
    http.get<CareFoci[]>("/care_foci/get", {
      hasAuth: true,
    });
}

export default carefoci;
