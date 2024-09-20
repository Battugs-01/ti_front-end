import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Card, Col, notification, Row } from "antd";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import screenList from "service/screening_list";
import { useLevelContext } from "./selected-level";

interface EmergencyProps {
  customerId: string;
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

  console.log(data?.data, "hello");
  return (
    <Card className="mb-4">
      <div className="text-xl font-semibold mb-6">
        <FormattedMessage id="emergency" />
      </div>
      <div className="text-base font-semibold mb-6">
        <FormattedMessage id="checklist_emergency" />
      </div>
      <Row gutter={16} className="flex flex-col mt-2">
        {data?.data?.emergency_care_service?.map((item, index) => (
          <Col key={index} className="flex gap-4 items-center">
            <div className="text-sm text-gray-600 font-medium">
              {item?.name}
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default Emergency;
