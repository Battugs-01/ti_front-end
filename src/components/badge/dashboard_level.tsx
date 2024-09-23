import { Badge } from "antd";
import { DashboardLevelEnum } from "config";
import { useIntl } from "react-intl";

interface DashboardLevelProps {
  status: DashboardLevelEnum;
}

export const DashboardLevel: React.FC<DashboardLevelProps> = ({ status }) => {
  const intl = useIntl();
  let text = intl.formatMessage({ id: "level" }, { number: 1 });
  let color = "#2ED3B7";
  switch (status) {
    case DashboardLevelEnum.level1:
      text = intl.formatMessage({ id: "level" }, { number: 1 });
      color = "#2ED3B7";
      break;
    case DashboardLevelEnum.level2:
      text = intl.formatMessage({ id: "level" }, { number: 2 });
      color = "#FDB022";
      break;
    case DashboardLevelEnum.level3:
      text = intl.formatMessage({ id: "level" }, { number: 3 });
      color = "#F97066";
      break;
  }
  return <Badge color={color} text={text} />;
};
