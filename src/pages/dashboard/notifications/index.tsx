import { Tabs, Tooltip } from "antd";
import { NotificationForm } from "./form";
import { NotificationCustomerList } from "./customers";
import { IfCondition } from "components/condition";
import { useState } from "react";
import { NotificationMerchantList } from "./merchants";
import { SettingsList } from "./settings";

const NotificationPage = () => {
  const [tab, setTab] = useState("customer");
  return (
    <div className="space-y-3">
      <Tabs
        defaultValue={tab}
        onChange={(e) => setTab(e)}
        items={[
          {
            key: "customer",
            label: <Tooltip title="Customer Notifications">Customer</Tooltip>,
          },
          {
            key: "merchant",
            label: <Tooltip title="Merchant Notifications">Merchant</Tooltip>,
          },
          {
            key: "settings",
            label: <Tooltip title="Settings Notifications">Settings</Tooltip>,
          },
        ]}
      />
      <IfCondition
        condition={tab !== "settings"}
        whenTrue={<NotificationForm />}
      />

      <IfCondition
        condition={tab === "customer"}
        whenTrue={<NotificationCustomerList />}
      />
      <IfCondition
        condition={tab === "merchant"}
        whenTrue={<NotificationMerchantList />}
      />
      <IfCondition condition={tab === "settings"} whenTrue={<SettingsList />} />
    </div>
  );
};

export default NotificationPage;
