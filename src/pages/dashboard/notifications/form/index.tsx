import { FilterForm } from "components/index";
import { useAtom } from "jotai";
import { atomNotificationForm } from "../store";
import { calculateDeadlineDate } from "utils/index";
import { IProFormSelect } from "components/select";
import notifications from "service/notifications";
import merchantService from "service/merchantService";
import { SERVICE_STATUS_ARRAY } from "config";
import { ServiceStatusType } from "service/merchantService/type";
import { ProFormSelect } from "@ant-design/pro-form";
import { useDebounceFn } from "ahooks";

export const NotificationForm = () => {
  const [form, setForm] = useAtom(atomNotificationForm);

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
          <IProFormSelect
            fieldNameForLabel="title"
            request={notifications.list}
            placeholder={"Title"}
            mode="multiple"
            name={"notification_ids"}
          />
          <IProFormSelect
            mode="multiple"
            fieldNameForLabel="name"
            request={merchantService.list}
            name={"service_ids"}
            placeholder={"Select Service"}
            filter={SERVICE_STATUS_ARRAY.filter(
              (el) => el.value !== ServiceStatusType.initial
            ).map((e) => e.value)}
          />

          <ProFormSelect
            name={"is_published"}
            placeholder={"Status"}
            options={[
              {
                label: "Sent",
                value: "1",
              },
              {
                label: "Planned",
                value: "0",
              },
            ]}
          />
        </>
      }
    />
  );
};
