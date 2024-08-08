import { Radio, Space } from "antd";
import { PageCard } from "components/card";
import { ExportButton } from "components/index";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";

const DevelopmentPlan: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageCard xR>
        <InitTableHeader
          customHeaderTitle="Seniors with no development plan"
          hideCreate
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    ["Development Plan"],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
            </div>
          }
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
              title: "Address",
              dataIndex: "address",
            },
          ]}
        />
      </PageCard>
      <PageCard xR>
        <InitTableHeader
          customHeaderTitle="Development Plan"
          hideCreate
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    ["Development Plan"],
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
            {
              title: "Address",
              dataIndex: "address",
            },
          ]}
        />
      </PageCard>
    </div>
  );
};

export default DevelopmentPlan;
