import { useRequest } from "ahooks";
import { notification } from "antd";
import GenderBadge from "components/badge/gender";
import { ExportButton, ITable } from "components/index";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customer from "service/customers";
import { Customer } from "service/customers/types";
import { exportFromTable } from "utils/export";
import { moneyFormat } from "utils/index";
import { atomCustomerForm } from "../store";

export const ActiveCustomerList = () => {
  const [form] = useAtom(atomCustomerForm);
  const navigate = useNavigate();

  const {
    data,
    loading,
    run: fetch,
  } = useRequest(customer.list, {
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
    fetch({
      ...form,
      ...values,
      created_at: form.full_date,
      is_active: form.tab === "active",
    });
  };

  return (
    <ITable<Customer>
      style={{
        marginTop: 20,
      }}
      hideCreateButton
      toolbarItems={
        <ExportButton
          onClick={() => {
            exportFromTable(
              ["Customers"],
              window.document.getElementById("main-table") as HTMLElement,
              window
            );
          }}
        />
      }
      loading={loading}
      total={data?.total || 0}
      dataSource={data?.items || []}
      refresh={run}
      onRow={(record) => {
        return {
          onClick: () => navigate(`/dashboard/customers/detail/${record.id}`),
          className: "cursor-pointer",
        };
      }}
      columns={[
        {
          dataIndex: "name",
          title: "Name",
          render: (_, record) => (
            <span className="text-md text-gray-600 font-medium">
              {record.last_name?.[0]}.{record.first_name}
            </span>
          ),
        },
        {
          dataIndex: "email",
          valueType: "string",
          title: "Email",
        },
        {
          dataIndex: "phone",
          valueType: "string",
          title: "Phone Number",
        },
        {
          dataIndex: "phone_locale",
          valueType: "string",
          title: "Local Foreign",
        },
        {
          dataIndex: "gender",
          valueType: "string",
          title: "Gender",
          render: (_, record) => <GenderBadge gender={record.gender} />,
        },
        {
          dataIndex: "current_city",
          valueType: "string",
          title: "Current City",
        },
        {
          dataIndex: "income_price",
          valueType: "string",
          title: "Amount",
          render: (_, record) => moneyFormat(record.income_price, "mnt"),
        },
        {
          dataIndex: "last_login_date",
          valueType: "date",
          title: "Last Login Date",
          render: (_, record) =>
            dayjs(record.last_login_date).format("YYYY-MM-DD HH:mm"),
        },
      ]}
      details={data?.items || []}
    />
  );
};
