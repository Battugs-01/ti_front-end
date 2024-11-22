import { useDebounceFn, useRequest } from "ahooks";
import { notification, Typography } from "antd";
import { PageCard } from "components/card";
import { useLevelContext } from "components/custom-detail/selected-level";
import { ITable } from "components/table";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import plannedWorks from "service/my_planned_work";
import { PlannedWorksType } from "service/my_planned_work/types";
import { Eye } from "untitledui-js-base";
import { myPlanedFilter } from "utils/index";
import { ServiceProvidedTableColumns } from "./components/table-column";
import TableHeader from "./components/table-header";

export const ServiceProvided: React.FC = () => {
  const { setSelectedLevel } = useLevelContext();
  const navigate = useNavigate();
  const intl = useIntl();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState(myPlanedFilter);

  const list = useRequest(plannedWorks.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    list.run({
      ...filter,
    });
  }, [filter.filter_type]);

  const submitFilter = () => {
    list.run({
      ...filter,
    });
  };

  const refreshList = () => {
    list?.run({
      ...filter,
    });
  };

  const searchRun = useDebounceFn(list.run, { wait: 1000 });

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
      <ITable<PlannedWorksType>
        dataSource={list.data}
        loading={list.loading}
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
          ...ServiceProvidedTableColumns(intl),
        ]}
        refresh={refreshList}
        customActions={(record) => {
          return (
            <div className="flex gap-6">
              <div className="flex items-center justify-center">
                <Eye
                  size="20"
                  onClick={() =>
                    navigate(
                      `/dashboard/my-planned-work/detail?customer_id=${record.id}&ass_id=${record.ass_id}`
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