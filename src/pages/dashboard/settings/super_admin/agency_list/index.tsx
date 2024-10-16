import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import agencyList from "service/settings/agency_list";
import { AgencyListType } from "service/settings/agency_list/type";
import { initPagination } from "utils/index";
import { CreateAgency } from "./create";
import { UpdateAgency } from "./update";

export const AgencyList: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState(false);
  const intl = useIntl();

  const agency = useRequest(agencyList.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    agency.run({
      ...filter,
    });
  }, [filter]);
  const refreshList = () => {
    agency?.run({
      ...filter,
    });
  };
  const searchRun = useDebounceFn(agency.run, { wait: 1000 });

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        setCreate={setCreate}
        refresh={refreshList}
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
        addButtonName={<FormattedMessage id="create" />}
        fileName={<FormattedMessage id="agency_list" />}
      />
      <ITable<AgencyListType>
        dataSource={agency.data?.items}
        loading={agency.loading}
        refresh={refreshList}
        CreateComponent={CreateAgency}
        UpdateComponent={UpdateAgency}
        RemoveModelConfig={{
          action: agencyList.deleteAgency,
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
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "name",
            width: 350,
            render: (value, record) => {
              return (
                <div className="flex items-center gap-3">
                  <Avatar
                    shape="circle"
                    size={25}
                    className="flex items-center"
                    src={file.fileToUrl(record?.profile?.physical_path || "")}
                  >
                    {record?.name?.substring(0, 2).toUpperCase()}
                  </Avatar>
                  <p className="text-primary-700 font-bold">
                    {localStorage?.getItem("web.locale") === "en"
                      ? record?.name_en || value
                      : value || "-"}
                  </p>
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "director_name" }),
            dataIndex: "director_name",
          },
          {
            title: intl.formatMessage({ id: "address" }),
            dataIndex: "address",
            width: 300,
            render: (_, record) => (
              <div>{`${record.address.city?.name || ""} ${
                record.address?.district?.name || ""
              } ${record?.address?.khoroo?.name || ""} ${
                record?.address?.desc || ""
              }`}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "email" }),
            dataIndex: "email",
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone_no",
          },
          {
            title: intl.formatMessage({ id: "date_established" }),
            dataIndex: "establishment_year",
          },
          {
            title: intl.formatMessage({ id: "link" }),
            dataIndex: "link",
            width: 200,
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
