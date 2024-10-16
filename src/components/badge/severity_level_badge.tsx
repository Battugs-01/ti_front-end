import { FC } from "react";
import { useIntl } from "react-intl";

interface Props {
  title?: any | React.ReactNode;
}

export const SeverityLevelBadge: FC<Props> = ({ title }) => {
  const intl = useIntl();
  let colorClass = "bg-[#F2F4F7] text-[#344054]";
  switch (title) {
    case "Хөнгөн":
      colorClass = "bg-[#ECFDF3] text-[#027A48]";
      title = intl.formatMessage({ id: "low" });
      break;
    case "Дунд":
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
      title = intl.formatMessage({ id: "medium" });
      break;
    case "Хүнд":
      colorClass = "bg-[#FEF3F2] text-[#B42318]";
      title = intl.formatMessage({ id: "high" });
      break;
    default:
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${colorClass}`}
    >
      {title}
    </span>
  );
};

export default SeverityLevelBadge;
