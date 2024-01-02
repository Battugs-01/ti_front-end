import { ProFormSelect } from "@ant-design/pro-form";
import { useDebounceFn } from "ahooks";
import { FilterForm } from "components";
import { SERVICE_OPERATION_TYPES } from "config";
import { useAtom } from "jotai";
import { calculateDeadlineDate } from "utils/index";
import { atomServiceForm } from "../store";

export const ServiceForm = ({
  onMapClick,
  isMapShowing,
}: {
  onMapClick: () => void;
  isMapShowing: boolean;
}) => {
  const [form, setForm] = useAtom(atomServiceForm);
  const debounceSet = useDebounceFn((values) => setForm(values), {
    wait: 500,
  });

  return (
    <FilterForm
      isMapShowing={isMapShowing}
      onMapClick={onMapClick}
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
        if (!curr.is_tourist_friendly) curr.is_tourist_friendly = undefined;
        if (!curr.operation_types) curr.operation_types = undefined;
        if (curr.search || !curr.search) debounceSet.run({ ...form, ...curr });
        else setForm({ ...form, ...curr });
      }}
      filters={
        <>
          <ProFormSelect
            name={"operation_types"}
            mode="multiple"
            placeholder={"Operation Type"}
            options={SERVICE_OPERATION_TYPES.map((el) => ({ ...el }))}
          />
          <ProFormSelect
            name={"is_tourist_friendly"}
            placeholder={"Tourist friendly"}
            options={[
              {
                label: "Yes",
                value: "1",
              },
              {
                label: "No",
                value: "0",
              },
            ]}
          />
        </>
      }
      showMap
    />
  );
};
