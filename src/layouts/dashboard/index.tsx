import { useAuthContext } from "context/auth";
import { FC } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import WorkerLayout from "./workerLayout";

type Props = {
  children?: any;
  props?: any;
};
const DashboardLayout: FC<Props> = ({}) => {
  const [{ authorized }] = useAuthContext();
  const navigate = useNavigate();
  if (!authorized) return <Navigate to={"/auth/login"} />;
  return (
    <div id="pro-layout">
      <WorkerLayout>
        <Outlet />
      </WorkerLayout>
    </div>
  );
};

export default DashboardLayout;
