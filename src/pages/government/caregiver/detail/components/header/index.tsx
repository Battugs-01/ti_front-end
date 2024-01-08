import { LeftOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Tabs } from "antd";
import LoomIcon from "assets/government/icons/loom.svg";
import TransferIcon from "assets/icons/transfer.svg";

import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button";
import moment from "moment";
import { CardData, DetailType } from "service/gov-requests";
import InfoIcon from "assets/icons/info-circle.svg";

import Detail from "pages/dashboard/notifications/modal/customer/detail";

const color = "#144E5A";

const data = [
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
    id: 95,
  },
];
const items = [
  {
    key: DetailType.history,
    label: "Шилжилт хөдөлгөөний түүх",
    title: "20",
    icon: InfoIcon,
  },
  {
    key: DetailType.case,
    label: "Хувийн хэрэг",
    title: "12",
    icon: InfoIcon,
  },
  {
    key: DetailType.plan,
    label: "Хөгжлийн төлөвлөгөө",
    title: "6",
    icon: InfoIcon,
  },
  {
    key: DetailType.pension,
    label: "Тэтгэврийн мэдээлэл",
    title: "2",
    icon: InfoIcon,
  },
  {
    key: DetailType.food,
    label: "Хоол зүйн карт",
    icon: InfoIcon,
  },
  {
    key: DetailType.diagnostic,
    label: "Онош карт",
    icon: InfoIcon,
  },
];

type HeaderType = {
  changeTab: any;
  data: CardData[];
};

const Header: React.FC<HeaderType> = ({ changeTab, data }) => {
  return (
    <Card
      title={
        <div className="flex items-center gap-4">
          <DefaultButton title="Буцах" icon={<LeftOutlined />} />
          <Avatar size={36} style={{ background: color }} shape="circle">
            {data[0].image}
          </Avatar>
        </div>
      }
      extra={
        <div className="flex items-center gap-2">
          <img src={LoomIcon} />
          <div>Батсүмбэрийн Улсын асрамжийн газар</div>
          <Badge status="default" />
          <div>Гарах огноо:</div>
          <div>{moment(data[0].date).format("l")}</div>
          <Badge status="default" />
          <div>{data[0].registrationNumber}</div>
          <CustomButton title="Шилжүүлэх" icon={<img src={TransferIcon} />} />
        </div>
      }
    >
      <Tabs
        defaultActiveKey={DetailType.history}
        onChange={changeTab}
        items={items?.map((el) => {
          return {
            key: el?.key,
            label: (
              <div className="flex items-center gap-2">
                {el?.icon && <img src={el?.icon} />}
                {el?.label}
                {/* {el.title && <Badge title={el.title} color="red" />} */}
              </div>
            ),
          };
        })}
      />
    </Card>
  );
};

export default Header;
