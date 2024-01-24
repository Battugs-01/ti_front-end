import { Radio } from "antd";
import IBadge from "components/badge";
import { IfCondition } from "components/condition";
import { useState } from "react";
import { DecideType } from "service/gov-feedback/type";
import All from "./tabs/all";

const Decide: React.FC = () => {
  const [tab, setTab] = useState<String>(DecideType.all);
  return (
    <div>
      <div>
        <Radio.Group
          defaultValue={DecideType.all}
          onChange={(e) => setTab(e.target.value)}
        >
          <Radio.Button value={DecideType.all}>
            <div className="flex items-center gap-2">
              <div>Бүгд</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={DecideType.graditute}>
            <div className="flex items-center gap-2">
              <div>Талархал</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={DecideType.complaint}>
            <div className="flex items-center gap-2">
              <div>Гомдол</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={DecideType.offer}>
            <div className="flex items-center gap-2">
              <div>Санал</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={DecideType.request}>
            <div className="flex items-center gap-2">
              <div>Хүсэлт</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={DecideType.criticism}>
            <div className="flex items-center gap-2">
              <div>Шүүмжлэл</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
        </Radio.Group>
      </div>
      <IfCondition condition={tab === DecideType.all} whenTrue={<All />} />
    </div>
  );
};
export default Decide;
