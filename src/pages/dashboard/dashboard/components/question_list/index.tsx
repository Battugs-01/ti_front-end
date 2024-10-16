import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import IBadge from "components/badge";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
// import { ScreeningListFilter } from "pages/dashboard/screening-list/components/filter";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import {
  initPagination,
  parseMongolianGender,
  parseMongolianID,
} from "utils/index";

export const QuestionList: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");
  const [user] = useContext(AuthContext);
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
    });
  }, [filter]);
  const refreshList = () => {
    screen?.run({
      ...filter,
    });
  };
  const searchRun = useDebounceFn(screen.run, { wait: 1000 });

  return (
    <PageCard xR>
      <InitTableHeader
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
        customHeaderTitle={
          <div className="font-semibold text-[#344054] text-lg">
            <FormattedMessage id="last_screening_list" />
          </div>
        }
        fileName="last_screening_list"
        refresh={refreshList}
        hideCreate
      />
      <ITable<ScreeningListType>
        dataSource={screen.data?.items}
        loading={screen.loading}
        className="p-0 remove-padding-table"
        hideAction
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
            render: (value) => {
              if (
                user?.user?.role === UserRoleType.super_admin ||
                user?.user?.role === UserRoleType.stack_holder
              ) {
                return (
                  <p className="text-primary-700 font-bold">***********</p>
                );
              }
              return <p className="text-primary-700 font-bold">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "register" }),
            dataIndex: "rd",
            render: (value) => {
              if (
                user?.user?.role === UserRoleType.super_admin ||
                user?.user?.role === UserRoleType.stack_holder
              ) {
                return (
                  <p className="text-primary-700 font-bold">***********</p>
                );
              }
              return <p className="uppercase">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone",
            render: (value) => {
              if (
                user?.user?.role === UserRoleType.super_admin ||
                user?.user?.role === UserRoleType.stack_holder
              ) {
                return (
                  <p className="text-primary-700 font-bold">***********</p>
                );
              }
              return <p>{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "age" }),
            dataIndex: "age",
            width: 50,
            align: "center",
            render: (_: any, record: ScreeningListType): React.ReactNode => (
              <div className="flex items-center justify-center">
                {parseMongolianID(record?.rd)}
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "gender" }),
            dataIndex: "gender",
            width: 80,
            render: (_: any, record: ScreeningListType): any => {
              const gender = parseMongolianGender(record?.rd);
              return (
                <div className="flex items-center justify-center">
                  {gender === "male"
                    ? intl.formatMessage({ id: "male" })
                    : intl.formatMessage({ id: "female" })}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "levels" }),
            dataIndex: "levels",
            render: (_, record) => (
              <LevelBadge status={record?.assessment?.level} />
            ),
          },
          {
            title: intl.formatMessage({ id: "cfs_score" }),
            dataIndex: "cfs_score",
            render: (_, record) => (
              <div className="text-gray-400">
                <span
                  className={`${
                    record?.assessment?.cfs_point > 6
                      ? "text-red-400"
                      : "text-black"
                  }`}
                >
                  {record?.assessment.cfs_point}
                </span>{" "}
                / 9
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "cfs_date" }),
            dataIndex: "cfs_date",
            render: (_: any, record: ScreeningListType): React.ReactNode => {
              const date = record?.assessment?.date;
              if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
                return <div className="flex items-center">-</div>;
              }
              return (
                <div className="flex items-center">
                  {dayjs(date).format("YYYY/MM/DD")}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "count_comp_ass" }),
            dataIndex: "count_comp_ass",
            render: (_, record) => (
              <div>{record?.assessment?.count_comp_ass}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "by_hcu_date" }),
            dataIndex: "by_hcu_date",
            width: 130,
            render: (_: any, record: ScreeningListType): React.ReactNode => {
              const date = record?.assessment?.date_comp_ass;
              if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
                return <div className="flex items-center">-</div>;
              }
              return (
                <div className="flex items-center">
                  {dayjs(date).format("YYYY/MM/DD")}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "hcu_state" }),
            dataIndex: "is_temporary",
            align: "center",
            width: 130,
            render: (_: any, record: ScreeningListType): React.ReactNode => {
              if (record?.assessment?.level === "level_3") {
                if (record?.assessment?.is_temporary) {
                  return (
                    <IBadge
                      title={<FormattedMessage id="state_incomplete" />}
                      color="yellow"
                    />
                  );
                }
                return (
                  <IBadge
                    title={<FormattedMessage id="state_complete" />}
                    color="green"
                  />
                );
              } else {
                return <div>-</div>;
              }
            },
          },
          {
            title: intl.formatMessage({ id: "address" }),
            dataIndex: "address",
            width: 300,
            render: (_, record) => (
              <div>{`${record?.address?.city?.name || ""}  ${
                record?.address?.district?.name || ""
              }  ${record?.address?.khoroo?.name || ""}  ${
                record?.address?.desc || ""
              }`}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "person_in_charge" }),
            dataIndex: "person_in_charge",
            render: (value, record, index) => (
              <div>
                <div className="flex gap-2 items-center">
                  {record?.person_in_charge?.profile?.physical_path && (
                    <Avatar
                      shape="circle"
                      size={"small"}
                      src={file.fileToUrl(
                        record?.person_in_charge?.profile?.physical_path || "-"
                      )}
                    />
                  )}
                  <span>
                    {record?.person_in_charge?.last_name &&
                    record?.person_in_charge?.first_name
                      ? `${record?.person_in_charge?.last_name?.substring(
                          0,
                          1
                        )}. ${record?.person_in_charge?.first_name}`
                      : "-"}
                  </span>
                </div>
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "development_plan" }),
            dataIndex: "development_plan",
            render: (_: any, record: ScreeningListType): React.ReactNode => (
              <div className="">
                <IBadge
                  title={
                    record?.assessment?.developer_plan ? (
                      <FormattedMessage id="entered" />
                    ) : (
                      <FormattedMessage id="not_entered" />
                    )
                  }
                  color={record?.assessment?.developer_plan ? "green" : "gray"}
                />
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "risk_level" }),
            dataIndex: "risk_level",
            align: "center",
            render: (_: any, record: ScreeningListType): React.ReactNode => {
              switch (record?.assessment?.priority) {
                case "high":
                  return (
                    <IBadge
                      title={intl.formatMessage({ id: "high" })}
                      color="red"
                    />
                  );
                case "medium":
                  return (
                    <IBadge
                      title={intl.formatMessage({ id: "medium" })}
                      color="yellow"
                    />
                  );
                case "low":
                  return (
                    <IBadge
                      title={intl.formatMessage({ id: "low" })}
                      color="green"
                    />
                  );
                default:
                  return "-";
              }
            },
          },
        ]}
      />
    </PageCard>
  );
};
