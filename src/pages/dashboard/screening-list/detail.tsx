import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import Assesment from "components/custom-detail/assesment";
import CustomHeader from "components/custom-detail/custom-header";
import Emergency from "components/custom-detail/emergency";
import Info from "components/custom-detail/info";
import QuistionHistory from "components/custom-detail/quesion-history";
import { useLevelContext } from "components/custom-detail/selected-level";
import TableEditDevPlan from "components/custom-detail/table-edit";
import { ScreeningTab } from "config";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import screenList from "service/screening_list";
import {
  AssessmentListType,
  ComprehensiveType,
  ScreeningListType,
} from "service/screening_list/type";
import { ChevronLeft } from "untitledui-js-base";

const ScreeningListDetailCaseManager: React.FC = () => {
  const location = useLocation();
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

  if (!customerData && !assessmentData && !customerId && !selectedLevel) {
    return <PageLoading />;
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4">
        <div>
          <Link
            to="/dashboard/screening-list"
            style={{ textDecoration: "none" }}
          >
            <Button
              type="default"
              size="large"
              icon={<ChevronLeft />}
              className="flex items-center"
            >
              <FormattedMessage id="back" />
            </Button>
          </Link>
        </div>

        <Info data={customerData?.data as ScreeningListType} />
        <CustomHeader
          data={assessmentData?.data || []}
          customerMainData={customerData?.data as ScreeningListType}
        />
        <QuistionHistory selectedLevel={selectedLevel as AssessmentListType} />
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
            <TableEditDevPlan
              customerMainData={customerData?.data as ScreeningListType}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ScreeningListDetailCaseManager;
