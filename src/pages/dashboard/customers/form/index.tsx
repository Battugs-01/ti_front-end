import { FilterForm } from "components/index";
import { useAtom } from "jotai";
import { atomCustomerForm } from "../store";
import { calculateDeadlineDate } from "utils/index";
import { useDebounceFn } from "ahooks";
import { ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { GENDERS } from "utils/constants";

export const CustomerForm = () => {
  const [form, setForm] = useAtom(atomCustomerForm);
  const debounceSet = useDebounceFn((values) => setForm(values), {
    wait: 500,
  });

  return (
    <FilterForm
      initialValues={{
        ...form,
      }}
      onValuesChange={(curr) => {
        if (curr.full_date) {
          curr.deadline = undefined;
        }
        if (curr.deadline >= 0) {
          curr.full_date = calculateDeadlineDate(curr.deadline)?.map((el) =>
            el.format("YYYY/MM/DD")
          );
        }
        if (curr.search || !curr.search) debounceSet.run({ ...form, ...curr });
        else setForm({ ...form, ...curr });
      }}
      filters={
        <>
          <ProFormText name={"first_name"} placeholder={"Enter name"} />
          <ProFormText name={"phone"} placeholder={"Enter Phone number"} />
          <ProFormText name={"email"} placeholder={"Enter Email"} />
          <ProFormSelect
            name={"gender"}
            options={GENDERS}
            placeholder="Select Gender"
            fieldProps={{
              allowClear: true,
            }}
            allowClear
          />
          <ProFormText name={"current_city"} placeholder={"City"} />
          <ProFormDigit name={"income_price"} placeholder={"Amount"} />
        </>
      }
    />
  );
};
