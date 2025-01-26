import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import transaction from "service/fininaciar/accountSettlement/transaction";
import { moneyFormat, transictionFilter } from "utils/index";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";
import { PaymentMethod } from "utils/options";

const Transaction = () => {
  const [filter, setFilter] = useState(transictionFilter);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState<boolean>(false);

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
              {/* <div className="text-lg font-semibold text-gray-700">
                Нийт ({list?.data?.total})
              </div> */}
              <DatePicker.RangePicker
                className="w-max"
                placeholder={["Эхлэх огноо", "Дуусах огноо"]}
                onChange={(values) => {
                  setFilter({
                    ...filter,
                    start_date:
                      dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD") ?? "",
                    end_date:
                      dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD") ?? "",
                  });
                }}
                defaultValue={[
                  filter.start_date
                    ? dayjs(filter.start_date)
                    : dayjs().subtract(3, "month"),
                  filter.end_date ? dayjs(filter.end_date) : dayjs(),
                ]}
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
          fileName="Харилцагчийн дансны гүйлгээний жагсаалт"
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
            dataIndex: "payment_type",
            title: "Төлөлтийн хэлбэр",
            width: "200",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {PaymentMethod.find((item) => item.value === value)?.label ||
                  "-"}
              </span>
            ),
          },
          {
            dataIndex: "transaction_type",
            title: "Гүйлгээний төрөл",
            width: "200",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {value || "-"}
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
