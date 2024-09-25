import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { notification } from "antd";
import CustomHeader from "components/custom-detail/custom-header";
import Emergency from "components/custom-detail/emergency";
import Info from "components/custom-detail/info";
import DevPlanEdit from "components/custom-detail/other_roles/dev_plan_edit";
import MainDetailOtherRoles from "components/custom-detail/other_roles/main-detail";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";

const ScreeningListDetailOtherRoles: React.FC = () => {
  const location = useLocation();
  const customerId = location.search?.split("=")[1];

  const assessmentData = useRequest(screenList.assessmentDetail, {
    manual: true,
    ready: !!customerId,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const data = useRequest(screenList.customerDetail, {
    manual: true,
    ready: !!customerId,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    data.run(customerId);
    assessmentData.run(customerId);
  };

  useEffect(() => {
    run();
  }, [customerId]);

  if (!data && !assessmentData && !customerId) {
    return <PageLoading />;
  }

  return (
    <>
      <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
        <div className="xl:col-span-1 flex flex-col gap-6">
          <Info data={data?.data as ScreeningListType} />
          <Emergency customerId={customerId} />
        </div>
        <div className="xl:col-span-4">
          <CustomHeader data={assessmentData?.data || []} />
          {/* <MainDetailOtherRoles /> */}
          <DevPlanEdit />
        </div>
      </div>
    </>
  );
};

export default ScreeningListDetailOtherRoles;
