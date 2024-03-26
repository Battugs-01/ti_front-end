import moment from "moment";
import { CardData } from "service/gov-requests";
import List from "../../components/list";
type AllType = {
  data: CardData[];
};

const All: React.FC<AllType> = ({ data }) => {
  return (
    <div>
      {data?.map((card, key) => (
        <List key={key} data={card} />
      ))}
    </div>
  );
};

export default All;
