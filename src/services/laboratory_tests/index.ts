import http from "service/index";

namespace laboratory {
  export const get = () => {
    http.get("ministry/elderly/laboratory_tests", {
      hasAuth: true,
    });
  };
}

export default laboratory;
