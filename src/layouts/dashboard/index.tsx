import ProLayout from "@ant-design/pro-layout";
import Logo from "assets/government/icons/image36.svg";
import { PageHeader } from "components/page_header";
import { useAuthContext } from "context/auth";
import { FC } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import { GovernmentMenu } from "./menuGovernment";
import WorkerLayout from "./workerLayout";

type Props = {
  children?: any;
  props?: any;
};
const DashboardLayout: FC<Props> = ({}) => {
  const [{ authorized }] = useAuthContext();
  const navigate = useNavigate();
  if (!authorized) return <Navigate to={"/auth/login"} />;
  const isSocialworker = false;
  return (
    <div id="pro-layout">
      {isSocialworker ? (
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
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="logo"
                onClick={() => navigate("/dashboard/government/requests")}
              />
              <div className="text-white text-sm">
                Хөдөлмөр, халамжийн үйлчилгээний ерөнхий газар
              </div>
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
