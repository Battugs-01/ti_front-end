import { CaregiverType } from "service/gov-requests";
import {
  ElderlyStatus,
  RequestType,
} from "service/social-worker/customer/type";

export const caregiverFilterDistrict = (tab: String) => {
  switch (tab) {
    case CaregiverType.all:
      return [
        ElderlyStatus.ElderlyAllocated,
        ElderlyStatus.ElderlyWaiting,
        ElderlyStatus.ElderlyCareCenterReturned,
        ElderlyStatus.ElderlyTakingCare,
        ElderlyStatus?.ElderlyRequestSendSendToCareCenter,
      ];
    case CaregiverType.distribute:
      return [
        ElderlyStatus.ElderlyAllocated,
        ElderlyStatus.ElderlyRequestSendSendToCareCenter,
      ];
    case CaregiverType.putOnHold:
      return [ElderlyStatus.ElderlyWaiting];
    case CaregiverType.takingCare:
      return [ElderlyStatus.ElderlyTakingCare];
    case CaregiverType.canceled:
      return [ElderlyStatus.ElderlyCareCenterReturned];
    default:
      return [];
  }
};

export const caregiverFilterSum = (tab: String) => {
  switch (tab) {
    case RequestType.all:
      return [];
    case RequestType.saved:
      return [ElderlyStatus.ElderlySave];
    case RequestType.putOnHold:
      return [ElderlyStatus.WaitDistrict, ElderlyStatus.ElderlyWaiting];
    case RequestType.returned:
      return [ElderlyStatus.ReturnSum];
    case RequestType.requestSend:
      return [ElderlyStatus.ElderlyRequestSendToDistrict];
    case RequestType.takingCare:
      return [ElderlyStatus.ElderlyTakingCare];
    default:
      return [];
  }
};
