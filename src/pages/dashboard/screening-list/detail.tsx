import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Empty, notification } from "antd";
import Assesment from "components/custom-detail/assesment";
import CustomHeader from "components/custom-detail/custom-header";
import Emergency from "components/custom-detail/emergency";
import Info from "components/custom-detail/info";
import QuistionHistory from "components/custom-detail/quesion-history";
import { useLevelContext } from "components/custom-detail/selected-level";
import TableEditDevPlan from "components/custom-detail/table-edit";
import { ScreeningTab } from "config";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import screenList from "service/screening_list";
import {
  AssessmentListType,
  ComprehensiveType,
  ScreeningListType,
} from "service/screening_list/type";

const ScreeningListDetailCaseManager: React.FC = () => {
  const location = useLocation();
  const intl = useIntl();
  const customerId = location.search?.split("=")[1];
  const { selectedLevel } = useLevelContext();

  // Нийт асуумжийн жагсаалт байгаа болно
  const assessmentData = useRequest(screenList.assessmentDetail, {
    manual: true,
    ready: !!customerId,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  // Хэрэглэгчийн дэлгэрэнгүй мэдээлэл байгаа болно
  const customerData = useRequest(screenList.customerDetail, {
    manual: true,
    ready: !!customerId,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  // Хэрэгцээний цогц үнэлгээ болон өвчний түүх
  const comprehensiveData = useRequest(screenList.assessmentComprehensive, {
    manual: true,
  });

  const run = () => {
    customerData.run(customerId);
    assessmentData.run(customerId);
  };

  const comprehensiveDataRun = () => {
    comprehensiveData.run(selectedLevel?.id || 0);
  };

  // customer get болон assesment нь customer оос хамааралтай
  useEffect(() => {
    run();
  }, [customerId]);

  // хэрэгцээний цогц үнэлгээ болон өвчний түүх нь assesment_id буюу selectedLevel ээс хамаатай болно
  useEffect(() => {
    if (selectedLevel) {
      comprehensiveDataRun();
    }
  }, [selectedLevel]);

  if (customerData?.loading && assessmentData?.loading) return <PageLoading />;
  return (
    <>
      {customerData?.data && assessmentData?.data ? (
        <div className="flex flex-col justify-between gap-4">
          <Info
            data={customerData?.data as ScreeningListType}
            refreshData={run}
          />
          <CustomHeader
            data={assessmentData?.data || []}
            customerMainData={customerData?.data as ScreeningListType}
          />
          <QuistionHistory
            selectedLevel={selectedLevel as AssessmentListType}
          />
          <Emergency
            customerId={customerId}
            deseaseData={comprehensiveData?.data?.diseases}
          />
          {selectedLevel?.level === ScreeningTab.level_3 && (
            <>
              <Assesment
                selectedLevel={selectedLevel}
                data={comprehensiveData?.data as ComprehensiveType}
              />
              {!comprehensiveData?.data?.comp_ass?.is_temporary && (
                <TableEditDevPlan
                  customerMainData={customerData?.data as ScreeningListType}
                />
              )}
            </>
          )}
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

export default ScreeningListDetailCaseManager;
