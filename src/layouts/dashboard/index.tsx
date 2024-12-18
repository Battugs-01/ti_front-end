import { Handbooks } from "components/handbook";
import { useAuthContext } from "context/auth";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import WorkerLayout from "./layout";

type Props = {
  children?: any;
  props?: any;
};
const DashboardLayout: FC<Props> = ({}) => {
  const [{ authorized, user }] = useAuthContext();
  if (!authorized) return <Navigate to={"/auth/login"} />;
  return (
    <div id="pro-layout">
      <WorkerLayout>
        <Outlet />
      </WorkerLayout>
      <div className="fixed top-1/2 right-0 z-20">
        <Handbooks />
      </div>
    </div>
  );
};

export default DashboardLayout;
