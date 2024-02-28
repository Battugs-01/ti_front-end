import http from "service/index";

namespace laboratory {
  export const get = async () => {
    return http.get("socialworker/elderly/laboratory_tests", {
      hasAuth: true,
    });
  };
}

export default laboratory;
