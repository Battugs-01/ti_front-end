import { atom } from "jotai";
import { FilterDeadline } from "types";
import { calculateDeadlineDate } from "utils/index";
export interface FilterFormType {
  deadline?: FilterDeadline;
  search?: string;
  full_date?: string[];
  service_ids?: number[];
}
export const atomProductForm = atom<FilterFormType>({
  full_date: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
    el.format("YYYY-MM-DD")
  ),
});
