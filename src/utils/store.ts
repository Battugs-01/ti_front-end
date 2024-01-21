import { atom } from "jotai";
import { FilterDeadline } from "types";
import { calculateDeadlineDate } from "utils/index";
export interface FilterFormType {
  deadline?: FilterDeadline;
  search?: string;
  sortDate?: Object;
  service_ids?: number[];
  pageSize: number;
  current: number;
}
export const atomWorkersForm = atom<FilterFormType>({
  pageSize: 20,
  current: 0,
  sortDate: {
    start_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[0],
    end_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[1],
  },
});
