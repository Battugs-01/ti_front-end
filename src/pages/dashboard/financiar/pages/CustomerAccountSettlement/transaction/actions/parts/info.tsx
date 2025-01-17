import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { SectionContainer } from "components/index";
import { FORM_ITEM_RULE } from "config";

export const Info = () => {
  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDatePicker
            fieldProps={{
              size: "large",
            }}
            name="created_at"
            label={<div className="text-gray-700 font-medium ">Огноо</div>}
          />
        </Col>
        <Col span={12}>
          {/* <ProFormSelect
            label={<div className="font-medium text-gray-700">Данс</div>}
            name={"employee_id"}
            shouldUpdate
            className="flex items-center justify-center "
            fieldProps={{
              showSearch: true,
              loading: emplyoee.loading,
              filterOption: false,
              onSearch: debouncedSearch,
              size: "large",
            }}
            placeholder={"Данс"}
            options={emplyoee?.data?.items.reduce<any[]>((acc, record) => {
              acc.push({
                label: (
                  <div className="flex gap-2 items-center">
                    <span>{`${record?.last_name?.substring(0, 1)}. ${
                      record?.first_name
                    }`}</span>
                  </div>
                ),
                value: record?.id,
              });
              return acc;
            }, [])}
          /> */}
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"cash"}
            placeholder={"Бэлэн"}
            label="Бэлэн"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"non_cash"}
            placeholder={"Бэлэн бус"}
            label="Бэлэн бус"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"barimt"}
            placeholder={"Баримт"}
            label="Баримт"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"payer"}
            placeholder={"Төлөгч"}
            label="Төлөгч"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
    </SectionContainer>
  );
};
