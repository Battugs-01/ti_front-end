import { Avatar, Badge } from "antd";
import IBadge from "components/badge";
import PhoneIcon from "assets/government/icons/phone.svg";
import MailIcon from "assets/government/icons/mail.svg";
import LoomIcon from "assets/government/icons/loom.svg";
import { CustomButton } from "pages/government/components/button";
import EyeIcon from "assets/government/icons/eye.svg";

const color = "#144E5A";

type ItemType = {
  data?: any;
};

export const Item: React.FC<ItemType> = ({ data }) => {
  return (
    <div
      className="bg-white w-full text-base"
      style={{
        borderBottom: "1px solid #EAECF0",
      }}
    >
      <div className="w-full flex items-center p-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar size={36} style={{ background: color }} shape="circle">
            {"BA"}
          </Avatar>
          <div className="font-bold uppercase">{"Баттулга"}</div>
          <div>{"Энхтөр"}</div>
          <IBadge color="gray" title={"Ахлах мэргэжилтэн"} />
          <Badge status="default" />
          <IBadge color="green" title={"Үндсэн ажилтан"} />
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={PhoneIcon} />
            <div className="text-sm font-normal">{"992132134"}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={MailIcon} />
            <div className="text-sm font-normal">
              {"trungkienspktnd@gamail.com"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            <img src={LoomIcon} alt="loom" />
            <div className="text-sm font-bold">
              Батсүмбэрийн Улсын асрамжийн газар
            </div>
          </div>
          <CustomButton icon={<img src={EyeIcon} />} title="Дэлгэрэнгүй" />
        </div>
      </div>
    </div>
  );
};
