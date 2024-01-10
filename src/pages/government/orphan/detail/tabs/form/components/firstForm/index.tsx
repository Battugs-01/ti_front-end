import { Card, Col, Form, Row, Select } from "antd";
import FormInput from "components/form-input";

export const FirstForm: React.FC = () => {
  return (
    <Card className="bg-[#F5F8F8] p-12">
      <div className="mb-4 text-xl font-medium">
        Аж ахуйн нэгж, байгууллагын хаяг
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            type="input"
            name="registrationNumber"
            label="Регистрийн дугаар"
            addonBefore="654654"
            placeholder="Байгууллагын нэр"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Аймаг / Нийслэл"
            name="capital"
            labelCol={{ span: 24 }}
          >
            <Select placeholder="Сонгоно уу." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Сум / Дүүрэг"
            name="district"
            labelCol={{ span: 24 }}
          >
            <Select placeholder="Сонгоно уу." />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label="Баг / Хороо" labelCol={{ span: 24 }}>
            <Select placeholder="Сонгоно уу." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <FormInput
            type="input"
            name="street"
            label="Гудамж / Хороолол"
            placeholder="4-р хороолол"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            type="input"
            name="house"
            label="Байшин / Байр"
            placeholder="404"
          />
        </Col>
        <Col span={12}>
          <FormInput
            type="input"
            name="doorNumber"
            label="Хашаа / Хаалганы дугаар"
            placeholder="94"
          />
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
            addonBefore="+976"
            type="phone"
            name="fax"
            label="Факс"
            placeholder="80805050"
          />
        </Col>
      </Row>
      <FormInput
        type="email"
        name="mail"
        label="Цахим шуудан"
        placeholder="sample@example.domain"
      />
      <FormInput
        addonBefore="https://"
        type="email"
        name="page"
        label="Цахим хуудас"
        placeholder="sample@example.domain"
      />
    </Card>
  );
};
