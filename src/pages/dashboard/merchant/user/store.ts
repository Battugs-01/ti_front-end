import { atom } from "jotai";
import { FilterDeadline } from "types";
import { calculateDeadlineDate } from "utils/index";

export interface FilterFormType {
  deadline?: FilterDeadline;
  search?: string;
  full_date?: string[];
  page: number;
  limit: number;
  tab: string;
}
export const atomUserForm = atom<FilterFormType>({
  page: 0,
  limit: 20,
  full_date: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
    el.format("YYYY-MM-DD")
  ),
  tab: "all",
});
