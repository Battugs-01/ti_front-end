import { Card, Col, Form, Row, Select } from "antd";
import FormInput from "components/form-input";

export const ThirdForm: React.FC = () => {
  return (
    <Card className="bg-[#F5F8F8] p-12">
      <div className="mb-4 text-xl font-medium">
        Холбоо барих хүний талаарх мэдээлэл
      </div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label="Овог" name="lastName" labelCol={{ span: 24 }}>
            <Select placeholder="Сонгоно уу." />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Нэр" name="name" labelCol={{ span: 24 }}>
            <Select placeholder="Сонгоно уу." />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Албан тушаал"
            name="positon"
            labelCol={{ span: 24 }}
          >
            <Select placeholder="Сонгоно уу." />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            addonBefore="+976"
            type="phone"
            name="phone"
            label="Утас"
            placeholder="80805050"
          />
        </Col>
        <Col span={12}>
          <FormInput
            type="email"
            name="mail"
            label="Цахим шуудан"
            placeholder="sample@example.domain"
          />
        </Col>
      </Row>
    </Card>
  );
};
