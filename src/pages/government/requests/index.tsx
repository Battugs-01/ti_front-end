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
    state: 4,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 4,
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
    state: 4,
    date: Date.now(),
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 4,
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
        whenTrue={<Decide data={data} />}
      />
      <IfCondition
        condition={tab === RequestType.saved}
        whenTrue={<Saved data={data?.filter((value) => value?.state === 0)} />}
      />
      <IfCondition
        condition={tab === RequestType.putOnHold}
        whenTrue={<PutOnHold data={data} />}
      />
      <IfCondition
        condition={tab === RequestType.migration}
        whenTrue={<Migration data={data} />}
      />
      <IfCondition
        condition={tab === RequestType.decided}
        whenTrue={<Decided data={data} />}
      />
    </div>
  );
};

export default RequestPage;
