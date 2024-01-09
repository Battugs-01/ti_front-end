import { Badge, Card } from "antd";
import PdfIcon from "assets/government/icons/pdf.svg";
import FileCheckIcon from "assets/government/icons/fileCheck.svg";
import { ItemProps } from "service/gov-report";
import GovBadge from "components/badge/government";
import { Link } from "react-router-dom";
const Item: React.FC<ItemProps> = ({
  formName,
  totalArrived,
  totalFile,
  newArrived,
  description,
  id,
}) => {
  return (
    <Link to={`${id}`}>
      <Card className="hover:border-1 hover:border-solid hover:border-[#144E5A] hover:shadow-[0_0_0_4px_rgba(0,78,90,0.25)]">
        <div className="flex items-center">
          <div>
            <img src={PdfIcon} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm pb-2">
              <div className="flex items-center">
                <div>Маягт:</div>
                <div className="font-bold">{formName}</div>
              </div>
              <Badge status="default" />
              <div className="flex items-center">
                <img src={FileCheckIcon} />
                <div>Нийт ирсэн: </div>
                <div className="font-bold">{totalArrived} /</div>
                <div>{totalFile}</div>
                <GovBadge status={3} desc={`${newArrived} шинэ`} />
              </div>
            </div>
            <div className="text-gray-900 font-medium">{description}</div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Item;
