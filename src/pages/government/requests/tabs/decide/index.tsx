import { Card } from "antd";
import { FilterForm } from "components/filter";
import moment from "moment";
import React from "react";
import { CardData } from "service/gov-requests";
import List from "../../components/list";
type DecideType = {
  data: CardData[];
};

const Decide: React.FC<DecideType> = ({ data }) => {
  return (
    <Card
      title={
        <div
          style={{ borderBottom: "1px solid #EAECF0" }}
          className="px-6 py-5"
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
