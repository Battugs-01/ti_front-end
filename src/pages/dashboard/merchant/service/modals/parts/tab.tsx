import React from "react";
import { Tabs } from "antd";

type Props = {
  companyItems?: React.ReactNode;
  settingsItems?: React.ReactNode;
  tab?: string;
  setTab?: (value: string) => void;
};
export const ServiceTab = ({
  settingsItems,
  companyItems,
  tab,
  setTab,
}: Props) => {
  return (
    <Tabs
      activeKey={tab}
      onChange={(value) => setTab?.(value)}
      items={[
        {
          key: "company",
          label: "Company info",
          children: (
            <div>
              <div className="mb-14" />
              {companyItems}
            </div>
          ),
        },
        {
          key: "settings",
          label: " Settings",
          children: (
            <div>
              <div className="mb-14" />
              {settingsItems}
            </div>
          ),
        },
      ]}
    />
  );
};
