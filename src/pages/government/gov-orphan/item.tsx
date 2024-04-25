import { Avatar, Badge } from "antd";
import MailIcon from "assets/government/icons/mail.svg";
import PhoneIcon from "assets/government/icons/phone.svg";
import moment from "moment";
import { Link } from "react-router-dom";
import file from "service/file";
import UserIcon from "assets/government/icons/employees.svg";
import { IoLocationSharp } from "react-icons/io5";
import { CardInterface } from "service/social-worker/customer/type";

type ItemType = {
  data?: CardInterface;
};

export const Item: React.FC<ItemType> = ({ data }) => {
  return (
    <div className="p-4 w-full text-gray-700">
      <div className="flex items-center justify-between flex-wrap xl:flex-nowrap gap-3">
        <div className="flex items-center gap-4 flex-wrap xl:flex-nowrap">
          <Avatar
            src={file.fileToUrl(data?.logo?.physical_path || "")}
            size={40}
          />
          <div className="flex flex-col items-start gap-2 flex-wrap xl:flex-nowrap">
            {/* <Link to={`${data?.id}`}> */}
            <div className="font-bold text-base">{data?.name}</div>
            {/* </Link> */}
            <div className="flex gap-2 items-center flex-wrap xl:flex-nowrap">
              <div className="flex items-center gap-1">
                <img src={UserIcon} />
                <div>Нийт ажилтан:</div>
                <div className="font-bold">{data?.total_employees}</div>
              </div>
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <img src={UserIcon} />
                <div>Үйлчлүүлэгч:</div>
                <div className="font-bold">
                  {data?.total_elderly} / {data?.capacity_elderly}
                </div>
              </div>
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <img src={PhoneIcon} />
                <div>{data?.phone_number}</div>
              </div>
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <img src={MailIcon} />
                <div>{data?.email}</div>
              </div>
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <IoLocationSharp className="text-[#144E5A]" size={16} />
                <div>
                  {data?.address?.city?.name}, {data?.address?.district?.name},{" "}
                  {data?.address?.khoroo?.name}, {data?.address?.street},{" "}
                  {data?.address?.building}, {data?.address?.door_number}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <div className="flex items-center gap-1">
            <div className="text-sm text-gray-500">Байгуулагдсан огноо:</div>
            <div className="font-bold">
              {moment(data?.start_date).format("YYYY/MM/DD")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
