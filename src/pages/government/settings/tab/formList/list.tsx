import { FormInterface } from "service/gov-settings";
import { Item } from "./item";

type ListType = {
  data: FormInterface[];
};

export const List: React.FC<ListType> = ({ data }) => {
  return (
    <div>
      {data?.map((item, key) => {
        return (
          <Item
            key={key}
            formTitle={item?.formTitle}
            formNo={item?.formNo}
            id={item?.id}
          />
        );
      })}
    </div>
  );
};
