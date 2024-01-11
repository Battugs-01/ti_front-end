import { ItemInterface } from "service/gov-settings";
import { Item } from "./item";

type ListType = {
  data?: ItemInterface[];
};

export const List: React.FC<ListType> = ({ data }) => {
  return (
    <div>
      {data?.map((item, key) => {
        return (
          <Item
            key={key}
            orphanName={item?.orphanName}
            firstName={item?.firstName}
            lastName={item?.lastName}
            position={item?.position}
            phone={item?.phone}
            mail={item?.mail}
            company={item?.company}
            bankName={item?.bankName}
            bankNumber={item?.bankNumber}
            id={item?.id}
          />
        );
      })}
    </div>
  );
};
