import { ProFormText } from "@ant-design/pro-form";
import { SectionContainer, SectionField } from "components/index";
import { FORM_ITEM_RULE } from "config";

export const Contact = () => {
  return (
    <SectionContainer label="Contacts*">
      <SectionField
        label="Website"
        children={<ProFormText name={"website"} />}
      />
      <SectionField
        label="Phone"
        children={
          <ProFormText
            name={"phone"}
            rules={FORM_ITEM_RULE({
              validtor: (value: any) => {
                return Promise.resolve(value);
              },
            })}
          />
        }
      />
      <SectionField label="Email" children={<ProFormText name={"email"} />} />
    </SectionContainer>
  );
};
