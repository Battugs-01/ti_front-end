import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Avatar, Timeline, notification } from "antd";
import CheckIcon from "assets/government/icons/check_border.svg";
import CareGiverIconStatus from "components/badge/icon_status";
import CareGiverComponentStatus from "components/migration-events";
import moment from "moment";
import { File } from "pages/government/components/file";
import { useEffect } from "react";
import orphanElderly from "service/social-worker/customer";
import { ElderlyInterface } from "service/social-worker/customer/type";

type MigrationType = {
  data?: ElderlyInterface;
};

export const Migration: React.FC<MigrationType> = ({ data }) => {
  const list = useRequest(() => orphanElderly.getElderlyEvents(data?.id), {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run();
  };

  useEffect(() => {
    run();
  }, [data]);

  return (
    <>
      {list.loading ? (
        <PageLoading />
      ) : (
        <div className="ml-2 h-[900px] overflow-y-auto w-full">
          <Timeline
            className="mt-5 ml-3"
            items={
              list?.data?.map((item: any) => ({
                children: (
                  <CareGiverComponentStatus
                    data={item}
                    status={item?.status_code}
                  />
                ),
                position: "right",
                dot: <CareGiverIconStatus status={item?.status_code} />,
              })) || []
            }
          />
        </div>
      )}
    </>
  );
};
