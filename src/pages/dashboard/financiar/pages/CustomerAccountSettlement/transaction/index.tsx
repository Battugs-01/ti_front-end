import { ProFormSelect } from "@ant-design/pro-form";
import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification, Table, Typography } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { transictionTypeEnum, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import transaction from "service/fininaciar/accountSettlement/transaction";
import { moneyFormat, transictionFilter } from "utils/index";
import { PaymentMethod } from "utils/options";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";
import Remove from "./actions/remove";
import TransactionRemove from "./actions/remove";

const Transaction = () => {
  const [filter, setFilter] = useState(transictionFilter);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState<boolean>(false);
  const [user] = useContext(AuthContext);
  const list = useRequest(transaction.customerPaymentlist, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });


  const { Text } = Typography;
  
  const run = () => {
    list.run({
      ...filter,
      search: search,
      created_by: user?.user?.id,
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
          filter={
            <div className="flex gap-2">
            <ProFormSelect
              placeholder={"Сонгох"}
              fieldProps={{
                size: "large",
                allowClear: true,
                className: "select-focus",
                style: { width: 200 },
                onChange: (e: any) => {
                  setFilter({ ...filter, transaction_type: e ? e : undefined });
                },
              }}
              options={[
                {
                  label: "Бүх",
                  value: "",
                },
                {
                  label: "Орлого",
                  value: transictionTypeEnum.debit,
                },
                {
                  label: "Зарлага",
                  value: transictionTypeEnum.credit,
                },
              ]}
            />
            <ProFormSelect
              name="is_have_debit"
              fieldProps={{
                size: "large",
                allowClear: true,
                className: "select-focus",
                style: { width: 200 },
                onChange: (e: any) => {
                  setFilter({ ...filter, is_have_debit: e ? e : undefined });
                },
              }}
              options={[
                { label: "Э/Х тасалбартай", value: true },
                { label: "Э/Х тасалбаргүй", value: false },
              ]}
            />
            </div>
          }
          setCreate={setCreate}
          searchPlaceHolder="Данс , Харилцагчийн нэр , Мөнгөн дүн"
          search={search}
          setSearch={(e: any) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e ? e : undefined });
          }}
          fileName="Харилцагчийн дансны гүйлгээний жагсаалт"
          refresh={() => list.run({ ...filter, search: search ? search : undefined })}
          hideCreate={user?.user?.role_name !== UserRoleType.financier}
        />
      </div>

      <ITable<any>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list.data?.items ?? []}
        refresh={(values) =>
          list.run({ ...filter, created_by: user?.user?.id, ...values })
        }
        form={filter}
        RemoveComponent={user?.user?.role_name === UserRoleType.financier ? TransactionRemove : undefined}
        UpdateComponent={
          user?.user?.role_name === UserRoleType.financier
            ? UpdateService
            : undefined
        }
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
            dataIndex: "initial_balance",
            title: "Харилцагчийн нэр ",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.ledger?.customer_company?.name || "-"}
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
            title: "Э/Х Тасалбар",
            align: "left",
            render: (value: any) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {value?.debit?.ticket?.ticket_number || "-"}
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
                {value === transictionTypeEnum.debit ? "Орлого" : "Зарлага"}
              </span>
            ),
          },
          {
            title: "Мөнгөн дүн",
            dataIndex: "amount",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(value) || "-"}
              </span>
            ),
          },
          {
            title: "Дансны үлдэгдэл",
            dataIndex: "amount",
            render: (_: any, record: any) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.ledger_amount) || "-"}
              </span>
            ),
          }
        ]}
        summary={(pageData) => {
          let totalTransactionBalance = 0;
          let totalLedgerBalance = 0;
          pageData.forEach((item: any) => {
            totalTransactionBalance += item.amount;
            totalLedgerBalance += item.ledger_amount;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text>Нийт</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}/>
              <Table.Summary.Cell index={3}/>
              <Table.Summary.Cell index={4}/>
              <Table.Summary.Cell index={5}/>
              <Table.Summary.Cell index={6}/>
              <Table.Summary.Cell index={7}>
                <Text type="danger" className="font-bold">
                  {moneyFormat(totalTransactionBalance || 0)}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={8}>
                <Text type="danger" className="font-bold">
                  {moneyFormat(totalLedgerBalance || 0)}
                </Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
        CreateComponent={CreateService}
        create={create as boolean}
        setCreate={setCreate}
      />
    </PageCard>
  );
};

export default Transaction;
