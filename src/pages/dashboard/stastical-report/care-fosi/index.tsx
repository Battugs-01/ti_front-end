import { Flex } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";

const CareFosiList: React.FC = () => {
  return (
    <Flex vertical gap="large">
      <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Functional" />
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
            {
              title: "Seniors need assessment",
              dataIndex: "seniors_need_assessment",
            },
          ]}
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
