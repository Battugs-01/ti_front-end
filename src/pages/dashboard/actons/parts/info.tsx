import { ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { SectionContainer } from "components/index";
import { FORM_ITEM_RULE, workersGenderArray } from "config";

export const Info = () => {
  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"last_name"}
            placeholder={"Овог"}
            label={"Овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"first_name"}
            placeholder={"Нэр"}
            label="Нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"registration_number"}
            placeholder={"Регистр"}
            label="Регистрийн дугаар"
            rules={[
              {
                pattern: /^[а-яА-Я]{2}[0-9]{1}[0-9]{7}$/,
                message: "Энэ талбар РД байх ёстой",
              },
              ...FORM_ITEM_RULE(),
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            name={"gender"}
            options={workersGenderArray.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
            label="Хүйс"
            placeholder={"Хүйс сонгох"}
          />
        </Col>
      </Row>
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
              ...FORM_ITEM_RULE(),
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"phone"}
            placeholder={"Утас"}
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
            label="Утас"
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"age"}
            rules={FORM_ITEM_RULE()}
            label="Нас"
            placeholder={"Нас"}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            rules={FORM_ITEM_RULE()}
            name={"position"}
            placeholder={"Албан тушаал"}
            label="Албан тушаал"
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: 15 }}>
        <Col span={12}>
          <ProFormText.Password
            rules={FORM_ITEM_RULE()}
            name={"password"}
            placeholder={"Нууц үг"}
            label="Нууц үг"
            fieldProps={{
              type: "password",
            }}
          />
        </Col>
      </Row>
    </SectionContainer>
  );
};
