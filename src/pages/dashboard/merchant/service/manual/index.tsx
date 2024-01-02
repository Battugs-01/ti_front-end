import { useRequest } from "ahooks";
import { notification } from "antd";
import { ITable } from "components/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
import merchantService from "service/merchantService";
import {
  MerchantService,
  ServiceStatusType,
} from "service/merchantService/type";
import { CreateService } from "../modals/create";
import { DetailService } from "../modals/detail";
import { UpdateService } from "../modals/update";
import { atomServiceForm } from "../store";
import { Toolbar } from "./toolbar";

import {
  ServiceBaseColumns,
  ServiceColumnPrice,
  ServiceColumnSpecialty,
  ServiceColumnTourisFriendly,
} from "../column";

export const ManualList = ({
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
      status: ServiceStatusType.manual,
      created_at: form.full_date,
      ...values,
    });
  };

  return (
    <>
      <ITable<MerchantService>
        toolbarItems={<Toolbar run={run} />}
        dataSource={list.data?.items}
        loading={list.loading}
        total={list.data?.total}
        refresh={(values) => {
          run(values);
          updateNumbers();
        }}
        columns={[
          ...ServiceBaseColumns,
          ServiceColumnSpecialty,
          ServiceColumnPrice,
          ServiceColumnTourisFriendly,
        ]}
        CreateComponent={CreateService}
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
