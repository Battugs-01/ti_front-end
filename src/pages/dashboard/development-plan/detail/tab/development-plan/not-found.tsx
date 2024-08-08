import { Button, Empty, Typography } from "antd";
import { Link } from "react-router-dom";
import { ChartBreakoutSquare, ChevronLeft } from "untitledui-js-base";

const NotFound: React.FC = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={
        <div>
          <div className="font-bold text-base">No plan found</div>
          <div className="text-gray-600">
            No active development plan was found. Please try again later
          </div>
        </div>
      }
      className="min-h-[500px] flex flex-col items-center justify-center"
    >
      <div className="flex items-center gap-4 justify-center">
        <Link to="/dashboard/development-plan">
          <Button
            size="large"
            type="default"
            icon={<ChevronLeft />}
            className="flex items-center"
          >
            Back
          </Button>
        </Link>
        <Button
          size="large"
          type="primary"
          icon={<ChartBreakoutSquare />}
          className="flex items-center gap-2"
        >
          Create Development Plan
        </Button>
      </div>
    </Empty>
  );
};

export default NotFound;
