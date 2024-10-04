import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import IBadge from "components/badge";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { PopoverFilter } from "components/filter";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
// import { ScreeningListFilter } from "pages/dashboard/screening-list/components/filter";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { initPagination } from "utils/index";

export const QuestionList: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
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
  return (
    <PageCard xR>
      <InitTableHeader
        customHeaderTitle={
          <div className="font-semibold text-[#344054] text-lg">
            <FormattedMessage id="last_screening_list" />
          </div>
        }
        refresh={refreshList}
        hideCreate
      />
      <ITable<ScreeningListType>
        dataSource={screen.data?.items}
        loading={screen.loading}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
            render: (value) => {
              return <p className="text-primary-700 font-bold">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "register" }),
            dataIndex: "rd",
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone",
          },
          {
            title: intl.formatMessage({ id: "age" }),
            dataIndex: "age",
          },
          {
            title: intl.formatMessage({ id: "gender" }),
            dataIndex: "gender",
            render: (value: any) => {
              return <FormattedMessage id={value} />;
            },
          },
          {
            title: intl.formatMessage({ id: "risk_level" }),
            dataIndex: "risk_level",
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
            render: (_, record) => (
              <div>{dayjs(record?.assessment?.date)?.format("YYYY/MM/DD")}</div>
            ),
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
            render: (_, record) => (
              <div>
                {dayjs(record?.assessment?.date_comp_ass).format("YYYY/MM/DD")}
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "address" }),
            dataIndex: "address",
            render: (_, record) => (
              <div>{`${record?.address?.city?.name || ""}  ${
                record?.address?.district?.name || ""
              }  ${record?.address?.khoroo?.name || ""}  ${
                record?.address?.desc || ""
              }`}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "development_plan" }),
            dataIndex: "development_plan",
            render: (_: any, record: ScreeningListType): React.ReactNode => (
              <div className="">
                <IBadge
                  title={
                    record?.assessment?.developer_plan
                      ? "Оруулсан"
                      : "Оруулаагүй"
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
                  return <IBadge title="Өндөр" color="red" />;
                case "medium":
                  return <IBadge title="Дунд" color="yellow" />;
                case "low":
                  return <IBadge title="Бага" color="green" />;
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
