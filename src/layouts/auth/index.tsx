import { AuthContent } from "components/auth_content";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-full">
      <AuthContent />
      <div
        className="col-span-2 w-full h-screen flex justify-center items-center relative"
        style={{
          backgroundSize: "cover",
        }}
      >
        <div className="w-2/3 lg:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
