import { Button, Space } from "antd";
import { IfCondition } from "components/index";
import { Fragment, useState } from "react";
import { CommissionList } from "./commission";
import { SubscriptionList } from "./subscription";
type Props = {
  serviceId: number;
};
export const PaymentTab = ({ serviceId }: Props) => {
  const [tab, setTab] = useState("commission");

  return (
    <Fragment>
      <Space.Compact size="large" className="mt-6">
        <Button
          onClick={() => setTab("subscription")}
          className={`${
            tab === "subscription" && " bg-gray-50 "
          } text-gray-700 font-medium text-sm`}
        >
          Subscription
        </Button>
        <Button
          onClick={() => setTab("commission")}
          className={`${
            tab === "commission" && " bg-gray-50 "
          } text-gray-700 font-medium text-sm`}
        >
          Commission
        </Button>
      </Space.Compact>
      <IfCondition
        condition={tab === "subscription"}
        whenTrue={<SubscriptionList serviceId={serviceId} />}
      />

      <IfCondition
        condition={tab === "commission"}
        whenTrue={<CommissionList serviceId={serviceId} />}
      />
    </Fragment>
  );
};
