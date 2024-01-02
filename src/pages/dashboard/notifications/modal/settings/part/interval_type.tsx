import { ProFormDigit, ProFormItem, ProFormSelect } from "@ant-design/pro-form";
import { SectionContainer, SectionField } from "components/index";
import {
  PRODUCT_CATEGORY_ARRAY,
  SERVICE_CATEGORY_TYPES,
  WEEK_DAY_ARRAY,
} from "config";
import { NotificationSettingsType } from "service/notificationSettings/type";

export const FormIntervalTypeFields = () => {
  return (
    <ProFormItem noStyle shouldUpdate={(a, b) => a.type !== b.type}>
      {(form) => {
        return (
          form.getFieldValue("type") === NotificationSettingsType.interval && (
            <>
              <SectionContainer
                label="Choose"
                children={
                  <>
                    <SectionField
                      label="Service Categories"
                      children={
                        <ProFormSelect
                          name={"service_categories"}
                          mode="multiple"
                          options={SERVICE_CATEGORY_TYPES.map((el) => ({
                            ...el,
                          }))}
                        />
                      }
                    />
                    <SectionField
                      label="Product Categories"
                      children={
                        <ProFormSelect
                          name={"product_categories"}
                          mode="multiple"
                          options={PRODUCT_CATEGORY_ARRAY.map((el) => ({
                            ...el,
                          }))}
                        />
                      }
                    />
                  </>
                }
              />
              <SectionContainer
                label="Interval"
                children={
                  <>
                    <div className="flex items-center space-x-2">
                      <SectionField
                        label="Min"
                        children={<ProFormDigit name={"interval_min"} />}
                      />
                      <SectionField
                        label="Max"
                        children={<ProFormDigit name={"interval_max"} />}
                      />
                    </div>
                    <SectionField
                      label="Interval Days"
                      children={
                        <ProFormSelect
                          options={WEEK_DAY_ARRAY.map((el) => ({ ...el }))}
                          name={"week_day"}
                        />
                      }
                    />
                  </>
                }
              />
            </>
          )
        );
      }}
    </ProFormItem>
  );
};
