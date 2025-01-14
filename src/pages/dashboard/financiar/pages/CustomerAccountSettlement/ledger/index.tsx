import { ProFormDateRangePicker } from "@ant-design/pro-form";
import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import ledger from "service/fininaciar/accountSettlement/ledger";
import { LedgerType } from "service/fininaciar/accountSettlement/ledger/type";
import { ledgerFilter, moneyFormat } from "utils/index";

const Ledger = () => {
  const [filter, setFilter] = useState(ledgerFilter);
  const [search, setSearch] = useState<string>("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    filter.start_date ? dayjs(filter.start_date) : dayjs().startOf("month"),
    filter.end_date ? dayjs(filter.end_date) : dayjs().endOf("month"),
  ]);

  const list = useRequest(ledger.list, {
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
          hideCreate
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
          searchPlaceHolder="Үлдэгдэл, Дебит , Кредит"
          search={search}
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          refresh={() => list.run({ ...filter, search: search })}
        />
      </div>

      <ITable<LedgerType>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        form={filter}
        setForm={setFilter}
        columns={[
          {
            dataIndex: "initial_balance",
            title: "Товчлол",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.customer_company?.shortcut_name || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "initial_balance",
            title: "Харилцагчийн нэр ",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.customer_company?.name || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "initial_balance",
            title: "Данс",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.name || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "is_broker",
            title: "Эхний үлдэгдэл",
            width: "200",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {moneyFormat(record?.initial_balance) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "ledger_id",
            title: "Дебит",
            width: "200",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {moneyFormat(record?.debit) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "contact_number",
            title: "Кредит",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.credit) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "contact_number",
            title: "Эцсийн үлдэгдэл",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.balance) || "-"}
              </span>
            ),
          },
        ]}
      />
    </PageCard>
  );
};

export default Ledger;
