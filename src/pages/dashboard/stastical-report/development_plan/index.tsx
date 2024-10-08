import { Radio } from "antd";
import { IfCondition } from "components/index";
import { DevelopmentPlanReportTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ByAgency } from "./by_agency";
import { ByCaseManager } from "./by_casemanager";
import { ManagementReport } from "./management_report";

export const DevelopmentPlanReport: React.FC = () => {
  const [tab, setTab] = useState<DevelopmentPlanReportTab>(
    DevelopmentPlanReportTab.by_agency
  );
  return (
    <>
      <Radio.Group
        className="mb-4"
        value={tab}
        onChange={(e) => setTab(e.target.value)}
        optionType="button"
        size="large"
        options={[
          {
            value: DevelopmentPlanReportTab.by_agency,
            label: (
              <div className="font-semibold text-primary-700">
                <FormattedMessage id="by_agency" />
              </div>
            ),
          },
          {
            value: DevelopmentPlanReportTab.management_report,
            label: (
              <div className="font-semibold text-primary-700">
                <FormattedMessage id="management_report" />
              </div>
            ),
          },
          {
            value: DevelopmentPlanReportTab.by_case_manager,
            label: (
              <div className="font-semibold text-primary-700">
                <FormattedMessage id="by_case_manager" />
              </div>
            ),
          },
        ]}
      />
      <IfCondition
        condition={DevelopmentPlanReportTab.by_agency === tab}
        whenTrue={<ByAgency />}
      />
      <IfCondition
        condition={DevelopmentPlanReportTab.management_report === tab}
        whenTrue={<ManagementReport />}
      />
      <IfCondition
        condition={DevelopmentPlanReportTab.by_case_manager === tab}
        whenTrue={<ByCaseManager />}
      />
    </>
  );
};
