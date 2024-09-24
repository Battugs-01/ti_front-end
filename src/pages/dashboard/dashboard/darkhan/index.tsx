import { QuestionList } from "../components/question_list";
import { TotalCase } from "../components/total_case";
import { TotalPoint } from "../components/total_point";

export const Darkhan: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 3xl:grid-cols-5 gap-6">
      <div className="lg:col-span-3 3xl:col-span-4 col-span-2">
        <TotalPoint />
      </div>
      <div className="3xl:col-span-1 col-span-1 h-full">
        <TotalCase />
      </div>
      <div className="3xl:col-span-5 lg:col-span-3 col-span-2">
        <QuestionList />
      </div>
    </div>
  );
};