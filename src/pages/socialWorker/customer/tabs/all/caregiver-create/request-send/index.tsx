import { Col, Row } from "antd";
import { UploadButton, UploadDraggerButton } from "components/index";

export const SendForm: React.FC = () => {
  return (
    <div className="px-8">
      <Row gutter={[16, 16]}>
        <Col sm={12} xs={21}>
          <UploadButton
            name={["request", "situational_file_ids"]}
            required={false}
            label="Нийгмийн ажилтны нөхцөл байдлын үнэлгээний хуудас"
          />
        </Col>
        <Col sm={12} xs={21}>
          <UploadButton
            name={["request", "definition_governor_file_ids"]}
            required={false}
            label="Сум, хорооны Засаг даргын тодорхойлолт"
          />
        </Col>
      </Row>
    </div>
  );
};
