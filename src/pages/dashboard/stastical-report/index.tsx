import { Radio, Segmented } from "antd";
import { IfCondition } from "components/condition";
import { StatisticalTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ManagementReport } from "./management_report";
import { ClosedCaseReport } from "./closed_case_report";
import { CaseManagerReport } from "./case_manager_report";
import { ReportLog } from "./report_log";
import { Statistical } from "./statistical_report";

const StasticalReport = () => {
  const [tab, setTab] = useState<StatisticalTab>(StatisticalTab.management_report);
  return (
    <>
      <Radio.Group
        optionType="button"
        options={[
          {
            value: StatisticalTab.management_report,
            label: <div className="font-semibold text-primary-700"><FormattedMessage id="management_report"/></div>,
          },
          {
            value: StatisticalTab.closed_case_report,
            label: <div className="font-semibold text-primary-700"><FormattedMessage id="closed_case_report" /></div>,
          },
          {
            value: StatisticalTab.case_manager_report,
            label: <div className="font-semibold text-primary-700"><FormattedMessage id="case_manager_report" /></div>,
          },
          {
            value: StatisticalTab.report_log,
            label: <div className="font-semibold text-primary-700"><FormattedMessage id="report_log" /></div>,
          },
          {
            value: StatisticalTab.statistical_report,
            label: <div className="font-semibold text-primary-700"><FormattedMessage id="statistical_report" /></div>,
          },
          {
            value: StatisticalTab.care_foci,
            label: <div className="font-semibold text-primary-700"><FormattedMessage id="care_foci" /></div>,
          },
          {
            value: StatisticalTab.statistic_report,
            label: <div className="font-semibold text-primary-700"><FormattedMessage id="statistic_report" /></div>,
          },
        ]}
        value={tab}
        size="large"
        onChange={(e) => setTab(e.target.value)}
      />
      <div className="mt-7"></div>
      <IfCondition
        condition={StatisticalTab.management_report === tab}
        whenTrue={<ManagementReport />}
      />
      <IfCondition
        condition={StatisticalTab.closed_case_report === tab}
        whenTrue={<ClosedCaseReport />}
      />
      <IfCondition
        condition={StatisticalTab.case_manager_report === tab}
        whenTrue={<CaseManagerReport />}
      />
      <IfCondition
        condition={StatisticalTab.report_log === tab}
        whenTrue={<ReportLog />}
      />
      <IfCondition
        condition={StatisticalTab.statistical_report === tab}
        whenTrue={<Statistical />}
      />
      <IfCondition
        condition={StatisticalTab.care_foci === tab}
        whenTrue={<div>Care Foci</div>}
      />
      <IfCondition
        condition={StatisticalTab.statistic_report === tab}
        whenTrue={<div>Statistic Report</div>}
      />
    </>
  );
};

export default StasticalReport;
