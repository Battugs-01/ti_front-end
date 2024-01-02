import Badge from "components/badge";
import { moneyFormat } from "utils/index";

type Props = {
  totalOrderAmount?: number;
  totalCommissionAmount?: number;
  commissionPercent?: number;
};

export const Commission = ({
  totalCommissionAmount,
  totalOrderAmount,
  commissionPercent,
}: Props) => {
  return (
    <div className="">
      <div className="text-gray-700 font-semibold">
        {moneyFormat(totalOrderAmount, "mnt")}
      </div>
      <div className="flex items-center  gap-2">
        <div className="text-gray-600 ">
          {moneyFormat(totalCommissionAmount, "mnt")}
        </div>
        <Badge color="green" title={`${commissionPercent} %`} />
      </div>
    </div>
  );
};
