import { Button, Divider, Flex } from "antd";
import { PageCard } from "components/card";
import { Link } from "react-router-dom";
import { ChevronLeft, Edit05, Trash01 } from "untitledui-js-base";

const Info: React.FC = () => {
  return (
    <PageCard>
      <div className="flex items-center justify-between">
        <Link to="/dashboard/development-plan">
          <Button
            type="default"
            icon={<ChevronLeft />}
            className="flex items-center"
          >
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Button type="link" danger icon={<Trash01 />} />
          <Button type="default" icon={<Edit05 />} />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <div className="text-xl text-gray-500">Батбаяр</div>
      </div>
      <Divider />
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-gray-500">Register</div>
          <div className="text-lg font-bold">АБ21012345</div>
        </div>
        <div>
          <div className="text-gray-500">Age</div>
          <div className="text-lg font-bold">67</div>
        </div>
        <div>
          <div className="text-gray-500">Gender</div>
          <div className="text-lg font-bold">Male</div>
        </div>
        <div>
          <div className="text-gray-500">CFS score</div>
          <div className="text-lg font-bold">3/9</div>
        </div>
        <div>
          <div className="text-gray-500">Resident Address</div>
          <div className="text-lg font-bold">
            8502 Preston Rd. Inglewood, Maine 98380
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div className="text-gray-500">Caregiver</div>
        <div className="text-lg font-bold">3/9</div>
      </div>
      <div>
        <div className="text-gray-500">Phone</div>
        <div className="text-lg font-bold">8080 5050</div>
      </div>
    </PageCard>
  );
};

export default Info;
