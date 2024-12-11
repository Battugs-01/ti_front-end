import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { DatePicker, notification, Typography } from "antd";
import { PageCard } from "components/card";
import MaskedValue from "components/masked/masked-value";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { CareFociEnum } from "config";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import developmentPlan from "service/development_plan";
import { PlannedWorksType } from "service/my_planned_work/types";
import statisticalReport from "service/statistical_report";
import { AlertCircle, Check } from "untitledui-js-base";
import {
  parseMongolianGender,
  parseMongolianID,
  reportFilter,
} from "utils/index";
import DevPlanTablesReport from "./expand_table";

export const ByCaseManager: React.FC = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [visibleRows, setVisibleRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const intl = useIntl();
  const [filter, setFilter] = useState(reportFilter);
  const [user] = useContext(AuthContext);
  const list = useRequest(statisticalReport.developmentPlanCaseManager, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err,
      });
    },
  });

  const devPlanData = useRequest(developmentPlan.getDetail, {
    manual: true,
  });

  const runGetDetail = (ass_id: number) => {
    devPlanData.run(ass_id || 0);
  };

  useEffect(() => {
    list.run({
      ...filter,
    });
  }, [filter]);

  const refreshList = () => {
    list?.run({
      ...filter,
    });
  };

  const handleExpand = (expanded: boolean, record: any) => {
    if (expanded) {
      setExpandedRowKeys([record.ass_id]);
      runGetDetail(record?.ass_id);
    } else {
      setExpandedRowKeys([]);
    }
  };

  const generalData =
    devPlanData.data?.items
      .filter((item) => item?.valuation_id)
      .flatMap(
        (item) =>
          item?.general_items?.filter(
            (value) => value?.person_in_charge_id === user?.user?.id
          ) || []
      ) || [];

  const loseActivityData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.loseActivity)
      .flatMap(
        (item) =>
          item?.care_foci_items?.filter(
            (value) => value?.person_in_charge_id === user?.user?.id
          ) || []
      ) || [];

  const psychologyChangeData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.psychologyChange)
      .flatMap(
        (item) =>
          item?.care_foci_items?.filter(
            (value) => value?.person_in_charge_id === user?.user?.id
          ) || []
      ) || [];

  const EconemyData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.Econemy)
      .flatMap(
        (item) =>
          item?.care_foci_items?.filter(
            (value) => value?.person_in_charge_id === user?.user?.id
          ) || []
      ) || [];

  const HealthRiskData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.HealthRisk)
      .flatMap(
        (item) =>
          item?.care_foci_items?.filter(
            (value) => value?.person_in_charge_id === user?.user?.id
          ) || []
      ) || [];

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        leftContent={
          <div className="flex items-center h-full">
            <DatePicker.RangePicker
              className="w-max"
              placeholder={[
                intl.formatMessage({ id: "select_start_date" }),
                intl.formatMessage({ id: "select_end_date" }),
              ]}
              size="large"
              onChange={(values) => {
                setFilter({
                  ...filter,
                  start_date: dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
                  end_date: dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
                });
              }}
              defaultValue={[
                filter.start_date
                  ? dayjs(filter.start_date)
                  : dayjs().subtract(3, "month"),
                filter.end_date ? dayjs(filter.end_date) : dayjs(),
              ]}
            />
          </div>
        }
        hideCreate
        hideSearch
        fileName="by_casemanager"
        refresh={refreshList}
      />
      <ITable
        className="p-0 remove-padding-table"
        loading={list.loading}
        key="ass_id"
        rowKey="ass_id"
        dataSource={list?.data}
        hideAction
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
          {
            title: intl.formatMessage({ id: "register" }),
            dataIndex: "rd",
            width: 150,
            render: (value, record) => {
              const isVisible = visibleRows[record.id] || false;
              const handleEyeClick = () => {
                setVisibleRows((prev) => ({
                  ...prev,
                  [record.id]: !isVisible,
                }));
              };
              return (
                <MaskedValue
                  value={value as string}
                  isVisible={isVisible}
                  onToggle={handleEyeClick}
                />
              );
            },
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone",
            width: 150,
          },
          {
            title: intl.formatMessage({ id: "age" }),
            dataIndex: "age",
            width: 50,
            align: "center",
            render: (_: any, record: PlannedWorksType): React.ReactNode => (
              <div className="flex items-center justify-center">
                {parseMongolianID(record?.rd)}
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "gender" }),
            dataIndex: "gender",
            width: 120,
            render: (_: any, record: PlannedWorksType): any => {
              const gender = parseMongolianGender(record?.rd);
              return (
                <div className="">
                  {gender === "male"
                    ? intl.formatMessage({ id: "male" })
                    : intl.formatMessage({ id: "female" })}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "hcu_date" }),
            dataIndex: "levels",
            width: 130,
            render: (_: any, record: PlannedWorksType): React.ReactNode => {
              const date = record?.comp_date;
              if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
                return <div className="flex items-center">-</div>;
              }
              return (
                <div className="flex items-center">
                  {dayjs(date).format("YYYY-MM-DD")}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "care_foci" }),
            dataIndex: "cfs_score",
            align: "center",
            render: (_: any, record: PlannedWorksType): React.ReactNode => (
              <div className="text-gray-400  ">
                <span className="text-gray-900 font-medium">
                  {record?.care_foci_count}
                </span>
                /31
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "dp_date" }),
            dataIndex: "levels",
            width: 130,
            render: (_: any, record: PlannedWorksType): React.ReactNode => {
              const date = record?.dp_date;
              if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
                return <div className="flex items-center">-</div>;
              }
              return (
                <div className="flex items-center">
                  {dayjs(date).format("YYYY-MM-DD")}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "assigned_to_me" }),
            dataIndex: "cfs_score",
            align: "center",
            render: (_: any, record: PlannedWorksType): React.ReactNode => (
              <div>{record?.allocated_count}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "is_resolved" }),
            dataIndex: "cfs_score",
            align: "center",
            render: (_: any, record: PlannedWorksType): React.ReactNode => (
              <div
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium truncate ${
                  record?.care_foci_resolved_count === record?.allocated_count
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : "bg-[#fffaeb] text-[#b54708]"
                }  gap-1`}
              >
                {record?.care_foci_resolved_count ===
                record?.allocated_count ? (
                  <Check size="15" />
                ) : (
                  <AlertCircle size="15" color="#f99009" />
                )}
                <div>
                  <span className="">{record?.care_foci_resolved_count}</span>/
                  {record?.allocated_count}
                </div>
              </div>
            ),
          },
        ]}
        expandable={{
          expandedRowKeys,
          onExpand: (expanded, record) => handleExpand(expanded, record),
          expandedRowRender: (record: any) => (
            <>
              {devPlanData.loading &&
                !generalData &&
                !loseActivityData &&
                !psychologyChangeData &&
                !EconemyData &&
                !HealthRiskData && <PageLoading />}
              <div className="flex flex-col gap-2">
                <DevPlanTablesReport
                  name="general"
                  id="edit-table-general"
                  loading={devPlanData?.loading}
                  data={generalData}
                  isEvaluated={false}
                  isClose={true}
                />
                <DevPlanTablesReport
                  name="lose_activity"
                  id="edit-table-physical"
                  data={loseActivityData}
                  loading={devPlanData?.loading}
                  isEvaluated={true}
                  isClose={true}
                />
                <DevPlanTablesReport
                  name="psychology_change"
                  id="edit-table-psychology"
                  data={psychologyChangeData}
                  loading={devPlanData?.loading}
                  isEvaluated={true}
                  isClose={true}
                />
                <DevPlanTablesReport
                  name="economy_diff"
                  id="edit-table-economy"
                  data={EconemyData}
                  loading={devPlanData?.loading}
                  isEvaluated={true}
                  isClose={true}
                />
                <DevPlanTablesReport
                  name="health_risk"
                  id="edit-table-health-risk"
                  data={HealthRiskData}
                  loading={devPlanData?.loading}
                  isEvaluated={true}
                  isClose={true}
                />
              </div>
            </>
          ),
        }}
      />
    </PageCard>
  );
};
