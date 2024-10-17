import LanguageSelector from "components/language-selector";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5">
      <div
        className="hidden sm:block col-span-3 h-screen "
        style={{
          backgroundImage: "url('/background/main-logo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#5da7f0",
        }}
      ></div>
      <div
        className="col-span-2 w-full h-screen flex justify-center items-center xs:w-full relative"
        style={{
          backgroundSize: "cover",
        }}
      >
        <div className="absolute top-5 right-10">
          <LanguageSelector />
        </div>
        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
