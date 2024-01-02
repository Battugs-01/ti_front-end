import { useDebounceFn } from "ahooks";
import { FilterForm } from "components";
import { useAtom } from "jotai";
import { calculateDeadlineDate } from "utils/index";
import { atomUserForm } from "../store";

export const UserForm = () => {
  const [form, setForm] = useAtom(atomUserForm);
  const debounceSet = useDebounceFn((values) => setForm(values), {
    wait: 500,
  });

  return (
    <FilterForm
      initialValues={{
        ...form,
      }}
      hideFilter={true}
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
    />
  );
};
