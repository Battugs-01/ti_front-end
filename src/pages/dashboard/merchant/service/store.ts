import { atom } from "jotai";
import { ServiceStatusType } from "service/merchantService/type";
import { FilterDeadline } from "types";
import { calculateDeadlineDate } from "utils/index";

export interface FilterFormType {
  isMap?: boolean;
  deadline?: FilterDeadline;
  search?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  operationType?: string;
  type?: string;
  is_tourist_friendly?: string;
  timeTable?: string;
  tab?: string;
  status?: string;
  full_date?: string[];
  page: number;
  limit: number;
  product_ids?: number[];
  merchant_ids?: number[];
  service_ids?: number[];
}

export const atomServiceForm = atom<FilterFormType>({
  isMap: false,
  tab: ServiceStatusType.manual.toString(),
  page: 0,
  limit: 20,
  full_date: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
    el.format("YYYY-MM-DD")
  ),
});
