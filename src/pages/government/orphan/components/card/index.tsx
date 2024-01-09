import { Badge, Card } from "antd";
import StatusPage from "assets/government/icons/statusPage.svg";
import EmployeeIcon from "assets/government/icons/employees.svg";
import CalendarIcon from "assets/government/icons/calendar.svg";
import BedIcon from "assets/government/icons/bed.svg";
import ReportIcon from "assets/government/icons/report.svg";
import HeartIcon from "assets/government/icons/heart-hand.svg";
import { CardInterface } from "service/gov-orphan";
import { moneyFormat } from "utils/index";
import { Link } from "react-router-dom";

const Item: React.FC<CardInterface> = ({
  orphanName,
  emplopyees,
  plan,
  bedNumber,
  bedNumberMax,
  report,
  reportMax,
  donation,
  id,
}) => {
  return (
    <Link to={`${id}`}>
      <Card className="hover:border-1 hover:border-solid hover:border-[#144E5A] hover:shadow-[0_0_0_4px_rgba(0,78,90,0.25)]">
        <div className="flex items-center text-gray-600 gap-2 ">
          <div>
            <img src={StatusPage} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 pb-2">
              <div className="text-gray-700 font-bold">{orphanName}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 w-60">
                <div className="flex items-center gap-1">
                  <img src={EmployeeIcon} />
                  <span>{emplopyees}</span>
                </div>
                <Badge status="default" />
                <div className="flex items-center gap-1">
                  <img src={CalendarIcon} />
                  <span>{plan}</span>
                </div>
                <Badge status="default" />
                <div className="flex items-center gap-1">
                  <img src={BedIcon} />
                  <div>
                    <span className="font-bold">{bedNumber}</span>
                    <span>/{bedNumberMax}</span>
                  </div>
                </div>
                <Badge status="default" />
                <div className="flex items-center gap-1">
                  <img src={ReportIcon} />
                  <div>
                    <span className="font-bold">{report}</span>
                    <span>/{reportMax}</span>
                  </div>
                </div>
              </div>
              <div className="w-44">
                <div className="flex items-center gap-1 justify-end">
                  <img src={HeartIcon} />
                  <div className="font-bold">
                    {moneyFormat(donation, "mnt")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Item;
