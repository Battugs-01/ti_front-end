import { FilterForm } from "components/index";
import { atomDashboardForm } from "../store";
import { useAtom } from "jotai";

export const Form = () => {
  const [form, setForm] = useAtom(atomDashboardForm);

  return (
    <FilterForm
      filters={undefined}
      hideFilter
      hideDatePicker
      hideSearch
      initialValues={{
        ...form,
      }}
      onValuesChange={(curr) => {
        setForm({
          ...form,
          ...curr,
        });
      }}
    />
  );
};
