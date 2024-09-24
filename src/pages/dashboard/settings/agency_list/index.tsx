import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import agencyList from "service/settings/agency_list";
import { AgencyListType } from "service/settings/agency_list/type";
import { settingsFilter } from "utils/index";
import { CreateAgency } from "./create";
import { UpdateAgency } from "./update";

export const AgencyList: React.FC = () => {
  const [filter, setFilter] = useState(settingsFilter);
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
            render: (value) => {
              return <p className="text-primary-700 font-bold">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "director_name" }),
            dataIndex: "director_name",
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
            dataIndex: "phone",
          },
          {
            title: intl.formatMessage({ id: "date_established" }),
            dataIndex: "date_establishment",
          },
          {
            title: intl.formatMessage({ id: "link" }),
            dataIndex: "link",
          },
          {
            title: intl.formatMessage({ id: "email" }),
            dataIndex: "email",
          },
          {
            title: intl.formatMessage({ id: "created_at" }),
            dataIndex: "created_at",
            render: (_, record) => (
              <div>{dayjs(record.created_at).format("DD/MM/YYYY")}</div>
            ),
          },
        ]}
      />
    </PageCard>
  );
};
