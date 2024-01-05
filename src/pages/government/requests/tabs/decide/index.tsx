import { Avatar, Card } from "antd";
import { FilterForm } from "components/filter";
import React from "react";
import List from "../../components/list";
import moment from "moment";
import "../style/index.less";
import { CardData } from "service/gov-requests";

type DecideType = {
  data: CardData[];
};

const Decide: React.FC<DecideType> = ({ data }) => {
  return (
    <Card
      title={
        <div
          className="px-6 py-5"
          style={{ borderBottom: "1px solid #EAECF0" }}
        >
          <FilterForm />
        </div>
      }
    >
      <div>
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
      </div>
    </Card>
  );
};

export default Decide;
