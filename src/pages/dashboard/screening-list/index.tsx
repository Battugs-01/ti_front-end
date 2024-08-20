import { useRequest } from "ahooks";
import { Avatar, notification, Radio } from "antd";
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
    onSuccess: () => {
      // notification.success({
      //   message: intl.formatMessage({ id: "success" }),
      // });
    },
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
      <InitTableHeader
        filter={
          <PopoverFilter>
            <ScreeningListFilter />
          </PopoverFilter>
        }
        hideTitle
        refresh={refreshList}
        hideCreate
        leftContent={
          <Radio.Group
            defaultValue={ScreeningTab.all}
            size="large"
            onChange={(e) => {
              setTab(e.target.value);
            }}
          >
            <Radio.Button value={ScreeningTab.all}>
              <FormattedMessage id="all" />
            </Radio.Button>
            <Radio.Button value={ScreeningTab.level_1}>
              <FormattedMessage id="level" values={{ number: 1 }} />
            </Radio.Button>
            <Radio.Button value={ScreeningTab.level_2}>
              <FormattedMessage id="level" values={{ number: 2 }} />
            </Radio.Button>
            <Radio.Button value={ScreeningTab.level_3}>
              <FormattedMessage id="level" values={{ number: 3 }} />
            </Radio.Button>
          </Radio.Group>
        }
      />
      <ITable<ScreeningListType>
        dataSource={screen.data?.items}
        loading={screen.loading}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "name",
            render: (_, record) => <div>{record?.customer.first_name}</div>,
          },
          {
            title: intl.formatMessage({ id: "register" }),
            dataIndex: "register",
            render: (_, record) => <div>{record?.customer.rd}</div>,
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone",
            render: (_, record) => <div>{record?.customer.phone}</div>,
          },
          {
            title: intl.formatMessage({ id: "age" }),
            dataIndex: "age",
            render: (_, record) => <div>{record?.customer.age}</div>,
          },
          {
            title: intl.formatMessage({ id: "gender" }),
            dataIndex: "gender",
            render: (_, record) => <div>{record?.customer.age}</div>,
          },
          {
            title: intl.formatMessage({ id: "risk_level" }),
            dataIndex: "risk_level",
            render: (_, record) => <LevelBadge status={record?.level} />,
          },
          {
            title: intl.formatMessage({ id: "cfs_score" }),
            dataIndex: "cfs_score",
            render: (_, record) => (
              <div className="text-gray-400">
                <span
                  className={`${
                    record?.cfs_point > 6 ? "text-red-400" : "text-black"
                  }`}
                >
                  {record?.cfs_point}
                </span>{" "}
                / 9
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "agency" }),
            dataIndex: "agency",
          },
          {
            title: intl.formatMessage({ id: "total_assessment" }),
            dataIndex: "total_assessment",
            render: (_, record) => <div>{record?.cfs_point}</div>,
          },
          {
            title: intl.formatMessage({ id: "list_assessment_date" }),
            dataIndex: "list_assessment_date",
            render: (_, record) => (
              <div>{dayjs(record?.date).format("YYYY-MM-DD")}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "caregiver" }),
            dataIndex: "caregiver",
            render: (_, record) => (
              <div>
                {record?.customer.is_have_care_giver ? (
                  <FormattedMessage id="yes" />
                ) : (
                  <FormattedMessage id="no" />
                )}
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "person_in_charge" }),
            dataIndex: "person_in_charge",
            render: (_, record) => (
              <div className="flex items-center gap-2">
                <Avatar>BA</Avatar>
                <div>{record?.employee?.first_name}</div>
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "address" }),
            dataIndex: "address",
            render: (_, record) => <div>{record?.customer.address?.desc}</div>,
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
              to={`/dashboard/development-plan/234?assessment_id=${record.customer_id}`}
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
