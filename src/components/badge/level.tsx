import { FC } from "react";
import { useIntl } from "react-intl";

interface Props {
  status?: string;
}

const LevelBadge: FC<Props> = ({ status }) => {
  const intl = useIntl();
  let text = "None";
  let colorClass = "bg-[#F2F4F7] text-[#344054]";
  switch (status) {
    case "level_1":
      text = intl.formatMessage({ id: "level" }, { number: 1 });
      colorClass = "bg-[#ECFDF3] text-[#027A48]";
      break;
    case "level_2":
      text = intl.formatMessage({ id: "level" }, { number: 2 });
      colorClass = "bg-[#B54708] text-[#FFFAEB]";
      break;
    case "level_3":
      text = intl.formatMessage({ id: "level" }, { number: 3 });
      colorClass = "bg-[#FEF3F2] text-[#B42318]";
      break;
    default:
      colorClass = "bg-[#F2F4F7] text-[#344054]";
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${colorClass}`}
    >
      {text}
    </span>
  );
};

export default LevelBadge;
