import dayjs from "dayjs";
import { atom } from "jotai";

export interface StatementFilterForm {
  limit?: number;
  page?: number;
  ids?: number[];
  is_active?: string;
  year?: number;
  month?: number;
}
export const atomStatementStore = atom<StatementFilterForm>({
  year: dayjs().year(),
  month: dayjs().month() + 1,
});
