import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import IBadge from "components/badge";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import userList from "service/settings/user_list";
import { UserType } from "service/settings/user_list/type";
import { settingsFilter } from "utils/index";
import { CreateUser } from "./create";
import { UpdateUser } from "./update";

export const Userlist: React.FC = () => {
  const [filter, setFilter] = useState(settingsFilter);
  const [create, setCreate] = useState(false);
  const intl = useIntl();

  const user = useRequest(userList.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    user.run({
      ...filter,
    });
  }, [filter]);
  const refreshList = () => {
    user?.run({
      ...filter,
    });
  };
  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        setCreate={setCreate}
        leftContent={
          <DatePicker.RangePicker
            className="w-max"
            onChange={(values) => {
              setFilter({
                ...filter,
                start_date: dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
                end_date: dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
              });
            }}
            defaultValue={[
              filter.start_date
                ? dayjs(filter.start_date)
                : dayjs().subtract(3, "month"),
              filter.end_date ? dayjs(filter.end_date) : dayjs(),
            ]}
          />
        }
        refresh={refreshList}
        addButtonName="Нэмэх"
      />
      <ITable<UserType>
        dataSource={user.data?.items}
        loading={user.loading}
        CreateComponent={CreateUser}
        refresh={refreshList}
        UpdateComponent={UpdateUser}
        RemoveModelConfig={{
          action: userList.deleteUser,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.first_name,
            title: "Remove",
          }),
        }}
        create={create}
        setCreate={setCreate}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "last_name" }),
            dataIndex: "last_name",
          },
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
          },
          {
            title: intl.formatMessage({ id: "position" }),
            dataIndex: "role",
            render: (value: any) => {
              return (
                <IBadge
                  title={<FormattedMessage id={value || "admin"} />}
                  color="gray"
                />
              );
            },
          },
          {
            title: intl.formatMessage({ id: "address" }),
            dataIndex: "address",
          },
          {
            title: intl.formatMessage({ id: "email" }),
            dataIndex: "email",
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone_no",
            render: (_, record) => {
              return <div>{record.agency?.phone_no || "-"}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "login_name" }),
            dataIndex: "email",
          },
        ]}
      />
    </PageCard>
  );
};
