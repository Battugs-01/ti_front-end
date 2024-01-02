import { Tabs, Tooltip } from "antd";
import { IfCondition } from "components/index";
import { FC, useState } from "react";
import ConfirmedTab from "./confirmed";
import { OrderForm } from "./form";
import AllTab from "./all";
import UnpaidTab from "./unpaid";
import NotPickedUpTab from "./not_picked_up";

enum TabType {
  all = "all",
  confirmed = "confirmed",
  unpaid = "unpaid",
  not_picked_up = "not_picked_up",
}

const OrderPage: FC = () => {
  const [tab, setTab] = useState<TabType>(TabType.all);

  return (
    <>
      <Tabs
        onChange={(key) => {
          setTab(key as TabType);
        }}
        defaultActiveKey={tab}
        items={[
          {
            key: TabType.all,
            label: <Tooltip title="All Orders">All</Tooltip>
          },
          {
            key: TabType.confirmed,
            label: <Tooltip title="Confirmed Orders">Confirmed</Tooltip>,
          },
          {
            key: TabType.unpaid,
            label: <Tooltip title="Unpaid Orders">Unpaid</Tooltip>,
          },
          {
            key: TabType.not_picked_up,
            label: <Tooltip title="Not Picked Up Orders">Not Picked Up</Tooltip>,
          },
        ]}
      />
      {/* Order Form */}
      <OrderForm />

      {/* Tab */}
      <div className="space-y-3 mt-4">
        <IfCondition
          condition={tab === TabType.all}
          whenTrue={<AllTab />}
        />
        <IfCondition
          condition={tab === TabType.confirmed}
          whenTrue={<ConfirmedTab />}
        />
        <IfCondition
          condition={tab === TabType.unpaid}
          whenTrue={<UnpaidTab />}
        />
        <IfCondition
          condition={tab === TabType.not_picked_up}
          whenTrue={<NotPickedUpTab />}
        />
      </div>
    </>
  );
};

export default OrderPage;
