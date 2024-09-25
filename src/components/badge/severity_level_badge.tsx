import { FC } from "react";

interface Props {
  title?: any | React.ReactNode;
}

export const SeverityLevelBadge: FC<Props> = ({ title }) => {
  let colorClass = "bg-[#F2F4F7] text-[#344054]";
  switch (title) {
    case "Хөнгөн":
      colorClass = "bg-[#ECFDF3] text-[#027A48]";
      break;
    case "Дунд":
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
      break;
    default:
      colorClass = "bg-[#FEF3F2] text-[#B42318]";
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
