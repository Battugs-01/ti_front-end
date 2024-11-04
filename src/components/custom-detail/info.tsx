import { Button, Card } from "antd";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { EditScreenList } from "pages/dashboard/screening-list/components/table-actions/update";
import { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ScreeningListType } from "service/screening_list/type";
import { ChevronLeft, Edit04 } from "untitledui-js-base";
import { parseMongolianID } from "utils/index";
interface InfoProps {
  data: ScreeningListType;
  refreshData?: () => void;
  isMyPlanedWork?: string;
}
const Info: React.FC<InfoProps> = ({ data, refreshData, isMyPlanedWork }) => {
  const intl = useIntl();
  const [updateinfo, setUpdateInfo] = useState<ScreeningListType>();
  const [user] = useContext(AuthContext);

  return (
    <PageCard className="w-full p-8 rounded-md" paddingRemove>
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-6">
          <Link
            // to="/dashboard/screening-list"
            to={`${
              isMyPlanedWork
                ? "/dashboard/my-planned-work"
                : "/dashboard/screening-list"
            }`}
            style={{ textDecoration: "none" }}
          >
            <Button type="default" size="large" icon={<ChevronLeft />} />
          </Link>
          <div>
            <div className="text-[24px] font-semibold m-0 p-0">
              {data?.first_name || "-"}
            </div>
            <div className=" text-gray-500  text-[14px] m-0 p-0">
              <LevelBadge status={data?.assessment?.level} />
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center lg:block pb-6">
          <div className="lg:flex-row lg:flex flex-col gap-2 justify-between p-4 lg:p-2">
            {(user?.user?.role === UserRoleType.case_manager ||
              user?.user?.role === UserRoleType.case_associate ||
              user?.user?.role === UserRoleType.senior_case_manager ||
              user?.user?.role === UserRoleType.doctor) &&
              !isMyPlanedWork && (
                <Button
                  type="primary"
                  icon={<Edit04 />}
                  className="flex items-center gap-3 mt-3 lg:ml-0 "
                  onClick={() => setUpdateInfo(data)}
                >
                  <FormattedMessage id="general_info_update" />
                </Button>
              )}
          </div>
        </div>
      </div>

      <Card className="flex flex-col gap-4 mt-6 bg-[#F5F8F8]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="flex gap-2 col-span-1">
            <div className="text-gray-500 text-sm">
              <FormattedMessage id="register" /> :
            </div>
            <div className="font-normal uppercase text-sm">{data?.rd}</div>
          </div>
          <div className="flex gap-2 col-span-2">
            <div className="text-gray-500 text-sm">
              <FormattedMessage id="gender" /> :
            </div>
            <div className="font-normal text-sm">
              {data?.gender === "male"
                ? intl.formatMessage({ id: "male" })
                : intl.formatMessage({ id: "female" })}
            </div>
          </div>
          <div className="flex gap-2 col-span-1">
            <div className="text-gray-500 text-sm">
              <FormattedMessage id="cfs_score" /> :
            </div>
            <div className="text-sm font-bold">{`${data?.assessment?.cfs_point}`}</div>
            <div className="text-sm text-gray-400">/9</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="flex gap-2 col-span-1">
            <div className="text-gray-500 text-sm">
              <FormattedMessage id="age" /> :
            </div>
            <div className="font-normal uppercase text-sm">
              {parseMongolianID(data?.rd)}
            </div>
          </div>
          <div className="flex gap-2 col-span-2">
            <div className="text-gray-500 text-sm">
              <FormattedMessage id="resident_address" /> :
            </div>
            <div className="font-normal text-sm">{`${
              data?.address?.city?.name ?? ""
            }, ${data?.address?.district?.name ?? ""}, ${
              data?.address?.khoroo?.name ?? ""
            }, ${data?.address?.desc ?? ""}`}</div>
          </div>
          <div className="flex gap-2 col-span-1">
            <div className="text-gray-500 text-sm">
              <FormattedMessage id="caregiver" /> :
            </div>
            <div className="font-normal  text-sm">
              {data?.caregiver?.who_is}
            </div>
          </div>
        </div>
      </Card>
      {updateinfo && (
        <EditScreenList
          data={updateinfo}
          onCancel={() => setUpdateInfo(undefined)}
          onFinish={async () => {
            refreshData?.();
            setUpdateInfo(undefined);
          }}
        />
      )}
    </PageCard>
  );
};

export default Info;
