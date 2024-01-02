import {
  ProFormDateTimePicker,
  ProFormItem,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Space } from "antd";
import { SectionContainer, SectionField } from "components/index";
import { IProFormSelect } from "components/select";
import {
  FORM_ITEM_RULE,
  PRODUCT_CATEGORY_ARRAY,
  SERVICE_STATUS_ARRAY,
} from "config";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";
import { ProductType } from "service/product/type";

export const Details = ({ type }: { type: ProductType }) => {
  const title =
    (type === ProductType.event && "Event") ||
    (type === ProductType.coupon && "Coupon") ||
    ProductType.product;
  return (
    <SectionContainer label="Details*">
      <SectionField
        label={title ? title + " Name*" : "Event Name*"}
        children={<ProFormText name={"name"} rules={FORM_ITEM_RULE()} />}
      />
      <SectionField
        label="Type"
        children={
          <ProFormSelect
            name={"category"}
            options={PRODUCT_CATEGORY_ARRAY.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
          />
        }
      />

      <SectionField
        label={type === ProductType.product ? "Merchant" : "Host"}
        children={
          <ProFormItem noStyle shouldUpdate={() => true}>
            {(form) => {
              return (
                <IProFormSelect
                  fieldNameForLabel="name"
                  name="service_id"
                  filter={{
                    statuses: SERVICE_STATUS_ARRAY.filter(
                      (el) => el.value !== ServiceStatusType.initial
                    ).map((el) => el.value),
                  }}
                  request={merchantService.list}
                  placeholder={"Select Service"}
                  onChange={(value) => {
                    form.setFieldValue("service_id", value);
                  }}
                />
              );
            }}
          </ProFormItem>
        }
      />
      <SectionField
        label={"Start Date"}
        children={
          <>
            <ProFormDateTimePicker
              name={"start_date"}
              rules={FORM_ITEM_RULE()}
            />
          </>
        }
      />
      <SectionField
        label={"End Date"}
        children={
          <>
            <ProFormDateTimePicker name={"end_date"} rules={FORM_ITEM_RULE()} />
          </>
        }
      />
      <SectionField
        label="Description"
        children={<ProFormText name={"description"} />}
      />
      <SectionField
        label="Website"
        children={
          <Space.Compact>
            <Button>http://</Button> <ProFormText name={"website"} />
          </Space.Compact>
        }
      />
      <SectionField
        label="Phone"
        children={<ProFormText name={"phone"} rules={FORM_ITEM_RULE()} />}
      />
    </SectionContainer>
  );
};
