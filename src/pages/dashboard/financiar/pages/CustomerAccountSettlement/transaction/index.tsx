import { ProFormDateRangePicker } from "@ant-design/pro-form";
import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import transaction from "service/fininaciar/accountSettlement/transaction";
import { moneyFormat, transictionFilter } from "utils/index";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";

const Transaction = () => {
  const [filter, setFilter] = useState(transictionFilter);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState<boolean>(false);

  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    filter.start_date ? dayjs(filter.start_date) : dayjs().startOf("month"),
    filter.end_date ? dayjs(filter.end_date) : dayjs().endOf("month"),
  ]);

  const list = useRequest(transaction.list, {
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
            <div className="flex gap-3 items-end">
              <div className="text-lg font-semibold text-gray-700">
                Нийт ({list?.data?.total})
              </div>
              <ProFormDateRangePicker
                name="full_date"
                className="text-gray-700 cursor-pointer mt-6"
                allowClear={false}
                fieldProps={{
                  suffixIcon: <FiCalendar className="text-gray-700 text-xl" />,
                  value: dateRange,
                  onChange(value, formatString) {
                    if (formatString.length === 2) {
                      setFilter({
                        ...filter,
                        start_date: value?.[0]?.toDate() ?? new Date(),
                        end_date: value?.[1]?.toDate() ?? new Date(),
                      });
                    }
                  },
                }}
              />
            </div>
          }
          setCreate={setCreate}
          searchPlaceHolder="Үнэ"
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
        dataSource={list.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        form={filter}
        UpdateComponent={UpdateService}
        setForm={setFilter}
        columns={[
          {
            dataIndex: "created_at",
            title: "Огноо",
            align: "left",
            render: (value: any) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {dayjs(value).format("YYYY-MM-DD") || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "ledger",
            title: "Данс",
            align: "left",
            render: (value: any) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {value?.name || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "cash",
            title: "Бэлэн",
            width: "200",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {moneyFormat(value) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "non_cash",
            title: "Бэлэн бус",
            width: "200",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {moneyFormat(value) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "barimt",
            title: "Баримт",
            align: "center",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(value) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "payer",
            title: "Төлөгч",
            align: "center",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
        ]}
        CreateComponent={CreateService}
        create={create as boolean}
        setCreate={setCreate}
        // RemoveModelConfig={{
        //   action: transaction.deleteA,
        //   config: (record) => ({
        //     uniqueKey: record?.id,
        //     display: record?.name,
        //     title: "Remove",
        //   }),
        // }}
      />
    </PageCard>
  );
};

export default Transaction;
