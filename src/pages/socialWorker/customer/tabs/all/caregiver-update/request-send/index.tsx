import { Col, Row } from "antd";
import { UploadDraggerButton } from "components/index";

export const SendForm: React.FC = () => {
  return (
    <div className="px-8">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <UploadDraggerButton
            name={["request", "situational_file_ids"]}
            required
            label="Нийгмийн ажилтны нөхцөл байдлын үнэлгээний хуудас"
          />
        </Col>
        <Col span={12}>
          <UploadDraggerButton
            name={["request", "definition_governor_file_ids"]}
            required
            label="Сум, хорооны Засаг даргын тодорхойлолт"
          />
        </Col>
      </Row>
    </div>
  );
};
