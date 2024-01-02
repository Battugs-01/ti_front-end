import {
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormItem,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import {
  SectionContainer,
  SectionField,
  UploadDraggerButton,
} from "components/index";
import { IProFormSelect } from "components/select";
import { FORM_ITEM_RULE, FieldRequireMessage } from "config";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";

export const FormFields = () => {
  return (
    <>
      <SectionContainer label="Description*">
        <SectionField
          label="Merchant*"
          children={
            <IProFormSelect
              filter={{
                status: ServiceStatusType.sponsored,
              }}
              fieldNameForLabel="name"
              name="service_ids"
              mode="multiple"
              request={merchantService.list}
              placeholder={"Select Service"}
            />
          }
        />
        <SectionField label="Title*">
          <ProFormText
            name="title"
            placeholder="Enter Title"
            rules={FORM_ITEM_RULE()}
          />
        </SectionField>
        <SectionField label="Description">
          <ProFormTextArea
            shouldUpdate
            name="description"
            rules={FORM_ITEM_RULE()}
            fieldProps={{
              maxLength: 2750,
              showCount: true,
            }}
            placeholder="We suggest writing from your own individual perspective, keeping it honest and sticking to the facts. Help readers stand in your shoes."
          />
        </SectionField>
        <SectionField label="Image">
          <UploadDraggerButton
            name={"images"}
            required={false}
            max={1}
            validator={async (value) => {
              if (!value) return Promise.reject(FieldRequireMessage);
              return Promise.resolve(value);
            }}
          />
        </SectionField>
      </SectionContainer>
      <SectionContainer label="Date*">
        <div>
          <div className="mb-2 flex gap-2">
            <ProFormCheckbox
              name="is_planned"
              className=""
              tooltip="If checked, the subscription will be created on the planned date"
              initialValue={true}
            />
            <label className=" text-gray-700 text-sm font-medium mt-1">
              {"Planned Date"}
            </label>
          </div>
        </div>
        <ProFormItem
          noStyle
          shouldUpdate={(prev, cur) => prev.is_planned !== cur.is_planned}
        >
          {(form) => {
            return form.getFieldValue("is_planned") === true ? (
              <>
                <SectionField label="Publish">
                  <ProFormDateTimePicker
                    name="planned_date"
                    rules={FORM_ITEM_RULE()}
                  />
                </SectionField>
              </>
            ) : (
              <></>
            );
          }}
        </ProFormItem>
      </SectionContainer>
    </>
  );
};
