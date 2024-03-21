import { Radio, Tabs } from "antd";
import Badge from "components/badge";
import React, { useState } from "react";
import { CaregiverType, RequestType } from "service/gov-requests";
import InfoIcon from "assets/icons/info-circle.svg";
import { IfCondition } from "components/condition";
import All from "./tabs/all";
import TakingCare from "./tabs/takingCare";
import Saved from "./tabs/saved";
import PutOnHold from "./tabs/putOnHold";
import Registered from "./tabs/registered";
import Died from "./tabs/died";
import ForcedRelease from "./tabs/forcedRelease";
import ReleasedOwnRequest from "./tabs/releasedOwnRequest";
import Header from "./header";
import { FilterForm } from "components/filter";

const data = [
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 0,
    date: Date.now(),
    id: 12,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
    id: 95,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 2,
    date: Date.now(),
    id: 92,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 3,
    date: Date.now(),
    id: 90,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 4,
    date: Date.now(),
    id: 89,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 4,
    date: Date.now(),
    id: 36,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 0,
    date: Date.now(),
    id: 15,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 0,
    date: Date.now(),
    id: 25,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
    id: 34,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 2,
    date: Date.now(),
    id: 56,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 3,
    date: Date.now(),
    id: 67,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 5,
    date: Date.now(),
    id: 13,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 4,
    date: Date.now(),
    id: 54,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 4,
    date: Date.now(),
    id: 34,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 0,
    date: Date.now(),
    id: 22,
  },
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 6,
    id: 21,
    date: Date.now(),
  },
];
// const items = [
//   {
//     key: RequestType.decide,
//     label: "Шийдвэрлэх",
//     title: "20",
//   },
//   {
//     key: RequestType.saved,
//     label: "Хадгалсан",
//     title: "12",
//     icon: InfoIcon,
//   },
//   {
//     key: RequestType.putOnHold,
//     label: "Хүлээлэгт оруулсан",
//     title: "6",
//   },
//   {
//     key: RequestType.migration,
//     label: "Шилжилт хөдөлгөөн",
//     title: "2",
//   },
//   {
//     key: RequestType.decided,
//     label: "Шийдвэрлэсэн",
//   },
// ];
const items = [
  {
    key: CaregiverType.all,
    label: "Бүгд",
    title: "20",
  },
  {
    key: CaregiverType.distribute,
    label: "Хуваарилсан",
    title: "6",
  },
  {
    key: CaregiverType.takingCare,
    label: "Үйлчлүүлж байгаа",
  },
  {
    key: CaregiverType.putOnHold,
    label: "Хүлээлэгт орсон",
  },
  {
    key: CaregiverType.canceled,
    label: "Цуцлагдсан",
  },
];
const RequestPage: React.FC = () => {
  const [tab, setTab] = useState<String>(CaregiverType.all);
  return (
    <div className={`w-full custom-ant-card-padding-remove`}>
      <div className="px-4 pt-4 bg-white border border-gray-200 rounded-xl mb-4 flex-col gap-4">
        <div className="text-lg font-semibold">Үйлчлүүлэгчид</div>
        <Tabs
          defaultActiveKey={CaregiverType.all}
          onChange={(e) => setTab(e)}
          items={items?.map((el) => {
            return {
              key: el?.key,
              label: (
                <div className="flex items-center gap-2">
                  {el?.label}
                  {el.title && <Badge title={el.title} color="gray" />}
                </div>
              ),
            };
          })}
        />
      </div>
      <div className="mb-4">
        <FilterForm />
      </div>
      <IfCondition
        condition={tab === CaregiverType.all}
        whenTrue={
          <Header>
            <All data={data} />
          </Header>
        }
      />
      <IfCondition
        condition={tab === CaregiverType.takingCare}
        whenTrue={
          <Header>
            {" "}
            <TakingCare data={data.filter((v) => v.state === 3)} />{" "}
          </Header>
        }
      />
      <IfCondition
        condition={tab === CaregiverType.saved}
        whenTrue={
          <Header>
            <Saved data={data.filter((v) => v.state === 0)} />
          </Header>
        }
      />
      <IfCondition
        condition={tab === CaregiverType.putOnHold}
        whenTrue={
          <Header>
            <PutOnHold data={data.filter((v) => v.state === 1)} />
          </Header>
        }
      />
      <IfCondition
        condition={tab === CaregiverType.registered}
        whenTrue={
          <Header>
            <Registered data={data.filter((v) => v.state === 2)} />
          </Header>
        }
      />
      <IfCondition
        condition={tab === CaregiverType.died}
        whenTrue={
          <Header>
            <Died data={data.filter((v) => v.state === 5)} />
          </Header>
        }
      />
      <IfCondition
        condition={tab === CaregiverType.forcedReleace}
        whenTrue={
          <Header>
            <ForcedRelease data={data.filter((v) => v.state === 6)} />
          </Header>
        }
      />
      <IfCondition
        condition={tab === CaregiverType.releasedOwnRequest}
        whenTrue={
          <Header>
            <ReleasedOwnRequest data={data.filter((v) => v.state === 4)} />
          </Header>
        }
      />
    </div>
  );
};

export default RequestPage;
