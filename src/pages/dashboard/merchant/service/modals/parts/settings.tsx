import {
  ProFormDateTimePicker,
  ProFormItem,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Divider, Space } from "antd";
import { RenderBank, SectionContainer, SectionField } from "components/index";
import { BANK_ARRAY, COMMISSION_ARRAY, SERVICE_STATUS_ARRAY } from "config";
import {
  MerchantService,
  ServiceStatusType,
} from "service/merchantService/type";

type Props = {
  detail?: MerchantService;
};
export const Settings = ({ }: Props) => {
  return (
    <>
      <SectionContainer label="Status*">
        <SectionField
          children={
            <ProFormSelect
              name={"status"}
              options={SERVICE_STATUS_ARRAY.map((el) => ({ ...el }))}
            />
          }
          label="Status"
        />
      </SectionContainer>
      <Divider />
      <ProFormItem noStyle shouldUpdate={(a, b) => a.status != b.status}>
        {(form) => {
          return (
            <>
              {form.getFieldValue("status") === ServiceStatusType.sponsored && (
                <>
                  <SectionContainer label="Commission">
                    <div className="flex flex-col">
                      <Space.Compact>
                        <Button className="w-full">Event & Ticket</Button>
                        <ProFormSelect
                          name={"commission_event"}
                          placeholder={"Please Select"}
                          showSearch
                          options={COMMISSION_ARRAY.map((el) => ({ ...el }))}
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Button className=" w-full">Coupon</Button>
                        <ProFormSelect
                          showSearch
                          name={"commission_coupon"}
                          options={COMMISSION_ARRAY.map((el) => ({ ...el }))}
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Button className=" w-full">Product</Button>
                        <ProFormSelect
                          showSearch
                          name={"commission_product"}
                          options={COMMISSION_ARRAY.map((el) => ({ ...el }))}
                        />
                      </Space.Compact>
                    </div>
                    <div className="flex items-center gap-3 ">
                      <SectionField label="Start date">
                        <ProFormDateTimePicker
                          fieldProps={{
                            className: "w-full",
                          }}
                          name={"commission_start_date"}
                        />
                      </SectionField>
                      <Divider
                        style={{
                          minWidth: 8,
                          width: 8,
                          margin: 0,
                        }}
                        className=" bg-gray-600"
                      />
                      <SectionField label="End date">
                        <ProFormDateTimePicker
                          fieldProps={{
                            className: "w-full",
                          }}
                          name={"commission_end_date"}
                        />
                      </SectionField>
                    </div>
                  </SectionContainer>

                  <Divider />
                  <SectionContainer label="Account">
                    <SectionField label="Bank">
                      <ProFormSelect
                        name={"account_bank"}
                        options={BANK_ARRAY.map((el) => ({
                          ...el,
                          label: <RenderBank bank={el.value} />,
                        }))}
                      />
                    </SectionField>
                    <SectionField label="Account number">
                      <ProFormText name={"account_number"} />
                    </SectionField>
                    <SectionField label="Account holder">
                      <ProFormText name={"account_holder"} />
                    </SectionField>
                  </SectionContainer>
                </>
              )}
            </>
          );
        }}
      </ProFormItem>
    </>
  );
};
