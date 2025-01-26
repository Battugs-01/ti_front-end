import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import { Label } from "components/label";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import addinitionalFeeSettings from "service/fininaciar/additionalFeeSettings";
import { initPagination } from "utils/index";

const CancellingTicket = () => {
  const [filter, setFilter] = useState(initPagination);
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
          hideTitle
          leftContent={
            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold text-gray-700">
                <Label title={`Нийт (${list?.data?.total || 0})`} />
              </div>
            </div>
          }
          searchPlaceHolder="Дүн, ангилал код"
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
        form={filter}
        setForm={setFilter}
        columns={[
          {
            title: "ЭХ тасалбарын №",
            dataIndex: "id",
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
            title: "Код",
            dataIndex: "code",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            title: "Хураамжийн нэр",
            dataIndex: "fee_name",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {value || "-"}
              </span>
            ),
          },
          {
            title: "Ангилал",
            dataIndex: "category",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            title: "Хүсэлт явуулсан кассир",
            dataIndex: "request_cassir",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            title: "Төлөв",
            dataIndex: "status",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            title: "Он сар өдөр",
            dataIndex: "created_at",
            width: "200",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {dayjs(value).format("YYYY-MM-DD")}
              </span>
            ),
          },
        ]}
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

export default CancellingTicket;
