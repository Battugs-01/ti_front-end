import { Radio } from "antd";
import { RadioType } from "service/gov-orphan";

type TabsType = {
  changeRadio?: any;
};

export const Tabs: React.FC<TabsType> = ({ changeRadio }) => {
  return (
    <div className="my-4">
      <Radio.Group defaultValue={RadioType.care} onChange={changeRadio}>
        <Radio.Button value={RadioType.care}>Асруулагч</Radio.Button>
        <Radio.Button value={RadioType.migration}>
          Шилжилт хөдөлгөөн
        </Radio.Button>
        <Radio.Button value={RadioType.salary}>Цалин хөлс</Radio.Button>
        <Radio.Button value={RadioType.dcare}>
          Нас барсан асруулагч
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};
