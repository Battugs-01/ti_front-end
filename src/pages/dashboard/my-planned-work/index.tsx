import { useDebounceFn, useRequest } from "ahooks";
import { notification, Typography } from "antd";
import { PageCard } from "components/card";
import { useLevelContext } from "components/custom-detail/selected-level";
import { ITable } from "components/table";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { reportFilter } from "utils/index";
import { EditScreenList } from "./components/table-actions/update";
import { PlannedWorkTableColumns } from "./components/table-column";
import TableHeader from "./components/table-header";

const MyPlannedWork: React.FC = () => {
  const { setSelectedLevel } = useLevelContext();
  const intl = useIntl();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState(reportFilter);
  const screen = useRequest(screenList.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    screen.run({
      ...filter,
    });
  }, [filter]);

  const refreshList = () => {
    screen?.run({
      ...filter,
    });
  };

  const onFinishFilter = async (values: any) => {
    if (values.ages) {
      values.ages = JSON.parse(values.ages);
    }
    screen.runAsync({
      ...filter,
      ...values,
    });
  };

  const searchRun = useDebounceFn(screen.run, { wait: 1000 });

  return (
    <PageCard xR>
      <TableHeader
        refreshList={refreshList}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
        setFilter={setFilter as any}
        filter={filter}
        search={search}
        onFinishFilter={onFinishFilter}
      />
      <ITable<ScreeningListType>
        dataSource={screen.data?.items}
        loading={screen.loading}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
            render: (value, record) => {
              return (
                <Link
                  to={`/dashboard/screening-list/detail?customer_id=${record.id}`}
                  onClick={() => setSelectedLevel(null)}
                >
                  <Typography.Text
                    className="text-primary-700 font-bold"
                    style={{ cursor: "pointer" }}
                  >
                    {value}
                  </Typography.Text>
                </Link>
              );
            },
          },
          ...PlannedWorkTableColumns(intl),
        ]}
        refresh={refreshList}
        UpdateComponent={EditScreenList}
      />
    </PageCard>
  );
};

export default MyPlannedWork;
