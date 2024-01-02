import {
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { SectionContainer, SectionField } from "components/index";
import { NotificationSettingsType } from "service/notificationSettings/type";

export const FormGeneralFields = () => {
  return (
    <SectionContainer
      label={"General"}
      children={
        <>
          <SectionField
            label="Title"
            children={<ProFormText name={"title"} />}
          />
          <SectionField
            label="Description"
            children={<ProFormTextArea name={"description"} />}
          />
          <SectionField
            label="Type"
            children={
              <ProFormSelect
                name={"type"}
                options={[
                  {
                    label: "When Order",
                    value: NotificationSettingsType.order,
                  },
                  {
                    label: "Interval",
                    value: NotificationSettingsType.interval,
                  },
                ]}
              />
            }
          />
          <SectionField
            label="Active"
            children={<ProFormCheckbox name={"is_active"} />}
          />
        </>
      }
    />
  );
};
