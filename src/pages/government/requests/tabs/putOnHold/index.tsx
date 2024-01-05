import { Avatar, Card } from "antd";
import { FilterForm } from "components/filter";
import React, { useMemo } from "react";
import List from "../../components/list";
import moment from "moment";
import { CardData } from "service/gov-requests";

type PutOnHoldType = {
  data: CardData[];
};

const PutOnHold: React.FC<PutOnHoldType> = ({ data }) => {
  const putOnData = useMemo(
    () => data?.filter((value) => value?.state === 1),
    []
  );
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
        {putOnData?.map((card, key) => (
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

export default PutOnHold;
