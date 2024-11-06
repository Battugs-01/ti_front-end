import { useDebounceFn, useRequest } from "ahooks";
import { notification, Typography } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { Eye } from "untitledui-js-base";
import { reminderFilter } from "utils/index";
import { ReminderListTableColumns } from "./components/table-column";
import TableHeader from "./components/table-header";

export const ReminderList: React.FC = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState(reminderFilter);

  const screen = useRequest(screenList.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  console.log(screen?.data, "helloooooo");

  useEffect(() => {
    screen.run({
      ...filter,
    });
  }, [filter]);

  const submitFilter = () => {
    screen.run({
      ...filter,
    });
  };

  const refreshList = () => {
    screen?.run({
      ...filter,
    });
  };

  const searchRun = useDebounceFn(screen.run, { wait: 1000 });

  console.log(screen?.data, "list");
  return (
    <PageCard xR>
      <TableHeader
        refreshList={refreshList}
        submitFilter={submitFilter}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
        setFilter={setFilter as any}
        filter={filter}
        search={search}
      />
      <ITable<ScreeningListType>
        dataSource={screen?.data?.items}
        loading={screen.loading}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
            width: 200,
            render: (value, record) => {
              return (
                <Typography.Text className="" style={{ cursor: "pointer" }}>
                  {value}
                </Typography.Text>
              );
            },
          },
          ...ReminderListTableColumns(intl),
        ]}
        refresh={refreshList}
        customActions={(record) => {
          console.log(record, "kkk");
          return (
            <div className="flex gap-6">
              <div className="flex items-center justify-center">
                <Eye
                  size="20"
                  onClick={() =>
                    navigate(
                      `/dashboard/my-planned-work/detail?customer_id=${record.id}&ass_id=${record?.assessment?.id}`
                    )
                  }
                  className="cursor-pointer flex items-center justify-center"
                />
              </div>
            </div>
          );
        }}
      />
    </PageCard>
  );
};
