import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification, Table, Typography } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import ledger from "service/fininaciar/accountSettlement/ledger";
import { LedgerType } from "service/fininaciar/accountSettlement/ledger/type";
import { ledgerFilter, moneyFormat } from "utils/index";
import LedgerRemove from "./remove";

const Ledger = () => {
  const [filter, setFilter] = useState(ledgerFilter);
  const [search, setSearch] = useState<string>("");
  const [user] = useContext(AuthContext);
  const { Text } = Typography;
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
              <DatePicker.RangePicker
                className="w-max"
                placeholder={["Эхлэх огноо", "Дуусах огноо"]}
                onChange={(values) => {
                  setFilter({
                    ...filter,
                    between: [
                      dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD") ?? "",
                      dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD") ?? "",
                    ],
                  });
                }}
                defaultValue={[
                  filter.between[0]
                    ? dayjs(filter.between[0])
                    : dayjs().subtract(3, "month"),
                  filter.between[1] ? dayjs(filter.between[1]) : dayjs(),
                ]}
              />
            </div>
          }
          fileName="Харилцагчийн дансны жагсаалт"
          searchPlaceHolder="Данс, Нэр , Үлдэгдэл"
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
        RemoveComponent={LedgerRemove}
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
            dataIndex: "customer_company.name",
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
            dataIndex: "name",
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
            dataIndex: "today_balance",
            title: "Эхний үлдэгдэл",
            width: "200",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal flex justify-center">
                {moneyFormat(record?.init_day_balance) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "today_debit_sum",
            title: "Орлого",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.debit_sum) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "today_credit_sum",
            title: "Зарлага",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.credit_sum) || "-"}
              </span>
            ),
          },
          {
            title: "Эцсийн үлдэгдэл",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.last_day_balance) || "-"}
              </span>
            ),
          },
        ]}
        summary={() => (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text>Нийт</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <Text></Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <Text></Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text type="danger" className="font-bold text-right">
                    {moneyFormat(list?.data?.meta?.init_day_balance_sum || 0)}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} className="text-center">
                  <Text type="danger" className="font-bold  text-right ">
                    {moneyFormat(list?.data?.meta?.total_debit_sum || 0)}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6} className="text-center">
                  <Text type="danger" className="font-bold  text-right"> {moneyFormat(list?.data?.meta?.total_credit_sum || 0)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7} className="text-center">
                  <Text type="danger" className="font-bold">
                    {moneyFormat(list?.data?.meta?.last_day_balance_sum || 0)}
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
        )}
      />
    </PageCard>
  );
};

export default Ledger;
