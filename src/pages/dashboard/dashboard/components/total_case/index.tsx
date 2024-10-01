import { Radio, Segmented } from "antd";
import { ICard } from "components/card";
import { IfCondition } from "components/condition";
import { TotalCaseTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Sex, TotalCaseInterface } from "service/dashboard/type";
import { Age } from "./tab/age";
import { Gender } from "./tab/gender";
import { Level } from "./tab/level";

interface TotalCaseProps {
  data?: TotalCaseInterface;
}

export const TotalCase: React.FC<TotalCaseProps> = ({ data }) => {
  const [tab, setTab] = useState<TotalCaseTab>(TotalCaseTab.level);
  // if (!data) {
  //   return <PageLoading />;
  // }
  return (
    <ICard xR yR>
      <p className="pl-8 text-xl font-semibold">
        <FormattedMessage id="total_case" />
      </p>
      <div className="text-center mb-3">
        <Radio.Group
          value={tab}
          optionType="button"
          onChange={(e) => {
            setTab(e.target.value);
          }}
          options={[
            {
              label: <FormattedMessage id="dashboard_levels" />,
              value: TotalCaseTab.level,
            },
            {
              label: <FormattedMessage id="dashboard_age" />,
              value: TotalCaseTab.age,
            },
            {
              label: <FormattedMessage id="dashboard_gender" />,
              value: TotalCaseTab.gender,
            },
          ]}
          size="large"
        />
      </div>
      <IfCondition
        condition={tab === TotalCaseTab.level}
        whenTrue={<Level data={data?.levels || []} />}
      />
      <IfCondition
        condition={tab === TotalCaseTab.age}
        whenTrue={<Age data={data?.ages || {}} />}
      />
      <IfCondition
        condition={tab === TotalCaseTab.gender}
        whenTrue={<Gender data={data?.sex as Sex} />}
      />
    </ICard>
  );
};
