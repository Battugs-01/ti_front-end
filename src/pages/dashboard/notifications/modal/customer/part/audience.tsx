import {
  FormInstance,
  ProFormCheckbox,
  ProFormDateRangePicker,
  ProFormItem,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
} from "@ant-design/pro-form";
import { SectionContainer, SectionField } from "components/index";
import { PRODUCT_CATEGORY_ARRAY } from "config";
import { GENDERS_CONFIG } from "utils/constants";
import { moneyFormat } from "utils/index";

type Props = {
  formRef: FormInstance<any>;
};
export const FormAudienceSection = ({ formRef }: Props) => {
  return (
    <SectionContainer label="Audience">
      <SectionField label="Gender">
        <ProFormRadio.Group
          name={"gender"}
          radioType="button"
          options={GENDERS_CONFIG.map((item) => ({
            label: item.label,
            value: item.key,
          }))}
          fieldProps={{
            className: "text-md font-semibold",
          }}
        />
      </SectionField>
      <SectionField label="Nationality">
        <ProFormRadio.Group
          name={"nation"}
          radioType="button"
          options={[
            {
              label: "All",
              value: "all",
            },
            {
              label: "Mongolian",
              value: "mongolian",
            },
            {
              label: "Foreigner",
              value: "foreigner",
            },
          ]}
          fieldProps={{
            className: "text-md font-semibold",
          }}
        />
      </SectionField>

      <div>
        <div className="mb-2 flex gap-2">
          <ProFormCheckbox
            name="is_registered"
            className=""
            tooltip="If checked, the subscription will be created on the planned date"
            initialValue={false}
          />
          <label className=" text-gray-700 text-sm font-medium mt-1">
            {"Registered Date"}
          </label>
        </div>
      </div>
      <ProFormItem
        noStyle
        shouldUpdate={(prev, cur) => prev.is_registered !== cur.is_registered}
      >
        {(form) => {
          return form.getFieldValue("is_registered") === true ? (
            <>
              <SectionField label="">
                <ProFormDateRangePicker
                  name="registered_date"
                  fieldProps={{
                    className: "w-full",
                  }}
                />
              </SectionField>
            </>
          ) : (
            <></>
          );
        }}
      </ProFormItem>

      <SectionField label="Age">
        <div>
          <p className="text-semibold text-gray-700">
            {formRef?.getFieldValue("age")?.[0]} -{" "}
            {formRef?.getFieldValue("age")?.[1]}
          </p>
          <ProFormSlider
            fieldProps={{
              trackStyle: { backgroundColor: "#144E5A" },
              railStyle: { background: "#EAECF0" },
              handleStyle: { backgroundColor: "#144E5A" },
            }}
            name="age"
            range
            style={{
              marginBottom: "-10px",
            }}
            min={0}
            max={100}
          />
        </div>
      </SectionField>

      <SectionField label="Sales data">
        <div className="flex gap-2">
          <SectionField label="Min">
            <ProFormMoney
              name="sales_min"
              placeholder="₮0.00"
              customSymbol="₮"
            />
          </SectionField>
          <SectionField label="Max">
            <ProFormMoney
              name="sales_max"
              placeholder={`₮${moneyFormat(
                formRef?.getFieldValue("sales_min")
              )}`}
              customSymbol="₮"
              min={formRef?.getFieldValue("sales_min")}
            />
          </SectionField>
        </div>
      </SectionField>

      <SectionField
        label="To online customers"
        children={
          <div className="flex items-start gap-2">
            <ProFormCheckbox name={"is_online_customer"} />
            <div className=" text-gray-700 text-sm font-medium mt-1 ">
              It will send to only online customers
            </div>
          </div>
        }
      />
      <SectionField label="Phone" children={<ProFormText name={"phone"} />} />
      <SectionField
        label="Categories"
        children={
          <ProFormSelect
            name={"categories"}
            options={PRODUCT_CATEGORY_ARRAY.map((el) => ({ ...el }))}
            mode="multiple"
          />
        }
      />
    </SectionContainer>
  );
};
