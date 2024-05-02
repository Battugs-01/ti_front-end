import { FC } from "react";
import { ElderlyStatus } from "service/social-worker/customer/type";
import UserCreate from "./parts/user-create";
import UserSent from "./parts/user-sent";
import UserReturn from "./parts/user-return";
import UserWaitingCarecenter from "./parts/user-waiting-carecenter";
import UserWaitingCareCenter from "./parts/user-waiting-carecenter";
import UserServicingCareCenter from "./parts/user-servicing-carecenter";
import UserDied from "./parts/user-deid";

interface Props {
  status?: 1 | 2 | 3 | 4 | Number;
  data: any;
}

const CareGiverComponentStatus: FC<Props> = ({ data, status }) => {
  let text = "Хадгалагдсан";
  let colorClass = "bg-gray-100 text-gray-700";
  let component = <UserCreate data={data} />;
  switch (status) {
    case ElderlyStatus.ElderlySave:
      component = <UserCreate data={data} />;
      break;
    case ElderlyStatus.ElderlyRequestSendToDistrict:
      component = <UserSent data={data} />;
      break;
    case ElderlyStatus.ElderlyRequestSendSendToCareCenter:
      text = "Хуваарилсан";
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
      break;
    case ElderlyStatus.ElderlyWaiting:
      component = <UserWaitingCareCenter data={data} />;
      break;
    case ElderlyStatus.ElderlyAllocated:
      text = "Хүлээлэгт оруулсан";
      colorClass = "bg-blue-50 text-blue-700";
      break;
    case ElderlyStatus.ElderlyTakingCare:
      component = <UserServicingCareCenter data={data} />;
      break;
    case ElderlyStatus.ElderlyCareCenterReturned:
      text = "Асрамжийн газраас буцаагдсан";
      colorClass = "bg-red-50 text-red-700";
      break;
    case ElderlyStatus.ElderlyDied:
      component = <UserDied data={data} />;
      text = "Нас барсан";
      colorClass = "bg-red-50 text-red-700";
      break;
    case ElderlyStatus.ReturnSum:
      component = <UserReturn data={data} />;
      break;
    case ElderlyStatus.WaitDistrict:
      text = "Хүлээлэгт орсон";
      colorClass = "bg-blue-50 text-blue-700";
      break;
    default:
      text = "Хадгалагдсан";
      colorClass = "bg-gray-100 text-gray-700";
      break;
  }

  return component;
};

export default CareGiverComponentStatus;
