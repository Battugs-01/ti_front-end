import {
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { SectionContainer, SectionField } from "components/index";
import {
  FORM_ITEM_RULE,
  FieldRequireMessage,
  PRICE_RANGE_ARRAY,
  SERVICE_CATEGORY_TYPES,
  SERVICE_OPERATION_TYPES,
} from "config";

export const Details = () => {
  return (
    <SectionContainer label={"Details"}>
      <SectionField label="Company Name*">
        <ProFormText name={"name"} rules={FORM_ITEM_RULE()} />
      </SectionField>
      <SectionField label="Operation Type*">
        <ProFormSelect
          name={"operation_types"}
          mode="multiple"
          options={SERVICE_OPERATION_TYPES.map((el) => ({ ...el }))}
          rules={[
            {
              message: FieldRequireMessage,
              required: true,
            },
          ]}
        />
      </SectionField>
      <SectionField
        label="Category"
        children={
          <ProFormSelect
            name={"categories"}
            mode="multiple"
            options={SERVICE_CATEGORY_TYPES.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
          />
        }
      />
      <SectionField label="Specialty*">
        <ProFormSelect name={"tags"} mode="tags" />
      </SectionField>
      <SectionField label="Price*">
        <ProFormSelect
          name={"price_range"}
          options={PRICE_RANGE_ARRAY.map((el) => ({ ...el }))}
        />
      </SectionField>
      <SectionField label="Description*(Mongolia)">
        <ProFormTextArea
          placeholder={"Please enter a description"}
          name={"descriptionmn"}
          fieldProps={{
            showCount: true,
            maxLength: 275,
          }}
        />
      </SectionField>
      <SectionField label="Description*(English)">
        <ProFormTextArea
          placeholder={"Please enter a description"}
          name={"description"}
          fieldProps={{
            showCount: true,
            maxLength: 275,
          }}
        />
      </SectionField>
      <div className="flex items-center space-x-2">
        <ProFormCheckbox name={"is_tourist_friendly"} />
        <div className="mb-6 text-gray-800 text-sm font-normal">
          Tourist Friendly
        </div>
      </div>
    </SectionContainer>
  );
};
