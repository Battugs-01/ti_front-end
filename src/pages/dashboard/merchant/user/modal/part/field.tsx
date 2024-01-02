import { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Space } from "antd";
import { SectionContainer, SectionField } from "components/index";
import { IProFormSelect } from "components/select";
import { FORM_ITEM_RULE } from "config";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";

export const FormFields = () => {
  return (
    <>
      <SectionContainer
        label="Info"
        children={
          <>
            <SectionField
              label="Full Name"
              children={
                <ProFormText name={"full_name"} rules={FORM_ITEM_RULE()} />
              }
            />
            <SectionField
              label="Email"
              children={<ProFormText name={"email"} rules={FORM_ITEM_RULE()} />}
            />
            <Space.Compact>
              <SectionField
                label="Locale"
                children={
                  <ProFormSelect
                    name={"phone_locale"}
                    rules={FORM_ITEM_RULE()}
                    fieldProps={{}}
                    options={[{ label: "+976", value: "+976" }]}
                  />
                }
              />
              <SectionField
                label="Phone"
                children={
                  <ProFormText name={"phone"} rules={FORM_ITEM_RULE()} />
                }
              />
            </Space.Compact>
            <SectionField
              label="Password"
              children={<ProFormText name={"password"} />}
            />
          </>
        }
      />
      <SectionContainer
        label="Service"
        children={
          <SectionField
            label="Service"
            children={
              <IProFormSelect
                filter={{
                  statuses: [
                    ServiceStatusType.sponsored,
                    ServiceStatusType.verified,
                  ],
                }}
                request={merchantService.list}
                name={"service_id"}
                rules={FORM_ITEM_RULE()}
              />
            }
          />
        }
      />
    </>
  );
};
