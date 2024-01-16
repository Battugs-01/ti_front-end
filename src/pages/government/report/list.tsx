import { FilterTypeline } from "service/gov-report";
import Item from "./item";

const data = [
  {
    id: FilterTypeline.A13,
    formName: "Б-АС-1.3",
    totalArrived: 13,
    totalFile: 14,
    newArrived: 1,
    description:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагын цалин хөлсний мэдээлэл",
  },
  {
    id: FilterTypeline.A16,
    formName: "Б-АС-1.6",
    totalArrived: 13,
    totalFile: 14,
    newArrived: 1,
    description:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагад нас барсан асруулагчийн мэдээ",
  },
  {
    id: FilterTypeline.A14,
    formName: "Б-АС-1.4",
    totalArrived: 13,
    totalFile: 14,
    newArrived: 1,
    description:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагаар асруулагчийн жилийн мэдээ",
  },
  {
    id: FilterTypeline.A15,
    formName: "Б-АС-1.5",
    totalArrived: 13,
    totalFile: 14,
    newArrived: 1,
    description:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагаар асруулагчийн шилжилт хөдөлгөөний мэдээ",
  },
];

const List: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {data?.map((item, key) => (
          <Item
            id={item.id}
            key={key}
            formName={item?.formName}
            totalArrived={item?.totalArrived}
            totalFile={item?.totalFile}
            newArrived={item?.newArrived}
            description={item?.description}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
