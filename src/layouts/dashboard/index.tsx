import { useAuthContext } from "context/auth";
import { FC, useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import WorkerLayout from "./workerLayout";
import { PageHeader } from "components/page_header";
import ProLayout from "@ant-design/pro-layout";
import { GovernmentMenu } from "./menuGovernment";
import Header from "./header";
import Logo from "assets/government/icons/image36.svg";

type Props = {
  children?: any;
  props?: any;
};
const DashboardLayout: FC<Props> = ({}) => {
  const [{ authorized, user }] = useAuthContext();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  if (!authorized) return <Navigate to={"/auth/login"} />;
  return (
    <div id="pro-layout">
      {user?.user_type === 3 ? (
        <WorkerLayout>
          <Outlet />
        </WorkerLayout>
      ) : (
        <ProLayout
          siderWidth={280}
          collapsedButtonRender={false}
          menuDataRender={() => GovernmentMenu}
          menuItemRender={(item: any) => {
            return (
              <Link to={item.path || "/dashboard/government/requests"}>
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
          onMenuHeaderClick={() => navigate("/dashboard/government/requests")}
          menuProps={{}}
          menu={{
            defaultOpenAll: true,
            autoClose: false,
            type: "group",
          }}
          subMenuItemRender={(item) => {
            return (
              <div className="text-[#A0B6BA] flex font-semibold  items-center gap-4  rounded-lg px-1 text-xs mt-6 pb-2 pt-2">
                {/* <div>{item.icon}</div> */}
                <div>{item.name}</div>
              </div>
            );
          }}
          inlineCollapsed={collapsed}
          onCollapse={(collapsed) => {
            setCollapsed(collapsed);
          }}
          // menuHeaderRender={(_: any, titleDom: any) => {
          //   return <Link to="/dashboard/dashboard" className=" hidden md:flex h-20  min-[1000px]:h-24">
          //     <Image src="/images/logo.jpg" alt="logo" width={32} height={32} className="rounded-lg w-8 h-8 min-[1000px]:w-20 min-[1000px]:h-20 relative min-[1000px]:-left-5" onClick={() => navigate("/dashboard/dashboard")} />
          //   </Link>;
          // }}
          rightContentRender={() => <Header />}
          // footerRender={() => <Footer />}
          contentStyle={{
            margin: 0,
            overflowY: "auto",
            height: "calc(100vh - 1px)",
            // height: "100%",
            fontFamily: "'Inter', sans-serif",
            background: "#E7EDEE",
          }}
          layout="side"
          colorWeak={false}
          logo={
            <div className="items-center gap-2 flex">
              <img
                src={Logo}
                alt="logo"
                onClick={() => navigate("/dashboard/government/requests")}
              />
              {!collapsed && (
                <div className="text-white text-sm">
                  Хөдөлмөр, халамжийн үйлчилгээний ерөнхий газар
                </div>
              )}
            </div>
          }
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
      )}
    </div>
  );
};

export default DashboardLayout;
