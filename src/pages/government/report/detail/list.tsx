import moment from "moment";
import { ItemInterface } from "service/gov-report";
import { Item } from "./item";

type ListType = {
  data?: ItemInterface[];
};

export const List: React.FC<ListType> = ({ data }) => {
  return (
    <div>
      <div>
        {data?.map((card, key) => (
          <Item
            key={key}
            year={card?.year}
            orphanName={card?.orphanName}
            status={card?.status}
            date={moment(card?.date).format("l")}
          />
        ))}
      </div>
    </div>
  );
};
