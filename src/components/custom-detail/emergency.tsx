import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Card, notification, Row } from "antd";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import screenList from "service/screening_list";
import { useLevelContext } from "./selected-level";

interface EmergencyProps {
  customerId: any;
}
const Emergency: React.FC<EmergencyProps> = ({ customerId }) => {
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
    <Card className="mb-4">
      <div className="text-xl font-semibold mb-6">
        <FormattedMessage id="emergency" />
      </div>
      <div className="text-base font-semibold mb-2">
        <FormattedMessage id="checklist_emergency" />
      </div>
      <Row gutter={16} className="flex flex-col mb-2">
        <ul className="pl-6">
          {data?.data?.emergency_care_service?.map((item, index) => (
            <li
              className={`text-sm text-gray-600 font-medium ${
                index === 0 ? "" : "mt-3"
              }`}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </Row>
      <div className="text-base font-semibold mb-5">
        <FormattedMessage id="early_screening_is_required" />
        <Row gutter={16} className="flex flex-col mt-2">
          <ul className="pl-6">
            {data?.data?.emergency_early_examinations?.map((item, index) => (
              <li
                className={`text-sm text-gray-600 font-medium ${
                  index === 0 ? "" : "mt-3"
                }`}
              >
                {item?.name}
              </li>
            ))}
          </ul>
        </Row>
      </div>
    </Card>
  );
};

export default Emergency;
