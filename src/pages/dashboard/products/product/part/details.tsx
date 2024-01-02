import {
  ProFormDateTimePicker,
  ProFormItem,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { SectionContainer, SectionField } from "components/index";
import { IProFormSelect } from "components/select";
import {
  FORM_ITEM_RULE,
  PRODUCT_CATEGORY_ARRAY,
  SERVICE_STATUS_ARRAY,
} from "config";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";

export const Details = () => {
  return (
    <SectionContainer label="Details*">
      <SectionField
        label={"Product Name"}
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
        label={"Merchant"}
        children={
          <ProFormItem noStyle shouldUpdate={(a, b) => true}>
            {(form) => {
              return (
                <IProFormSelect
                  fieldNameForLabel="name"
                  name="service_id"
                  filter={{
                    statuses: SERVICE_STATUS_ARRAY.filter(
                      (el) =>
                        el.value === ServiceStatusType.verified ||
                        el.value === ServiceStatusType.sponsored
                    ).map((el) => el.value),
                  }}
                  request={merchantService.list}
                  placeholder={"Select Service"}
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
    </SectionContainer>
  );
};
