import { Flex } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useIntl } from "react-intl";
import { ChevronDown, ChevronUp } from "untitledui-js-base";

const CareFosiList: React.FC = () => {
  const intl = useIntl();
  return (
    <Flex vertical gap="large">
      <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Functional" />
        <ITable
          dataSource={[
            {
              name: "John Doe",
              min_value: "2021-09-01",
              max_value: "0123456789",
              total_number_of_seniors: 30,
              seniors_need_assessment: 13,
            },
          ]}
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Min. value",
              dataIndex: "min_value",
            },
            {
              title: "Max. value",
              dataIndex: "max_value",
            },
            {
              title: "Total number of seniors",
              dataIndex: "total_number_of_seniors",
            },
            {
              title: "Seniors need assessment",
              dataIndex: "seniors_need_assessment",
            },
          ]}
          rowKey={(record) => record.name}
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) => {
              if (expanded) {
                return <ChevronUp onClick={(e: any) => onExpand(record, e)} />;
              }
              return (
                <ChevronDown
                  onClick={(e: any) => {
                    onExpand(record, e);
                  }}
                />
              );
            },
            expandedRowRender: (record) => {
              return (
                <ITable
                  columns={[
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
      <PageCard xR>
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
      </PageCard>
    </Flex>
  );
};

export default CareFosiList;
