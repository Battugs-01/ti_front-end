import { Card, Col, Form, Row, Select } from "antd";
import FormInput from "components/form-input";

export const SecondForm: React.FC = () => {
  return (
    <Card className="bg-[#F5F8F8] p-12">
      <div className="mb-4 text-xl font-medium">Хариуцлагын хэлбэр</div>
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
            label="Хариуцлагын хэлбэр"
            name="responsibilityTypes"
            labelCol={{ span: 24 }}
          >
            <Select placeholder="Сонгоно уу." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Өмчийн хэлбэр"
            name="propertyType"
            labelCol={{ span: 24 }}
          >
            <Select placeholder="Сонгоно уу." />
          </Form.Item>
        </Col>
      </Row>
      <div className="mb-4 text-xl font-medium">Хүчин чадлын үзүүлэлт</div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            addonBefore="Оны эхэнд"
            type="number"
            name="personNumber"
            label="Хүлээн авах боломжтой хүний тоо"
            placeholder="Тоо хэмжээ"
          />
        </Col>
        <Col span={12}>
          <FormInput
            addonBefore="Оны эцэст"
            type="number"
            name="personNumberEnd"
            placeholder="Тоо хэмжээ"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            addonBefore="Оны эхэнд"
            type="number"
            name="bedNumber"
            label="Орны тоо"
            placeholder="Тоо хэмжээ"
          />
        </Col>
        <Col span={12}>
          <FormInput
            addonBefore="Оны эцэст"
            type="number"
            name="bedNumberEnd"
            placeholder="Тоо хэмжээ"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            addonBefore="Оны эхэнд"
            type="number"
            name="table"
            label="Ширээ"
            placeholder="Тоо хэмжээ"
          />
        </Col>
        <Col span={12}>
          <FormInput
            addonBefore="Оны эцэст"
            type="number"
            name="tableEnd"
            placeholder="Тоо хэмжээ"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            addonBefore="Оны эхэнд"
            type="number"
            name="chair"
            label="Сандал"
            placeholder="Тоо хэмжээ"
          />
        </Col>
        <Col span={12}>
          <FormInput
            addonBefore="Оны эцэст"
            type="number"
            name="chairEnd"
            placeholder="Тоо хэмжээ"
          />
        </Col>
      </Row>
    </Card>
  );
};
