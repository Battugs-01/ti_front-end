import { RightOutlined } from "@ant-design/icons";
import { ProFormRadio } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Card, notification } from "antd";
import { RenderBank } from "components/index";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dashboard from "service/dashboard";
import { moneyFormat, tableCellFixed } from "utils/index";
import { atomFormDashboard } from "../store";
import CustomerLine from "components/customer_line";
import ArrowIcon from "assets/icons/arrow-right.svg";
const buttons = [
  {
    label: "Income",
    value: "income",
  },
  {
    label: "Expense",
    value: "expense",
  },
];

const LatestTransactions: FC = () => {
  const [tab, setTab] = useState<"income" | "expense">("income");
  const api = useRequest(dashboard.transactionLatest, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const [form] = useAtom(atomFormDashboard);

  const fetch = (values?: any) => {
    api.run({
      ...form,
      ...values,
      created_at: form.full_date,
      is_transfered: tab === "income" ? "0" : "1",
    });
  };

  useEffect(() => {
    fetch();
  }, [form, tab]);

  return (
    <>
      <>
        <Card
          className="h-full"
          title={
            <div className="flex justify-between">
              <span className="text-lg font-semibold">
                Сүүлийн шилжилт хөдөлгөөн
              </span>
              <div className="flex">
                <span className="text-lg font-semibold mr-2">Бүгд</span>
                <img src={ArrowIcon} />
              </div>
            </div>
          }
        >
          <CustomerLine
            name="Баттөгс"
            img="BA"
            status="cancelled"
            date="12/31/2023"
          />
          <CustomerLine
            name="Хайр"
            img="XA"
            status="inprogress"
            date="12/31/2023"
          />
        </Card>
      </>
    </>
    // <div>
    //   {tab === "income" ? (
    //     <ITable<any>
    //       noShadow
    //       hideCreateButton
    //       loading={api.loading}
    //       dataSource={api.data?.items || []}
    //       refresh={(values) => fetch({ ...values, ...form })}
    //       pagination={{
    //         pageSize: 6,
    //       }}
    //       toolbarItems={
    //         <Link to={"/dashboard/statement"} style={{ color: "#4F46E5" }}>
    //           <span>See All Transactions</span>
    //           <RightOutlined />
    //         </Link>
    //       }
    //       customHeaderTitle={
    //         <ProFormRadio.Group
    //           noStyle
    //           name={"deadline"}
    //           radioType="button"
    //           options={buttons?.map((el) => ({ ...el }))}
    //           fieldProps={{
    //             style: {
    //               marginBottom: "0 !important",
    //             },
    //             className: "text-md font-semibold ",
    //             value: tab,
    //             onChange: (e) => {
    //               setTab(e.target.value);
    //             },
    //           }}
    //         />
    //       }
    //       columns={[
    //         {
    //           ...tableCellFixed(230),
    //           dataIndex: "name",
    //           title: "Product/Service",
    //           render: (_, record) => (
    //             <div className="flex flex-col">
    //               <span className="text-md text-gray-600 font-medium">
    //                 {record.name}
    //               </span>
    //               <span className="text-sm">
    //                 {dayjs(record.start_date).format("MMM d, HH:MM")} -{" "}
    //                 {dayjs(record.end_date).format("MMM d, HH:MM")}
    //               </span>
    //             </div>
    //           ),
    //         },
    //         {
    //           dataIndex: "total_purchase_amount",
    //           title: "Amount",
    //           render: (_, record) =>
    //             `${moneyFormat(
    //               (record.total_purchase_amount || 0) -
    //                 (record.total_commission_amount || 0),
    //               "mnt"
    //             )}`,
    //         },
    //         {
    //           dataIndex: "total_click",
    //           title: "Clicks",
    //         },
    //       ]}
    //     />
    //   ) : (
    //     <ITable<any>
    //       noShadow
    //       hideCreateButton
    //       loading={api.loading}
    //       dataSource={api.data?.items || []}
    //       refresh={(values) => fetch({ ...values, ...form })}
    //       pagination={{
    //         pageSize: 6,
    //       }}
    //       toolbarItems={
    //         <Link to={"/dashboard/statement"} style={{ color: "#4F46E5" }}>
    //           <span>See All Transactions</span>
    //           <RightOutlined />
    //         </Link>
    //       }
    //       customHeaderTitle={
    //         <ProFormRadio.Group
    //           noStyle
    //           name={"deadline"}
    //           radioType="button"
    //           options={buttons?.map((el) => ({ ...el }))}
    //           fieldProps={{
    //             style: {
    //               marginBottom: "0 !important",
    //             },
    //             className: "text-md font-semibold ",
    //             value: tab,
    //             onChange: (e) => {
    //               setTab(e.target.value);
    //             },
    //           }}
    //         />
    //       }
    //       columns={[
    //         {
    //           ...tableCellFixed(230),
    //           dataIndex: "name",
    //           title: "Product/Service",
    //           render: (_, record) => (
    //             <div className="flex flex-col">
    //               <span className="text-md text-gray-600 font-medium">
    //                 {record.name}
    //               </span>
    //               <span className="text-sm">
    //                 {dayjs(record.start_date).format("MMM d, HH:MM")} -{" "}
    //                 {dayjs(record.end_date).format("MMM d, HH:MM")}
    //               </span>
    //             </div>
    //           ),
    //         },
    //         {
    //           dataIndex: "account_bank",
    //           title: "Bank",
    //           render: (_, record) => <RenderBank bank={record?.account_bank} />,
    //         },
    //         {
    //           dataIndex: "total_purchase_amount",
    //           title: "Sales amount",
    //           render: (_, record) =>
    //             `${moneyFormat(record.total_purchase_amount || 0)}₮`,
    //         },
    //         {
    //           dataIndex: "total_commission_amount",
    //           title: "Commission amount",
    //           render: (_, record) =>
    //             `${moneyFormat(record.total_commission_amount || 0)}₮`,
    //         },
    //         {
    //           dataIndex: "total_commission_amount",
    //           title: "Total amount",
    //           render: (_, record) =>
    //             `${moneyFormat(
    //               (record.total_purchase_amount || 0) -
    //                 (record.total_commission_amount || 0),
    //               "mnt"
    //             )}`,
    //         },
    //         {
    //           dataIndex: "transfered_date",
    //           title: "Transfered Date",
    //           valueType: "dateTime",
    //         },
    //         {
    //           dataIndex: "total_click",
    //           title: "Clicks",
    //         },
    //       ]}
    //     />
    //   )}
    // </div>
  );
};

export default LatestTransactions;
