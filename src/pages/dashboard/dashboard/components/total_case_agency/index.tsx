import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import { GenderBadge } from "components/badge/gender";
import { ICard } from "components/card";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import dashboard from "service/dashboard";
import { TotalPointInterface } from "service/dashboard/type";
import file from "service/file";

interface TotalCaseAgencyProps {
  data?: TotalPointInterface[];
}

export const TotalCaseAgency: React.FC<TotalCaseAgencyProps> = (data) => {
  const mapData = useRequest(dashboard.mapData, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  const run = () => {
    mapData.run();
  };

  useEffect(() => {
    run();
  }, []);

  const mandalData = mapData?.data?.find((el, index) => {
    return el?.address?.district?.id === 238; // mandal
  });

  const darkhanData = mapData?.data?.find((el, index) => {
    return el?.address?.district?.id === 112; // darkhan
  });

  const achlaltData = mapData?.data?.find((el, index) => {
    return el?.address?.district?.id === 7; // Ачлалт
  });

  return (
    <ICard xR yR>
      <p className="px-5 text-xl font-semibold">
        <FormattedMessage id="total_case_agency" />
      </p>
      <div className="flex justify-center items-start">
        <div
          style={{
            backgroundImage: "url('/svg/mn_map1.svg')",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            width: "676px",
            height: "325px",
          }}
          className="custom_divImage mt-4 relative flex justify-between"
        >
          {darkhanData && (
            <div
              style={{
                backgroundImage: "url('/svg/pin.png')",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                top: "50px",
                right: "269px",
              }}
              className="h-[50px] w-[50px] absolute"
            >
              <div
                className="flex justify-center items-center rounded-full bg-green-700 text-white text-[11px] p-1 m-2"
                style={{
                  borderRadius: "50%",
                }}
              >
                {darkhanData?.percent.toFixed(1)}%
              </div>
            </div>
          )}

          {mandalData && (
            <div
              style={{
                backgroundImage: "url('/svg/pin.png')",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                top: "17%",
                right: "34%",
              }}
              className="h-[50px] w-[50px] absolute"
            >
              <div
                className="flex justify-center items-center rounded-full bg-blue-700 text-white text-[11px] p-1 m-2"
                style={{
                  borderRadius: "50%",
                }}
              >
                {mandalData?.percent.toFixed(1)}%
              </div>
            </div>
          )}

          {achlaltData && (
            <div
              style={{
                backgroundImage: "url('/svg/pin.png')",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                top: "94px",
                right: "253px",
              }}
              className="h-[50px] w-[50px] absolute"
            >
              <div
                className="flex justify-center items-center rounded-full bg-[#f2ae00] text-white text-[11px] p-1 m-2"
                style={{
                  borderRadius: "50%",
                }}
              >
                {achlaltData?.percent.toFixed(1)}%
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-6 justify-start mt-10 flex-wrap mb-3 items-center md:justify-center md:ml-0 ml-6">
        {mapData?.data?.map((el) => (
          <div className="flex gap-2">
            <Avatar
              shape="circle"
              size={"small"}
              src={file.fileToUrl(el?.profile?.physical_path || "-")}
            />
            <div className="flex flex-col">
              <div className="text-gray-700 font-medium text-base">
                {localStorage?.getItem("web.locale") === "en"
                  ? el.name_en || el.name
                  : el.name || "-"}
              </div>
              <div className="flex gap-2">
                <span className="text-[#7b878c] text-sm font-normal">
                  {el?.percent?.toFixed(2)}%
                </span>
                <GenderBadge
                  status="female"
                  percent={el?.female_percent.toFixed(1)}
                />
                <GenderBadge
                  status="male"
                  percent={el?.male_percent.toFixed(1)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ICard>
  );
};
