import { SetStateAction, useState } from "react";
import Header from "./components/header";
import { DetailType } from "service/gov-requests";

const data = [
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
    id: 95,
  },
];

const CaregiverDetail: React.FC = () => {
  const [tab, setTab] = useState<String>(DetailType.history);
  const changeTab = (e: SetStateAction<String>) => {
    setTab(e);
  };
  return (
    <div>
      <div className="custom-ant-card-padding-border-remove">
        <Header changeTab={changeTab} data={data} />
      </div>
    </div>
  );
};
export default CaregiverDetail;
