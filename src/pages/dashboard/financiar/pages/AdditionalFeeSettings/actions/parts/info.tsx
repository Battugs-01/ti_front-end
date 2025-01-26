import { ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, notification, Row } from "antd";
import { SectionContainer } from "components/index";
import { FORM_ITEM_RULE } from "config";
import { useState } from "react";
import { AdditionalFeeType } from "service/fininaciar/additionalFeeSettings/type";
import categoryType from "service/fininaciar/categoryType";

export const Info = () => {
  const [additionalFee, setAdditionalFee] = useState<AdditionalFeeType[]>([]);

  const categoryTypeList = useRequest(categoryType.list, {
    manual: true,
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });
  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormSelect
            mode="multiple"
            request={async () => {
              const res = await categoryTypeList.runAsync({ is_all: true });
              return res?.items.map((item) => ({
                label: (
                  <div className="flex gap-2">
                    <div>{item.code}</div> - <div>{item.name}</div>
                  </div>
                ),
                value: item.id,
              }));
            }}
            name="category_ids"
            placeholder="Ангилал код"
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
