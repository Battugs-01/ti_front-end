interface GenderBadgeProps {
  status: string;
  percent: number;
}

export const GenderBadge: React.FC<GenderBadgeProps> = ({
  status,
  percent,
}) => {
  let text = "";
  let color = "";
  switch (status) {
    case "male":
      text = percent + "%";
      color = "bg-[#ECFDF3] text-[#027A48]";
      break;
    default:
      text = percent + "%";
      color = "bg-[#FFF1F3] text-[#C01048]";
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${color}`}
    >
      {text}
    </span>
  );
};
