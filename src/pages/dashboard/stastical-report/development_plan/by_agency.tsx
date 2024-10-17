import { useRequest } from "ahooks";
import { DatePicker, notification, Select } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { DPAgencyType } from "service/statistical_report/type";

enum DateFilter {
  comp_ass = "comp_ass",
  development = "development",
}

const filterAgency = {
  current: 1,
  pageSize: 20,
  start_date: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
  end_date: dayjs().format("YYYY-MM-DD"),
  filter_type: DateFilter.comp_ass,
};

export const ByAgency: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(filterAgency);

  const list = useRequest(statisticalReport.developmentPlanAgency, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err,
      });
    },
  });

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

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        leftContent={
          <div className="flex items-center gap-4 h-full">
            <Select
              size="large"
              onChange={(value: DateFilter) => {
                setFilter({
                  ...filter,
                  filter_type: value,
                });
              }}
              defaultValue={DateFilter.comp_ass}
              options={[
                {
                  label: <FormattedMessage id="by_hcu_date" />,
                  value: DateFilter.comp_ass,
                },
                {
                  label: <FormattedMessage id="by_ht_date" />,
                  value: DateFilter.development,
                },
              ]}
            />

            <DatePicker.RangePicker
              className="w-max"
              placeholder={[intl.formatMessage({ id: "select_start_date" }), intl.formatMessage({ id: "select_end_date" })]}
              size="large"
              onChange={(values) => {
                setFilter({
                  ...filter,
                  start_date: dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
                  end_date: dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
                });
              }}
              defaultValue={[
                filter.start_date ? dayjs(filter.start_date) : dayjs().subtract(3, "month"),
                filter.end_date ? dayjs(filter.end_date) : dayjs(),
              ]}
            />
          </div>
        }
        hideCreate
        hideSearch
        fileName="by_agency"
        refresh={refreshList}
      />
      <ITable<DPAgencyType>
        hideAction
        dataSource={list?.data}
        loading={list.loading}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "case" }),
            dataIndex: "customer_first_name",
            align: "left",
          },
          {
            title: intl.formatMessage({ id: "cfs_score" }),
            dataIndex: "cfs_point",
            align: "center",
            render: (value: any) => {
              return (
                <div className="text-gray-400">
                  <span className={`${value > 6 ? "text-red-400" : "text-black"} font-medium`}>{value}</span> / 9
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "ou" }),
            dataIndex: "ou",
            align: "left",
          },
          {
            title: intl.formatMessage({ id: "hcu_date" }),
            dataIndex: "comp_ass_date",
            width: 100,
            align: "left",
            render: (value: any) => {
              return <div>{dayjs(value)?.format("YYYY/MM/DD")}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "medical_history" }),
            dataIndex: "medical_history",
            align: "left",
            width: 250,
            render: (_, record) => {
              return (
                <div>
                  {record?.diseases?.length > 0
                    ? record.diseases?.map((value) => {
                        return <div className="px-1 pt-1">{value.name}</div>;
                      })
                    : "-"}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "functional_impairment" }),
            dataIndex: "functional",
            align: "center",
            width: 150,
            render: (_, record) => {
              const data = record.care_foci?.find((value) => {
                return value.key === "functional";
              });
              return <div>{data?.count || 0}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "social_psychological_change" }),
            dataIndex: "psycho_emotional",
            align: "center",
            width: 100,
            render: (_, record) => {
              const data = record.care_foci?.find((value) => {
                return value.key === "psycho_emotional";
              });
              return <div>{data?.count || 0}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "socio_economic_difficulties" }),
            dataIndex: "socio_economic",
            align: "center",
            width: 100,
            render: (_, record) => {
              const data = record.care_foci?.find((value) => {
                return value.key === "socio_economic";
              });
              return <div>{data?.count || 0}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "health_risks" }),
            dataIndex: "clinical",
            align: "center",
            width: 100,
            render: (_, record) => {
              const data = record.care_foci?.find((value) => {
                return value.key === "clinical";
              });
              return <div>{data?.count || 0}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "care_foci" }),
            dataIndex: "care_foci",
            align: "center",
            width: 100,
            render: (_, record) => {
              return <div>{record?.care_foci?.length}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "care_foci_percent" }),
            dataIndex: "care_foci_percent",
            width: 100,
            align: "center",
            render: (_, record) => {
              return (
                <div>
                  {/* care foci huviig bodohdoo staticaar 31 d huvaana */}
                  {((record?.care_foci?.length / 31) * 100).toFixed(2)}%
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "date_entered_by_pt" }),
            dataIndex: "dp_date",
            width: 150,
            align: "center",
            render: (value: any) => {
              if (!value || dayjs(value).format("YYYY-MM-DD") === "0001-01-01") {
                return <div className="flex items-center">-</div>;
              }
              return <div>{dayjs(value)?.format("YYYY/MM/DD")}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "result_plan" }),
            width: 100,
            dataIndex: "dp_resolved",
            align: "center",
          },
          {
            title: intl.formatMessage({ id: "result_percent" }),
            dataIndex: "dp_resolved_percent",
            width: 100,
            align: "center",
            render: (_, record) => {
              return <div>{record?.dp_resolved_percent ? `${record.dp_resolved_percent}%` : "-"}</div>;
            },
          },
        ]}
      />
    </PageCard>
  );
};
