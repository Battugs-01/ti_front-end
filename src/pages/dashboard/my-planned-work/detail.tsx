import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Empty, notification } from "antd";
import Emergency from "components/custom-detail/emergency";
import Info from "components/custom-detail/info";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import PlannedWork from "./components/table-edit";

const MyPlannedWorkDetail: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const customerId = searchParams.get("customer_id");
  const assId = searchParams.get("ass_id");
  const intl = useIntl();

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

  // Хэрэгцээний цогц үнэлгээ болон өвчний түүх
  const comprehensiveData = useRequest(screenList.assessmentComprehensive, {
    manual: true,
  });

  const comprehensiveDataRun = () => {
    comprehensiveData.run((assId as any) || 0);
  };

  useEffect(() => {
    run();
    comprehensiveDataRun();
  }, [customerId, assId]);

  if (!data && !customerId) {
    return <PageLoading />;
  }

  return (
    <>
      {data.data ? (
        <div className="flex flex-col justify-between gap-4">
          <Info
            data={data?.data as ScreeningListType}
            isMyPlanedWork={assId as string}
          />
          <Emergency
            customerId={customerId}
            deseaseData={comprehensiveData?.data?.diseases}
          />
          <PlannedWork
            customerMainData={data?.data as ScreeningListType}
            assesment_id={assId ? Number(assId) : 0}
          />
        </div>
      ) : (
        <Empty
          className="my-4"
          description={intl.formatMessage({ id: "noData" })}
        />
      )}
    </>
  );
};

export default MyPlannedWorkDetail;
