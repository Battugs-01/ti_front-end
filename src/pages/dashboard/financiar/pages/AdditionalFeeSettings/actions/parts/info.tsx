import { ProFormDigit, ProFormText } from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { SectionContainer } from "components/index";
import { FORM_ITEM_RULE } from "config";

export const Info = () => {
  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"category_code"}
            placeholder={"Ангилал код"}
            label={"Ангилал код"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"fee_code"}
            placeholder={"Хураамжийн код"}
            label="Хураамжийн код"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"fee_name"}
            placeholder={"Хураамжийн нэр"}
            label="Хураамжийн нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"unit_measurement"}
            placeholder={"Хэмжих нэгж"}
            label="Хэмжих нэгж"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"fee_amount"}
            placeholder={"Хураамжийн дүн"}
            label="Хураамжийн дүн"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
    </SectionContainer>
  );
};
