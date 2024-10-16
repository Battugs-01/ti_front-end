import { useRequest } from "ahooks";
import { DatePicker, notification, Table } from "antd";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { reportStatisticalFilterAge } from "utils/index";

export const AgeAndGender: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportStatisticalFilterAge);

  const list = useRequest(statisticalReport.statisticalAgeReportList, {
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

  const total = useMemo(() => {
    return (
      list?.data?.reduce((prev, current) => {
        return current?.total_count + prev;
      }, 0) || 0
    );
  }, [list.data]);

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        leftContent={
          <div className="flex items-center h-full">
            <DatePicker
              className="w-max"
              size="large"
              placeholder={intl.formatMessage({ id: "select_date" })}
              onChange={(values) => {
                setFilter({
                  ...filter,
                  year: dayjs(values?.toDate()).year(),
                });
              }}
              picker="year"
              defaultValue={filter.year ? dayjs().year(filter.year) : dayjs()}
            />
          </div>
        }
        hideCreate
        hideSearch
        fileName="age_and_gender"
        refresh={refreshList}
      />
      {list.data?.map((levelTable, index) => {
        console.log(levelTable, "lavel");
        return (
          <ITable
            hideCounter
            hideAction
            hidePagination
            loading={list.loading}
            bordered
            scroll={{ x: "max-content" }}
            dataSource={levelTable?.items}
            summary={() => {
              let level = `bg-[#ECFDF3] text-[#12B76A] font-semibold`;

              if (index === 0) {
                level = `bg-[#ECFDF3] text-[#12B76A] font-semibold`;
              } else if (index === 1) {
                level = `bg-[#FFFAEB] text-[#DC6803] font-semibold`;
              } else if (index === 2) {
                level = `bg-[#FEF3F2] text-[#F04438] font-semibold`;
              }
              return (
                <Table.Summary.Row className={`${level}`}>
                  <Table.Summary.Cell
                    index={0}
                    align="right"
                    className={level}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={1}
                    align="right"
                    className={level}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="right" className={level}>
                    {levelTable?.total_male}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} align="right" className={level}>
                    {levelTable?.total_count === 0
                      ? "0%"
                      : `${(
                          (levelTable?.total_male / levelTable?.total_count) *
                          100
                        ).toFixed(2)} %`}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} align="right" className={level}>
                    {levelTable?.total_female}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5} align="right" className={level}>
                    {levelTable?.total_count === 0
                      ? "0%"
                      : `${(
                          (levelTable?.total_female / levelTable?.total_count) *
                          100
                        ).toFixed(2)} %`}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6} align="right" className={level}>
                    {levelTable?.total_count}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7} align="right" className={level}>
                    100%
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8}></Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
            // scroll={}
            columns={[
              {
                title: intl.formatMessage({ id: "levels" }),
                dataIndex: "level",
                key: "level",
                align: "center",
                onCell: (_, index?: number) => {
                  return {
                    rowSpan:
                      index !== undefined &&
                      (index + 1) % levelTable.items.length === 1
                        ? levelTable.items.length
                        : 0,
                  };
                },
                width: 250,
                render: () => {
                  return <LevelBadge status={`level_${index + 1}`} />;
                },
              },
              {
                title: intl.formatMessage({ id: "age" }),
                dataIndex: "age",
                key: "age",
                render: (_, record) => (
                  <div className="flex items-center ">
                    {localStorage?.getItem("web.locale") === "en"
                      ? record?.age === "54-с доош"
                        ? "Under 54"
                        : record?.age === "75 дээш"
                        ? "Upper 75"
                        : record?.age
                      : record?.age}
                  </div>
                ),
              },
              {
                title: intl.formatMessage({ id: "gender" }),
                dataIndex: "gender",
                key: "gender",
                children: [
                  {
                    title: intl.formatMessage({ id: "male" }),
                    dataIndex: "male",
                    key: "male",
                    align: "right",
                  },
                  {
                    title: intl.formatMessage({ id: "percent" }),
                    dataIndex: "male_percent",
                    key: "male_percent",
                    align: "right",
                    render: (_, record) => {
                      if (levelTable.total_male === 0) {
                        return <div>0%</div>;
                      }
                      return (
                        <div>{`${(
                          (record.male * 100) /
                          levelTable.total_male
                        ).toFixed(2)}%`}</div>
                      );
                    },
                  },
                  {
                    title: intl.formatMessage({ id: "female" }),
                    dataIndex: "female",
                    key: "female",
                    align: "right",
                  },
                  {
                    title: intl.formatMessage({ id: "percent" }),
                    dataIndex: "age",
                    align: "right",
                    render: (_, record) => {
                      if (levelTable.total_female === 0) {
                        return <div>0%</div>;
                      }
                      return (
                        <div>{`${(
                          (record.female * 100) /
                          levelTable.total_female
                        ).toFixed(2)}%`}</div>
                      );
                    },
                  },
                ],
              },
              {
                title: intl.formatMessage({ id: "total" }),
                dataIndex: "total_point",
                key: "total_point",
                align: "right",
                render: (_, record) => {
                  return <div>{record?.male + record?.female}</div>;
                },
              },
              {
                title: intl.formatMessage({ id: "total_level_percent" }),
                dataIndex: "total_level_percent",
                key: "total_level_percent",
                align: "right",
                render: (_, record) => {
                  if (levelTable?.total_count === 0) {
                    return <div>0%</div>;
                  }
                  return (
                    <div>
                      {`${(
                        ((record?.male + record?.female) /
                          levelTable?.total_count) *
                        100
                      ).toFixed(2)} %`}
                    </div>
                  );
                },
              },
              {
                title: intl.formatMessage({ id: "total_percent" }),
                dataIndex: "total_percent",
                key: "total_percent",
                align: "center",
                onCell: (_, index?: number) => {
                  return {
                    rowSpan:
                      index !== undefined &&
                      (index + 1) % levelTable.items.length === 1
                        ? levelTable.items.length
                        : 0,
                  };
                },
                render: (_, record) => {
                  if (total === 0) {
                    return <div>0%</div>;
                  }
                  return (
                    <div>{`${((levelTable.total_count / total) * 100).toFixed(
                      2
                    )} %`}</div>
                  );
                },
              },
            ]}
            pagination={false}
            size="small"
          />
        );
      })}
    </PageCard>
  );
};
