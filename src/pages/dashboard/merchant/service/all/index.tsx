import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
import merchantService from "service/merchantService";
import { MerchantService } from "service/merchantService/type";
import { exportFromTable } from "utils/export";
import {
  ServiceBaseColumns,
  ServiceColumnPrice,
  ServiceColumnSpecialty,
  ServiceColumnTimeTable,
  ServiceColumnTourisFriendly,
} from "../column";
import { DetailService } from "../modals/detail";
import { UpdateService } from "../modals/update";
import { atomServiceForm } from "../store";

export const AllList = ({ updateNumbers }: { updateNumbers: () => void }) => {
  const [form] = useAtom(atomServiceForm);

  const list = useRequest(merchantService.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = (values?: any) => {
    list.run({
      ...form,
      created_at: form.full_date,
      ...values,
    });
  };

  const debounceRun = useDebounceFn(() => run(), {
    wait: 500,
  });

  useEffect(() => {
    debounceRun.run();
  }, [form]);

  return (
    <>
      <ITable<MerchantService>
        hideCreateButton
        dataSource={list.data?.items}
        loading={list.loading}
        total={list.data?.total}
        refresh={(values) => {
          run(values);
          updateNumbers();
        }}
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["All Merchants"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        columns={[
          ...ServiceBaseColumns,
          ServiceColumnSpecialty,
          ServiceColumnPrice,
          ServiceColumnTourisFriendly,
          ServiceColumnTimeTable,
        ]}
        UpdateComponent={UpdateService}
        DetailComponent={DetailService}
        RemoveModelConfig={{
          action: merchantService.remove,
          config: (record) => {
            return {
              uniqueKey: record?.id ?? 0,
              display: record?.name,
              title: "Remove",
            };
          },
        }}
      />
    </>
  );
};
