import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Button, Card, notification } from "antd";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import developmentPlan from "service/development_plan";
import { DownloadCloud02, LineChartUp05, Printer } from "untitledui-js-base";
import { useLevelContext } from "../selected-level";
import DevPlanTables from "./tables";
import { CareFoci } from "pages/dashboard/stastical-report/care_foci";
import { CareFociEnum } from "config";

const DevPlanEdit: React.FC = () => {
  const { selectedLevel } = useLevelContext();

  const devPlanData = useRequest(developmentPlan.getDetail, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    devPlanData.run(selectedLevel?.id || 0);
  };

  useEffect(() => {
    if (selectedLevel) {
      run();
    }
  }, [selectedLevel]);

  if (!selectedLevel) {
    return <PageLoading />;
  }

  const generalData =
    devPlanData.data?.items
      .filter((item) => item?.valuation_id)
      .flatMap((item) => item?.general_items || []) || [];

  const physicalConditionData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.physicalCondition)
      .flatMap((item) => item?.care_foci_items || []) || [];

  const psychologyChangeData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.psychologyChange)
      .flatMap((item) => item?.care_foci_items || []) || [];

  const EconemyData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.Econemy)
      .flatMap((item) => item?.care_foci_items || []) || [];

  const HealthRiskData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.HealthRisk)
      .flatMap((item) => item?.care_foci_items || []) || [];

  return (
    <>
      <Card
        title={
          <div className="text-xl font-semibold flex gap-4 items-center mt-3">
            <LineChartUp05 className="text-primary-700" />
            <FormattedMessage id="development_plan" />
          </div>
        }
        extra={
          <div className="flex flex-wrap gap-4 mt-3">
            <Button
              size="large"
              type="default"
              icon={<DownloadCloud02 />}
              className="flex items-center gap-2"
            >
              <FormattedMessage id="download" />
            </Button>
            <Button
              size="large"
              type="default"
              icon={<Printer />}
              className="flex items-center gap-2"
            >
              <FormattedMessage id="print" />
            </Button>
          </div>
        }
        className="card-header-remove mt-6"
      >
        <DevPlanTables name="general" data={generalData} isEvaluated={false} />
        <DevPlanTables
          name="physical_condition"
          data={physicalConditionData}
          isEvaluated={true}
        />
        <DevPlanTables
          name="psychology_change"
          data={psychologyChangeData}
          isEvaluated={true}
        />
        <DevPlanTables
          name="economy_diff"
          data={EconemyData}
          isEvaluated={true}
        />
        <DevPlanTables
          name="health_risk"
          data={HealthRiskData}
          isEvaluated={true}
        />
        {/* <DevPlanTables name="general" data={generalData} /> */}
        {/* <DevPlanTables name="general" data={generalData} /> */}
      </Card>
    </>
  );
};

export default DevPlanEdit;
