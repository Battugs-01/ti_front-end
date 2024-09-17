// import Info from "./info";
// import MainDetail from "./main-detail";

import { useLocation } from "react-router-dom";
import { useRequest } from "ahooks";
import screenList from "service/screening_list";
import Info from "components/custom-detail/info";
import {
  AssessmentListType,
  ScreeningListType,
} from "service/screening_list/type";
import MainDetail from "components/custom-detail/main-detail";
import { PageCard } from "components/card";
import QuistionHistory from "components/custom-detail/quistion-history";

const ScreeningListDetail: React.FC = () => {
  const location = useLocation();
  const customerId = location.search?.split("=")[1];
  const { data } = useRequest(() => screenList.customerDetail(customerId));

  const assessmentData = useRequest(() =>
    screenList.assessmentDetail(customerId)
  );

  return (
    <>
      <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
        <div className="xl:col-span-1">
          <Info data={data as ScreeningListType} />
        </div>
        <div className="xl:col-span-4">
          <MainDetail data={assessmentData.data ?? []} />
        </div>
      </div>
    </>
  );
};

export default ScreeningListDetail;
