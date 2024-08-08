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

const MainDetail: React.FC = () => {
  const [tab, setTab] = useState<DevelopmentPlanDetailTab>(
    DevelopmentPlanDetailTab.general
  );
  return (
    <PageCard>
      <div className="flex items-center justify-between mb-11">
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
              <div>General Info</div>
            </div>
          </Radio.Button>
          <Radio.Button value={DevelopmentPlanDetailTab.development}>
            <div className="flex items-center gap-2">
              <ChartBreakoutSquare />
              <div>Development Plan</div>
            </div>
          </Radio.Button>
        </Radio.Group>
        <div className="flex items-center gap-3">
          <Button type="default" size="large" icon={<RefreshCW02 />} />
          <Button
            size="large"
            type="default"
            icon={<DownloadCloud02 />}
            className="flex items-center gap-2"
          >
            Download
          </Button>
          <Button
            size="large"
            type="default"
            icon={<Printer />}
            className="flex items-center gap-2"
          >
            Print
          </Button>
          <Button
            size="large"
            type="primary"
            icon={<ChartBreakoutSquare />}
            className="flex items-center gap-2"
          >
            Create Development Plan
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
    </PageCard>
  );
};

export default MainDetail;
