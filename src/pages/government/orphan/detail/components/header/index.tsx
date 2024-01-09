import { LeftOutlined } from "@ant-design/icons";
import { Badge, Card, Tabs } from "antd";
import LoomIcon from "assets/government/icons/loom.svg";
import EmployeeIcon from "assets/government/icons/employees.svg";
import CalendarIcon from "assets/government/icons/calendar.svg";
import BedIcon from "assets/government/icons/bed.svg";
import ReportIcon from "assets/government/icons/report.svg";
import HeartIcon from "assets/government/icons/heart-hand.svg";
import CheckCircle from "assets/government/icons/checkCircle.svg";
import moment from "moment";
import { DefaultButton } from "pages/government/components/button";
import { CardInterface, TabType } from "service/gov-orphan";
import { moneyFormat } from "utils/index";

const items = [
  {
    key: TabType.employees,
    label: "Ажилчид",
  },
  {
    key: TabType.care,
    label: "Асруулагчид",
  },
  {
    key: TabType.report,
    label: "Тайлан",
  },
  {
    key: TabType.form,
    label: "Бүртгэлийн маягт",
  },
];

type HeaderType = {
  changeTab: any;
  data: CardInterface[];
};

const Header: React.FC<HeaderType> = ({ changeTab, data }) => {
  return (
    <Card
      className="px-4"
      title={
        <div className="flex items-center gap-4">
          <DefaultButton
            title="Буцах"
            icon={<LeftOutlined rev={undefined} />}
          />
          <div className="flex items-center gap-2">
            <img src={LoomIcon} />
            <div className="font-bold">Батсүмбэрийн Улсын асрамжийн газар</div>
          </div>
        </div>
      }
      extra={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img src={EmployeeIcon} />
            <div>Ажилчид:</div>
            <div>{data[0].emplopyees}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={CalendarIcon} />
            <div>Сүүлийн сард:</div>
            <div>{data[0].plan}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={BedIcon} />
            <div>Орны тоо:</div>
            <div>{data[0].bedNumber}</div>
            <div>/ {data[0].bedNumberMax}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={ReportIcon} />
            <div>Тайлан:</div>
            <div>{data[0].report}</div>
            <div>/ {data[0].reportMax}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={HeartIcon} />
            <div>Хандив:</div>
            <div>{moneyFormat(data[0].donation, "mnt")}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={CheckCircle} />
            <div>{data[0]?.name}</div>
            <div>{moment(data[0]?.date).format("l")}</div>
          </div>
        </div>
      }
    >
      <Tabs
        defaultActiveKey={TabType.employees}
        onChange={changeTab}
        items={items?.map((el) => {
          return {
            key: el?.key,
            label: <div className="flex items-center gap-2">{el?.label}</div>,
          };
        })}
      />
    </Card>
  );
};

export default Header;
