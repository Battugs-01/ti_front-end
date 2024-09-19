import { PageLoading } from "@ant-design/pro-layout";
import { Button, Divider } from "antd";
import ButtonSvg from "assets/img/Button.svg";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ScreeningListType } from "service/screening_list/type";
import { ChevronLeft } from "untitledui-js-base";

interface InfoProps {
  data: ScreeningListType;
}
const Info: React.FC<InfoProps> = ({ data }) => {
  if (!data) {
    return <PageLoading />;
  }
  return (
    <PageCard>
      <div className="flex items-center justify-between">
        <Link to="/dashboard/screening-list">
          <Button
            type="default"
            icon={<ChevronLeft />}
            className="flex items-center"
          >
            <FormattedMessage id="back" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <img src={ButtonSvg} />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <div className="text-xl text-[#4B5563]">{data?.first_name}</div>
        <LevelBadge status={data?.assessment?.level} OneNone={false} />
      </div>
      <Divider />
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-gray-500 text-sm">
            <FormattedMessage id="register" />
          </div>
          <div className="font-bold uppercase text-sm">{data?.rd}</div>
        </div>
        <div>
          <div className="text-gray-500">
            <FormattedMessage id="age" />
          </div>
          <div className="font-bold uppercase text-sm">{data?.age}</div>
        </div>
        <div>
          <div className="text-gray-500">
            <FormattedMessage id="gender" />
          </div>
          <div className="text-sm font-bold">{data?.gender}</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">
            <FormattedMessage id="cfs_score" />
          </div>
          <div className="flex items-center ">
            <div className="text-sm font-bold">{`${data?.assessment?.cfs_point}`}</div>
            <div className="text-sm text-gray-400">/9</div>
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">
            <FormattedMessage id="resident_address" />
          </div>
          <div className="text-sm font-bold">
            {`${data?.address?.city?.name ?? ""}, ${
              data?.address?.district?.name ?? ""
            }, ${data?.address?.khoroo?.name ?? ""}, ${
              data?.address?.desc ?? ""
            }`}
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-gray-500 text-sm">
            <FormattedMessage id="caregiver" />
          </div>
          <div className="text-sm font-bold">3/9</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">
            <FormattedMessage id="phone" />
          </div>
          <div className="text-sm font-bold">{data?.phone}</div>
        </div>
      </div>
    </PageCard>
  );
};

export default Info;
