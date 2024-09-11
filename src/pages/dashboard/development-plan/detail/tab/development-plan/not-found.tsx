import { Button, Empty } from "antd";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ChartBreakoutSquare, ChevronLeft } from "untitledui-js-base";
import { CreateDevelopmentPlan } from "../../create";

const NotFound: React.FC = () => {
  const [createModalVisible,setCreateModalVisible]=useState<boolean>();
  const cancelModal=()=>{
    setCreateModalVisible(false)
  }
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={
        <div>
          <div className="font-bold text-base">No plan found</div>
          <div className="text-gray-600">
            No active development plan was found.Please try again later
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
            <FormattedMessage id="back"/>
          </Button>
        </Link>
        <Button
          size="large"
          type="primary"
          icon={<ChartBreakoutSquare />}
          className="flex items-center gap-2"
          onClick={()=>setCreateModalVisible(true)}
        >
            <FormattedMessage id="create_development_plan"/>
        </Button>
        {createModalVisible && (
        <CreateDevelopmentPlan
          cancelModal={cancelModal}
          visible={createModalVisible}
        />
      )}
      </div>
    </Empty>
  );
};

export default NotFound;
