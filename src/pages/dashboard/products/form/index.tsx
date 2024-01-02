import { useDebounceFn } from "ahooks";
import { FilterForm } from "components";
import { IProFormSelect } from "components/select";
import { SERVICE_STATUS_ARRAY } from "config";
import { useAtom } from "jotai";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";
import { calculateDeadlineDate } from "utils/index";
import { atomProductForm } from "../store";

export const ProductForm = () => {
  const [form, setForm] = useAtom(atomProductForm);
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

        if ((curr.service_ids?.length || 0) === 0) {
          curr.service_ids = undefined;
        }

        if (!curr.operation_types) curr.operation_types = undefined;
        if (curr.search || !curr.search) debounceSet.run({ ...form, ...curr });
        else setForm({ ...form, ...curr });
      }}
      filters={
        <>
          <IProFormSelect
            fieldProps={{
              mode: "multiple",
            }}
            request={merchantService.list}
            fieldNameForLabel="name"
            name={"service_ids"}
            width={200}
            placeholder={"Select Merchant"}
            filter={SERVICE_STATUS_ARRAY.filter(
              (el) => el.value !== ServiceStatusType.initial
            ).map((e) => e.value)}
          />
        </>
      }
    />
  );
};
