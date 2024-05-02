import CancelIcon from "assets/government/icons/cancel.svg";
import SentIcon from "assets/government/icons/sent.svg";
import UserIcon from "assets/government/icons/userIcon.svg";
import WaitingIcon from "assets/government/icons/waiting.svg";
import { FC } from "react";
import { ElderlyStatus } from "service/social-worker/customer/type";

interface Props {
  status?: 1 | 2 | 3 | 4 | Number;
  desc?: String;
  img?: any;
}

const CareGiverIconStatus: FC<Props> = ({ status, desc }) => {
  let text = "Хадгалагдсан";
  let colorClass = "bg-gray-100 text-gray-700";
  let img = SentIcon;

  switch (status) {
    case ElderlyStatus.ElderlySave:
      text = "Хадгалагдсан";
      img = SentIcon;
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case ElderlyStatus.ElderlyRequestSendToDistrict:
      text = "Хүсэлт илгээсэн";
      img = SentIcon;
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
      break;
    case ElderlyStatus.ElderlyRequestSendSendToCareCenter:
      text = "Хуваарилсан";
      img = SentIcon;
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
      break;
    case ElderlyStatus.ElderlyWaiting:
      text = "Хүлээлэгт оруулсан";
      img = WaitingIcon;
      colorClass = "bg-blue-50 text-blue-700";
      break;
    case ElderlyStatus.ElderlyAllocated:
      text = "Хүлээлэгт оруулсан";
      colorClass = "bg-blue-50 text-blue-700";
      break;
    case ElderlyStatus.ElderlyTakingCare:
      text = "Үйлчлүүлж байгаа";
      colorClass = "bg-green-50 text-green-700";
      break;
    case ElderlyStatus.ElderlyCareCenterReturned:
      text = "Асрамжийн газраас буцаагдсан";
      colorClass = "bg-red-50 text-red-700";
      break;
    case ElderlyStatus.ElderlyDied:
      img = UserIcon;
      text = "Нас барсан";
      colorClass = "bg-red-50 text-red-700";
      break;
    case ElderlyStatus.ReturnSum:
      text = "Буцаагдсан";
      img = CancelIcon;
      colorClass = "bg-[#FEF3F2] text-[#F04438]";
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

  return <img src={img} alt="frame" />;
};

export default CareGiverIconStatus;
