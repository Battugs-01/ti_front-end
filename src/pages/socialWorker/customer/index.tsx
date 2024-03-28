import { Radio } from "antd";
import IBadge from "components/badge";
import { Fragment, useEffect, useState } from "react";
import {
  ElderlyStatus,
  RequestType,
} from "service/social-worker/customer/type";
import { All } from "./tabs/all";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { initPagination } from "utils/index";
import { caregiverFilterSum } from "utils/caregiver-filter";

const CustomerPage: React.FC = () => {
  const [tab, setTab] = useState<String>(RequestType.all);
  const [page, setPage] = useState(initPagination);
  const list = useRequest(orphanElderly.elderlyList, {
    manual: true,
  });
  useEffect(() => {
    list.run({ ...page, status: caregiverFilterSum(tab) });
  }, [tab]);
  const setPagination = (page: number, pageSize: number) => {
    setPage({ current: page, pageSize });
    list?.run({ current: page, pageSize, status: caregiverFilterSum(tab) });
  };
  const refreshList = () => {
    list?.run({ ...page });
  };
  return (
    <Fragment>
      <Radio.Group
        defaultValue={RequestType.all}
        onChange={(e) => setTab(e.target.value)}
      >
        <Radio.Button value={RequestType.all} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Бүгд</div> <IBadge title={list?.data?.total} color="gray" />
          </div>
        </Radio.Button>
        <Radio.Button value={RequestType.saved} className="h-10">
          <div className="flex items-center gap-2 h-full">
            <div>Хадгалагдсан</div>{" "}
            <IBadge
              title={
                list?.data?.items?.filter(
                  (val) => val?.status === ElderlyStatus?.ElderlySave
                ).length
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
                list?.data?.items?.filter(
                  (val) => val?.status === ElderlyStatus.WaitDistrict
                ).length
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
                list?.data?.items?.filter(
                  (val) => val?.status === ElderlyStatus.ReturnSum
                ).length
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
                list?.data?.items?.filter(
                  (val) =>
                    val?.status === ElderlyStatus.ElderlyRequestSendToDistrict
                ).length
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
                list?.data?.items?.filter(
                  (val) => val?.status === ElderlyStatus.ElderlyTakingCare
                ).length
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
        setPagination={setPagination}
      />
    </Fragment>
  );
};

export default CustomerPage;
