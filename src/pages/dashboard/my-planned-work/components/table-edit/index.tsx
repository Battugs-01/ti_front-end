import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Button, Card } from "antd";
import { CareFociEnum } from "config";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import developmentPlan from "service/development_plan";
import { ScreeningListType } from "service/screening_list/type";
import { DownloadCloud02, LineChartUp05 } from "untitledui-js-base";
import { exportFromTableManyData } from "utils/export";
import PlannedWorkTables from "./tables";

interface PlannedWorkProps {
  customerMainData: ScreeningListType;
  assesment_id: number;
}
const PlannedWork: React.FC<PlannedWorkProps> = ({
  customerMainData,
  assesment_id,
}) => {
  const devPlanData = useRequest(developmentPlan.getDetail, {
    manual: true,
  });

  const run = () => {
    devPlanData.run(assesment_id || 0);
  };

  useEffect(() => {
    if (assesment_id) {
      run();
    }
  }, [assesment_id]);

  if (!assesment_id) {
    return <PageLoading />;
  }

  const generalData =
    devPlanData.data?.items
      .filter((item) => item?.valuation_id)
      .flatMap((item) => item?.general_items || []) || [];

  const loseActivityData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.loseActivity)
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
          <div className="text-xl font-semibold flex gap-4 items-center mt-3 ml-6">
            <LineChartUp05 className="text-primary-700" />
            <FormattedMessage id="development_plan" />
          </div>
        }
        extra={
          <div className="flex flex-wrap gap-4 mt-3 mr-4">
            <Button
              size="large"
              type="default"
              icon={<DownloadCloud02 />}
              onClick={() => {
                exportFromTableManyData(
                  [`Хөгжлийн төлөвлөгөө ${customerMainData?.first_name}`],
                  [
                    "edit-table-general",
                    "edit-table-physical",
                    "edit-table-psychology",
                    "edit-table-economy",
                    "edit-table-health-risk",
                  ],
                  window
                );
              }}
              className="flex items-center gap-2"
            >
              <FormattedMessage id="download" />
            </Button>
          </div>
        }
        className="card-header-remove"
      >
        <div className="flex flex-col gap-6">
          <PlannedWorkTables
            name="general"
            id="edit-table-general"
            data={generalData}
            loading={devPlanData?.loading}
            isEvaluated={false}
            onFinish={async () => {
              run();
            }}
            assesment_id={assesment_id}
          />
          <PlannedWorkTables
            name="lose_activity"
            id="edit-table-physical"
            data={loseActivityData}
            isEvaluated={true}
            loading={devPlanData?.loading}
            onFinish={async () => {
              run();
            }}
            assesment_id={assesment_id}
          />
          <PlannedWorkTables
            name="psychology_change"
            id="edit-table-psychology"
            data={psychologyChangeData}
            isEvaluated={true}
            loading={devPlanData?.loading}
            onFinish={async () => {
              run();
            }}
            assesment_id={assesment_id}
          />
          <PlannedWorkTables
            name="economy_diff"
            id="edit-table-economy"
            data={EconemyData}
            loading={devPlanData?.loading}
            isEvaluated={true}
            onFinish={async () => {
              run();
            }}
            assesment_id={assesment_id}
          />
          <PlannedWorkTables
            name="health_risk"
            id="edit-table-health-risk"
            data={HealthRiskData}
            loading={devPlanData?.loading}
            isEvaluated={true}
            onFinish={async () => {
              run();
            }}
            assesment_id={assesment_id}
          />
        </div>
      </Card>
    </>
  );
};

export default PlannedWork;
