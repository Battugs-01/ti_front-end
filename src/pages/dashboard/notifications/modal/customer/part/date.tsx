import {
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormItem,
} from "@ant-design/pro-form";
import { SectionContainer, SectionField } from "components/index";

export const FormDateSection = () => {
  return (
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
                <ProFormDateTimePicker name="planned_date" />
              </SectionField>
            </>
          ) : (
            <></>
          );
        }}
      </ProFormItem>
    </SectionContainer>
  );
};
