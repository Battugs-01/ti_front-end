import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { SectionContainer } from "components/index";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";

export const Info = () => {
  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDatePicker
            fieldProps={{
              size: "large",
            }}
            name="birth_date"
            initialValue={dayjs().endOf("day")}
            label={<div className="text-gray-700 font-medium ">Огноо</div>}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"name"}
            placeholder={"Данс"}
            label="Данс"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"name"}
            placeholder={"Бэлэн"}
            label="Бэлэн"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"ledger_id"}
            placeholder={"Данс"}
            label="Данс"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"contact_number"}
            placeholder={"Харилцах дугаар"}
            fieldProps={{
              addonBefore: "+976",
            }}
            rules={[
              {
                pattern: /^[1-9]{1}[0-9]{7}$/g,
                message: "Энэ талбар утасны дугаар байх ёстой",
              },
              ...FORM_ITEM_RULE(),
            ]}
            label="Харилцах дугаар"
          />
        </Col>
      </Row>
    </SectionContainer>
  );
};
