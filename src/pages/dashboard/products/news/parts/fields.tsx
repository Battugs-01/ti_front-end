import {
  ProFormDateTimePicker,
  ProFormItem,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Divider, Space } from "antd";
import {
  SectionContainer,
  SectionField,
  UploadDraggerButton,
} from "components/index";
import { IProFormSelect } from "components/select";
import { CURRENCY_ARRAY, FORM_ITEM_RULE } from "config";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";

export const FormFields = () => {
  return (
    <>
      <SectionContainer
        label="Title*"
        children={<ProFormText name={"name"} rules={FORM_ITEM_RULE()} />}
      />
      <SectionContainer label="Details*">
        <SectionField
          label="Title"
          children={<ProFormText name={"sub_title"} rules={FORM_ITEM_RULE()} />}
        />
        <SectionField
          label="Host"
          children={
            <ProFormItem noStyle shouldUpdate={() => true}>
              {(form) => {
                return (
                  <IProFormSelect
                    fieldNameForLabel="name"
                    name="service_id"
                    request={async () =>
                      merchantService.list({
                        status: ServiceStatusType.sponsored,
                      })
                    }
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
          label="Description"
          children={<ProFormText name={"description"} />}
        />
        <SectionField
          label="Date"
          children={
            <div className="flex items-center  gap-2">
              <ProFormDateTimePicker
                name={"start_date"}
                rules={FORM_ITEM_RULE()}
              />
              <Divider
                style={{
                  minWidth: 8,
                  width: 8,
                  margin: 0,
                }}
                className="mb-6 bg-gray-600"
              />
              <ProFormDateTimePicker
                name={"end_date"}
                rules={FORM_ITEM_RULE()}
              />
            </div>
          }
        />
      </SectionContainer>
      <SectionContainer
        label="Image*"
        children={<UploadDraggerButton name={"images"} />}
      />
      <SectionContainer
        label="Price*"
        children={
          <ProFormItem
            noStyle
            shouldUpdate={(a, b) => a.currency != b.currency}
          >
            {(form) => {
              return (
                <SectionField
                  label="Regular Price"
                  children={
                    <Space.Compact>
                      <ProFormMoney
                        customSymbol={
                          CURRENCY_ARRAY.find(
                            (e) => e.value == form.getFieldValue("currency")
                          )?.symbol
                        }
                        shouldUpdate={(a, b) => a.currency != b.currency}
                        name={"regular_price"}
                        placeholder={"Please enter"}
                        fieldProps={{
                          customSymbol: CURRENCY_ARRAY.find(
                            (e) => e.value == form.getFieldValue("currency")
                          )?.symbol,
                        }} // locale="mn-MN"
                        rules={FORM_ITEM_RULE()}
                      />
                      <ProFormSelect
                        name="currency"
                        options={[{ value: "mnt", label: "MNT" }]}
                        rules={FORM_ITEM_RULE()}
                        allowClear={false}
                      />
                    </Space.Compact>
                  }
                />
              );
            }}
          </ProFormItem>
        }
      />
    </>
  );
};
