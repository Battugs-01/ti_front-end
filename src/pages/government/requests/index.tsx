import { Tabs } from "antd";
import Badge from "components/badge";
import React, { useState } from "react";
import { RequestType } from "service/gov-requests";
import InfoIcon from "assets/icons/info-circle.svg";
import { IfCondition } from "components/condition";
import Decide from "./tabs/decide";
import Saved from "./tabs/saved";
import PutOnHold from "./tabs/putOnHold";
import Migration from "./tabs/migration";
import Decided from "./tabs/decided";

const items = [
  {
    key: RequestType.decide,
    label: "Шийдвэрлэх",
    title: "20",
  },
  {
    key: RequestType.saved,
    label: "Хадгалсан",
    title: "12",
    icon: InfoIcon,
  },
  {
    key: RequestType.putOnHold,
    label: "Хүлээлэгт оруулсан",
    title: "6",
  },
  {
    key: RequestType.migration,
    label: "Шилжилт хөдөлгөөн",
    title: "2",
  },
  {
    key: RequestType.decided,
    label: "Шийдвэрлэсэн",
  },
];
const RequestPage: React.FC = () => {
  const [tab, setTab] = useState<String>(RequestType.decide);
  return (
    <div className="w-full">
      <div className="px-4 pt-4 bg-white border border-gray-200 rounded-xl mb-4 flex-col gap-4">
        <div className="text-lg font-semibold">Хүсэлтүүд</div>
        <Tabs
          defaultActiveKey={RequestType.decide}
          onChange={(e) => setTab(e)}
          items={items?.map((el) => {
            return {
              key: el?.key,
              label: (
                <div className="flex items-center gap-2">
                  {el?.icon && <img src={el?.icon} />}
                  {el?.label}
                  {el.title && <Badge title={el.title} color="red" />}
                </div>
              ),
            };
          })}
        />
      </div>

      <IfCondition
        condition={tab === RequestType.decide}
        whenTrue={<Decide />}
      />
      <IfCondition condition={tab === RequestType.saved} whenTrue={<Saved />} />
      <IfCondition
        condition={tab === RequestType.putOnHold}
        whenTrue={<PutOnHold />}
      />
      <IfCondition
        condition={tab === RequestType.migration}
        whenTrue={<Migration />}
      />
      <IfCondition
        condition={tab === RequestType.decided}
        whenTrue={<Decided />}
      />
    </div>
  );
};

export default RequestPage;
