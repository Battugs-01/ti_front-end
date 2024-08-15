import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { useIntl } from "react-intl";

const DevelopmentPlan: React.FC = () => {
  const intl = useIntl();
  return (
    <div className="flex flex-col gap-6">
      <PageCard xR>
        <InitTableHeader
          customHeaderTitle={intl.formatMessage({ id: "seniors_dev_plan" })}
          hideCreate
        />
        <ITable
          className="p-0 remove-padding-table"
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
              title: intl.formatMessage({ id: "risk_level" }),
              dataIndex: "risk_level",
            },
            {
              title: intl.formatMessage({ id: "cfs_score" }),
              dataIndex: "cfs_score",
            },
            {
              title: intl.formatMessage({ id: "agency" }),
              dataIndex: "agency",
            },
            {
              title: intl.formatMessage({ id: "total_assessment" }),
              dataIndex: "total_assessment",
            },
            {
              title: intl.formatMessage({ id: "list_assessment_date" }),
              dataIndex: "list_assessment_date",
            },
            {
              title: intl.formatMessage({ id: "caregiver" }),
              dataIndex: "caregiver",
            },
            {
              title: intl.formatMessage({ id: "person_in_charge" }),
              dataIndex: "person_in_charge",
            },
            {
              title: intl.formatMessage({ id: "development_plan" }),
              dataIndex: "development_plan",
            },
            {
              title: intl.formatMessage({ id: "address" }),
              dataIndex: "address",
            },
          ]}
        />
      </PageCard>
      <PageCard xR>
        <InitTableHeader
          customHeaderTitle={intl.formatMessage({ id: "development_plan" })}
          hideCreate
        />
        <ITable
          className="p-0 remove-padding-table"
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
              title: intl.formatMessage({ id: "risk_level" }),
              dataIndex: "risk_level",
            },
            {
              title: intl.formatMessage({ id: "cfs_score" }),
              dataIndex: "cfs_score",
            },
            {
              title: intl.formatMessage({ id: "agency" }),
              dataIndex: "agency",
            },
            {
              title: intl.formatMessage({ id: "total_assessment" }),
              dataIndex: "total_assessment",
            },
            {
              title: intl.formatMessage({ id: "list_assessment_date" }),
              dataIndex: "list_assessment_date",
            },
            {
              title: intl.formatMessage({ id: "caregiver" }),
              dataIndex: "caregiver",
            },
            {
              title: intl.formatMessage({ id: "person_in_charge" }),
              dataIndex: "person_in_charge",
            },
            {
              title: intl.formatMessage({ id: "development_plan" }),
              dataIndex: "development_plan",
            },
            {
              title: intl.formatMessage({ id: "address" }),
              dataIndex: "address",
            },
          ]}
        />
      </PageCard>
    </div>
  );
};

export default DevelopmentPlan;
