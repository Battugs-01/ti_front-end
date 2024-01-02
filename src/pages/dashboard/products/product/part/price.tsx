import {
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormItem,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Space } from "antd";
import { SectionContainer, SectionField } from "components/index";
import { CURRENCY_ARRAY, FORM_ITEM_RULE } from "config";
import { moneyFormat } from "utils/index";

export const Price = () => {
  return (
    <SectionContainer label="Price*">
      <ProFormItem noStyle shouldUpdate={(a, b) => a.currency != b.currency}>
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
                    }}
                    rules={FORM_ITEM_RULE()}
                  />
                  <ProFormSelect
                    name="currency"
                    options={[{ value: "mnt", label: "MNT" }]}
                    rules={FORM_ITEM_RULE()}
                    fieldProps={{
                      onChange: () => {
                        form.setFieldValue("regular_price", undefined);
                      },
                    }}
                    allowClear={false}
                  />
                </Space.Compact>
              }
            />
          );
        }}
      </ProFormItem>
      <ProFormRadio.Group
        name={"has_limit"}
        options={[
          {
            label: "Limited",
            value: true,
          },
          {
            label: "Unlimted",
            value: false,
          },
        ]}
        rules={FORM_ITEM_RULE()}
      />
      <ProFormItem noStyle shouldUpdate={(a, b) => a.has_limit != b.has_limit}>
        {(form) => {
          return (
            form.getFieldValue("has_limit") && (
              <>
                <Space.Compact>
                  <ProFormDigit
                    name={"limit"}
                    rules={FORM_ITEM_RULE()}
                    fieldProps={{
                      formatter: (value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    }}
                  />
                  <Button>Unit</Button>
                </Space.Compact>
              </>
            )
          );
        }}
      </ProFormItem>
      <SectionField
        label="Discount"
        children={
          <div className="flex gap-2">
            <div className="text-gray-600">
              If participates can get discount under certain condition
            </div>
            <ProFormSwitch name={"has_discount"} />
          </div>
        }
      />
      <ProFormItem
        noStyle
        shouldUpdate={(a, b) => a.has_discount != b.has_discount}
      >
        {(form) => {
          return (
            form.getFieldValue("has_discount") && (
              <div>
                <div className="flex  gap-3">
                  <SectionField
                    label="Percent"
                    children={
                      <>
                        <ProFormItem
                          noStyle
                          shouldUpdate={(a, b) =>
                            a.regular_price != b.regular_price ||
                            a.currency != b.currency ||
                            a.discount_percentage != b.discount_percentage
                          }
                        >
                          {(form) => {
                            let price = form.getFieldValue("regular_price");
                            let value = form.getFieldValue(
                              "discount_percentage"
                            );
                            return (
                              <ProFormText
                                fieldProps={{
                                  addonBefore: "%",
                                  addonAfter: `${
                                    moneyFormat((price * value) / 100, "mnt") ??
                                    0
                                  } `,
                                }}
                                name={"discount_percentage"}
                                rules={FORM_ITEM_RULE()}
                              />
                            );
                          }}
                        </ProFormItem>
                      </>
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  <SectionField
                    label="Start Date"
                    children={
                      <ProFormDateTimePicker
                        name={"discount_start_date"}
                        rules={FORM_ITEM_RULE()}
                      />
                    }
                  />
                  <SectionField
                    label="End date"
                    children={
                      <ProFormDateTimePicker
                        name={"discount_end_date"}
                        rules={FORM_ITEM_RULE()}
                      />
                    }
                  />
                </div>
              </div>
            )
          );
        }}
      </ProFormItem>
    </SectionContainer>
  );
};
