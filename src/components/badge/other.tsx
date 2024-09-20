import { FC } from "react";
import { useIntl } from "react-intl";

interface Props {
  status?: any | React.ReactNode;
}

export const OtherBadge: FC<Props> = ({ status }) => {
  const intl = useIntl();
  let text = "None";
  let colorClass = "bg-[#F2F4F7] text-[#344054]";
  switch (status) {
    case true:
      text = intl.formatMessage({ id: "yes" }, { number: 1 });
      colorClass = "bg-[#ECFDF3] text-[#027A48]";
      break;
    case false:
      text = intl.formatMessage({ id: "no" }, { number: 3 });
      colorClass = "bg-[#F2F4F7] text-[#344054]";
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

export default OtherBadge;
