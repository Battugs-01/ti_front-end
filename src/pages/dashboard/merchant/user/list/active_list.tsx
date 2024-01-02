import { useRequest } from "ahooks";
import { notification } from "antd";
import { ITable } from "components/index";
import { useAtom } from "jotai";
import merchant from "service/merchant";
import { Merchant } from "service/merchant/type";
import { atomUserForm } from "../store";
import dayjs from "dayjs";
import { CreateMerchant } from "../modal/create_merchant";
import { UpdateMerchant } from "../modal/update_merchant";
import { MERCHANT_ROLES } from "config";
import { useEffect } from "react";

export const ActiveUserList = () => {
  const [form] = useAtom(atomUserForm);
  const list = useRequest(merchant.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    list.run({
      ...form,
      created_at: form.full_date,
      is_active: true,
    });
  }, [form]);

  return (
    <ITable<Merchant>
      total={list.data?.total}
      loading={list.loading}
      dataSource={list.data?.items ?? []}
      refresh={(values) =>
        list.run({ ...form, created_at: form.full_date, ...values })
      }
      columns={[
        {
          dataIndex: "service_id",
          title: "Service",
          render: (_, record) => (
            <span className="text-md text-gray-900 font-medium">
              {record.service?.name}
            </span>
          ),
        },
        {
          dataIndex: "name",
          title: "Name",
          render: (_, record) => (
            <span className="text-md text-gray-900 font-medium">
              {record.full_name}
            </span>
          ),
        },
        {
          dataIndex: "email",
          title: "Email",
          render: (_, record) => (
            <span className="text-md text-gray-900 font-medium">
              {record.email}
            </span>
          ),
        },
        {
          dataIndex: "phone",
          title: "Phone",
          render: (_, record) => (
            <span className="text-md text-gray-900 font-medium">
              {record.phone}
            </span>
          ),
        },
        {
          dataIndex: "role",
          title: "Role",
          render: (_, record) => (
            <span className="text-md text-gray-900 font-medium">
              {MERCHANT_ROLES.find((el) => el.value === record.role)?.label}
            </span>
          ),
        },
        {
          dataIndex: "last_login_date",
          title: "Last Login Date",
          render: (_, record) =>
            dayjs(record.last_login_date).format("YYYY-MM-DD HH:mm"),
        },
      ]}
      CreateComponent={CreateMerchant}
      UpdateComponent={UpdateMerchant}
      RemoveModelConfig={{
        action: merchant.remove,
        config: (record) => ({
          uniqueKey: record?.id,
          display: record?.full_name,
          title: "Remove",
        }),
      }}
    />
  );
};
