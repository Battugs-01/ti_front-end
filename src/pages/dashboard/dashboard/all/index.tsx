import { QuestionList } from "../components/question_list";
import { TotalPoint } from "../components/total_point";

export const All: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-2">
        <TotalPoint />
      </div>
      <div className="col-span-2">Total case by agency</div>
      <div className="col-span-1">Total case</div>
      <div className="col-span-5">
        <QuestionList />
      </div>
    </div>
  );
};
