import { PageLoading } from "@ant-design/pro-layout";
import { Avatar, Button } from "antd";
import infoBack from "assets/img/info_back.png";
import { PageCard } from "components/card";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import { ScreeningListType } from "service/screening_list/type";
import { Edit04 } from "untitledui-js-base";
import { parseMongolianID } from "utils/index";
interface InfoProps {
  data: ScreeningListType;
}
const Info: React.FC<InfoProps> = ({ data }) => {
  if (!data) {
    return <PageLoading />;
  }
  const intl = useIntl();
  return (
    <PageCard className="w-full p-0 rounded-md mb-2" paddingRemove>
      {/* this is purple image  */}
      <div className="max-w-full">
        <img
          src={infoBack}
          alt="info_back"
          className="hidden lg:block"
          style={{
            height: "120px",
            width: "100%",
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
          }}
        />
      </div>
      <div className="flex justify-center flex-col items-center lg:block pb-6">
        <div className="w-full flex items-center justify-center p-4  lg:hidden">
          <Avatar
            className=""
            shape="circle"
            size={119}
            src={file.fileToUrl(
              data?.person_in_charge?.profile?.physical_path || "-"
            )}
          />
        </div>

        <div className="lg:flex-row lg:flex flex-col gap-2 justify-between p-4 lg:p-2">
          <div className="flex items-start gap-12 relative ml-6">
            <Avatar
              className="hidden lg:block absolute bottom-[0]"
              shape="circle"
              size={119}
              src={file.fileToUrl(
                data?.person_in_charge?.profile?.physical_path || "-"
              )}
            />
            <div className="ml-0 lg:ml-32">
              <div className="text-[24px] font-semibold m-0 p-0">
                {data?.first_name || "-"}
              </div>
              <div className=" text-gray-500  text-[14px] m-0 p-0">
                {data?.phone || "-"}
              </div>
            </div>
          </div>
          <Button
            type="primary"
            icon={<Edit04 />}
            className="flex items-center gap-3 mr-6 mt-3 lg:ml-0 ml-5"
            // size="large"
          >
            <FormattedMessage id="general_info_update" />
          </Button>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full ml-10">
            <div className="flex gap-2 col-span-1">
              <div className="text-gray-500 text-sm">
                <FormattedMessage id="register" />
              </div>
              <div className="font-normal uppercase text-sm">{data?.rd}</div>
            </div>
            <div className="flex gap-2 col-span-2">
              <div className="text-gray-500 text-sm">
                <FormattedMessage id="gender" />
              </div>
              <div className="font-normal text-sm">
                {data?.gender === "male"
                  ? intl.formatMessage({ id: "male" })
                  : intl.formatMessage({ id: "female" })}
              </div>
            </div>
            <div className="flex gap-2 col-span-1">
              <div className="text-gray-500 text-sm">
                <FormattedMessage id="cfs_score" />
              </div>
              <div className="text-sm font-bold">{`${data?.assessment?.cfs_point}`}</div>
              <div className="text-sm text-gray-400">/9</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full ml-10">
            <div className="flex gap-2  col-span-1">
              <div className="text-gray-500 text-sm">
                <FormattedMessage id="age" />
              </div>
              <div className="font-normal uppercase text-sm">
                {parseMongolianID(data?.rd)}
              </div>
            </div>
            <div className="flex gap-2 col-span-2">
              <div className="text-gray-500 text-sm">
                <FormattedMessage id="resident_address" />
              </div>
              <div className="font-normal text-sm">{`${
                data?.address?.city?.name ?? ""
              }, ${data?.address?.district?.name ?? ""}, ${
                data?.address?.khoroo?.name ?? ""
              }, ${data?.address?.desc ?? ""}`}</div>
            </div>
            <div className="flex gap-2 col-span-1">
              <div className="text-gray-500 text-sm">
                <FormattedMessage id="caregiver" />
              </div>
              <div className="font-normal  text-sm">
                {data?.caregiver?.who_is}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageCard>
  );
};

export default Info;
