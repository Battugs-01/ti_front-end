import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Empty, Timeline, notification } from "antd";
import CareGiverIconStatus from "components/badge/icon_status";
import CareGiverComponentStatus from "components/migration-events";
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
          {list?.data && list?.data?.length === 0 ? (
            <Empty
              className="h-full items-center flex flex-col justify-center"
              description="Мэдээлэл байхгүй байна"
            />
          ) : (
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
          )}
        </div>
      )}
    </>
  );
};
