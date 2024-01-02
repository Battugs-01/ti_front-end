import { ConsoleSqlOutlined } from "@ant-design/icons";
import { useAuthContext } from "context/auth";

import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Root: FC = () => {
  const [{ authorized }] = useAuthContext();
  if (!authorized) {
    return (
      <>
        <Navigate to={"/auth/login"} replace={true} />
      </>
    );
  }
  return (
    <>
      <Navigate to={"dashboard/dashboard"} replace={true} />
    </>
  );
};

export default Root;
