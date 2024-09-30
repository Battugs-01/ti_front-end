import { useRequest } from "ahooks";
import { notification, Typography } from "antd";
import { PageCard } from "components/card";
import { useLevelContext } from "components/custom-detail/selected-level";
import { ITable } from "components/index";
import { RoleType, ScreeningTab, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { MinusCircle } from "untitledui-js-base";
import { initPagination } from "utils/index";
import { screeningListFilter } from "utils/screening_list_filter";
import { getScreeningTableColumns } from "./components/table-column";
import { EditScreenList } from "./components/table-edit/index";
import TableHeader from "./components/table-header";
const ScreeningList: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const { setSelectedLevel } = useLevelContext();
  const [user] = useContext(AuthContext);
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

  const onFinishFilter = async (values: any) => {
    screen.runAsync({
      ...filter,
      ...values,
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
          ...getScreeningTableColumns(intl),
        ]}
        UpdateComponent={EditScreenList}
        customActions={(record) => {
          if (user?.user?.role === UserRoleType.senior_case_manager) {
            return (
              <div className="flex items-center">
                <MinusCircle className="text-red-600" size="20" />
              </div>
            );
          }
          return null;
        }}
      />
    </PageCard>
  );
};

export default ScreeningList;
