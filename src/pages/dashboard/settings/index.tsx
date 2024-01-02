import { useState } from "react";

import { Tabs, Tooltip } from "antd";
import { IfCondition } from "components/condition";
import { AvatarsTab } from "./avatars";
import { CommissionTab } from "./commission";
import FaqCustomersTab from "./faq/customers";
import FaqMerchantTab from "./faq/merchant";
import SubscriptionTab from "./subscription";
import TermsTab from "./terms";

enum TabType {
  terms = "terms",
  faq_merchant = "faq_merchant",
  faq_customers = "faq_customers",
  language = "language",
  commission = "commission",
  avatars = "avatars",
  subscription = "subscription",
}

const SettingPage = () => {
  const [tab, setTab] = useState<TabType>(TabType.terms);

  return (
    <div className="space-y-3">
      <Tabs
        onChange={(key) => {
          setTab(key as TabType);
        }}
        defaultActiveKey={tab}
        items={[
          {
            key: TabType.terms,
            label: (
              <Tooltip title="Terms of Service Settings">
                Terms of Service
              </Tooltip>
            ),
          },
          {
            key: TabType.faq_merchant,
            label: <Tooltip title="FAQ Settings">FAQ / Merchant</Tooltip>,
          },
          {
            key: TabType.faq_customers,
            label: <Tooltip title="FAQ Settings">FAQ / Customers</Tooltip>,
          },
          {
            key: TabType.commission,
            label: <Tooltip title="Commission Settings">Commission</Tooltip>,
          },
          {
            key: TabType.avatars,
            label: <Tooltip title="Avatars Settings">Avatars</Tooltip>,
          },
          {
            key: TabType.subscription,
            label: (
              <Tooltip title="Subscription Settings">Subscription</Tooltip>
            ),
          },
        ]}
      />

      <IfCondition condition={tab === TabType.terms} whenTrue={<TermsTab />} />
      <IfCondition
        condition={tab === TabType.faq_merchant}
        whenTrue={<FaqMerchantTab />}
      />
      <IfCondition
        condition={tab === TabType.faq_customers}
        whenTrue={<FaqCustomersTab />}
      />
      <IfCondition
        condition={tab === TabType.commission}
        whenTrue={<CommissionTab />}
      />
      <IfCondition
        condition={tab === TabType.avatars}
        whenTrue={<AvatarsTab />}
      />
      <IfCondition
        condition={tab === TabType.subscription}
        whenTrue={<SubscriptionTab />}
      />
    </div>
  );
};

export default SettingPage;
