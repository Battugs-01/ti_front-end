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
import { CustomerCompanyType } from "service/fininaciar/additionalFeeSettings/type";
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
            <div className="flex gap-2">
              <ProFormDateRangePicker
                name="full_date"
                className="text-gray-700 cursor-pointer m-0  ant-layot-picker"
                allowClear={false}
                fieldProps={{
                  size: "large",
                  className: "text-sm m-0",
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

      <ITable<CustomerCompanyType>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        form={filter}
        UpdateComponent={UpdateService}
        setForm={setFilter}
        columns={[
          {
            dataIndex: "Огноо",
            title: "Огноо",
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
            dataIndex: "Данс",
            title: "Данс",
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
            dataIndex: "is_broker",
            title: "Бэлэн",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {moneyFormat(record?.initial_balance) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "ledger_id",
            title: "Бэлэн бус",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {moneyFormat(record?.initial_balance) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "contact_number",
            title: "Баримт",
            align: "center",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.initial_balance) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "contact_number",
            title: "Төлөгч",
            align: "center",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.initial_balance) || "-"}
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
