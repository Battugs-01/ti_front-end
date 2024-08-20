import { Button, Divider, Radio } from "antd";
import { PageCard } from "components/card";
import { IfCondition } from "components/condition";
import { DevelopmentPlanDetailTab } from "config";
import { useState } from "react";
import {
  ChartBreakoutSquare,
  InfoCircle,
  DownloadCloud02,
  Printer,
  RefreshCW02,
} from "untitledui-js-base";
import GeneralInfo from "./tab/general-info";
import DevelopmentPlanTab from "./tab/development-plan";
import { CreateDevelopmentPlan } from "./create";
import { FormattedMessage } from "react-intl";

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
        <Radio.Group
          defaultValue={DevelopmentPlanDetailTab.general}
          size="large"
          onChange={(e) => {
            setTab(e.target.value);
          }}
        >
          <Radio.Button value={DevelopmentPlanDetailTab.general}>
            <div className="flex items-center gap-2">
              <InfoCircle />
              <div>
                <FormattedMessage id="general_info" />
              </div>
            </div>
          </Radio.Button>
          <Radio.Button value={DevelopmentPlanDetailTab.development}>
            <div className="flex items-center gap-2">
              <ChartBreakoutSquare />
              <div>
                <FormattedMessage id="development_plan" />
              </div>
            </div>
          </Radio.Button>
        </Radio.Group>
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
