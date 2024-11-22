import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import IBadge from "components/badge";
import OtherBadge from "components/badge/other";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import userList from "service/settings/user_list";
import { UserType } from "service/settings/user_list/type";
import { Lock01 } from "untitledui-js-base";
import { initPagination } from "utils/index";
import { ChangePassword } from "./change_password";
import { CreateUser } from "./create";
import { UpdateUser } from "./update";
import file from "service/file";

export const Userlist: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState(false);
  const [changePassword, setChangePassword] = useState<UserType>();
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
        setForm={setFilter}
        form={filter}
        total={user.data?.total || 0}
        CreateComponent={CreateUser}
        UpdateComponent={UpdateUser}
        RemoveModelConfig={{
          action: userList.deleteUser,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.first_name,
            title: "Remove",
          }),
        }}
        customActions={(record) => {
          return (
            <Lock01
              size="20"
              onClick={() => {
                setChangePassword(record);
              }}
              className="ml-2"
            />
          );
        }}
        create={create}
        setCreate={setCreate}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: "",
            dataIndex: "id",
            render: (_, record) => {
              return (
                <Avatar
                  shape="circle"
                  size={25}
                  className="flex items-center"
                  src={file.fileToUrl(record?.profile?.physical_path || "")}
                >
                  {record?.first_name?.substring(0, 2).toUpperCase()}
                </Avatar>
              );
            },
          },
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
            title: intl.formatMessage({ id: "is_active" }),
            dataIndex: "is_active",
            align: "center",
            render: (value: any) => {
              return <OtherBadge status={value} />;
            },
          },
          {
            title: intl.formatMessage({ id: "address" }),
            dataIndex: "address",
            render: (_, record) => {
              return <div>{record?.address?.city?.name || "-"}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "email" }),
            dataIndex: "email",
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone",
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
      {changePassword && (
        <ChangePassword
          record={changePassword}
          visible={!!changePassword}
          onClose={() => {
            setChangePassword(undefined);
          }}
          onFinish={() => {
            user?.run({
              ...filter,
            });
            setChangePassword(undefined);
          }}
        />
      )}
    </PageCard>
  );
};
