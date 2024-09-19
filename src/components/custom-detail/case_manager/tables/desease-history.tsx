import { PageLoading } from "@ant-design/pro-layout";
import { Card, Col, Row } from "antd";
import { FaDotCircle } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { Disease } from "service/screening_list/type";
interface DeseaseHistoryProps {
  data: Disease[] | undefined;
}

const DeseaseHistory: React.FC<DeseaseHistoryProps> = ({ data }) => {
  if (!data) return <PageLoading />;
  return (
    <Card className="mb-4">
      <div className="text-xl font-semibold flex flex-row gap-4">
        <FormattedMessage id="desease_history" />
      </div>
      <Row gutter={16} className="flex flex-col mt-2">
        {data?.map((item, index) => (
          <Col key={index} className="flex gap-4 items-center">
            <FaDotCircle size={7} />
            <div className="text-sm text-gray-600 font-medium">
              {item?.name}
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default DeseaseHistory;
