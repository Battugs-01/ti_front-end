import { useRequest } from "ahooks";
import { Flex, Table } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import carefoci from "service/settings/care-foci";
import { ChevronDown, ChevronUp } from "untitledui-js-base";

const CareFosiList: React.FC = () => {
  const intl = useIntl();
  const carefocilist = useRequest(carefoci.get, {
    manual: true,
  });
  useEffect(() => {
    carefocilist.run();
  }, []);
  return (
    <Flex vertical gap="large">
      {carefocilist?.data?.map((data, index) => (
        <PageCard xR key={index}>
          <div className="px-2 pb-0 mb-6 mt-1 mx-4">
            <div className="text-gray-900 md:text-lg text-base font-medium">
              {data?.name}
            </div>
          </div>
          <ITable
            hidePagination
            dataSource={data?.items}
            className="p-0 remove-padding-table"
            columns={[
              {
                dataIndex: "name",
                title: intl.formatMessage({ id: "name" }),
                render: (value) => (
                  <span className="text-sm text-[#475467] font-normal flex text-center">
                    {value || "-"}
                  </span>
                ),
              },
              {
                dataIndex: "min",
                title: intl.formatMessage({ id: "min_value" }),
                align: "left",
                width: "10%",
                render: (value) => (
                  <span className="text-sm text-[#475467] font-normal flex text-center ">
                    {value || "-"}
                  </span>
                ),
              },
              {
                dataIndex: "max",
                title: intl.formatMessage({ id: "max_value" }),
                align: "left",
                width: "10%",
                render: (value) => (
                  <span className="text-sm text-[#475467] font-normal flex text-center ">
                    {value || "-"}
                  </span>
                ),
              },
              {
                title: intl.formatMessage({ id: "total_number_seniors" }),
                dataIndex: "total_number_of_seniors",
              },
              {
                title: intl.formatMessage({ id: "seniors_need_assessment" }),
                dataIndex: "seniors_need_assessment",
              },
            ]}
            rowKey={(record) => record.name}
            expandable={{
              expandIcon: ({ expanded, onExpand, record }) => {
                if (expanded) {
                  return (
                    <ChevronUp onClick={(e: any) => onExpand(record, e)} />
                  );
                }
                return (
                  <ChevronDown
                    onClick={(e: any) => {
                      onExpand(record, e);
                    }}
                  />
                );
              },
              expandedRowClassName: () => "bg-[#F5F8F8]",
              expandedRowRender: (record) => {
                return (
                  <Table
                    bordered={false}
                    rowClassName={() => "bg-[#F5F8F8]"}
                    dataSource={[
                      {
                        name: "Болор",
                        register: "УД99443423",
                        phone: "99123456",
                        age: 23,
                        normal_value: 56,
                        assessment_value: 78,
                        assessment_date: "2021-09-23",
                        agency: "Хүрээ",
                        gender: "Эр",
                      },
                    ]}
                    size="large"
                    pagination={false}
                    columns={[
                      {
                        title: "№",

                        render: (_, __, index) => <div>{index + 1}</div>,
                      },
                      {
                        title: intl.formatMessage({ id: "name" }),
                        dataIndex: "name",
                      },
                      {
                        title: intl.formatMessage({ id: "register" }),
                        dataIndex: "register",
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
                      },
                      {
                        title: intl.formatMessage({ id: "normal_value" }),
                        dataIndex: "normal_value",
                      },
                      {
                        title: intl.formatMessage({ id: "assessment_value" }),
                        dataIndex: "assessment_value",
                      },
                      {
                        title: intl.formatMessage({ id: "assessment_date" }),
                        dataIndex: "assessment_date",
                      },
                      {
                        title: intl.formatMessage({ id: "agency" }),
                        dataIndex: "agency",
                      },
                    ]}
                  />
                );
              },
            }}
          />
        </PageCard>
      ))}
      {/* <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Psycho-emotional" />
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Min. value",
              dataIndex: "min-value",
            },
            {
              title: "Max. value",
              dataIndex: "max-value",
            },
            {
              title: "Total number of seniors",
              dataIndex: "total_number_of_seniors",
            },
          ]}
        />
      </PageCard>
      <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Socio-economic" />
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Min. value",
              dataIndex: "min-value",
            },
            {
              title: "Max. value",
              dataIndex: "max-value",
            },
            {
              title: "Total number of seniors",
              dataIndex: "total_number_of_seniors",
            },
          ]}
        />
      </PageCard>
      <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Clinical" />
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Min. value",
              dataIndex: "min-value",
            },
            {
              title: "Max. value",
              dataIndex: "max-value",
            },
            {
              title: "Total number of seniors",
              dataIndex: "total_number_of_seniors",
            },
          ]}
        />
      </PageCard> */}
    </Flex>
  );
};

export default CareFosiList;
