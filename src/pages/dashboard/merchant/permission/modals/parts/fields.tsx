import { ProFormCheckbox } from "@ant-design/pro-form";
import { SectionContainer } from "components/index";

export const FormFields = () => {
  return (
    <>
      <SectionContainer
        label="Event & Tax"
        children={<ProFormCheckbox name={"is_event"} />}
      />
      <SectionContainer
        label="Product"
        children={<ProFormCheckbox name={"is_product"} />}
      />
      <SectionContainer
        label="Coupon"
        children={<ProFormCheckbox name={"is_coupon"} />}
      />
    </>
  );
};
