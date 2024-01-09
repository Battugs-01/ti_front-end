import Item from "./item";

const data = [
  {
    id: 23,
    formName: "Б-АС-1.3",
    totalArrived: 13,
    totalFile: 14,
    newArrived: 1,
    description:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагын цалин хөлсний мэдээлэл",
  },
  {
    id: 89,
    formName: "Б-АС-1.6",
    totalArrived: 13,
    totalFile: 14,
    newArrived: 1,
    description:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагад нас барсан асруулагчийн мэдээ",
  },
  {
    id: 56,
    formName: "Б-АС-1.4",
    totalArrived: 13,
    totalFile: 14,
    newArrived: 1,
    description:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагаар асруулагчийн жилийн мэдээ",
  },
  {
    id: 67,
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
