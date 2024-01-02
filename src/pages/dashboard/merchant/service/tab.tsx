import { IBadge } from "components/index";
import Tooltip from "antd/lib/tooltip";
type Props = {
  total?: number;
  title: string;
};
export const ServiceTabLabel = ({ total, title }: Props) => {
  return (
    <Tooltip title={title + " merchant"} placement="top">
      <div className="flex items-center gap-2">
        <div>{title}</div>
        <IBadge count={total} showZero />
      </div>
    </Tooltip>

  );
};
