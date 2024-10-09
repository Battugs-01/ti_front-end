import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { notification } from "antd";
import Emergency from "components/custom-detail/emergency";
import Info from "components/custom-detail/info";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import PlannedWork from "./components/table-edit";

const MyPlannedWorkDetail: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const customerId = searchParams.get("customer_id");
  const assId = searchParams.get("ass_id");

  const data = useRequest(screenList.customerDetail, {
    manual: true,
    ready: !!customerId,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    data.run(customerId as string);
  };

  useEffect(() => {
    run();
  }, [customerId]);

  if (!data && !customerId) {
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
          <PlannedWork
            customerMainData={data?.data as ScreeningListType}
            assesment_id={assId ? Number(assId) : 0}
          />
        </div>
      </div>
    </>
  );
};

export default MyPlannedWorkDetail;
