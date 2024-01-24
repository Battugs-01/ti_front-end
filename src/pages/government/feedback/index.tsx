import { Tabs } from "antd";
import { FeedbackType } from "service/gov-feedback/type";
import InfoIcon from "assets/icons/info-circle.svg";
import { useState } from "react";
import Badge from "components/badge";
import { IfCondition } from "components/condition";
import Decide from "./tabs/decide";
import Decided from "./tabs/decided";
import Transfered from "./tabs/transfered";

const items = [
  {
    key: FeedbackType.decide,
    label: "Шийдвэрлэх",
    title: "20",
  },
  {
    key: FeedbackType.transfered,
    label: "Хариуцсан байгууллагад шилжүүлсэн",
    title: "12",
    icon: InfoIcon,
  },
  {
    key: FeedbackType.decided,
    label: "Шийдвэрлэсэн",
    title: "6",
  },
];
const FeedbackPage: React.FC = () => {
  const [tab, setTab] = useState<String>(FeedbackType.decide);

  return (
    <div>
      <div className="px-4 pt-4 bg-white border border-gray-200 rounded-xl mb-4 flex-col gap-4">
        <div className="text-lg font-semibold">Санал, Хүсэлт</div>
        <Tabs
          defaultActiveKey={FeedbackType.decide}
          onChange={(e) => setTab(e)}
          items={items?.map((el) => {
            return {
              key: el?.key,
              label: (
                <div className="flex items-center gap-2">
                  {el?.icon && <img src={el?.icon} />}
                  {el?.label}
                  {el?.title && <Badge title={el?.title} color="red" />}
                </div>
              ),
            };
          })}
        />
      </div>
      <IfCondition
        condition={tab === FeedbackType.decide}
        whenTrue={<Decide />}
      />
      <IfCondition
        condition={tab === FeedbackType.decided}
        whenTrue={<Decided />}
      />
      <IfCondition
        condition={tab === FeedbackType.transfered}
        whenTrue={<Transfered />}
      />
    </div>
  );
};

export default FeedbackPage;
