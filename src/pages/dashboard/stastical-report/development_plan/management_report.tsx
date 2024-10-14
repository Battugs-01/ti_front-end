import { useRequest } from "ahooks";
import { DatePicker, notification, Select, Table } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import agencyList from "service/settings/agency_list";
import statisticalReport from "service/statistical_report";

const managementReportFilter = {
  current: 1,
  pageSize: 20,
  start_date: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
  end_date: dayjs().format("YYYY-MM-DD"),
  agency_id: 0,
};

export const ManagementReport: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(managementReportFilter);

  const list = useRequest(statisticalReport.developmentPlanManagement, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err,
      });
    },
  });

  const listAgency = useRequest(
    async () => agencyList.list({ current: 1, pageSize: 20 }),
    {
      onError: (err) => {
        notification.error({
          message: err,
        });
      },
    }
  );

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

  let data = [
    {
      label: intl.formatMessage({ id: "all" }),
      value: 0,
    },
  ];

  listAgency?.data?.items?.map((item) => {
    data.push({
      label: item.name,
      value: item?.id,
    });
  });

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        leftContent={
          <div className="flex items-center gap-4 h-full">
            <Select
              options={data}
              defaultValue={0}
              size="large"
              className="w-[350px]"
              onChange={(value) => {
                setFilter({
                  ...filter,
                  agency_id: value,
                });
              }}
            />
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
        fileName="management_report"
        hideCreate
        hideSearch
        refresh={refreshList}
      />
      {list?.data?.map((agency) => {
        if (agency?.items?.length === 0 || !agency?.items) return null;
        return (
          <ITable
            hideAction
            hideCounter
            hidePagination
            pagination={false}
            scroll={{ x: "max-content" }}
            summary={() => {
              return (
                <Table.Summary.Row className="bg-[#F5F8F8] mx-4 px-4">
                  <Table.Summary.Cell
                    index={0}
                    align="center"
                    className="bg-[#F5F8F8] text-[#475467] font-semibold ml-4"
                  >
                    <FormattedMessage id="total" />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={1}
                    align="left"
                    colSpan={10}
                    className="bg-[#F5F8F8] text-[#475467] font-semibold"
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={2}
                    align="center"
                    className="bg-[#F5F8F8] text-[#475467] font-semibold"
                  >
                    {agency?.items?.length}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
            loading={list.loading}
            dataSource={agency?.items}
            columns={[
              {
                title: intl.formatMessage({ id: "agency" }),
                dataIndex: "agency",
                width: 200,
                align: "left",
                onCell: (_, index: any) => {
                  return {
                    rowSpan:
                      index % agency?.items.length === 0
                        ? agency?.items?.length
                        : 0,
                  };
                },
                className: "ml-5",
                render: (_) => {
                  return <p className="ml-4">{agency?.name}</p>;
                },
              },
              {
                title: intl.formatMessage({ id: "case" }),
                dataIndex: "customer_first_name",
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
                title: intl.formatMessage({ id: "functional_impairment" }),
                dataIndex: "functional",
                align: "center",
                render: (_, record) => {
                  const data = record.care_foci?.find((value) => {
                    return value.key === "functional";
                  });
                  return <div>{data?.count || 0}</div>;
                },
              },
              {
                title: intl.formatMessage({
                  id: "social_psychological_change",
                }),
                dataIndex: "psycho_emotional",
                align: "center",
                render: (_, record) => {
                  const data = record.care_foci?.find((value) => {
                    return value.key === "psycho_emotional";
                  });
                  return <div>{data?.count || 0}</div>;
                },
              },
              {
                title: intl.formatMessage({
                  id: "socio_economic_difficulties",
                }),
                dataIndex: "socio_economic",
                align: "center",
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
                render: (_, record) => {
                  return <div>{record?.care_foci?.length}</div>;
                },
              },
              {
                title: intl.formatMessage({ id: "care_foci_percent" }),
                dataIndex: "care_foci_percent",
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
                align: "center",
                render: (value: any) => {
                  if (
                    !value ||
                    dayjs(value).format("YYYY-MM-DD") === "0001-01-01"
                  ) {
                    return <div className="flex items-center">-</div>;
                  }
                  return <div>{dayjs(value)?.format("YYYY/MM/DD")}</div>;
                },
              },
              {
                title: intl.formatMessage({ id: "result_plan" }),
                dataIndex: "dp_resolved",
                align: "center",
              },
              {
                title: intl.formatMessage({ id: "result_percent" }),
                dataIndex: "dp_resolved_percent",
                align: "center",
                render: (_, record) => {
                  return (
                    <div>
                      {record?.dp_resolved_percent
                        ? `${record.dp_resolved_percent}%`
                        : "-"}
                    </div>
                  );
                },
              },
            ]}
          />
        );
      })}
    </PageCard>
  );
};
