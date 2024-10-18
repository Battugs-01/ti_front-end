import { Handbooks } from "components/handbook";
import { useAuthContext } from "context/auth";
import { FC } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import WorkerLayout from "./layout";

type Props = {
  children?: any;
  props?: any;
};
const DashboardLayout: FC<Props> = ({}) => {
  const [{ authorized, user }] = useAuthContext();
  const navigate = useNavigate();
  if (!authorized) return <Navigate to={"/auth/login"} />;
  return (
    <div id="pro-layout">
      <WorkerLayout>
        <Outlet />
      </WorkerLayout>
      <Handbooks />
    </div>
  );
};

export default DashboardLayout;
