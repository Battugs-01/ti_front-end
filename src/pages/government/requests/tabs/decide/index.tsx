import { Avatar, Card } from "antd";
import { FilterForm } from "components/filter";
import React from "react";
import List from "../../components/list";
import moment from "moment";
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
];

const Decide: React.FC = () => {
  return (
    <Card>
      <div className="mb-5">
        <FilterForm />
      </div>
      {data?.map((card, key) => (
        <List
          image={card?.image}
          name={card?.name}
          surname={card?.surname}
          registrationNumber={card?.registrationNumber}
          state={card?.state}
          date={moment(card?.date).format("l")}
        />
      ))}
    </Card>
  );
};

export default Decide;
