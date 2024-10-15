import { useRequest } from "ahooks";
import { notification } from "antd";
import dashboard from "service/dashboard";
import { TotalCase } from "../components/total_case";
import { TotalCaseAgency } from "../components/total_case_agency";
import { TotalPoint } from "../components/total_point";

export const Admin: React.FC = () => {
  const totalPoint = useRequest(
    async () => dashboard.points({ agency_id: 0 }),
    {
      onError: (err) => {
        notification.error({
          message: err.message,
        });
      },
    }
  );

  const totalCase = useRequest(
    async () => dashboard.totalCase({ agency_id: 0 }),
    {
      onError: (err) => {
        notification.error({
          message: err.message,
        });
      },
    }
  );

  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 3xl:grid-cols-5 gap-6">
      <div className="lg:col-span-3 3xl:col-span-2 col-span-2">
        <TotalPoint data={totalPoint.data} />
      </div>
      <div className="lg:col-span-2 3xl:col-span-2 col-span-2">
        <TotalCaseAgency data={totalPoint.data} />
      </div>
      <div className="lg:col-span-1 col-span-2  h-full">
        <TotalCase data={totalCase.data} />
      </div>
    </div>
  );
};
