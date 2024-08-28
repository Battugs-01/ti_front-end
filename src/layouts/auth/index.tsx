import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5">
      <div
        className="hidden sm:block col-span-3 h-screen "
        style={{
          backgroundImage: "url('/background/login.png')",
          backgroundSize: "cover",
          backgroundColor: "#5da7f0",
        }}
      >
        {/* <div className="bg-[#144E5A] hidden sm:block col-span-2 h-screen opacity-70 relative">
          <div className="flex items-start flex-col justify-end h-full absolute bottom-24 left-32 gap-6">
            <div className="text-white text-5xl">
              Халамж, нийгмийн ажилтны удирдлагын систем
            </div>
            <div className="text-white text-3xl">
              Төрөлжсөн ахмадын асрамжийн газрын систем
            </div>
          </div>
        </div> */}
      </div>
      <div
        className="col-span-2 w-full h-screen flex justify-center items-center xs:w-full"
        style={{
          backgroundSize: "cover",
        }}
      >
        <div className="w-1/2">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
