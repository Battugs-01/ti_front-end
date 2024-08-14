import { Radio } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { EditScreenList } from "./edit";
import { useIntl } from "react-intl";

const ScreeningList: React.FC = () => {
  const intl = useIntl();
  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        hideCreate
        leftContent={
          <Radio.Group defaultValue="a" size="large">
            <Radio.Button value="a">All</Radio.Button>
            <Radio.Button value="b">Level 1</Radio.Button>
            <Radio.Button value="c">Level 2</Radio.Button>
            <Radio.Button value="d">Level 3</Radio.Button>
          </Radio.Group>
        }
      />
      <ITable
        dataSource={[
          {
            name: "John Doe",
            register: "2021-09-01",
            phone: "0123456789",
            age: 30,
            gender: "male",
            risk_level: "High",
            cfs_score: 10,
            agency: "Agency",
            total_assessment: 2,
            list_assessment_date: "2021-09-01",
            caregiver: "Caregiver",
            person_in_charge: "Person in charge",
            development_plan: "Development Plan",
          },
        ]}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "name",
          },
          {
            title: "Register",
            dataIndex: "register",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Age",
            dataIndex: "age",
          },
          {
            title: "Gender",
            dataIndex: "gender",
          },
          {
            title: "Risk level",
            dataIndex: "risk_level",
          },
          {
            title: "CFS Score",
            dataIndex: "cfs_score",
          },
          {
            title: "Agency",
            dataIndex: "agency",
          },
          {
            title: "Total Assessment",
            dataIndex: "total_assessment",
          },
          {
            title: "List Assessment Date",
            dataIndex: "list_assessment_date",
          },
          {
            title: "Caregiver",
            dataIndex: "caregiver",
          },
          {
            title: "Person in charge",
            dataIndex: "person_in_charge",
          },
          {
            title: "Development Plan",
            dataIndex: "development_plan",
          },
        ]}
        UpdateComponent={EditScreenList}
      />
    </PageCard>
  );
};

export default ScreeningList;
