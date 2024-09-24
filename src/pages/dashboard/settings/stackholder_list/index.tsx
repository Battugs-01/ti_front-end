import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import agencyList from "service/settings/agency_list";
import stackholderList from "service/settings/stackholder";
import { StackholderType } from "service/settings/stackholder/type";
import { settingsFilter } from "utils/index";
import { CreateStakeholder } from "./create";
import { UpdateStakeholder } from "./update";

export const StackholderList: React.FC = () => {
  const [filter, setFilter] = useState(settingsFilter);
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
            title: intl.formatMessage({ id: "created_at" }),
            dataIndex: "created_at",
            render: (_, record) => (
              <div>{dayjs(record.created_at).format("DD/MM/YYYY")}</div>
            ),
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
            title: intl.formatMessage({ id: "another_phone" }),
            dataIndex: "another_phone",
          },
          {
            title: intl.formatMessage({ id: "fax" }),
            dataIndex: "fax",
          },
        ]}
      />
    </PageCard>
  );
};
