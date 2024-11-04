import { CheckboxOptionType, Radio } from "antd";
import { IfCondition } from "components/condition";
import { StatisticalTab, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CareFoci } from "./care_foci";
import { CaseManagerReport } from "./case_manager_report";
import { ClosedCaseReport } from "./closed_case_report";
import { DevelopmentPlanReport } from "./development_plan";
import { ManagementReport } from "./management_report";
import { ReportLog } from "./report_log";
import { Statistical } from "./statistical_report";

const StasticalReport = () => {
  const [user] = useContext(AuthContext);
  let options: any[] | undefined = [];
  const [tab, setTab] = useState<StatisticalTab>(StatisticalTab.care_foci);
  if (user?.user?.role === UserRoleType.case_manager) {
    options = [
      {
        value: StatisticalTab.care_foci,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="care_foci" />
          </div>
        ),
      },
      {
        value: StatisticalTab.case_manager_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="case_manager_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.development_plan,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="development_plan_report" />
          </div>
        ),
      },
    ];
  } else if (user?.user?.role === UserRoleType.case_associate) {
    options = [
      {
        value: StatisticalTab.care_foci,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="care_foci" />
          </div>
        ),
      },
      {
        value: StatisticalTab.case_manager_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="case_manager_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.development_plan,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="development_plan_report" />
          </div>
        ),
      },
    ];
  } else if (user?.user?.role === UserRoleType.senior_case_manager) {
    options = [
      {
        value: StatisticalTab.care_foci,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="care_foci" />
          </div>
        ),
      },
      {
        value: StatisticalTab.closed_case_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="closed_case_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.statistical_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="statistical_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.development_plan,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="development_plan_report" />
          </div>
        ),
      },
    ];
  } else if (user?.user?.role === UserRoleType.doctor) {
    options = [
      {
        value: StatisticalTab.care_foci,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="care_foci" />
          </div>
        ),
      },
      {
        value: StatisticalTab.closed_case_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="closed_case_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.statistical_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="statistical_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.development_plan,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="development_plan_report" />
          </div>
        ),
      },
    ];
  } else if (user?.user?.role === UserRoleType.operation_manager) {
    options = [
      {
        value: StatisticalTab.care_foci,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="care_foci" />
          </div>
        ),
      },
      {
        value: StatisticalTab.closed_case_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="closed_case_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.statistical_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="statistical_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.management_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="management_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.report_log,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="report_log" />
          </div>
        ),
      },
      {
        value: StatisticalTab.development_plan,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="development_plan_report" />
          </div>
        ),
      },
    ];
  } else if (user?.user?.role === UserRoleType.admin) {
    options = [
      {
        value: StatisticalTab.care_foci,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="care_foci" />
          </div>
        ),
      },
      {
        value: StatisticalTab.closed_case_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="closed_case_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.statistical_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="statistical_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.management_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="management_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.report_log,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="report_log" />
          </div>
        ),
      },
      {
        value: StatisticalTab.development_plan,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="development_plan_report" />
          </div>
        ),
      },
    ];
  } else if (user?.user?.role === UserRoleType.super_admin) {
    options = [
      {
        value: StatisticalTab.care_foci,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="care_foci" />
          </div>
        ),
      },
      {
        value: StatisticalTab.statistical_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="statistical_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.development_plan,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="development_plan_report" />
          </div>
        ),
      },
    ];
  } else if (user?.user?.role === UserRoleType.stack_holder) {
    options = [
      {
        value: StatisticalTab.care_foci,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="care_foci" />
          </div>
        ),
      },
      {
        value: StatisticalTab.statistical_report,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="statistical_report" />
          </div>
        ),
      },
      {
        value: StatisticalTab.development_plan,
        label: (
          <div className="font-semibold text-primary-700">
            <FormattedMessage id="development_plan_report" />
          </div>
        ),
      },
    ];
  }
  return (
    <>
      <Radio.Group
        optionType="button"
        options={options}
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
        whenTrue={<CareFoci />}
      />
      <IfCondition
        condition={StatisticalTab.development_plan === tab}
        whenTrue={<DevelopmentPlanReport />}
      />
    </>
  );
};

export default StasticalReport;
