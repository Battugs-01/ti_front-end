import { ProFormDatePicker, ProFormSelect } from "@ant-design/pro-form";
import { useDebounceFn } from "ahooks";
import { FilterForm } from "components/index";
import { IProFormSelect } from "components/select";
import { MONTHS } from "config";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";
import { atomStatementStore } from "./store";

export const Form = () => {
  const [form, setForm] = useAtom(atomStatementStore);
  const debounceSet = useDebounceFn((values) => setForm(values), {
    wait: 500,
  });

  return (
    <FilterForm
      customHeadFilters={
        <div className="flex gap-2">
          <ProFormDatePicker.Year
            name={"year"}
            placeholder={"Year"}
            allowClear={false}
            fieldProps={{
              size: "large"
            }}
          />
          <ProFormSelect
            name={"month"}
            placeholder={"Month"}
            allowClear={false}
            fieldProps={{
              size: "large"
            }}
            options={MONTHS.map((el, index) => ({
              value: index + 1,
              label: el,
            }))}
          />
        </div>
      }
      showGroupButton={false}
      initialValues={{
        ...form,
        year: form.year ? dayjs().set("year", form.year) : undefined,
      }}
      onValuesChange={(curr) => {
        if (curr.full_date) {
          curr.year = undefined;
          curr.month = undefined;
        }
        if (curr.year || curr.month) {
          curr.full_date = undefined;
        }
        if (curr.status) {
          curr.is_active = curr.status == "active" ? "1" : "0";
        }
        if (curr.year) curr.year = parseInt(curr.year);
        if (curr.search || !curr.search) debounceSet.run({ ...form, ...curr });
        else setForm({ ...form, ...curr });
      }}
      filters={
        <>
          <IProFormSelect
            request={merchantService.list}
            filter={{
              status: ServiceStatusType.sponsored,
            }}
            name={"ids"}
            mode="multiple"
            placeholder={"Select Name"}
          />
          <ProFormSelect
            name={"status"}
            placeholder={"Status"}
            options={[
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Inactive",
                value: "inactive",
              },
            ]}
          />
        </>
      }
    />
  );
};
