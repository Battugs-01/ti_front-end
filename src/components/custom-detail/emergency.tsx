import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Card, notification, Row } from "antd";
import AssesmentSvg from "assets/img/assesment.svg";
import IBadge from "components/badge";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import screenList from "service/screening_list";
import { Disease } from "service/statistical_report/type";
import { useLevelContext } from "./selected-level";

interface EmergencyProps {
  customerId: any;
  deseaseData?: Disease[] | undefined;
}
const Emergency: React.FC<EmergencyProps> = ({ customerId, deseaseData }) => {
  const { selectedLevel } = useLevelContext();

  const data = useRequest(screenList.emergencyGet, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    data.run({
      assessment_id: selectedLevel?.id,
      customer_id: Number(customerId),
    });
  };

  useEffect(() => {
    if (customerId && selectedLevel?.id) {
      run();
    }
  }, [customerId, selectedLevel]);

  if (!data.data && !selectedLevel && !customerId) {
    return <PageLoading />;
  }

  return (
    <Card
      className="card-header-remove"
      title={
        <div className="text-xl font-semibold flex flex-row gap-4">
          <img src={AssesmentSvg} alt="assesment" />
          <FormattedMessage id="emergency" />
        </div>
      }
    >
      <div className="lg:flex-row lg:justify-between flex flex-col justify-center lg:items-start items-center ">
        <div className="flex flex-col gap-4">
          <div className="text-base font-semibold ">
            <FormattedMessage id="checklist_emergency" />
          </div>
          <Row gutter={16} className="flex flex-col ">
            <ul className="pl-6">
              {data?.data?.emergency_care_service?.length || 0 > 0 ? (
                data?.data?.emergency_care_service?.map((item, index) => (
                  <li
                    className={`text-sm text-gray-600 font-medium ${
                      index === 0 ? "" : "mt-1"
                    }`}
                  >
                    {localStorage?.getItem("web.locale") === "en"
                      ? item?.name_en
                      : item?.name}
                  </li>
                ))
              ) : (
                <div>
                  <IBadge
                    title={<FormattedMessage id="not_checklist_emergency" />}
                    color="gray"
                  />
                </div>
              )}
            </ul>
          </Row>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-base font-semibold">
            <FormattedMessage id="early_screening_is_required" />
          </div>
          <Row gutter={16} className="flex flex-col ">
            <ul className="pl-6">
              {data?.data?.emergency_early_examinations?.length || 0 > 0 ? (
                data?.data?.emergency_early_examinations?.map((item, index) => (
                  <li
                    className={`text-sm text-gray-600 font-medium ${
                      index === 0 ? "" : "mt-1"
                    }`}
                  >
                    {localStorage?.getItem("web.locale") === "en"
                      ? item?.name_en
                      : item?.name}
                  </li>
                ))
              ) : (
                <div>
                  <IBadge
                    title={
                      <FormattedMessage id="not_early_screening_is_required" />
                    }
                    color="gray"
                  />
                </div>
              )}
            </ul>
          </Row>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-base font-semibold">
            <FormattedMessage id="desease_history" />
          </div>
          <Row gutter={16} className="flex flex-col ">
            <ul className="pl-6">
              {deseaseData?.length || 0 > 0 ? (
                deseaseData?.map((item, index) => (
                  <li
                    className={`text-sm text-gray-600 font-medium ${
                      index === 0 ? "" : "mt-1"
                    }`}
                  >
                    {localStorage?.getItem("web.locale") === "en"
                      ? item?.name_en
                      : item?.name}
                  </li>
                ))
              ) : (
                <div>
                  <IBadge
                    title={<FormattedMessage id="not_desease_history" />}
                    color="gray"
                  />
                </div>
              )}
            </ul>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default Emergency;
