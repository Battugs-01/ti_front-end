import { CustomCard, PageCard } from "components/card";
import NotFound from "./not-found";
import { Badge } from "antd";
import dayjs from "dayjs";
import { ITable } from "components/index";
import { FormattedMessage } from "react-intl";

interface DevelopmentPlanTabType {
  data: {}[];
}

const DevelopmentPlanTab: React.FC<DevelopmentPlanTabType> = ({ data }) => {
  if (data?.length === 0 || !data) {
    return <NotFound />;
  }
  return (
    <CustomCard title="Development Plan">
      <div className="flex gap-2 mb-4">
        <div>
          <FormattedMessage id="agency" />{" "}
          <span className="font-bold">“Говь гурван сайхан” ХХК</span>
        </div>
        <Badge status="default" />
        <div>
          <FormattedMessage id="cm_charge" />{" "}
          <span className="font-bold">Гантулга</span>
        </div>
        <Badge status="default" />
        <div>
          <FormattedMessage id="assessment_date" />{" "}
          <span className="font-bold">
            {dayjs(new Date()).format("DD/MM/YYYY")}
          </span>
        </div>
        <Badge status="default" />
        <div>
          <FormattedMessage id="date_next_review" />{" "}
          <span className="font-bold">
            {dayjs(new Date()).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
      <ITable
        className="p-0 remove-padding-table"
        columns={[
          {
            title: "Care Foci",
            dataIndex: "care_foci",
          },
          {
            title: "Intervention",
            dataIndex: "intervention",
          },
          {
            title: "Person in charge",
            dataIndex: "person_in_charge",
          },
          {
            title: "Frequency",
            dataIndex: "frequency",
          },
          {
            title: "Estimated Completion",
            dataIndex: "estimated_completion",
          },
        ]}
      />
    </CustomCard>
  );
};

export default DevelopmentPlanTab;
