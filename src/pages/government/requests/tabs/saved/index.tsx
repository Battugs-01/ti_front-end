import { Avatar, Card } from "antd";
import { FilterForm } from "components/filter";
import React, { useMemo } from "react";
import List from "../../components/list";
import moment from "moment";
import { CardData } from "service/gov-requests";

type SavedType = {
  data: CardData[];
};

const Saved: React.FC<SavedType> = ({ data }) => {
  const savedData = useMemo(
    () => data?.filter((value) => value?.state === 0),
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
        {savedData?.map((card, key) => (
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

export default Saved;
