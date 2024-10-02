import { Radio } from "antd";
import { IfCondition } from "components/index";
import { StatisticalReportTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { AgeAndGender } from "./age_and_gender";
import { ByLevel } from "./by_level";

export const Statistical: React.FC = () => {
  const [tab, setTab] = useState<StatisticalReportTab>(
    StatisticalReportTab.by_level
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
            value: StatisticalReportTab.by_level,
            label: (
              <div className="font-semibold text-primary-700">
                <FormattedMessage id="by_level" />
              </div>
            ),
          },
          {
            value: StatisticalReportTab.age_and_gender,
            label: (
              <div className="font-semibold text-primary-700">
                <FormattedMessage id="age_and_gender" />
              </div>
            ),
          },
        ]}
      />
      <IfCondition
        condition={StatisticalReportTab.by_level === tab}
        whenTrue={<ByLevel />}
      />
      <IfCondition
        condition={StatisticalReportTab.age_and_gender === tab}
        whenTrue={<AgeAndGender />}
      />
    </>
  );
};
