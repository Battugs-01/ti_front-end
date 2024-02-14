import { Radio } from "antd";
import IBadge from "components/badge";
import { IfCondition } from "components/condition";
import { Fragment, useState } from "react";
import { RequestType } from "service/social-worker/customer/type";
import { All } from "./tabs/all";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";

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
  const list = useRequest(() =>
    orphanElderly.elderlyList({ current: 0, pageSize: 20 })
  );
  return (
    <Fragment>
      <Radio.Group
        defaultValue={RequestType.all}
        onChange={(e) => setTab(e.target.value)}
      >
        <Radio.Button value={RequestType.all} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Бүгд</div> <IBadge title="6" color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.saved} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Хадгалагдсан</div> <IBadge title="3" color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.putOnHold} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Хүлээлэгт оруулсан</div> <IBadge title="1" color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.returned} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Буцаагдсан</div> <IBadge title="1" color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.requestSend} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Хүсэлт илгээсэн</div> <IBadge title="1" color="gray" />
          </div>
        </Radio.Button>
      </Radio.Group>
      <IfCondition
        condition={tab === RequestType.all}
        whenTrue={<All data={list?.data?.items} list={list} />}
      />
      {/* <IfCondition
        condition={tab === RequestType.saved}
        whenTrue={<All data={data?.filter((val, index) => val.state === 0)} />}
      />
      <IfCondition
        condition={tab === RequestType.putOnHold}
        whenTrue={<All data={data?.filter((val, index) => val.state === 3)} />}
      />
      <IfCondition
        condition={tab === RequestType.returned}
        whenTrue={<All data={data?.filter((val, index) => val.state === 2)} />}
      />
      <IfCondition
        condition={tab === RequestType.requestSend}
        whenTrue={<All data={data?.filter((val, index) => val.state === 1)} />}
      /> */}
    </Fragment>
  );
};

export default CustomerPage;
