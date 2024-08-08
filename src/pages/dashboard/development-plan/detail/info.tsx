import { Button, Divider, Flex } from "antd";
import { PageCard } from "components/card";
import { Link } from "react-router-dom";
import { ChevronLeft, Edit05, Trash01 } from "untitledui-js-base";

const Info: React.FC = () => {
  return (
    <PageCard>
      <Flex vertical gap="large">
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
        <div className="flex items-center gap-2">
          <div className="text-xl text-gray-500">Батбаяр</div>
        </div>
        <Divider />
        <div className="">
          <div className="text-lg text-gray-500">Register</div>
          <div className="text-lg ">Register</div>
        </div>
      </Flex>
    </PageCard>
  );
};

export default Info;
