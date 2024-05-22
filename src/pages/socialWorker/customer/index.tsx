import { useDebounceFn, useRequest } from "ahooks";
import { Radio, notification } from "antd";
import IBadge from "components/badge";
import { Fragment, useEffect, useState } from "react";
import { tabCounts } from "service/gov-requests";
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
  const [search, setSearch] = useState<string>("");
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
    list.run({ ...page, status: caregiverFilterSum(tab), query: search });
  }, [tab]);

  useEffect(() => {
    elderlyCount.run();
  }, [elderlyCountBoolean]);

  const setPagination = (page: number, pageSize: number) => {
    setPage({ current: page, pageSize });
    list?.run({
      current: page,
      pageSize,
      status: caregiverFilterSum(tab),
      query: search,
    });
  };

  const refreshList = () => {
    list?.run({ ...page, status: caregiverFilterSum(tab), query: search });
  };

  const searchRun = useDebounceFn(list.run, { wait: 1000 });
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
              title={elderlyCount?.data?.reduce((a: number, b: tabCounts) => {
                return a + b.count;
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
                )?.count || 0
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
                )?.count || 0
              }
              color="gray"
            />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.returned} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Буцаагдсан</div>{" "}
            <IBadge
              title={elderlyCount?.data?.reduce((a, b) => {
                if (
                  b.status === ElderlyStatus?.ReturnSum ||
                  b.status === ElderlyStatus?.ElderlyCareCenterReturned
                ) {
                  return a + b.count;
                }
                return a;
              }, 0)}
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
                )?.count || 0
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
                )?.count || 0
              }
              color="gray"
            />
          </div>
        </Radio.Button>
      </Radio.Group>

      <All
        totalItems={list?.data?.total}
        refreshList={refreshList}
        current={page.current}
        data={list?.data?.items}
        list={list}
        tab={tab}
        page={page}
        setSearch={setSearch}
        searchRun={searchRun}
        setPagination={setPagination}
      />
    </Fragment>
  );
};

export default CustomerPage;
