import { useRequest } from "ahooks";
import { notification, Typography } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import { ScreeningTab } from "config";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { FileSearch03, MinusCircle } from "untitledui-js-base";
import { initPagination } from "utils/index";
import { screeningListFilter } from "utils/screening_list_filter";
import { getScreeningTableColumns } from "../components/table-column";
import TableHeader from "../components/table-header";
import { EditScreenList } from "./edit";

const ScreeningListOtherRoles: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [tab, setTab] = useState<ScreeningTab>(ScreeningTab.all);
  const intl = useIntl();
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
      levels: screeningListFilter(tab),
    });
  }, [filter, tab]);

  const refreshList = () => {
    screen?.run({
      ...filter,
      levels: screeningListFilter(tab),
    });
  };

  return (
    <PageCard xR>
      <TableHeader setTab={setTab} refreshList={refreshList} />
      <ITable<ScreeningListType>
        dataSource={screen.data?.items}
        loading={screen.loading}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
            width: 150,
            render: (value, record) => {
              return (
                <Link
                  to={`/dashboard/screening-list/other-roles/detail?customer_id=${record.id}`}
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
          ...getScreeningTableColumns(intl),
        ]}
        UpdateComponent={EditScreenList}
        customActions={(record) => {
          return (
            <Link
              to={`/dashboard/development-plan/234?customer_id=${record.id}`}
              className="flex items-center"
            >
              <MinusCircle className="text-red-600" size="20" />
            </Link>
          );
        }}
      />
    </PageCard>
  );
};

export default ScreeningListOtherRoles;
