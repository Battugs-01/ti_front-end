import { useRequest } from "ahooks";
import { QuestionList } from "../components/question_list";
import { TotalCase } from "../components/total_case";
import { TotalPoint } from "../components/total_point";
import dashboard from "service/dashboard";
import { notification } from "antd";

export const Other: React.FC = () => {
  const totalPoint = useRequest(dashboard.points, {
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  const totalCase = useRequest(dashboard.totalCase, {
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 3xl:grid-cols-5 gap-6">
      <div className="lg:col-span-2 3xl:col-span-4 col-span-2">
        <TotalPoint data={totalPoint.data} />
      </div>
      <div className="3xl:col-span-1 lg:col-span-1 col-span-2 h-full">
        <TotalCase data={totalCase.data} />
      </div>
      <div className="3xl:col-span-5 lg:col-span-3 col-span-2">
        <QuestionList />
      </div>
    </div>
  );
};
