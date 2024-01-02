import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/background/login.png')",
        backgroundSize: "cover",
      }}
    >
      <Outlet />
      <div
        style={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <p className="text-center ">
          <span
            style={{
              fontSize: "1rem",
              color: "white",
              fontFamily: "Inter",
            }}
          >
            ©{new Date().getFullYear()} Powered by{" "}
            <a
              style={{ cursor: "pointer", color: "white", fontWeight: 600 }}
              href="https://techpartners.asia"
              target="_blank"
              rel="noreferrer"
            >
              “Tech Partners” LLC
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
