import { ProFormRadio, ProFormText } from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { SectionContainer } from "components/modal/section";
import { FORM_ITEM_RULE } from "config";
import { FC } from "react";

interface CustomerCompanyFormProps {
  isCreate?: boolean;
}

/**
 * Shared form component for customer company create and update operations
 */
export const CustomerCompanyForm: FC<CustomerCompanyFormProps> = ({ isCreate = false }) => {
  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"shortcut_name"}
            placeholder={"Товчлол"}
            label={"Товчлол"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"name"}
            placeholder={"Компаний нэр"}
            label="Компаний нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormRadio.Group
            name="is_broker"
            radioType="radio"
            label="Зууч эсэх"
            fieldProps={{
              size: "middle",
            }}
            options={[
              {
                label: "Тийм",
                value: true,
              },
              {
                label: "Үгүй",
                value: false,
              },
            ]}
            initialValue={true}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={isCreate ? 12 : 24}>
          {isCreate && (
            <ProFormText
              name={"ledger_name"}
              placeholder={"Харилцагчийн код"}
              label="Харилцагчийн код"
              rules={FORM_ITEM_RULE()}
            />
          )}
        </Col>
        <Col span={isCreate ? 12 : 24}>
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
      {isCreate && (
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <ProFormText
              name={"email"}
              placeholder={"sample@example.cг"}
              label="Цахим шуудан"
              rules={[
                {
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Энэ талбар и-мэйл хаяг байх ёстой",
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText.Password
              name={"password"}
              placeholder={"Нууц үг"}
              label="Нууц үг"
              rules={FORM_ITEM_RULE()}
            />
          </Col>
        </Row>
      )}
    </SectionContainer>
  );
}; 