import { useRequest } from "ahooks";
import { Avatar, notification, Segmented } from "antd";
import IBadge from "components/badge";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { PopoverFilter } from "components/filter";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { ScreeningTab } from "config";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import file from "service/file";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { FileSearch03 } from "untitledui-js-base";
import { initPagination } from "utils/index";
import { screeningListFilter } from "utils/screening_list_filter";
import { EditScreenList } from "./edit";
import { ScreeningListFilter } from "./filter";

const ScreeningList: React.FC = () => {
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
        hideTitle
        refresh={refreshList}
        hideCreate
        leftContent={
          <Segmented
            onChange={(value: any) => {
              setTab(value);
            }}
            options={[
              {
                label: <FormattedMessage id="all" />,
                value: ScreeningTab.all,
              },
              {
                label: <FormattedMessage id="level" values={{ number: 1 }} />,
                value: ScreeningTab.level_1,
              },
              {
                label: <FormattedMessage id="level" values={{ number: 2 }} />,
                value: ScreeningTab.level_2,
              },
              {
                label: <FormattedMessage id="level" values={{ number: 3 }} />,
                value: ScreeningTab.level_3,
              },
            ]}
            size="large"
          />
        }
      />
      <ITable<ScreeningListType>
        dataSource={screen.data?.items}
        loading={screen.loading}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
            render:(value)=>{
              return <p className="text-primary-700 font-bold">{value}</p>
            }
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
        UpdateComponent={EditScreenList}
        customActions={(record) => {
          return (
            <Link
              to={`/dashboard/development-plan/234?customer_id=${record.id}`}
              className="flex items-center"
            >
              <FileSearch03 className="text-gray-600" />
            </Link>
          );
        }}
      />
    </PageCard>
  );
};

export default ScreeningList;
