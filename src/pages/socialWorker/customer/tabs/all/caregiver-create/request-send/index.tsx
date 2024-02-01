import { Col, Row } from "antd";
import { UploadDraggerButton } from "components/index";

export const SendForm: React.FC = () => {
  return (
    <div className="py-8 px-12">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <UploadDraggerButton
            name="assessment_sheet"
            required
            label="Нийгмийн ажилтны нөхцөл байдлын үнэлгээний хуудас"
          />
        </Col>
        <Col span={12}>
          <UploadDraggerButton
            name="desc_governor"
            required
            label="Сум, хорооны Засаг даргын тодорхойлолт"
          />
        </Col>
      </Row>
    </div>
  );
};
