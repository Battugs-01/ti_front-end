import moment from "moment";
import { CardData } from "service/gov-requests";
import List from "../../components/list";
type SavedType = {
  data: CardData[];
};

const Saved: React.FC<SavedType> = ({ data }) => {
  return (
    <div>
      {data?.map((card, key) => (
        <List
          key={key}
          image={card?.image}
          name={card?.name}
          surname={card?.surname}
          registrationNumber={card?.registrationNumber}
          state={card?.state}
          date={moment(card?.date).format("l")}
          id={card?.id}
        />
      ))}
    </div>
  );
};

export default Saved;
