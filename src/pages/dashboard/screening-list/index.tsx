import { useDebounceFn, useRequest } from "ahooks";
import { notification, Typography } from "antd";
import { PageCard } from "components/card";
import { useLevelContext } from "components/custom-detail/selected-level";
import { ITable } from "components/index";
import { ScreeningTab, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { MinusCircle, SwitchHorizontal01 } from "untitledui-js-base";
import { initPagination } from "utils/index";
import { screeningListFilter } from "utils/screening_list_filter";
import { CloseModal } from "./components/table-actions/close";
import { SwitchModal } from "./components/table-actions/switch";
import { EditScreenList } from "./components/table-actions/update";
import { getScreeningTableColumns } from "./components/table-column";
import TableHeader from "./components/table-header";
const ScreeningList: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const { setSelectedLevel } = useLevelContext();
  const [user] = useContext(AuthContext);
  const [search, setSearch] = useState<string>("");
  const [tab, setTab] = useState<ScreeningTab>(ScreeningTab.all);
  const [switchAction, setSwitchAction] = useState<ScreeningListType>();
  const [close, setCloseModal] = useState<ScreeningListType>();

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

  const searchRun = useDebounceFn(screen.run, { wait: 1000 });

  return (
    <PageCard xR>
      <TableHeader
        setTab={setTab}
        refreshList={refreshList}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
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
          ...getScreeningTableColumns(intl),
        ]}
        refresh={refreshList}
        UpdateComponent={EditScreenList}
        customActions={(record) => {
          if (user?.user?.role === UserRoleType.case_manager) {
            return (
              <div className="flex items-center">
                <SwitchHorizontal01
                  size="20"
                  onClick={() => setSwitchAction(record)}
                />
              </div>
            );
          }
          if (user?.user?.role === UserRoleType.senior_case_manager) {
            return (
              <div className="flex gap-4">
                <div className="flex items-center">
                  <SwitchHorizontal01
                    size="20"
                    onClick={() => setSwitchAction(record)}
                  />
                </div>
                <div className="flex items-center">
                  <MinusCircle
                    size="20"
                    className="text-red-600"
                    onClick={() => setCloseModal(record)}
                  />
                </div>
              </div>
            );
          } else if (user?.user?.role === UserRoleType.doctor) {
            return (
              <div className="flex items-center">
                <MinusCircle
                  className="text-red-600"
                  color="red"
                  size="20"
                  onClick={() => setCloseModal(record)}
                />
              </div>
            );
          }
          return null;
        }}
      />
      <SwitchModal
        data={switchAction}
        onCancel={() => setSwitchAction(undefined)}
        onFinish={async () => {
          refreshList();
          setSwitchAction(undefined);
        }}
      />
      <CloseModal
        data={close}
        onCancel={() => setCloseModal(undefined)}
        onFinish={async () => {
          refreshList();
          setCloseModal(undefined);
        }}
      />
    </PageCard>
  );
};

export default ScreeningList;
