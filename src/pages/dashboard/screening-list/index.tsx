import { Radio } from "antd";
import { PageCard } from "components/card";
import { ExportButton } from "components/index";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";

const ScreeningList: React.FC = () => {
  return (
    <div>
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
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    ["Хөгжлийн төлөвлөгөө"],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
            </div>
          }
          // hideFormFilter={true}
        />
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
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
        />
      </PageCard>
    </div>
  );
};

export default ScreeningList;
