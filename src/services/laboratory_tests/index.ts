import http from "service/index";
import { LaboratoryType } from "./type";

namespace laboratory {
  export const get = async () => {
    return http.get<LaboratoryType[]>("socialworker/elderly/laboratory_tests", {
      hasAuth: true,
    });
  };
}

export default laboratory;
