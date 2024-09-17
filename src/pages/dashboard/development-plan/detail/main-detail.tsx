import { Button, Segmented } from "antd";
import { PageCard } from "components/card";
import { IfCondition } from "components/condition";
import { DevelopmentPlanDetailTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  ChartBreakoutSquare,
  DownloadCloud02,
  InfoCircle,
  Printer,
  RefreshCW02,
} from "untitledui-js-base";
import { CreateDevelopmentPlan } from "./create";
import DevelopmentPlanTab from "./tab/development-plan";
import GeneralInfo from "./tab/general-info";

interface MainDetailProps {}

const MainDetail: React.FC<MainDetailProps> = () => {
  const [tab, setTab] = useState<DevelopmentPlanDetailTab>(
    DevelopmentPlanDetailTab.general
  );
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const cancelModal = () => {
    setCreateModalVisible(false);
  };

  return (
    <PageCard>
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between mb-11">
        <Segmented
          size="large"
          className="w-max"
          options={[
            {
              label: (
                <div className="flex items-center gap-2">
                  <InfoCircle />
                  <div>
                    <FormattedMessage id="general_info" />
                  </div>
                </div>
              ),
              value: DevelopmentPlanDetailTab.general,
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <ChartBreakoutSquare />
                  <div>
                    <FormattedMessage id="development_plan" />
                  </div>
                </div>
              ),
              value: DevelopmentPlanDetailTab.development,
            },
          ]}
          onChange={(value) => {
            setTab(value as DevelopmentPlanDetailTab);
          }}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button type="default" size="large" icon={<RefreshCW02 />} />
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
          <Button
            size="large"
            type="primary"
            icon={<ChartBreakoutSquare />}
            className="flex items-center gap-2"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <FormattedMessage id="create_development_plan" />
          </Button>
        </div>
      </div>
      <IfCondition
        condition={DevelopmentPlanDetailTab.general === tab}
        whenTrue={<GeneralInfo />}
      />
      <IfCondition
        condition={DevelopmentPlanDetailTab.development === tab}
        whenTrue={<DevelopmentPlanTab data={[{}]} />}
      />
      {createModalVisible && (
        <CreateDevelopmentPlan
          cancelModal={cancelModal}
          visible={createModalVisible}
        />
      )}
    </PageCard>
  );
};

export default MainDetail;
