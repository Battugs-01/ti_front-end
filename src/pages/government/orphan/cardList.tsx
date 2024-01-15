import { CardInterface } from "service/gov-orphan";
import Item from "./components/card";

type CardListType = {
  data: CardInterface[];
};
const CardList: React.FC<CardListType> = ({ data }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 custom-ant-card-padding-remove">
        {data?.map((card, key) => (
          <Item
            key={key}
            orphanName={card?.orphanName}
            status={card?.status}
            emplopyees={card?.emplopyees}
            plan={card?.plan}
            bedNumber={card?.bedNumber}
            bedNumberMax={card?.bedNumberMax}
            report={card?.report}
            reportMax={card?.reportMax}
            donation={card?.donation}
            id={card?.id}
            name={card?.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
