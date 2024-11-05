import { ReminderList } from "./reminder_list";
import { ServiceProvided } from "./service_provided";

const MyPlannedWork: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <ServiceProvided />
      <ReminderList />
    </div>
  );
};

export default MyPlannedWork;
