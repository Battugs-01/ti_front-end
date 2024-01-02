import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
import merchantService from "service/merchantService";
import {
  MerchantService,
  ServiceStatusType,
} from "service/merchantService/type";
import { atomServiceForm } from "../store";

import { exportFromTable } from "utils/export";
import {
  ServiceBaseColumns,
  ServiceColumnPrice,
  ServiceColumnReview,
  ServiceColumnTimeTable,
  ServiceColumnTourisFriendly,
} from "../column";
import { DetailService } from "../modals/detail";
import { UpdateService } from "../modals/update";

export const VerifiedList = ({
  updateNumbers,
}: {
  updateNumbers: () => void;
}) => {
  const [form] = useAtom(atomServiceForm);

  const list = useRequest(merchantService.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  useEffect(() => {
    run();
  }, [form]);

  const run = (values?: any) => {
    list.run({
      ...form,
      status: ServiceStatusType.verified,
      created_at: form.full_date,
      ...values,
    });
  };

  return (
    <>
      <ITable<MerchantService>
        hideCreateButton
        dataSource={list.data?.items}
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Verified"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        loading={list.loading}
        total={list.data?.total}
        refresh={(values) => {
          run(values);
          updateNumbers();
        }}
        columns={[
          ...ServiceBaseColumns,
          ServiceColumnPrice,
          ServiceColumnReview,
          ServiceColumnTourisFriendly,
          ServiceColumnTimeTable,
        ]}
        DetailComponent={DetailService}
        UpdateComponent={UpdateService}
        DeActivateModelConfig={{
          action: merchantService.update,
          config: (record) => ({
            title: "Deactive",
            uniqueKey: record?.id ?? 0,
            display: record?.name,
            body: { ...record, is_active: false },
          }),
        }}
      />
    </>
  );
};
