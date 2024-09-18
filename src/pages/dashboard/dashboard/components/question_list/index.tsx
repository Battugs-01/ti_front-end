import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import IBadge from "components/badge";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { PopoverFilter } from "components/filter";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { ScreeningListFilter } from "pages/dashboard/screening-list/filter";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { FileSearch03 } from "untitledui-js-base";
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

  const onFinishFilter = async (values: any) => {
    screen.runAsync({
      ...filter,
      ...values,
    });
  };
  return (
    <PageCard xR>
      <InitTableHeader
        filter={
          <PopoverFilter>
            <ScreeningListFilter onFinish={onFinishFilter} />
          </PopoverFilter>
        }
        customHeaderTitle={<FormattedMessage id="last_screening_list" />}
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
            title: intl.formatMessage({ id: "agency" }),
            dataIndex: "agency",
            render: (_, record) => (
              <div>{record?.person_in_charge?.agency?.name}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "total_assessment" }),
            dataIndex: "total_assessment",
            render: (_, record) => <div>{record?.assessment?.total}</div>,
          },
          {
            title: intl.formatMessage({ id: "list_assessment_date" }),
            dataIndex: "list_assessment_date",
            render: (_, record) => (
              <div>{dayjs(record?.assessment?.date).format("YYYY-MM-DD")}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "caregiver" }),
            dataIndex: "caregiver",
            render: (_, record) => (
              <div>
                {record?.is_have_care_giver ? (
                  <IBadge title={<FormattedMessage id="yes" />} color="green" />
                ) : (
                  <IBadge title={<FormattedMessage id="no" />} />
                )}
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "person_in_charge" }),
            dataIndex: "person_in_charge",
            render: (_, record) => (
              <div className="flex items-center gap-2">
                <Avatar
                  src={file.fileToUrl(
                    record?.person_in_charge?.profile?.physical_path
                  )}
                  className="uppercase"
                >
                  {record?.person_in_charge?.first_name.substring(0, 2)}
                </Avatar>
                <div>{record?.person_in_charge?.first_name}</div>
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "address" }),
            dataIndex: "address",
            render: (_, record) => <div>{record?.address?.desc}</div>,
          },
          {
            title: intl.formatMessage({ id: "development_plan" }),
            dataIndex: "development_plan",
          },
        ]}
      />
    </PageCard>
  );
};
