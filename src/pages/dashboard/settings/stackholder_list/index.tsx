import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import stackholderList from "service/settings/stackholder";
import { StackholderType } from "service/settings/stackholder/type";
import { initPagination } from "utils/index";
import { CreateStakeholder } from "./create";
import { UpdateStakeholder } from "./update";

export const StackholderList: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState(false);
  const intl = useIntl();

  const stakeholder = useRequest(stackholderList.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    stakeholder.run({
      ...filter,
    });
  }, [filter]);
  const refreshList = () => {
    stakeholder?.run({
      ...filter,
    });
  };
  const searchRun = useDebounceFn(stakeholder.run, { wait: 1000 });

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        setCreate={setCreate}
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
        refresh={refreshList}
        addButtonName={<FormattedMessage id="create" />}
        fileName={<FormattedMessage id="stakeholder_list" />}
      />
      <ITable<StackholderType>
        dataSource={stakeholder.data?.items}
        loading={stakeholder.loading}
        CreateComponent={CreateStakeholder}
        refresh={refreshList}
        UpdateComponent={UpdateStakeholder}
        RemoveModelConfig={{
          action: stackholderList.deleteStackholder,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.name,
            title: "Remove",
          }),
        }}
        create={create}
        setCreate={setCreate}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "participant_name" }),
            dataIndex: "name",
            render: (value) => {
              return <p className="text-primary-700 font-bold">{value}</p>;
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
            title: intl.formatMessage({ id: "link" }),
            dataIndex: "link",
          },
          {
            title: intl.formatMessage({ id: "login_name" }),
            dataIndex: "email",
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone_no",
          },
          {
            title: intl.formatMessage({ id: "fax" }),
            dataIndex: "fax",
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
