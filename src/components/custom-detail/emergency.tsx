import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Card, Col, notification, Row } from "antd";
import { useEffect } from "react";
import { FaDotCircle } from "react-icons/fa";
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

  if (!data && !selectedLevel && !customerId) {
    return <PageLoading />;
  }
  return (
    <Card className="mb-4">
      <div className="text-xl font-semibold flex flex-row gap-4">
        <FormattedMessage id="emergency" />
      </div>
      <Row gutter={16} className="flex flex-col mt-2">
        {/* {data?.map((item, index) => (
          <Col key={index} className="flex gap-4 items-center">
            <FaDotCircle size={7} />
            <div className="text-sm text-gray-600 font-medium">
              {item?.name}
            </div>
          </Col>
        ))} */}
        sda
      </Row>
    </Card>
  );
};

export default Emergency;
