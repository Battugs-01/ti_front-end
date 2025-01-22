import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import addinitionalFeeSettings from "service/fininaciar/additionalFeeSettings";
import { initPagination, moneyFormat } from "utils/index";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";

const AdditionalFeeSettings = () => {
  const [filter, setFilter] = useState(initPagination);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const list = useRequest(addinitionalFeeSettings.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      ...filter,
      search: search,
    });
  };

  useEffect(() => {
    run();
  }, [filter]);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });

  return (
    <PageCard xR>
      <div className="px-2 pb-0">
        <InitTableHeader
          addButtonName="Нэмэх"
          customHeaderTitle="Нэмэлт хураамжийн тохиргоо"
          searchPlaceHolder="Дүн, ангилал код"
          setCreate={setCreate}
          search={search}
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          refresh={() => list.run({ ...filter, search: search })}
        />
      </div>

      <ITable<any>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        UpdateComponent={UpdateService}
        form={filter}
        setForm={setFilter}
        columns={[
          {
            dataIndex: "category_code",
            title: "Ангилал код",
            align: "left",
            render: (value) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "fee_code",
            title: "Хураамжийн код",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "fee_name",
            title: "Хураамжийн нэр",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "unit_measurement",
            title: "Хэмжих нэгж",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "fee_amount",
            title: "Хураамжийн дүн",
            align: "center",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(value as any) || "-"}
              </span>
            ),
          },
        ]}
        CreateComponent={CreateService}
        create={create as boolean}
        setCreate={setCreate}
        RemoveModelConfig={{
          action: addinitionalFeeSettings.deleteA,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.name,
            title: "Remove",
          }),
        }}
      />
    </PageCard>
  );
};

export default AdditionalFeeSettings;
