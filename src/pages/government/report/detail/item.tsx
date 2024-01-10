import { Badge, Checkbox } from "antd";
import { ItemInterface } from "service/gov-report";
import LoomIcon from "assets/government/icons/loom.svg";
import EyeIcon from "assets/government/icons/eye.svg";
import { CustomButton } from "pages/government/components/button";

export const Item: React.FC<ItemInterface> = ({
  orphanName,
  year,
  status,
  date,
}) => {
  return (
    <div style={{ borderBottom: "1px solid #EAECF0" }}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4 ">
          <Checkbox checked />
          <img src={LoomIcon} width={40} />
          <div className="font-bold">{orphanName}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold">{year} он</div>
          <Badge status="default" />
          <div>
            Илгээсэн: <span className="font-bold">{date}</span>
          </div>
          <CustomButton icon={<img src={EyeIcon} />} title="Харах" />
        </div>
      </div>
    </div>
  );
};
