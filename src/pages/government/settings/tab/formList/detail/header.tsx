import { LeftOutlined } from "@ant-design/icons";
import { Badge, Card } from "antd";
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button";
import { Link } from "react-router-dom";
import FiletextIcon from "assets/government/icons/file-text.svg";
import { FormDetailInterface } from "service/gov-settings";
import moment from "moment";
import PlusIcon from "assets/government/icons/plus.svg";

type HeaderType = {
  data?: FormDetailInterface[];
};

export const Header: React.FC<HeaderType> = ({ data }) => {
  return (
    <Card>
      <div className="p-4 w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/government/settings">
            <DefaultButton
              title="Буцах"
              icon={<LeftOutlined rev={undefined} />}
            />
          </Link>
          <div className="flex items-center gap-2">
            <img src={FiletextIcon} alt="file-text" width={24} />
            <div className="font-bold">{data?.[0]?.formTitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div>Сүүлд шинэчилсэн:</div>
              <div className="font-bold">
                {moment(data?.[0]?.lastUpdated).format("l")}
              </div>
            </div>
            <Badge status="default" />
            <div className="flex items-center gap-1">
              <div>Маягтын дугаар</div>
              <div className="font-bold">{data?.[0]?.formNo}</div>
            </div>
          </div>
          <div>
            <CustomButton title="Заалт нэмэх" icon={<img src={PlusIcon} />} />
          </div>
        </div>
      </div>
    </Card>
  );
};
