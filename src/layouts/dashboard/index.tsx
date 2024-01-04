import ProLayout from "@ant-design/pro-layout";
import { PageHeader } from "components/page_header";
import { useAuthContext } from "context/auth";
import { FC } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import { GroupedMenu } from "./menu";
import { GovernmentMenu } from "./menuGovernment";
// import { Image } from "antd";

type Props = {
  children?: any;
  props?: any;
};
const DashboardLayout: FC<Props> = ({}) => {
  const [{ authorized }] = useAuthContext();
  const navigate = useNavigate();
  const isGovernment = false;
  if (!authorized) return <Navigate to={"/auth/login"} />;

  return (
    <div id="pro-layout">
      <ProLayout
        collapsedButtonRender={false}
        menuDataRender={() => (isGovernment ? GovernmentMenu : GroupedMenu)}
        menuItemRender={(item: any) => {
          return (
            <Link to={item.path || "/dashboard/dashboard"}>
              <div
                className={`text-white flex font-semibold items-center gap-4 rounded-lg px-1 `}
              >
                <div className="flex items-center">{item.icon}</div>
                <div>{item.name}</div>
              </div>
            </Link>
          );
        }}
        disableMobile={false}
        onMenuHeaderClick={() => navigate("/dashboard/dashboard")}
        menuProps={{}}
        menu={{
          defaultOpenAll: true,
          autoClose: false,
        }}
        subMenuItemRender={(item) => {
          return (
            <div className="text-[#A0B6BA] flex font-semibold  items-center gap-4  rounded-lg px-1 text-xs mt-6 pb-2 pt-2">
              {/* <div>{item.icon}</div> */}
              <div>{item.name}</div>
            </div>
          );
        }}
        // menuHeaderRender={(_: any, titleDom: any) => {
        //   return <Link to="/dashboard/dashboard" className=" hidden md:flex h-20  min-[1000px]:h-24">
        //     <Image src="/images/logo.jpg" alt="logo" width={32} height={32} className="rounded-lg w-8 h-8 min-[1000px]:w-20 min-[1000px]:h-20 relative min-[1000px]:-left-5" onClick={() => navigate("/dashboard/dashboard")} />
        //   </Link>;
        // }}
        rightContentRender={() => <Header />}
        footerRender={() => <Footer />}
        contentStyle={{
          margin: 0,
          overflowY: "auto",
          height: "calc(100vh - 60px)",
          fontFamily: "'Inter', sans-serif",
          background: "#E7EDEE",
        }}
        layout="side"
        colorWeak={false}
        // logo={<Image src="/images/logo.jpg" alt="logo" className="hidden md:flex rounded-lg shrink-0 w-8 h-8 min-[1000px]:w-20 min-[1000px]:h-20" onClick={() => navigate("/dashboard/dashboard")} />}
        logoStyle={{
          // height: "20vh",
          marginTop: "3vh",
          display: "flex",
          justifyContent: "center",
        }}
        title={false}
        fixedHeader={true}
        fixSiderbar={true}
        contentWidth={"Fluid"}
      >
        <PageHeader />
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default DashboardLayout;
