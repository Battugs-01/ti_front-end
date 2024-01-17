import { UserList } from "service/gov-settings";
import { Item } from "./item";

type ListType = {
  data?: UserList[];
};

export const List: React.FC<ListType> = ({ data }) => {
  return (
    <div>
      {data?.map((item, key) => {
        return <Item key={key} data={item} />;
      })}
    </div>
  );
};
