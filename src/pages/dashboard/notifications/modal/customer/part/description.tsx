import { ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import {
  SectionContainer,
  SectionField,
  UploadDraggerButton,
} from "components/index";
import { IProFormSelect } from "components/select";
import { FORM_ITEM_RULE } from "config";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";

export const FormDescriptionSection = () => {
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
              name="service_id"
              request={merchantService.list}
              placeholder={"Select Service"}
            />
          }
        />

        <SectionField label="Title*">
          <ProFormText
            name="title"
            placeholder="Enter Title"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}
          />
        </SectionField>
        <SectionField label="Description">
          <ProFormTextArea
            shouldUpdate
            name="description"
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
            rules={FORM_ITEM_RULE()}
          />
        </SectionField>
      </SectionContainer>
    </>
  );
};
