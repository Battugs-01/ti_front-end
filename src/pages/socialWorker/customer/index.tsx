import { Radio } from "antd";
import IBadge from "components/badge";
import { IfCondition } from "components/condition";
import { Fragment, useState } from "react";
import { RequestType } from "service/social-worker/customer/type";
import { All } from "./tabs/all";

const data = [
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 0,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 2,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 3,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 0,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 0,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 3,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 2,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 3,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 2,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 0,
    date: Date.now(),
  },
];

const CustomerPage: React.FC = () => {
  const [tab, setTab] = useState<String>(RequestType.all);

  return (
    <Fragment>
      <Radio.Group
        defaultValue={RequestType.all}
        onChange={(e) => setTab(e.target.value)}
      >
        <Radio.Button value={RequestType.all}>
          <div className="flex items-center gap-2">
            <div>Бүгд</div> <IBadge title="6" color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.saved}>
          <div className="flex items-center gap-2">
            <div>Хадгалагдсан</div> <IBadge title="3" color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.putOnHold}>
          <div className="flex items-center gap-2">
            <div>Хүлээлэгт оруулсан</div> <IBadge title="1" color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.returned}>
          <div className="flex items-center gap-2">
            <div>Буцаагдсан</div> <IBadge title="1" color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.requestSend}>
          <div className="flex items-center gap-2">
            <div>Хүсэлт илгээсэн</div> <IBadge title="1" color="gray" />
          </div>
        </Radio.Button>
      </Radio.Group>
      <IfCondition
        condition={tab === RequestType.all}
        whenTrue={<All data={data} />}
      />
      <IfCondition
        condition={tab === RequestType.saved}
        whenTrue={<All data={data?.filter((val,index)=>val.state===0)} />}
      />
      <IfCondition
        condition={tab === RequestType.putOnHold}
        whenTrue={<All data={data?.filter((val,index)=>val.state===3)} />}
      />
      <IfCondition
        condition={tab === RequestType.returned}
        whenTrue={<All data={data?.filter((val,index)=>val.state===2)} />}
      />
      <IfCondition
        condition={tab === RequestType.requestSend}
        whenTrue={<All data={data?.filter((val,index)=>val.state===1)} />}
      />
    </Fragment>
  );
};

export default CustomerPage;
