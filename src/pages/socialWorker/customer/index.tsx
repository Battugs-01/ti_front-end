import { useRequest } from "ahooks";
import { Empty, Radio, notification } from "antd";
import IBadge from "components/badge";
import { Fragment, useEffect, useState } from "react";
import orphanElderly from "service/social-worker/customer";
import {
  ElderlyStatus,
  RequestType,
} from "service/social-worker/customer/type";
import { caregiverFilterSum } from "utils/caregiver-filter";
import { initPagination } from "utils/index";
import { All } from "./tabs/all";

const CustomerPage: React.FC = () => {
  const [tab, setTab] = useState<String>(RequestType.all);
  const [page, setPage] = useState(initPagination);
  const [elderlyCountBoolean, setElderlyCount] = useState(false);

  const list = useRequest(orphanElderly.elderlyList, {
    manual: true,
    onSuccess() {
      setElderlyCount(!elderlyCountBoolean);
    },
  });

  const elderlyCount = useRequest(orphanElderly.elderly_counts, {
    manual: true,
    onError(err) {
      notification.error(err);
    },
  });

  useEffect(() => {
    list.run({ ...page, status: caregiverFilterSum(tab) });
  }, [tab]);

  useEffect(() => {
    elderlyCount.run();
  }, []);

  const setPagination = (page: number, pageSize: number) => {
    setPage({ current: page, pageSize });
    list?.run({ current: page, pageSize, status: caregiverFilterSum(tab) });
  };

  const refreshList = () => {
    list?.run({ ...page, status: caregiverFilterSum(tab) });
  };
  return (
    <Fragment>
      <Radio.Group
        defaultValue={RequestType.all}
        onChange={(e) => {
          setPage(initPagination);
          setTab(e.target.value);
        }}
      >
        <Radio.Button value={RequestType.all} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Бүгд</div>{" "}
            <IBadge
              title={elderlyCount?.data?.reduce((a, b) => {
                if (
                  b.status === ElderlyStatus?.ElderlySave ||
                  b.status === ElderlyStatus?.ElderlyWaiting ||
                  b.status === ElderlyStatus?.ReturnSum ||
                  b.status === ElderlyStatus?.ElderlyRequestSendToDistrict ||
                  b.status === ElderlyStatus?.ElderlyTakingCare
                ) {
                  return a + b.count;
                }
                return a;
              }, 0)}
              color="gray"
            />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.saved} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Хадгалагдсан</div>{" "}
            <IBadge
              title={
                elderlyCount?.data?.find(
                  (val) => val.status === ElderlyStatus.ElderlySave
                )?.count
              }
              color="gray"
            />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.putOnHold} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Хүлээлэгт оруулсан</div>{" "}
            <IBadge
              title={
                elderlyCount?.data?.find(
                  (val) => val.status === ElderlyStatus.ElderlyWaiting
                )?.count
              }
              color="gray"
            />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.returned} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Буцаагдсан</div>{" "}
            <IBadge
              title={
                elderlyCount?.data?.find(
                  (val) => val.status === ElderlyStatus.ReturnSum
                )?.count
              }
              color="gray"
            />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.requestSend} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Хүсэлт илгээсэн</div>{" "}
            <IBadge
              title={
                elderlyCount?.data?.find(
                  (val) =>
                    val.status === ElderlyStatus.ElderlyRequestSendToDistrict
                )?.count
              }
              color="gray"
            />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.takingCare} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Үйлчлүүлж байгаа</div>{" "}
            <IBadge
              title={
                elderlyCount?.data?.find(
                  (val) => val.status === ElderlyStatus.ElderlyTakingCare
                )?.count
              }
              color="gray"
            />
          </div>
        </Radio.Button>
      </Radio.Group>
      {list?.data?.total === 0 ? (
        <Empty
          className="h-full items-center flex flex-col justify-center"
          description="Дата байхгүй байна"
        />
      ) : (
        <All
          totalItems={list?.data?.total}
          refreshList={refreshList}
          current={page.current}
          data={list?.data?.items}
          list={list}
          setPagination={setPagination}
        />
      )}
    </Fragment>
  );
};

export default CustomerPage;
