import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import IBadge from "components/badge";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import userList from "service/settings/user_list";
import { UserType } from "service/settings/user_list/type";
import { initPagination } from "utils/index";
import { CreateUser } from "./create";
import { UpdateUser } from "./update";
import dayjs from "dayjs";

export const Userlist: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");
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
  const searchRun = useDebounceFn(user.run, { wait: 1000 });

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
        setCreate={setCreate}
        refresh={refreshList}
        addButtonName={<FormattedMessage id="create" />}
        fileName={<FormattedMessage id="user_list" />}
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
            render: (_, record) => {
              return <div>{record.agency?.address?.city?.name || "-"}</div>;
            },
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
          {
            title: intl.formatMessage({ id: "created_at" }),
            dataIndex: "created_at",
            render: (_, record) => (
              <div>{dayjs(record.created_at).format("YYYY/MM/DD HH:mm")}</div>
            ),
          },
        ]}
      />
    </PageCard>
  );
};
