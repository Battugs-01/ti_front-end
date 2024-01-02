import { atom } from "jotai";
import { FilterDeadline } from "types";

export interface DashboardForm {
  deadline?: FilterDeadline;
  current_full_date?: Date[];
  previous_full_date?: Date[];
}

export const atomDashboardForm = atom<DashboardForm>({
  deadline: FilterDeadline.ThreeMonth,
});
