import { ProFormDigit, ProFormItem } from "@ant-design/pro-form";
import { SectionContainer, SectionField } from "components/index";
import { NotificationSettingsType } from "service/notificationSettings/type";

export const FormOrderTypeFields = () => {
  return (
    <ProFormItem noStyle shouldUpdate={(a, b) => a.type !== b.type}>
      {(form) => {
        return (
          form.getFieldValue("type") === NotificationSettingsType.order && (
            <SectionContainer label="Interval Time">
              <SectionField
                label="Interval Minute"
                children={<ProFormDigit name={"interval_minute"} />}
              />
            </SectionContainer>
          )
        );
      }}
    </ProFormItem>
  );
};
